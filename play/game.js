'use strict';
(() => {
  const SITE = 'https://jonghyunseo.github.io/pic-cut-releases/';
  const PLAY = `${SITE}play/`;
  const code = document.body.dataset.challenge;
  const validCode = value => /^[abc]{3}$/.test(value);
  const friend = validCode(code) ? [...code] : null;
  const photos = [
    ['photo-1.webp', '눈을 살짝 감은 강아지'], ['photo-2.webp', '고개를 기울인 강아지'],
    ['photo-3.webp', '옆을 바라보는 강아지'], ['photo-4.webp', '입을 벌리고 웃는 강아지']
  ];
  const pairs = [[1, 3], [0, 2], [2, 3]];
  const labels = ['고개 갸웃 vs 해맑은 표정', '느긋하게 vs 호기심 가득', '어느 순간도 놓치기 싫다면'];
  const q = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const key = `piccut-pick-dog1-${code || 'solo'}`;
  let picks = [], round = 0, view = 'play', shareData = null, advancing = false;
  try {
    const saved = JSON.parse(sessionStorage.getItem(key));
    if (saved && Array.isArray(saved.picks) && saved.picks.length <= 3 && saved.picks.every(p => /^[abc]$/.test(p))) {
      picks = saved.picks;
      round = Math.min(picks.length, 2);
      if (picks.length === 3) view = 'result';
    }
  } catch { /* Storage is optional. */ }
  if (friend) q('#intro').innerHTML = '친구의 선택은 마지막에 공개돼요.<br>먼저 내 취향대로 골라보세요.';
  function persist() { try { sessionStorage.setItem(key, JSON.stringify({ picks })); } catch { /* Continue without storage. */ } }
  function setImage(img, id) { img.src = `/pic-cut-releases/assets/${photos[id][0]}`; img.alt = photos[id][1]; }
  function selectedIds(choice, index) { return choice === 'c' ? pairs[index] : [pairs[index][choice === 'a' ? 0 : 1]]; }
  function figure(choice, index, captionText) {
    const el = document.createElement('figure'), thumbs = document.createElement('div'), caption = document.createElement('figcaption');
    thumbs.className = 'thumbs' + (choice === 'c' ? ' two' : '');
    selectedIds(choice, index).forEach(id => { const img = document.createElement('img'); setImage(img, id); img.width = 543; img.height = 724; thumbs.append(img); });
    caption.textContent = captionText; el.append(thumbs, caption); return el;
  }
  function show(next, focus = true) {
    view = next;
    ['play', 'result', 'install'].forEach(id => q(`#${id}`).hidden = id !== view);
    if (focus) { q(`#${view}-heading`).focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: 'instant' }); }
  }
  function renderPlay() {
    setImage(q('#photo-a'), pairs[round][0]); setImage(q('#photo-b'), pairs[round][1]);
    q('#round-name').textContent = labels[round]; q('#round-count').textContent = `0${round + 1} / 03`;
    all('.progress i').forEach((el, i) => el.classList.toggle('active', i <= round));
    all('[data-pick]').forEach(el => { el.setAttribute('aria-pressed', String(picks[round] === el.dataset.pick)); el.disabled = false; });
    q('#previous').disabled = round === 0;
  }
  function renderResult() {
    if (picks.length !== 3) return;
    const mine = q('#my-picks'); mine.replaceChildren();
    picks.forEach((p, i) => mine.append(figure(p, i, `${i + 1}번째 · ${p === 'c' ? '둘 다' : p.toUpperCase()} 남김`)));
    q('#friend-result').hidden = !friend; mine.hidden = !!friend;
    if (!friend) return;
    const matches = picks.map((p, i) => p === friend[i]), count = matches.filter(Boolean).length;
    q('#result-eyebrow').textContent = '친구와 나, 선택 공개';
    q('#result-heading').textContent = ['같은 순간, 다른 취향.', '우리, 여기선 통했네.', '우리, 은근 통하네.', '우리, 전부 통했네.'][count];
    q('#result-intro').textContent = '같은 사진을 보고 우리가 남긴 순간들.';
    q('#score').textContent = String(count);
    q('#score-description').textContent = count === 0 ? '세 장면 모두, 서로 다른 선택을 했어요.' : `세 번 중 ${['', '한 번', '두 번', '세 번 모두'][count]}, 같은 사진을 골랐어요.`;
    q('#match-list').replaceChildren();
    matches.forEach((same, i) => { const el = document.createElement('span'); el.textContent = `${i + 1} · ${same ? '같은 픽' : '다른 픽'}`; if (same) el.className = 'same'; q('#match-list').append(el); });
    const different = matches.map((same, i) => same ? -1 : i).filter(i => i >= 0);
    q('#difference-heading').textContent = different.length ? '여기서 취향이 갈렸어요.' : '이 순간도 같이 골랐어요.';
    q('#differences').replaceChildren();
    (different.length ? different : [0]).forEach(i => {
      const el = document.createElement('div'), name = document.createElement('p'), row = document.createElement('div');
      el.className = 'difference'; name.textContent = `${i + 1}번째 순간`; row.className = 'photo-pair';
      row.append(figure(picks[i], i, `나 · ${picks[i] === 'c' ? '둘 다' : picks[i].toUpperCase()}`), figure(friend[i], i, `친구 · ${friend[i] === 'c' ? '둘 다' : friend[i].toUpperCase()}`));
      el.append(name, row); q('#differences').append(el);
    });
    q('#share-picks').textContent = '내 픽으로 새 도전 보내기 ↗';
  }
  all('[data-pick]').forEach(el => el.addEventListener('click', () => {
    if (advancing) return;
    advancing = true; picks[round] = el.dataset.pick; persist();
    all('[data-pick]').forEach(button => { button.disabled = true; button.setAttribute('aria-pressed', String(button === el)); });
    setTimeout(() => {
      if (round < 2) { round++; renderPlay(); q('#announcement').textContent = `${round + 1}번째 사진입니다. ${labels[round]}`; }
      else { renderResult(); show('result'); }
      advancing = false;
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 180);
  }));
  q('#previous').addEventListener('click', () => { if (advancing) return; round = Math.max(0, round - 1); renderPlay(); });
  q('#restart').addEventListener('click', () => { picks = []; round = 0; persist(); renderPlay(); show('play'); });
  ['a', 'b'].forEach((letter, i) => q(`#zoom-${letter}`).addEventListener('click', () => { setImage(q('#zoom-image'), pairs[round][i]); q('#zoom').showModal(); }));
  all('[data-install]').forEach(el => el.addEventListener('click', () => show('install')));
  q('#back-result').addEventListener('click', () => show(picks.length === 3 ? 'result' : 'play'));
  if (!/Android/i.test(navigator.userAgent)) q('#platform-note').hidden = false;
  function syncShareLinks() {
    const text = q('#share-text').value.slice(0, 500);
    q('#share-x').href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareData.url)}`;
    q('#share-facebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
  }
  function openShare(withPicks) {
    const personal = withPicks && picks.length === 3;
    shareData = { url: personal ? `${PLAY}dog1/${picks.join('')}/` : PLAY, title: '너랑 나랑, 몇 개나 같은 픽?' };
    q('#share-heading').textContent = personal ? '친구는 어떤 컷일까?' : '고르는 재미, 같이 해요.';
    q('#share-description').textContent = personal ? '내 선택이 담긴 링크예요. 친구가 먼저 고른 뒤 나와 비교해요. 이 링크로 새 도전이 시작돼요.' : '설치 없이 세 번만 고르면 돼요. 사진 고르기 좋아하는 친구에게 보내보세요.';
    q('#share-text').value = personal ? '이거 은근 고민됨ㅋㅋ\n너랑 나랑 몇 개나 같은 사진 고를까?' : '같은 순간, 다른 픽.\n너라면 어떤 사진을 남길래?';
    q('#share-url').value = shareData.url; q('#share-status').textContent = ''; syncShareLinks(); q('#share').showModal();
  }
  q('#share-picks').addEventListener('click', () => openShare(true));
  q('#share-game').addEventListener('click', () => openShare(false));
  q('#share-text').addEventListener('input', syncShareLinks);
  async function copy(text, message) {
    try { await navigator.clipboard.writeText(text); q('#share-status').textContent = message; }
    catch { q('#share-status').textContent = '자동 복사가 안 돼요. 아래 링크를 선택했으니 직접 복사해 주세요.'; q('#share-url').focus(); q('#share-url').select(); }
  }
  q('#copy-link').addEventListener('click', () => copy(shareData.url, '링크를 복사했어요. 카카오톡이나 게시글에 붙여 넣으세요.'));
  q('#copy-message').addEventListener('click', () => copy(`${q('#share-text').value}\n${shareData.url}`, '문구와 링크를 복사했어요. 원하는 곳에 붙여 넣으세요.'));
  q('#share-native').addEventListener('click', async () => {
    if (!navigator.share) { await copy(shareData.url, '링크를 복사했어요. 카카오톡 대화창에 붙여 넣으세요.'); return; }
    try { await navigator.share({ title: shareData.title, text: q('#share-text').value, url: shareData.url }); q('#share-status').textContent = '공유창을 닫았어요. 필요하면 다른 친구에게도 보내보세요.'; }
    catch (error) { q('#share-status').textContent = error.name === 'AbortError' ? '공유를 취소했어요. 선택은 그대로예요.' : '이 브라우저에서는 공유창을 열 수 없어요. 링크 복사를 이용해 주세요.'; }
  });
  fetch('/pic-cut-releases/release.json').then(response => { if (!response.ok) throw new Error('metadata'); return response.json(); }).then(release => {
    const prefix = 'https://github.com/jonghyunseo/pic-cut-releases/releases/download/';
    if (typeof release.apkUrl !== 'string' || typeof release.checksumUrl !== 'string' || !release.apkUrl.startsWith(prefix) || !release.checksumUrl.startsWith(prefix) || !/^v\d+\.\d+\.\d+$/.test(release.tag) || !Number.isFinite(release.bytes) || release.bytes <= 0) return;
    q('#apk').href = release.apkUrl; q('#checksum').href = release.checksumUrl; q('#release-version').textContent = release.tag; q('#release-size').textContent = `${(release.bytes / 1000000).toFixed(1)} MB`;
  }).catch(() => { /* Embedded verified release remains usable. */ });
  renderPlay(); if (view === 'result') renderResult(); show(view, false);
})();
