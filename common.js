// Shared across every page: entrance reveals, scroll progress, grid stagger.
// IntersectionObserver runs unconditionally — must not depend on Leaflet loading
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('in');
}), {threshold: .07});
document.querySelectorAll('.appear').forEach(el => obs.observe(el));

(function(){
  /* ── Scroll progress ── */
  var prog=document.createElement('div'); prog.id='scroll-progress';
  document.body.appendChild(prog);
  window.addEventListener('scroll',function(){
    var s=document.documentElement;
    var pct=s.scrollTop/(s.scrollHeight-s.clientHeight)*100;
    prog.style.width=(isNaN(pct)?0:pct).toFixed(2)+'%';
  },{passive:true});

  /* ── Stagger grid children ── */
  document.querySelectorAll('.inv-grid,.skills-grid,.acad-grid,.vb-grid,.hack-grid,.proj-grid').forEach(function(g){
    g.querySelectorAll('.appear').forEach(function(el,i){el.style.transitionDelay=(i*.08)+'s';});
  });
  document.querySelectorAll('.now-items').forEach(function(col){
    col.querySelectorAll('.appear').forEach(function(el,i){el.style.transitionDelay=(i*.1)+'s';});
  });

  })();
