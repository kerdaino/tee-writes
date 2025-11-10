// Front-end behavior: filters, modal previews, upload form stub, contact form stub.

document.addEventListener('DOMContentLoaded', ()=>{
// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', ()=> nav.classList.toggle('open'));

// Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#portfolio-grid .card');
filterBtns.forEach(btn=>btn.addEventListener('click', ()=>{
filterBtns.forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
const f = btn.dataset.filter;
cards.forEach(c=>{
if(f==='all' || c.dataset.category===f) c.style.display='block'; else c.style.display='none';
})
}));

// Modal preview
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.modal-close');
document.querySelectorAll('[data-sample]').forEach(btn=>{
btn.addEventListener('click', async e=>{
const id = btn.dataset.sample;
modal.setAttribute('aria-hidden','false');
// For demo: load placeholder text. Replace by fetching the actual sample file or embed.
modalBody.innerHTML = `<h3>Preview — ${id}</h3><p class="muted">Sample preview placeholder. Replace with fetched content (PDF/text) or embed.</p><div style="margin-top:1rem"><em>Example first paragraph:</em> She walked toward the window, prayer on her lips, and the city hummed beneath the light.</div>`;
})
});
closeModal?.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true') });

// Upload form — front-end stub
const uploadForm = document.getElementById('uploadForm');
const uploadStatus = document.getElementById('uploadStatus');
uploadForm?.addEventListener('submit', async (e)=>{
e.preventDefault();
uploadStatus.textContent = 'Uploading...';
const form = new FormData(uploadForm);
// NOTE: You need a server endpoint to accept file uploads OR integrate Google Drive/Google Picker.
// Option A: send to your backend
// fetch('/api/upload', {method:'POST', body: form})
// .then(r=>r.json()).then(j=>{ uploadStatus.textContent = 'Uploaded'; })
// Option B: Google Drive + Picker
// Use the Google Picker API + OAuth to let the user choose/upload files to a Drive folder.
// That requires a Google Cloud project, API key, OAuth client ID and server-side token handling.

// Demo behavior: simulate upload and then clear
setTimeout(()=>{ uploadStatus.textContent = 'Uploaded (demo) — integrate backend or Drive per script comments.'; uploadForm.reset(); }, 900);
});

// Contact form stub
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
contactForm?.addEventListener('submit', async (e)=>{
e.preventDefault();
contactStatus.textContent = 'Sending…';
const data = new FormData(contactForm);
// Replace with your email service or backend endpoint (e.g., SendGrid, Formspree, or your server)
setTimeout(()=>{ contactStatus.textContent = 'Message sent (demo). I will respond within 48 hours.'; contactForm.reset(); }, 800);
});

});

