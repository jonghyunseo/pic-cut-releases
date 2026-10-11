'use strict';
const source = 'https://github.com/jonghyunseo/pic-cut-releases';
const tiles = [...document.querySelectorAll('.photo-tile')];
tiles.forEach(tile => tile.addEventListener('click', () => {
  tile.setAttribute('aria-pressed', String(tile.getAttribute('aria-pressed') !== 'true'));
  document.querySelector('#pick-count').textContent = tiles.filter(t => t.getAttribute('aria-pressed') === 'true').length;
}));
const comparison = document.querySelector('#comparison');
const range = document.querySelector('#wipe-range');
range.addEventListener('input', () => {
  comparison.style.setProperty('--position', `${range.value}%`);
  range.setAttribute('aria-valuetext', `사진 A ${range.value}%, 사진 B ${100 - Number(range.value)}%`);
});
document.querySelectorAll('[data-mode]').forEach(button => {
  if (button.tagName !== 'BUTTON') return;
  button.addEventListener('click', () => {
    const split = button.dataset.mode === 'split';
    comparison.dataset.mode = button.dataset.mode;
    document.querySelectorAll('button[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    range.disabled = split;
    document.querySelector('#compare-hint').textContent = split ? '두 사진을 나란히 놓고 전체 모습을 비교해 보세요.' : '경계를 좌우로 움직여 비교해 보세요.';
  });
});
const config = { id: 'com.piccut.app', url: source, author: 'jonghyunseo', name: 'Pic Cut' };
const deepLink = `obtainium://app/${encodeURIComponent(JSON.stringify(config))}`;
document.querySelector('#obtainium-link').href = `https://apps.obtainium.imranr.dev/redirect?r=${encodeURIComponent(deepLink)}`;
document.querySelector('#copy-source').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(source); status.textContent = '주소를 복사했습니다. Obtainium의 앱 추가 화면에 붙여 넣으세요.'; }
  catch { status.textContent = '복사할 수 없습니다. 위 주소를 길게 누르거나 선택해서 복사해 주세요.'; }
});
// A local manifest keeps the site usable without cross-origin API calls or tracking.
fetch('release.json').then(r => { if (!r.ok) throw new Error('Release metadata unavailable'); return r.json(); }).then(release => {
  const prefix = `${source}/releases/download/`;
  if (!release.apkUrl.startsWith(prefix) || !release.checksumUrl.startsWith(prefix) || !/^v\d+\.\d+\.\d+$/.test(release.tag)) return;
  document.querySelectorAll('[data-apk]').forEach(a => { a.href = release.apkUrl; });
  document.querySelectorAll('[data-checksum]').forEach(a => { a.href = release.checksumUrl; });
  document.querySelectorAll('[data-version]').forEach(el => { el.textContent = release.tag; });
  document.querySelectorAll('[data-size]').forEach(el => { el.textContent = `${(release.bytes / 1000000).toFixed(1)} MB`; });
}).catch(() => { /* The verified version embedded in HTML remains available. */ });
