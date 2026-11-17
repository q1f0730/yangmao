/* 刷羊毛 · 抖音式竖滑 feed + 在线学习推荐算法
   形态：全屏 snap feed / 侧动作栏 / 双击收藏 / 攻略抽屉 / 分类 / 记录 / 画像 / 永久调校 dock
   规则沿用：零现金成本 · 估值≥10 · 非长期签到（数据层）；已参加/过期自动隐藏进记录（本层） */
(function () {
  "use strict";

  var CATS = [
    { id: "all", label: "全部" },
    { id: "tea", label: "奶茶咖啡" },
    { id: "food", label: "快餐餐饮" },
    { id: "ecom", label: "电商支付" },
    { id: "bank", label: "银行" },
    { id: "telco", label: "运营商" },
    { id: "douyin", label: "抖音" },
    { id: "content", label: "B站·小红书" },
    { id: "ai", label: "AI·算力" },
    { id: "student", label: "学生权益" },
    { id: "vip", label: "会员权益" }
  ];
  var CAT_LABEL = {};
  CATS.forEach(function (c) { CAT_LABEL[c.id] = c.label; });
  var REC_KEY = "wool-records-v1", LIKE_KEY = "wool-likes-v1", PROF_KEY = "wool-profile-v1",
    PREF_KEY = "wool-prefs-v1", SEEN_KEY = "wool-seen-v1", THEME_KEY = "wool-theme",
    SND_KEY = "wool-sound", HINT_KEY = "wool-hint-v1";

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function load(key, fallback) {
    try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (e) { return fallback; }
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  // ---------- 状态 ----------
  var records = load(REC_KEY, {});
  var likes = load(LIKE_KEY, {});
  var seen = load(SEEN_KEY, {});
  var profile = load(PROF_KEY, null) || { cat: {}, brand: {}, tag: {}, dwell: {}, skips: {}, dislike: {}, swipes: 0, joined: 0, voided: 0, liked: 0 };
  var prefs = load(PREF_KEY, null) || { value: 1, urgent: 1, fresh: 1, explore: 0.12, diverse: 0.6, auto: 0, density: "std", sound: true, theme: "light" };
  var mode = "rec", view = "feed", feedIds = [], rendered = 0, activeId = null, activeSince = 0,
    sheetOpen = false, lastInteract = Date.now(), seed = Math.random(), hintDone = load(HINT_KEY, false);

  function todayStr() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  var isVerifiedDay = todayStr() === window.META.verifiedDate;
  function minutes(t) { var p = t.split(":"); return (+p[0]) * 60 + (+p[1]); }
  function nowMinutes() { var d = new Date(); return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60; }
  function endOfDay(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2], 23, 59, 59).getTime(); }
  function fmtDate(iso) { var p = iso.split("-"); return (+p[1]) + "/" + (+p[2]); }
  function fmtTime(ms) {
    var d = new Date(ms);
    return (d.getMonth() + 1) + "/" + d.getDate() + " " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  function recOf(a) { return records[a.id] || null; }
  function isJoined(a) { var r = recOf(a); return !!(r && r.state === "joined"); }
  function expiryInfo(a) {
    var t = todayStr();
    if (a.deadline && a.deadline < t) return { expired: true, reason: "活动已于 " + fmtDate(a.deadline) + " 截止", at: endOfDay(a.deadline) };
    if (a.today) {
      if (!isVerifiedDay) return { expired: true, reason: "今日时点已过（核查日 " + window.META.verifiedDate + "）", at: endOfDay(window.META.verifiedDate) };
      var ends = (a.slots || []).map(function (s) { return minutes(s.e || s.at); });
      if (a.todayDeadline) ends.push(minutes(a.todayDeadline));
      if (ends.length && nowMinutes() > Math.max.apply(null, ends)) {
        var d = new Date(); d.setHours(Math.floor(Math.max.apply(null, ends) / 60), Math.max.apply(null, ends) % 60, 0, 0);
        return { expired: true, reason: "今日场次已全部结束", at: d.getTime() };
      }
    }
    return { expired: false, reason: "", at: 0 };
  }
  function onShelf(a) { return !expiryInfo(a).expired && !isJoined(a); }
  function byId(id) { return window.ACTIVITIES.find(function (a) { return a.id === id; }); }
  var TAG_WORDS = ["免单", "抽奖", "会员", "流量", "话费", "算力", "Token", "学生", "生日", "试用", "积分", "立减金", "红包", "券", "游戏", "网盘", "阅读", "办公", "骑行", "打车", "电费", "新人"];
  function tagsOf(a) {
    if (a.tags && a.tags.length) return a.tags;
    var hay = a.title + " " + a.reward, out = [];
    TAG_WORDS.forEach(function (w) { if (hay.indexOf(w) !== -1 && out.length < 4) out.push(w); });
    if (!out.length) out.push(CAT_LABEL[a.cat] || a.cat);
    return out;
  }
  function serialOf(a) { return "NO." + String(window.ACTIVITIES.indexOf(a) + 1).padStart(3, "0"); }

  // ---------- 推荐算法：特征 + 在线学习亲和度 ----------
  function bump(map, k, v) { if (!k) return; map[k] = Math.max(-6, Math.min(12, (map[k] || 0) + v)); }
  function norm(x) { x = x || 0; return x <= 0 ? 0 : x / (x + 3); }
  function valueF(a) { return Math.min(2.2, Math.log10(Math.max(10, a.value || 10)) / 2); }
  function urgentF(a) {
    if (a.today) return 1.6;
    if (!a.deadline) return a.daily ? 0.5 : 0.25;
    var days = (endOfDay(a.deadline) - Date.now()) / 86400000;
    if (days <= 1) return 1.4;
    if (days <= 3) return 1.1;
    if (days <= 7) return 0.8;
    if (days <= 30) return 0.45;
    return 0.15;
  }
  function freshF(a) { return (seen[a.id] ? 0.25 : 1) * ((a.today || a.daily) ? 1.15 : 1); }
  function confF(a) { return (a.conf || 1) / 3; }
  function affinity(a) {
    var t = tagsOf(a), ts = 0;
    t.forEach(function (k) { ts += norm(profile.tag[k]); });
    t = t.length ? ts / t.length : 0;
    return 0.6 * norm(profile.cat[a.cat]) + 0.25 * norm(profile.brand[a.brand]) + 0.15 * t;
  }
  function fatigue(a) {
    var f = 0.35 * (profile.skips[a.id] || 0) + 0.6 * (profile.dislike[a.id] || 0);
    if (seen[a.id] && (profile.dwell[a.id] || 0) < 1200) f += 0.25;
    return f;
  }
  function parts(a) {
    return {
      value: prefs.value * valueF(a),
      urgent: prefs.urgent * urgentF(a),
      fresh: prefs.fresh * freshF(a),
      conf: 0.8 * confF(a),
      aff: 1.4 * affinity(a),
      fat: -fatigue(a),
      like: likes[a.id] ? 0.6 : 0
    };
  }
  function score(a) {
    var p = parts(a);
    return p.value + p.urgent + p.fresh + p.conf + p.aff + p.fat + p.like;
  }
  function reason(a) {
    if (a._explore) return "探索推荐 · 换个口味";
    var p = parts(a);
    if (p.aff > 0.5 && norm(profile.cat[a.cat]) > 0.35) return "你常刷「" + (CAT_LABEL[a.cat] || a.cat) + "」";
    if (prefs.urgent * urgentF(a) >= 1.2 && a.deadline) return "距截止仅 " + Math.max(1, Math.round((endOfDay(a.deadline) - Date.now()) / 86400000)) + " 天";
    if (a.today) return "今日时点 · 正在开抢";
    if (prefs.value * valueF(a) >= 1.2) return "估值 ¥" + a.value + " · 高价值";
    if (!seen[a.id]) return "新上架 · 你还没刷过";
    if (confF(a) >= 0.99) return "官方一手来源";
    return "综合推荐分 " + score(a).toFixed(2);
  }
  function buildOrder() {
    var pool = window.ACTIVITIES.filter(onShelf);
    if (mode === "value") {
      pool.sort(function (x, y) { return (y.value || 0) - (x.value || 0) || score(y) - score(x); });
      return pool.map(function (a) { return a.id; });
    }
    if (mode === "new") {
      pool.sort(function (x, y) { return freshF(y) - freshF(x) || urgentF(y) - urgentF(x) || score(y) - score(x); });
      return pool.map(function (a) { return a.id; });
    }
    // rec：贪心 + ε-greedy 探索 + 类目/品牌多样性惩罚
    var remain = pool.slice(), out = [], lastCats = [], lastBrands = [];
    var exploreP = Math.min(0.6, prefs.explore + (seedBoost || 0));
    while (remain.length) {
      var pick = null;
      var unseen = remain.filter(function (a) { return !seen[a.id]; });
      if (unseen.length && Math.random() < exploreP) {
        pick = unseen[Math.floor(Math.random() * unseen.length)];
        pick._explore = true;
      } else {
        var best = -1e9;
        remain.forEach(function (a) {
          var s = score(a);
          if (lastCats.slice(-2).indexOf(a.cat) !== -1) s -= prefs.diverse * 1.2;
          if (lastBrands.slice(-1).indexOf(a.brand) !== -1) s -= prefs.diverse * 0.6;
          s += (Math.sin(seed * 97 + window.ACTIVITIES.indexOf(a)) * 0.05);
          if (s > best) { best = s; pick = a; }
        });
      }
      out.push(pick.id);
      lastCats.push(pick.cat); lastBrands.push(pick.brand);
      remain.splice(remain.indexOf(pick), 1);
    }
    return out;
  }
  var seedBoost = 0;

  // ---------- 音效（WebAudio 合成，跟随可见事件） ----------
  var AC = null;
  function ac() {
    if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { AC = null; } }
    if (AC && AC.state === "suspended") AC.resume();
    return AC;
  }
  function tone(freq, dur, type, gain, when) {
    var c = ac(); if (!c || !prefs.sound) return;
    var o = c.createOscillator(), g = c.createGain(), t = c.currentTime + (when || 0);
    o.type = type || "sine"; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain || 0.08, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  function noise(dur, gain) {
    var c = ac(); if (!c || !prefs.sound) return;
    var n = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var s = c.createBufferSource(), g = c.createGain(), f = c.createBiquadFilter();
    f.type = "bandpass"; f.frequency.value = 900; f.Q.value = 0.8;
    g.gain.value = gain || 0.05;
    s.buffer = buf; s.connect(f); f.connect(g); g.connect(c.destination); s.start();
  }
  var SFX = {
    swipe: function () { noise(0.12, 0.045); },
    heart: function () { tone(660, 0.09, "sine", 0.07); tone(990, 0.12, "sine", 0.06, 0.07); },
    stamp: function () { tone(150, 0.14, "sine", 0.12); noise(0.05, 0.06); },
    join: function () { tone(523, 0.1, "triangle", 0.07); tone(659, 0.1, "triangle", 0.07, 0.09); tone(784, 0.16, "triangle", 0.07, 0.18); },
    nope: function () { tone(220, 0.12, "sawtooth", 0.04); tone(160, 0.16, "sawtooth", 0.04, 0.08); },
    ui: function () { tone(880, 0.05, "sine", 0.035); }
  };

  // ---------- feed 卡片 ----------
  var ICON = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.4 1-4.5 2.5C10.9 4 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7z"/></svg>',
    guide: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 8h8M8 12h5"/></svg>',
    join: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.5 5 5 10-11"/></svg>',
    void: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    nope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c7 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A16.6 16.6 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>'
  };
  function confHTML(n) {
    return '<span class="conf" title="可信度：3星官方一手 / 2星多源交叉 / 1星线报单源">' + "★".repeat(n) + '<span class="off">' + "☆".repeat(3 - n) + "</span></span>";
  }
  function deadlineChip(a) {
    var ex = expiryInfo(a);
    if (ex.expired) return '<span class="chip dl-void">已过期</span>';
    if (a.today && a.todayDeadline) return '<span class="chip dl-hot" id="cd-' + esc(a.id) + '">今天 ' + esc(a.todayDeadline) + ' 截止</span>';
    if (a.deadline) return '<span class="chip' + ((endOfDay(a.deadline) - Date.now()) < 3 * 86400000 ? " dl-hot" : "") + '">' + esc(fmtDate(a.deadline)) + ' 截止</span>';
    if (a.daily) return '<span class="chip dl-live">每日可刷</span>';
    return '<span class="chip">长期有效</span>';
  }
  function cardHTML(a, idx) {
    var tags = tagsOf(a).map(function (t) { return '<span class="tag">#' + esc(t) + "</span>"; }).join("");
    var r = recOf(a);
    return '<article class="fcard" data-id="' + esc(a.id) + '" data-cat="' + esc(a.cat) + '" style="--cat:var(--c-' + esc(a.cat) + ')">' +
      '<div class="fc-bg" aria-hidden="true"></div>' +
      '<span class="fc-mark" aria-hidden="true">' + esc(a.brand.charAt(0)) + "</span>" +
      '<div class="fc-seal" aria-hidden="true">' + esc(a.brand.charAt(0)) + "</div>" +
      '<span class="fc-fineprint" aria-hidden="true">零现金成本 · 估值≥¥10 · 非长期签到 · 已参加自动归档</span>' +
      '<div class="fc-stub" aria-hidden="true"><span class="monogram">' + esc(a.brand.charAt(0)) + '</span><span class="stub-cat">' + esc(CAT_LABEL[a.cat] || "") + '</span><span class="stub-no">' + serialOf(a) + "</span></div>" +
      '<div class="fc-body">' +
        '<div class="fc-top"><span class="brand">' + esc(a.brand) + "</span>" + confHTML(a.conf || 1) +
          '<span class="chip plat">' + esc(a.platform || CAT_LABEL[a.cat] || "") + "</span>" + deadlineChip(a) + "</div>" +
        '<h2 class="fc-title">' + esc(a.title) + "</h2>" +
        '<p class="fc-reward">' + esc(a.reward) + "</p>" +
        '<div class="fc-meta"><span class="valbig">≈¥' + (a.value || 0) + "</span>" + tags +
          '<span class="chip free">零成本</span>' + (a.req ? '<span class="chip req">' + esc(a.req) + "</span>" : "") + "</div>" +
        '<p class="fc-entry">入口 · <b>' + esc(a.entry) + "</b></p>" +
        '<button class="fc-why" type="button" data-act="why" data-id="' + esc(a.id) + '"><i>◈</i>' + esc(reason(a)) + "</button>" +
        '<div class="fc-srcs">聚合 ' + (a.sources || []).length + ' 个来源 · ' + esc(a.schedule || "见活动页") + "</div>" +
      "</div>" +
      '<div class="fc-rail">' +
        '<button class="rail like' + (likes[a.id] ? " on" : "") + '" type="button" data-act="like" data-id="' + esc(a.id) + '" aria-label="收藏">' + ICON.heart + '<b>' + (likes[a.id] ? 1 : 0) + "</b><span>收藏</span></button>" +
        '<button class="rail" type="button" data-act="guide" data-id="' + esc(a.id) + '" aria-label="展开攻略">' + ICON.guide + "<b>" + a.steps.length + "</b><span>攻略</span></button>" +
        '<button class="rail join" type="button" data-act="join" data-id="' + esc(a.id) + '" aria-label="已参加">' + ICON.join + "<b>✓</b><span>已参加</span></button>" +
        '<button class="rail void" type="button" data-act="void" data-id="' + esc(a.id) + '" aria-label="无效">' + ICON.void + "<b>×</b><span>无效</span></button>" +
        '<button class="rail nope" type="button" data-act="nope" data-id="' + esc(a.id) + '" aria-label="不感兴趣">' + ICON.nope + "<b>−</b><span>不感兴趣</span></button>" +
        '<button class="rail" type="button" data-act="share" data-id="' + esc(a.id) + '" aria-label="复制入口">' + ICON.share + "<b>⧉</b><span>复制</span></button>" +
      "</div>" +
      '<span class="fc-index">' + String(idx + 1).padStart(2, "0") + " / " + feedIds.length + "</span>" +
      '<span class="bigstamp" aria-hidden="true"></span>' +
      '<div class="burst" aria-hidden="true"></div>' +
    "</article>";
  }

  var feedEl = $("feed");
  function renderMore() {
    var end = Math.min(feedIds.length, rendered + 5);
    if (end <= rendered) return;
    var html = "";
    for (var i = rendered; i < end; i++) html += cardHTML(byId(feedIds[i]), i);
    feedEl.insertAdjacentHTML("beforeend", html);
    rendered = end;
    observeCards();
  }
  function rebuildFeed(keepTop) {
    feedIds = buildOrder();
    rendered = 0;
    feedEl.innerHTML = "";
    if (!feedIds.length) {
      feedEl.innerHTML = '<div class="feed-empty"><b>在架羊毛已刷完</b><p>已参加与过期的都归档进了「记录」。</p><button type="button" data-go="history">去看记录</button><button type="button" data-go="reset">重置画像再刷</button></div>';
      $("prog").textContent = "0 / 0";
      return;
    }
    renderMore();
    if (keepTop) feedEl.scrollTop = 0;
    setActive(feedIds[0], true);
    updateProg();
  }
  function rebuildTail() {
    // 已渲染的不动；未渲染的尾部按最新画像重排
    var head = feedIds.slice(0, rendered);
    var tailPool = buildOrder().filter(function (id) { return head.indexOf(id) === -1; });
    feedIds = head.concat(tailPool);
    updateProg();
  }
  function updateProg() {
    var i = feedIds.indexOf(activeId);
    $("prog").textContent = (i >= 0 ? i + 1 : "–") + " / " + feedIds.length;
    feedEl.querySelectorAll(".fc-index").forEach(function (el, k) {
      el.textContent = String(k + 1).padStart(2, "0") + " / " + feedIds.length;
    });
  }

  // ---------- 停留学习 ----------
  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting && en.intersectionRatio >= 0.6) setActive(en.target.dataset.id, false);
      });
    }, { root: feedEl, threshold: [0.6] });
  }
  function observeCards() {
    feedEl.querySelectorAll(".fcard:not(.obs)").forEach(function (el) {
      el.classList.add("obs");
      if (io) io.observe(el);
    });
  }
  function learnLeave(id, ms) {
    var a = byId(id); if (!a) return;
    profile.dwell[id] = (profile.dwell[id] || 0) + ms;
    seen[id] = (seen[id] || 0) + 1;
    if (ms < 1200) { profile.skips[id] = (profile.skips[id] || 0) + 1; bump(profile.cat, a.cat, -0.35); }
    else if (ms > 6000) { bump(profile.cat, a.cat, 0.8); bump(profile.brand, a.brand, 0.4); tagsOf(a).forEach(function (t) { bump(profile.tag, t, 0.3); }); }
    else { bump(profile.cat, a.cat, 0.15); }
    save(PROF_KEY, profile); save(SEEN_KEY, seen);
  }
  function setActive(id, force) {
    if (id === activeId && !force) return;
    if (activeId && activeSince) learnLeave(activeId, Date.now() - activeSince);
    activeId = id; activeSince = Date.now();
    feedEl.querySelectorAll(".fcard.live").forEach(function (c) { c.classList.remove("live"); });
    var cur = feedEl.querySelector('.fcard[data-id="' + id + '"]');
    if (cur) cur.classList.add("live");
    profile.swipes++; save(PROF_KEY, profile);
    updateProg();
    if (!hintDone && !force) { hintDone = true; save(HINT_KEY, true); $("hint").classList.add("gone"); }
    rebuildTail();
    if (rendered < feedIds.length && feedIds.indexOf(id) >= rendered - 2) renderMore();
  }

  // ---------- 滚动 / 键盘 / 双击 / 连刷 ----------
  feedEl.addEventListener("scroll", function () {
    lastInteract = Date.now();
    if (feedEl.scrollTop + feedEl.clientHeight * 2.4 > feedEl.scrollHeight) renderMore();
    SFX.swipe();
  }, { passive: true });
  function step(dir) {
    var i = feedIds.indexOf(activeId);
    var n = Math.max(0, Math.min(feedIds.length - 1, i + dir));
    var el = feedEl.querySelector('.fcard[data-id="' + feedIds[n] + '"]');
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); lastInteract = Date.now(); }
  }
  document.addEventListener("keydown", function (ev) {
    if (sheetOpen) { if (ev.key === "Escape") closeSheet(); return; }
    if (view !== "feed") return;
    if (ev.target.tagName === "INPUT" || ev.target.tagName === "SELECT" || ev.target.tagName === "TEXTAREA") return;
    if (ev.key === "ArrowDown" || ev.key === "PageDown" || ev.key === "j" || ev.key === " ") { ev.preventDefault(); step(1); }
    else if (ev.key === "ArrowUp" || ev.key === "PageUp" || ev.key === "k") { ev.preventDefault(); step(-1); }
    else if (ev.key === "l" && activeId) doLike(activeId, true);
    else if (ev.key === "g" && activeId) openGuide(activeId);
  });
  var lastTap = 0, lastTapId = null;
  feedEl.addEventListener("pointerdown", function (ev) {
    lastInteract = Date.now();
    if (ev.target.closest("button")) return;
    var card = ev.target.closest(".fcard"); if (!card) return;
    var now = Date.now();
    if (now - lastTap < 320 && lastTapId === card.dataset.id) { doLike(card.dataset.id, true); burst(card); lastTap = 0; }
    else { lastTap = now; lastTapId = card.dataset.id; }
  });
  function burst(card) {
    var b = card.querySelector(".burst"); if (!b) return;
    b.innerHTML = "";
    for (var i = 0; i < 7; i++) {
      var s = document.createElement("span");
      s.textContent = "♥";
      s.style.setProperty("--dx", (Math.random() * 160 - 80) + "px");
      s.style.setProperty("--dy", (-60 - Math.random() * 120) + "px");
      s.style.setProperty("--rt", (Math.random() * 80 - 40) + "deg");
      s.style.animationDelay = (i * 30) + "ms";
      b.appendChild(s);
    }
    setTimeout(function () { b.innerHTML = ""; }, 1100);
  }
  setInterval(function () {
    if (prefs.auto > 0 && view === "feed" && !sheetOpen && Date.now() - lastInteract > prefs.auto * 1000) {
      lastInteract = Date.now(); step(1);
    }
  }, 1000);

  // ---------- 动作 ----------
  function toast(msg, undoFn) {
    var box = $("toasts");
    while (box.children.length >= 3) box.removeChild(box.firstChild);
    var t = document.createElement("div"); t.className = "toast";
    var span = document.createElement("span"); span.textContent = msg; t.appendChild(span);
    var timer = null;
    function dismiss() { if (timer) clearTimeout(timer); t.classList.add("out"); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 240); }
    if (undoFn) {
      var b = document.createElement("button"); b.type = "button"; b.className = "undo"; b.textContent = "撤销";
      b.addEventListener("click", function () { undoFn(); dismiss(); });
      t.appendChild(b);
    }
    box.appendChild(t);
    timer = setTimeout(dismiss, 4500);
  }
  function setRecord(a, stateName) {
    var prev = records[a.id] ? { state: records[a.id].state, at: records[a.id].at } : null;
    if (stateName) records[a.id] = { state: stateName, at: Date.now() };
    else delete records[a.id];
    save(REC_KEY, records);
    return prev;
  }
  function advanceFrom(id) {
    var card = feedEl.querySelector('.fcard[data-id="' + id + '"]');
    var i = feedIds.indexOf(id);
    feedIds.splice(i, 1);
    if (card) {
      card.classList.add("leaving");
      setTimeout(function () { if (card.parentNode) card.parentNode.removeChild(card); rendered = Math.max(0, rendered - 1); renderMore(); updateProg(); }, 320);
    }
    var nextId = feedIds[Math.min(i, feedIds.length - 1)];
    if (nextId) {
      var el = feedEl.querySelector('.fcard[data-id="' + nextId + '"]');
      if (el) setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 60);
      setActive(nextId, true);
    } else rebuildFeed(true);
    updateProg();
  }
  function doJoin(id) {
    var a = byId(id); if (!a) return;
    var prev = setRecord(a, "joined");
    profile.joined++; bump(profile.cat, a.cat, 1.6); bump(profile.brand, a.brand, 0.9); tagsOf(a).forEach(function (t) { bump(profile.tag, t, 0.7); });
    save(PROF_KEY, profile);
    var card = feedEl.querySelector('.fcard[data-id="' + id + '"]');
    if (card) { var st = card.querySelector(".bigstamp"); st.innerHTML = "<b>已参加</b><i>JOINED</i>"; st.className = "bigstamp show join"; }
    SFX.join(); setTimeout(function () { SFX.stamp(); }, 120);
    setTimeout(function () { advanceFrom(id); }, 420);
    toast("已记录「" + a.brand + "」参加 · 自动隐藏进记录", function () {
      if (prev) records[a.id] = prev; else delete records[a.id];
      save(REC_KEY, records); profile.joined = Math.max(0, profile.joined - 1); save(PROF_KEY, profile);
      rebuildFeed(false); renderHistory(); updateRecPill();
    });
    renderHistory(); updateRecPill(); rebuildTail();
  }
  function doVoid(id) {
    var a = byId(id); if (!a) return;
    var prev = setRecord(a, "invalid");
    profile.voided++; bump(profile.cat, a.cat, -0.8);
    save(PROF_KEY, profile);
    var card = feedEl.querySelector('.fcard[data-id="' + id + '"]');
    if (card) { var st = card.querySelector(".bigstamp"); st.innerHTML = "<b>无效</b><i>VOID</i>"; st.className = "bigstamp show void"; }
    SFX.nope(); setTimeout(function () { SFX.stamp(); }, 100);
    setTimeout(function () { advanceFrom(id); }, 420);
    toast("已标记「" + a.brand + "」无效 · 归档进记录", function () {
      if (prev) records[a.id] = prev; else delete records[a.id];
      save(REC_KEY, records); profile.voided = Math.max(0, profile.voided - 1); save(PROF_KEY, profile);
      rebuildFeed(false); renderHistory(); updateRecPill();
    });
    renderHistory(); updateRecPill(); rebuildTail();
  }
  function doNope(id) {
    var a = byId(id); if (!a) return;
    profile.dislike[id] = (profile.dislike[id] || 0) + 1;
    bump(profile.cat, a.cat, -1.4); bump(profile.brand, a.brand, -1.0); tagsOf(a).forEach(function (t) { bump(profile.tag, t, -0.6); });
    save(PROF_KEY, profile);
    SFX.nope();
    advanceFrom(id);
    toast("将减少「" + (CAT_LABEL[a.cat] || a.cat) + " · " + a.brand + "」类推荐", function () {
      delete profile.dislike[id]; bump(profile.cat, a.cat, 1.4); bump(profile.brand, a.brand, 1.0);
      save(PROF_KEY, profile); rebuildFeed(false);
    });
    rebuildTail();
  }
  function doLike(id, forceOn) {
    var a = byId(id); if (!a) return;
    var on = forceOn ? true : !likes[id];
    if (on) { likes[id] = 1; profile.liked++; bump(profile.cat, a.cat, 1.0); bump(profile.brand, a.brand, 0.5); tagsOf(a).forEach(function (t) { bump(profile.tag, t, 0.5); }); }
    else { delete likes[id]; profile.liked = Math.max(0, profile.liked - 1); bump(profile.cat, a.cat, -0.6); }
    save(LIKE_KEY, likes); save(PROF_KEY, profile);
    var btn = feedEl.querySelector('.rail.like[data-id="' + id + '"]');
    if (btn) { btn.classList.toggle("on", on); btn.querySelector("b").textContent = on ? 1 : 0; }
    if (on) SFX.heart(); else SFX.ui();
    rebuildTail();
  }
  function doShare(id) {
    var a = byId(id); if (!a) return;
    var text = "【刷羊毛】" + a.brand + " · " + a.title + "（≈¥" + a.value + "，零成本）\n入口：" + a.entry + "\n攻略：" + a.steps.join(" → ");
    function done() { toast("已复制「" + a.brand + "」入口与攻略"); SFX.ui(); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta);
      ta.select(); try { document.execCommand("copy"); done(); } catch (e) { toast("复制失败，请手动选择入口文本"); }
      document.body.removeChild(ta);
    }
  }

  // ---------- 抽屉：攻略 / 推荐解释 ----------
  function openSheet(html) {
    $("sheet-body").innerHTML = html;
    $("sheet").hidden = false; $("sheet-scrim").hidden = false;
    requestAnimationFrame(function () { $("sheet").classList.add("open"); $("sheet-scrim").classList.add("open"); });
    sheetOpen = true; lastInteract = Date.now();
  }
  function closeSheet() {
    $("sheet").classList.remove("open"); $("sheet-scrim").classList.remove("open");
    setTimeout(function () { $("sheet").hidden = true; $("sheet-scrim").hidden = true; }, 260);
    sheetOpen = false; lastInteract = Date.now();
  }
  $("sheet-close").addEventListener("click", closeSheet);
  $("sheet-scrim").addEventListener("click", closeSheet);
  function openGuide(id) {
    var a = byId(id); if (!a) return;
    var srcs = (a.sources || []).filter(function (s) { return s.u; }).map(function (s) {
      return '<a href="' + esc(s.u) + '" target="_blank" rel="noopener noreferrer">' + esc(s.t) + "</a>";
    }).join(" · ");
    openSheet(
      '<div class="sh-head"><span class="monogram" style="--cat:var(--c-' + esc(a.cat) + ')">' + esc(a.brand.charAt(0)) + "</span>" +
      '<div><b class="brand">' + esc(a.brand) + "</b>" + confHTML(a.conf || 1) + '<h3>' + esc(a.title) + "</h3></div>" +
      '<span class="valbig">≈¥' + (a.value || 0) + "</span></div>" +
      '<p class="sh-reward">' + esc(a.reward) + "</p>" +
      '<p class="sh-entry">入口 · <b>' + esc(a.entry) + "</b></p>" +
      '<ol class="sh-steps">' + a.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
      '<p class="sh-line">时间 · ' + esc(a.schedule || "见活动页") + (a.deadline ? " · " + esc(fmtDate(a.deadline)) + " 截止" : "") + "</p>" +
      (a.note ? '<p class="sh-warn">' + esc(a.note) + "</p>" : "") +
      (srcs ? '<p class="sh-srcs">来源 · ' + srcs + "</p>" : "") +
      '<div class="sh-acts"><button type="button" class="btn join" data-act="join" data-id="' + esc(a.id) + '">已参加 · 归档</button>' +
      '<button type="button" class="btn void" data-act="void" data-id="' + esc(a.id) + '">无效</button>' +
      '<button type="button" class="btn" data-act="share" data-id="' + esc(a.id) + '">复制入口</button></div>'
    );
    SFX.ui();
  }
  function openWhy(id) {
    var a = byId(id); if (!a) return;
    var p = parts(a);
    var rows = [
      ["价值 log₁₀(¥" + a.value + ")", p.value, prefs.value],
      ["截止紧迫", p.urgent, prefs.urgent],
      ["新鲜度（未刷过加权）", p.fresh, prefs.fresh],
      ["可信度 ★" + a.conf, p.conf, 0.8],
      ["画像亲和（类目/品牌/标签）", p.aff, 1.4],
      ["疲劳惩罚（快划/不感兴趣）", p.fat, 1],
      ["收藏加成", p.like, 1]
    ];
    var top = Object.keys(profile.cat).sort(function (x, y) { return profile.cat[y] - profile.cat[x]; }).slice(0, 3)
      .map(function (k) { return (CAT_LABEL[k] || k) + " " + profile.cat[k].toFixed(1); }).join(" · ") || "尚未形成偏好";
    openSheet(
      '<div class="sh-head"><div><b class="brand">为什么推荐这条</b><h3>' + esc(a.brand + " · " + a.title) + "</h3></div>" +
      '<span class="valbig">' + score(a).toFixed(2) + "</span></div>" +
      '<p class="sh-reward">推荐分 = Σ(特征 × 权重) − 疲劳 + 收藏加成；每刷一条都会在线更新你的类目/品牌/标签亲和度，ε-greedy 保留 ' + Math.round(prefs.explore * 100) + '% 探索，多样性约束避免连刷同类。</p>' +
      '<div class="why-rows">' + rows.map(function (r) {
        var w = Math.max(-2, Math.min(2.5, r[1]));
        return '<div class="why-row"><span>' + esc(r[0]) + '</span><i class="' + (w < 0 ? "neg" : "") + '" style="width:' + Math.abs(w) / 2.5 * 100 + '%"></i><b>' + r[1].toFixed(2) + "</b></div>";
      }).join("") + "</div>" +
      '<p class="sh-line">当前画像 Top：' + esc(top) + "</p>" +
      '<p class="sh-line">已刷 ' + profile.swipes + ' 条 · 收藏 ' + profile.liked + ' · 参加 ' + profile.joined + ' · 无效 ' + profile.voided + "</p>" +
      '<div class="sh-acts"><button type="button" class="btn" data-go="profile">查看完整画像</button>' +
      '<button type="button" class="btn" data-act="nope" data-id="' + esc(a.id) + '">不感兴趣</button></div>'
    );
    SFX.ui();
  }

  // ---------- 视图切换 ----------
  function setView(name) {
    view = name;
    document.querySelectorAll(".view").forEach(function (v) { v.classList.toggle("active", v.id === "view-" + name); });
    document.querySelectorAll(".tabbar .tab").forEach(function (t) { t.classList.toggle("active", t.dataset.view === name); });
    document.body.dataset.view = name;
    if (name === "history") renderHistory();
    if (name === "cats") renderCats();
    if (name === "profile") renderProfile();
    if (name === "feed") { lastInteract = Date.now(); if (activeId) activeSince = Date.now(); }
    SFX.ui();
  }
  document.querySelectorAll(".tabbar .tab").forEach(function (t) {
    t.addEventListener("click", function () { setView(t.dataset.view); });
  });
  $("rec-btn").addEventListener("click", function () { setView("history"); });
  $("logo").addEventListener("click", function (ev) { ev.preventDefault(); setView("feed"); feedEl.scrollTop = 0; });
  document.querySelectorAll(".htab").forEach(function (t) {
    t.addEventListener("click", function () {
      mode = t.dataset.mode;
      document.querySelectorAll(".htab").forEach(function (x) { x.classList.toggle("active", x === t); x.setAttribute("aria-selected", x === t ? "true" : "false"); });
      rebuildFeed(true); SFX.ui();
    });
  });

  // ---------- 分类视图 ----------
  var catState = { cat: "all", q: "", sort: "rec" };
  function renderCatChips() {
    $("cat-chips").innerHTML = CATS.map(function (c) {
      return '<button class="chipbtn" type="button" data-val="' + c.id + '" aria-pressed="' + (catState.cat === c.id) + '">' + esc(c.label) + "</button>";
    }).join("");
  }
  function catList() {
    var q = catState.q.trim().toLowerCase();
    var list = window.ACTIVITIES.filter(onShelf).filter(function (a) {
      if (catState.cat !== "all" && a.cat !== catState.cat) return false;
      if (q && (a.title + a.brand + a.reward + a.entry + tagsOf(a).join(" ")).toLowerCase().indexOf(q) === -1) return false;
      return true;
    });
    if (catState.sort === "value") list.sort(function (x, y) { return (y.value || 0) - (x.value || 0); });
    else if (catState.sort === "deadline") list.sort(function (x, y) { return (x.deadline || "9999").localeCompare(y.deadline || "9999"); });
    else if (catState.sort === "conf") list.sort(function (x, y) { return (y.conf || 0) - (x.conf || 0); });
    else list.sort(function (x, y) { return score(y) - score(x); });
    return list;
  }
  function renderCats() {
    renderCatChips();
    var list = catList();
    var srcN = window.ACTIVITIES.reduce(function (n, a) { return n + (a.sources || []).length; }, 0);
    $("cat-count").textContent = "在架 " + window.ACTIVITIES.filter(onShelf).length + " 条 · 聚合 " + srcN + " 来源 · 显示 " + list.length + " 条";
    $("cat-empty").hidden = list.length > 0;
    $("cat-grid").innerHTML = list.map(function (a) {
      return '<button class="mini" type="button" data-jump="' + esc(a.id) + '" style="--cat:var(--c-' + esc(a.cat) + ')">' +
        '<span class="monogram">' + esc(a.brand.charAt(0)) + "</span>" +
        '<span class="mini-main"><b>' + esc(a.brand) + '</b><h3>' + esc(a.title) + "</h3>" +
        '<span class="mini-meta"><span class="valbig sm">≈¥' + (a.value || 0) + "</span>" + deadlineChip(a) + '<span class="chip">' + esc(CAT_LABEL[a.cat] || "") + "</span></span></span>" +
        '<span class="mini-score" title="推荐分">' + score(a).toFixed(1) + "</span></button>";
    }).join("");
  }
  $("cat-chips").addEventListener("click", function (ev) {
    var c = ev.target.closest(".chipbtn"); if (!c) return;
    catState.cat = c.dataset.val; renderCats(); SFX.ui();
  });
  $("cat-search").addEventListener("input", function (ev) { catState.q = ev.target.value; renderCats(); });
  $("cat-sort").addEventListener("change", function (ev) { catState.sort = ev.target.value; renderCats(); });
  $("cat-grid").addEventListener("click", function (ev) {
    var m = ev.target.closest("[data-jump]"); if (!m) return;
    var id = m.dataset.jump;
    feedIds = [id].concat(buildOrder().filter(function (x) { return x !== id; }));
    rendered = 0; feedEl.innerHTML = ""; renderMore();
    setView("feed"); feedEl.scrollTop = 0; setActive(id, true); updateProg();
  });

  // ---------- 记录视图 ----------
  var histState = "all";
  function historyEntries() {
    var list = [];
    window.ACTIVITIES.forEach(function (a) {
      var r = recOf(a), ex = expiryInfo(a);
      if (r) list.push({ a: a, state: r.state, at: r.at || Date.now(), auto: false, expired: ex.expired, reason: r.state === "invalid" ? "手动标记无效" : (ex.expired ? ex.reason : "") });
      else if (ex.expired) list.push({ a: a, state: "invalid", at: ex.at, auto: true, expired: true, reason: ex.reason });
    });
    return list.sort(function (x, y) { return y.at - x.at; });
  }
  function updateRecPill() { $("rec-count").textContent = historyEntries().length; }
  function renderHistory() {
    var entries = historyEntries();
    var nJ = entries.filter(function (e) { return e.state === "joined"; }).length;
    var tabs = [{ id: "all", label: "全部 " + entries.length }, { id: "joined", label: "已参加 " + nJ }, { id: "invalid", label: "无效 " + (entries.length - nJ) }];
    $("hist-chips").innerHTML = tabs.map(function (t) {
      return '<button class="chipbtn" type="button" data-hval="' + t.id + '" aria-pressed="' + (histState === t.id) + '">' + esc(t.label) + "</button>";
    }).join("");
    $("hist-count").textContent = "已参加 " + nJ + " · 无效 " + (entries.length - nJ) + " · 过期自动归档";
    updateRecPill();
    var list = histState === "all" ? entries : entries.filter(function (e) { return e.state === histState; });
    $("hist-empty").hidden = list.length > 0;
    $("hist-list").innerHTML = list.map(function (e) {
      var a = e.a;
      var stamp = e.auto ? "<b>已过期</b><i>EXPIRED</i>" : (e.state === "joined" ? "<b>已参加</b><i>JOINED</i>" : "<b>无效</b><i>VOID</i>");
      return '<article class="hist-item ' + e.state + (e.auto ? " auto" : "") + '" data-hid="' + esc(a.id) + '" style="--cat:var(--c-' + esc(a.cat) + ')">' +
        '<span class="stamp" aria-hidden="true">' + stamp + "</span>" +
        '<span class="monogram">' + esc(a.brand.charAt(0)) + "</span>" +
        '<div class="h-main"><div class="h-top"><b class="brand">' + esc(a.brand) + "</b>" +
        '<span class="h-state ' + e.state + '">' + (e.state === "joined" ? "已参加" : "无效") + "</span>" +
        (e.auto ? '<span class="h-auto">自动判定</span>' : "") +
        '<span class="valbig sm">≈¥' + (a.value || 0) + "</span>" +
        '<span class="h-time">' + esc(fmtTime(e.at)) + "</span></div>" +
        "<h3>" + esc(a.title) + "</h3>" +
        '<p class="reward">' + esc(a.reward) + "</p>" +
        (e.reason ? '<p class="h-reason">' + esc(e.reason) + "</p>" : "") +
        '<button class="linkbtn" type="button" data-act="guide" data-id="' + esc(a.id) + '">展开攻略 · ' + a.steps.length + " 步</button></div>" +
        '<div class="h-acts">' + (e.auto ? '<span class="h-lock">自动归档</span>' : '<button class="hist-del" type="button" data-del="' + esc(a.id) + '">删除</button>') + "</div>" +
        "</article>";
    }).join("");
  }
  $("hist-chips").addEventListener("click", function (ev) {
    var c = ev.target.closest(".chipbtn"); if (!c) return;
    histState = c.dataset.hval; renderHistory(); SFX.ui();
  });
  $("hist-list").addEventListener("click", function (ev) {
    var del = ev.target.closest("[data-del]");
    if (del) {
      var a = byId(del.dataset.del); if (!a) return;
      var prev = setRecord(a, null);
      if (prev && prev.state === "joined") profile.joined = Math.max(0, profile.joined - 1);
      if (prev && prev.state === "invalid") profile.voided = Math.max(0, profile.voided - 1);
      save(PROF_KEY, profile);
      renderHistory(); rebuildFeed(false);
      toast("已删除「" + a.brand + "」的记录 · 回到 feed", function () {
        records[a.id] = prev; save(REC_KEY, records); renderHistory(); rebuildFeed(false);
      });
      SFX.ui();
    }
  });

  // ---------- 画像视图 ----------
  function bars(map, labelFn, n) {
    var keys = Object.keys(map).sort(function (x, y) { return map[y] - map[x]; }).slice(0, n);
    if (!keys.length) return '<p class="sh-line">还没有数据 · 去刷几条吧。</p>';
    var max = Math.max.apply(null, keys.map(function (k) { return Math.abs(map[k]); }).concat([1]));
    return keys.map(function (k) {
      var v = map[k], w = Math.abs(v) / max * 100;
      return '<div class="why-row"><span>' + esc(labelFn(k)) + '</span><i class="' + (v < 0 ? "neg" : "") + '" style="width:' + w + '%"></i><b>' + v.toFixed(1) + "</b></div>";
    }).join("");
  }
  function renderProfile() {
    var dwellVals = Object.keys(profile.dwell).map(function (k) { return profile.dwell[k]; });
    var avg = dwellVals.length ? Math.round(dwellVals.reduce(function (a, b) { return a + b; }, 0) / dwellVals.length / 1000 * 10) / 10 : 0;
    var fatN = Object.keys(profile.skips).length + Object.keys(profile.dislike).length;
    $("prof-body").innerHTML =
      '<div class="prof-stats">' +
      '<div class="pstat"><b>' + profile.swipes + "</b><span>刷过</span></div>" +
      '<div class="pstat jade"><b>' + profile.liked + "</b><span>收藏</span></div>" +
      '<div class="pstat jade"><b>' + profile.joined + "</b><span>参加</span></div>" +
      '<div class="pstat verm"><b>' + profile.voided + "</b><span>无效</span></div>" +
      '<div class="pstat"><b>' + avg + "s</b><span>平均停留</span></div>" +
      "</div>" +
      '<div class="prof-grid">' +
      '<section><h3>类目亲和度</h3>' + bars(profile.cat, function (k) { return CAT_LABEL[k] || k; }, 10) + "</section>" +
      '<section><h3>品牌亲和度</h3>' + bars(profile.brand, function (k) { return k; }, 8) + "</section>" +
      '<section><h3>标签亲和度</h3>' + bars(profile.tag, function (k) { return "#" + k; }, 10) + "</section>" +
      '<section><h3>算法说明</h3><p class="sh-line">推荐分 = 价值×' + prefs.value.toFixed(1) + " + 紧迫×" + prefs.urgent.toFixed(1) + " + 新鲜×" + prefs.fresh.toFixed(1) + " + 可信×0.8 + 亲和×1.4 − 疲劳 + 收藏×0.6。</p>" +
      '<p class="sh-line">停留 &lt;1.2s 记快划（−0.35 类目），&gt;6s 记深读（+0.8 类目 +0.4 品牌 +0.3 标签）；收藏 +1.0、参加 +1.6、无效 −0.8、不感兴趣 −1.4。ε-greedy 探索 ' + Math.round(prefs.explore * 100) + "%，连续同类目惩罚 " + prefs.diverse.toFixed(1) + "。</p>" +
      '<p class="sh-line">疲劳名单 ' + fatN + ' 条 · 全部数据只存本机 localStorage。</p>' +
      '<div class="sh-acts"><button type="button" class="btn" data-go="clearfatigue">清除疲劳名单</button><button type="button" class="btn" data-go="reset">重置画像</button></div></section>' +
      "</div>";
  }

  // ---------- 全局点击委托 ----------
  document.addEventListener("click", function (ev) {
    var go = ev.target.closest("[data-go]");
    if (go) {
      var g = go.dataset.go;
      if (g === "history") setView("history");
      else if (g === "profile") { closeSheet(); setView("profile"); }
      else if (g === "reset") resetProfile();
      else if (g === "clearfatigue") { profile.skips = {}; profile.dislike = {}; save(PROF_KEY, profile); renderProfile(); rebuildTail(); toast("已清除疲劳名单"); }
      return;
    }
    var act = ev.target.closest("[data-act]");
    if (!act) return;
    var id = act.dataset.id, kind = act.dataset.act;
    if (kind === "like") doLike(id, false);
    else if (kind === "guide") openGuide(id);
    else if (kind === "why") openWhy(id);
    else if (kind === "join") { closeSheet(); doJoin(id); }
    else if (kind === "void") { closeSheet(); doVoid(id); }
    else if (kind === "nope") { closeSheet(); doNope(id); }
    else if (kind === "share") doShare(id);
  });

  // ---------- 调校 dock ----------
  function bindRange(id, out, key, fmt) {
    var el = $(id);
    el.value = prefs[key];
    $(out).textContent = fmt(prefs[key]);
    el.addEventListener("input", function () {
      prefs[key] = parseFloat(el.value);
      $(out).textContent = fmt(prefs[key]);
      save(PREF_KEY, prefs);
      rebuildTail();
      if (view === "cats") renderCats();
      if (view === "profile") renderProfile();
    });
  }
  var f1 = function (v) { return v.toFixed(1); };
  bindRange("w-value", "o-value", "value", f1);
  bindRange("w-urgent", "o-urgent", "urgent", f1);
  bindRange("w-fresh", "o-fresh", "fresh", f1);
  bindRange("w-explore", "o-explore", "explore", function (v) { return Math.round(v * 100) + "%"; });
  bindRange("w-diverse", "o-diverse", "diverse", f1);
  function autoLabel() { $("auto-val").textContent = prefs.auto ? prefs.auto + "s" : "关"; }
  $("auto-minus").addEventListener("click", function () { prefs.auto = Math.max(0, prefs.auto - 3); save(PREF_KEY, prefs); autoLabel(); SFX.ui(); });
  $("auto-plus").addEventListener("click", function () { prefs.auto = Math.min(30, (prefs.auto || 0) + 3); save(PREF_KEY, prefs); autoLabel(); SFX.ui(); });
  autoLabel();
  $("density").value = prefs.density;
  document.documentElement.dataset.density = prefs.density;
  $("density").addEventListener("change", function () {
    prefs.density = $("density").value;
    document.documentElement.dataset.density = prefs.density;
    save(PREF_KEY, prefs); SFX.ui();
  });
  function setSound(on) {
    prefs.sound = on; save(PREF_KEY, prefs); save(SND_KEY, on);
    $("dock-sound").checked = on;
    $("snd-btn").setAttribute("aria-label", on ? "关闭音效" : "开启音效");
    $("snd-icon").innerHTML = on
      ? '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>'
      : '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="m16 9 5 6M21 9l-5 6"/>';
    if (on) SFX.ui();
  }
  $("snd-btn").addEventListener("click", function () { setSound(!prefs.sound); });
  $("dock-sound").addEventListener("change", function () { setSound($("dock-sound").checked); });
  var SUN = '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  function setTheme(t) {
    prefs.theme = t; save(PREF_KEY, prefs); save(THEME_KEY, t);
    document.documentElement.dataset.theme = t;
    $("dock-theme").checked = t === "dark";
    $("theme-icon").innerHTML = t === "dark" ? MOON : SUN;
    $("theme-btn").setAttribute("aria-label", t === "dark" ? "切换到昼间白纸朱砂主题" : "切换到夜间墨色主题");
    $("meta-theme").setAttribute("content", t === "dark" ? "#141110" : "#f8f6f1");
  }
  $("theme-btn").addEventListener("click", function () { setTheme(prefs.theme === "dark" ? "light" : "dark"); SFX.ui(); });
  $("dock-theme").addEventListener("change", function () { setTheme($("dock-theme").checked ? "dark" : "light"); });
  function resetProfile() {
    profile = { cat: {}, brand: {}, tag: {}, dwell: {}, skips: {}, dislike: {}, swipes: 0, joined: 0, voided: 0, liked: 0 };
    seen = {}; save(PROF_KEY, profile); save(SEEN_KEY, seen);
    rebuildFeed(true);
    if (view === "profile") renderProfile();
    toast("画像已重置 · 重新开始学习");
  }
  $("reset-profile").addEventListener("click", resetProfile);
  $("random-batch").addEventListener("click", function () {
    seed = Math.random(); seedBoost = 0.25;
    rebuildFeed(true);
    setTimeout(function () { seedBoost = 0; }, 0);
    toast("已换一批 · 探索率临时 +25%");
    SFX.swipe();
  });
  $("export-prefs").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify({ app: "刷羊毛", exportedAt: new Date().toISOString(), prefs: prefs, profile: profile, likes: likes, records: records }, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "刷羊毛-偏好与画像.json";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast("已导出偏好与画像 JSON");
  });

  // ---------- 时钟 / 过期巡检 ----------
  var expirySig = window.ACTIVITIES.map(function (a) { return expiryInfo(a).expired ? 1 : 0; }).join("");
  function tick() {
    window.ACTIVITIES.forEach(function (a) {
      var el = document.getElementById("cd-" + a.id);
      if (!el) return;
      if (a.today && a.todayDeadline && isVerifiedDay) {
        var secs = Math.max(0, Math.round((minutes(a.todayDeadline) - nowMinutes()) * 60));
        var h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
        el.textContent = "剩 " + String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0") + " · 今天 " + a.todayDeadline + " 截止";
      }
    });
    var sig = window.ACTIVITIES.map(function (a) { return expiryInfo(a).expired ? 1 : 0; }).join("");
    if (sig !== expirySig) {
      expirySig = sig;
      rebuildFeed(false); renderHistory();
      if (view === "cats") renderCats();
      toast("有时点过期 · 已自动归档进记录");
    }
  }
  setInterval(tick, 1000);

  // ---------- 启动 ----------
  setTheme(load(THEME_KEY, prefs.theme) === "dark" ? "dark" : "light");
  setSound(load(SND_KEY, prefs.sound) !== false);
  if (hintDone) $("hint").classList.add("gone");
  document.body.dataset.view = "feed";
  rebuildFeed(true);
  renderHistory();
  tick();
})();
