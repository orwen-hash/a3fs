// mobile nav
const t=document.getElementById('navToggle'),l=document.getElementById('navLinks');
if(t&&l){
  t.addEventListener('click',()=>{const o=l.classList.toggle('open');t.setAttribute('aria-expanded',o)});
  l.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{l.classList.remove('open');t.setAttribute('aria-expanded','false')}));
}
// scroll reveal
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'))}
