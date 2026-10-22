/*
 * ForgeFit service worker. Generated into dist/sw.js by scripts/build.mjs,
 * which replaces the two placeholders below with the build version and the
 * list of every file in the build.
 *
 * Strategy:
 *  - Install: precache the whole app shell, so the app works offline after the first visit.
 *  - Navigations: network first (fresh deploys win), falling back to the cached shell.
 *  - Other same-origin GETs: cache first, then network.
 *  - Activate: delete caches from older versions.
 * User data lives in IndexedDB and is never touched by the service worker.
 */
const VERSION = '0.9.0-ea4752fe5f';
const CACHE = `forgefit-${VERSION}`;
const PRECACHE = [
  "./",
  "./assets/forgefit-cover-1080x1920-MFIWR3GT.webp",
  "./assets/jetbrainsmono-var-OC35ZKAC.woff",
  "./assets/main-N7EZKFIJ.js",
  "./assets/main-NALNCWD4.css",
  "./assets/manrope-var-BCKOZCB3.woff",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./index.html",
  "./manifest.webmanifest",
  "./mobility/knee-pain-relief/01-cross-leg-side-bend-left.png",
  "./mobility/knee-pain-relief/02-cross-leg-side-bend-right.png",
  "./mobility/knee-pain-relief/03-backward-lunge.png",
  "./mobility/knee-pain-relief/04-09-quarter-wall-squat.png",
  "./mobility/knee-pain-relief/05-quad-stretch-wall-left.png",
  "./mobility/knee-pain-relief/06-quad-stretch-wall-right.png",
  "./mobility/knee-pain-relief/07-open-chain-knee-extension-left.png",
  "./mobility/knee-pain-relief/08-open-chain-knee-extension-right.png",
  "./mobility/knee-pain-relief/10-straight-leg-raise-left.png",
  "./mobility/knee-pain-relief/11-straight-leg-raise-right.png",
  "./mobility/knee-pain-relief/12-pilates-clamshell-left.png",
  "./mobility/knee-pain-relief/13-pilates-clamshell-right.png",
  "./mobility/knee-pain-relief/14-butt-bridge.png",
  "./mobility/knee-pain-relief/15-sitting-hamstring-stretch-left.png",
  "./mobility/knee-pain-relief/16-sitting-hamstring-stretch-right.png",
  "./mobility/leg-day-warm-up/01-walk-out-to-spider-lunges.webp",
  "./mobility/leg-day-warm-up/02-front-lunge-psoas-reach.webp",
  "./mobility/leg-day-warm-up/03-alternating-pigeon-pose.webp",
  "./mobility/leg-day-warm-up/04-pike-fold-to-squat-hold.webp",
  "./mobility/leg-day-warm-up/05-3-way-lunge-complex.webp",
  "./mobility/leg-day-warm-up/06-bodyweight-squat-2s-hold.webp",
  "./mobility/leg-stretching/01-single-leg-hip-rotation.png",
  "./mobility/leg-stretching/02-adductor-stretch-standing.png",
  "./mobility/leg-stretching/03-kneeling-lunge-stretch-left.png",
  "./mobility/leg-stretching/04-kneeling-lunge-stretch-right.png",
  "./mobility/leg-stretching/05-sitting-hamstring-stretch-left.png",
  "./mobility/leg-stretching/06-sitting-hamstring-stretch-right.png",
  "./mobility/leg-stretching/07-lying-butterfly-stretch.png",
  "./mobility/leg-stretching/08-knee-to-chest-left.png",
  "./mobility/leg-stretching/09-knee-to-chest-right.png",
  "./mobility/leg-stretching/10-glute-stretch-left.png",
  "./mobility/leg-stretching/11-glute-stretch-right.png",
  "./mobility/leg-stretching/12-supine-hamstring-stretch-left.png",
  "./mobility/leg-stretching/13-supine-hamstring-stretch-right.png",
  "./mobility/leg-stretching/14-quad-stretch-wall-left.png",
  "./mobility/leg-stretching/15-quad-stretch-wall-right.png",
  "./mobility/leg-stretching/16-calf-stretch-left.png",
  "./mobility/leg-stretching/17-calf-stretch-right.png",
  "./mobility/leg-stretching/18-forward-bend.png",
  "./mobility/lower-back-pain-relief/01-cross-touch-and-reach.png",
  "./mobility/lower-back-pain-relief/02-cat-cow-pose.png",
  "./mobility/lower-back-pain-relief/03-cobra-stretch.png",
  "./mobility/lower-back-pain-relief/04-swimmer-and-superman.png",
  "./mobility/lower-back-pain-relief/05-lying-twist-stretch-left.png",
  "./mobility/lower-back-pain-relief/06-lying-twist-stretch-right.png",
  "./mobility/lower-back-pain-relief/07-knee-to-chest-left.png",
  "./mobility/lower-back-pain-relief/08-knee-to-chest-right.png",
  "./mobility/lower-back-pain-relief/09-lying-swing-legs-left.png",
  "./mobility/lower-back-pain-relief/10-lying-swing-legs-right.png",
  "./mobility/lower-back-pain-relief/11-bridge.png",
  "./mobility/lower-back-pain-relief/12-spine-lumbar-twist-left.png",
  "./mobility/lower-back-pain-relief/13-spine-lumbar-twist-right.png",
  "./mobility/lower-back-pain-relief/14-seated-side-bend-left.png",
  "./mobility/lower-back-pain-relief/15-seated-side-bend-right.png",
  "./mobility/lower-back-pain-relief/16-seated-spinal-twist-left.png",
  "./mobility/lower-back-pain-relief/17-seated-spinal-twist-right.png",
  "./mobility/lower-back-pain-relief/18-childs-pose.png",
  "./mobility/post-run-cooldown/01-quad-stretch-wall-left.png",
  "./mobility/post-run-cooldown/02-quad-stretch-wall-right.png",
  "./mobility/post-run-cooldown/03-calf-stretch-left.png",
  "./mobility/post-run-cooldown/04-calf-stretch-right.png",
  "./mobility/post-run-cooldown/05-forward-bend.png",
  "./mobility/post-run-cooldown/06-kneeling-lunge-stretch-left.png",
  "./mobility/post-run-cooldown/07-kneeling-lunge-stretch-right.png",
  "./mobility/post-run-cooldown/08-glute-stretch-left.png",
  "./mobility/post-run-cooldown/09-glute-stretch-right.png",
  "./mobility/post-run-cooldown/10-sitting-hamstring-stretch-left.png",
  "./mobility/post-run-cooldown/11-sitting-hamstring-stretch-right.png",
  "./mobility/post-run-cooldown/12-seated-butterfly-stretch.png",
  "./mobility/posture-correction/01-seated-wall-butterfly.webp",
  "./mobility/posture-correction/02-standing-wall-slides.webp",
  "./mobility/posture-correction/03-face-to-wall-reverse-angel.webp",
  "./mobility/posture-correction/04-wall-supported-hip-hinge.webp",
  "./mobility/shoulder-band-warm-up/01-band-pull-throughs.webp",
  "./mobility/shoulder-band-warm-up/02-alt-band-pull-aparts.webp",
  "./mobility/shoulder-band-warm-up/02-band-pull-aparts.webp",
  "./mobility/shoulder-band-warm-up/03-band-around-the-worlds.webp",
  "./mobility/shoulder-band-warm-up/04-single-arm-band-shoulder-press.webp",
  "./mobility/upper-body-stretching/01-overhead-arm-circles-clockwise.png",
  "./mobility/upper-body-stretching/02-overhead-arm-circles-counterclockwise.png",
  "./mobility/upper-body-stretching/03-standing-side-bend.png",
  "./mobility/upper-body-stretching/04-downward-dog-on-wall.png",
  "./mobility/upper-body-stretching/05-triceps-stretch-left.png",
  "./mobility/upper-body-stretching/06-triceps-stretch-right.png",
  "./mobility/upper-body-stretching/07-standing-biceps-stretch-left.png",
  "./mobility/upper-body-stretching/08-standing-biceps-stretch-right.png",
  "./mobility/upper-body-stretching/09-chest-stretch.png",
  "./mobility/upper-body-stretching/10-seated-side-bend-left.png",
  "./mobility/upper-body-stretching/11-seated-side-bend-right.png",
  "./mobility/upper-body-stretching/12-seated-spinal-twist-left.png",
  "./mobility/upper-body-stretching/13-seated-spinal-twist-right.png",
  "./mobility/upper-body-stretching/14-spine-lumbar-twist-left.png",
  "./mobility/upper-body-stretching/15-spine-lumbar-twist-right.png",
  "./mobility/upper-body-stretching/16-anterior-shoulder-stretch.png",
  "./mobility/upper-body-warm-up/01-arm-circles.webp",
  "./mobility/upper-body-warm-up/02-angel-mobility-sequence.webp",
  "./mobility/upper-body-warm-up/03-04-kneeling-t-spine-rotations.webp",
  "./mobility/upper-body-warm-up/05-wrist-circles-rolling.webp",
  "./mobility/upper-body-warm-up/06-dynamic-over-under-reaches.webp",
  "./mobility/upper-body-warm-up/07-reach-to-w-pull.webp"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('forgefit-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./'))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response.ok && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
