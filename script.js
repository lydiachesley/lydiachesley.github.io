/*
  PAINTINGS DATA — update this to match your actual images.
  Keep the order the same as the slots in index.html (slot 01 = index 0, etc.)
 
  src:    relative path to your image file, e.g. "images/painting1.jpg"
          Leave as '' if you haven't added an image yet.
  title:  name of the painting (shown in the lightbox caption)
  year:   year it was made
  medium: materials / surface
*/
const paintings = [
  { src: 'images/01.jpeg', title: 'Untitled No. 1',       year: '2026', medium: 'Oil on board ' },
  { src: 'images/02.jpeg', title: 'Trumpet Flower',        year: '2026', medium: 'Oil on board' },
  { src: 'images/03.jpeg', title: 'Pareidolia',            year: '2026', medium: 'Oil on board' },
  { src: 'images/04.jpeg', title: 'Headboard',             year: '2026', medium: 'Oil on board — <em>Sold</em>' },
  { src: 'images/05.jpeg', title: 'Untitled No. 2',        year: '2026', medium: 'Oil on board — <em>Sold</em>' },
  { src: 'images/06.jpeg', title: 'Come a little closer',  year: '2026', medium: 'Oil on board' },
  { src: 'images/07.jpeg', title: 'Untitled No. 3',        year: '2026', medium: 'Oil on board — <em>Sold</em>' },
  { src: 'images/08.jpeg', title: 'Phone No. 1',           year: '2026', medium: 'Oil on board — <em>Sold</em>' },
  { src: 'images/09.jpeg', title: 'Phone No. 2',           year: '2026', medium: 'Mixed media' },
  { src: 'images/10.jpeg', title: 'Phone No. 3',           year: '2026', medium: 'Mixed media' },
  { src: 'images/11.jpeg', title: 'Phone No. 4',           year: '2026', medium: 'Oil on board' },
  { src: 'images/12.jpeg', title: 'Phone No. 5',           year: '2026', medium: 'Oil on board' },
  { src: 'images/13.jpeg', title: 'Portal',                year: '2025', medium: 'Oil on board' },
  { src: 'images/14.jpeg', title: 'Untitled No. 4',        year: '2025', medium: '' },
  { src: 'images/15.jpeg', title: 'Static',                year: '2025', medium: 'Oil on board' },
  { src: 'images/16.jpeg', title: 'Untitled No. 5',        year: '2025', medium: 'Oil on board' },
  { src: 'images/17.jpeg', title: 'Untitled No. 6',        year: '2025', medium: 'Oil on board' },
];
 
let currentIndex = 0;
 
function openLightbox(index) {
  currentIndex = index;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
 
function closeLightboxOutside(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}
 
function shiftLightbox(dir) {
  currentIndex = (currentIndex + dir + paintings.length) % paintings.length;
  renderLightbox();
}
 
function renderLightbox() {
  const p = paintings[currentIndex];
  const content = document.getElementById('lightbox-content');
  const caption = document.getElementById('lightbox-caption');
  
  if (p.src) {
    content.innerHTML = `<img src="${p.src}" alt="${p.title}" class="lightbox-img" onclick="toggleZoom()">`;
  } else {
    content.innerHTML = `<div class="lightbox-placeholder"><span style="color:rgba(247,249,250,0.3);font-style:italic;font-size:14px;">Slot ${currentIndex + 1} — no image yet</span></div>`;
  }
  
  const mediumPart = p.medium ? ` &middot; ${p.medium}` : '';
  caption.innerHTML = `<em>${p.title}</em>${mediumPart}, ${p.year}`;
}
 
let isZoomed = false;
 
function toggleZoom() {
  const img = document.querySelector('.lightbox-img');
  isZoomed = !isZoomed;
  
  if (isZoomed) {
    img.classList.add('zoomed');
  } else {
    img.classList.remove('zoomed');
  }
}
 
// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  shiftLightbox(-1);
  if (e.key === 'ArrowRight') shiftLightbox(1);
});
 
// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
 
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
