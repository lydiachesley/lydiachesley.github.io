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
  { src: 'images/01.jpeg', title: 'Untitled No. 1',  year: '2024', medium: 'Oil on board' },
  { src: 'images/02.jpeg', title: 'Untitled No. 2',  year: '2024', medium: 'Oil on board' },
  { src: 'images/03.jpeg', title: 'Untitled No. 3',  year: '2024', medium: 'Oil on board' },
  { src: 'images/04.jpeg', title: 'Untitled No. 4',  year: '2023', medium: 'Oil on board' },
  { src: 'images/05.jpeg', title: 'Untitled No. 5',  year: '2023', medium: 'Oil on board' },
  { src: 'images/06.jpeg', title: 'Untitled No. 6',  year: '2023', medium: 'Oil on board' },
  { src: 'images/07.jpeg', title: 'Untitled No. 7',  year: '2023', medium: 'Oil on board' },
  { src: 'images/08.jpeg', title: 'Untitled No. 8',  year: '2022', medium: 'Oil on board' },
  { src: 'images/09.jpeg', title: 'Untitled No. 9',  year: '2022', medium: 'Oil on board' },
  { src: 'images/10.jpeg', title: 'Untitled No. 10', year: '2022', medium: 'Oil on board' },
  { src: 'images/11.jpeg', title: 'Untitled No. 11', year: '2022', medium: 'Oil on board' },
  { src: 'images/12.jpeg', title: 'Untitled No. 12', year: '2021', medium: 'Oil on board' },
  { src: 'images/13.jpeg', title: 'Untitled No. 13', year: '2021', medium: 'Oil on board' },
  { src: 'images/14.jpeg', title: 'Untitled No. 14', year: '2021', medium: 'Oil on board' },
  { src: 'images/15.jpeg', title: 'Untitled No. 15', year: '2020', medium: 'Oil on board' },
  { src: 'images/16.jpeg', title: 'Untitled No. 16', year: '2020', medium: 'Oil on board' },
  { src: 'images/17.jpeg', title: 'Untitled No. 17', year: '2020', medium: 'Oil on board' },
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
  
  caption.textContent = `${p.title} \u00b7 ${p.medium}, ${p.year}`;
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
 
