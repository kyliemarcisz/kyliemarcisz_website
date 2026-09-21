// Shared across every page: entrance reveals, custom cursor, scroll progress, grid stagger.
// IntersectionObserver runs unconditionally — must not depend on Leaflet loading
const obs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('in');
}), {threshold: .07});
document.querySelectorAll('.appear').forEach(el => obs.observe(el));

(function(){
  var rm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
/* ── Custom cursor (desktop only) ── */
  if(!rm && !('ontouchstart' in window)){
    var dot = document.createElement('div'); dot.id='cursor-dot';
    var ring = document.createElement('div'); ring.id='cursor-ring';
    document.body.appendChild(dot); document.body.appendChild(ring);
    var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my,shown=false;
    document.addEventListener('mousemove',function(e){
      if(!shown){shown=true;dot.style.opacity='1';ring.style.opacity='1';}
      mx=e.clientX; my=e.clientY;
      dot.style.left=mx+'px'; dot.style.top=my+'px';
    });
    (function lerp(){
      rx+=(mx-rx)*.1; ry+=(my-ry)*.1;
      ring.style.left=rx.toFixed(1)+'px'; ring.style.top=ry.toFixed(1)+'px';
      requestAnimationFrame(lerp);
    })();
    var hovEls='a,button,.hcta,.proj-card,.nc,.tlb,.sg,.scard,.inv-card,.hack-card,.vbc,.dl-btn,.proj-link,.nav-links a';
    document.querySelectorAll(hovEls).forEach(function(el){
      el.addEventListener('mouseenter',function(){ring.classList.add('hov');});
      el.addEventListener('mouseleave',function(){ring.classList.remove('hov');});
    });
    document.addEventListener('mousedown',function(){dot.classList.add('cx');});
    document.addEventListener('mouseup',function(){dot.classList.remove('cx');});
  }

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
