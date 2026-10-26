(function(){
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var c = document.getElementById("snow"); if (!c) return;
  var x = c.getContext("2d"), w, h, dpr, flakes = [];
  function size(){ dpr = window.devicePixelRatio || 1; w = c.width = innerWidth*dpr; h = c.height = innerHeight*dpr; c.style.width = innerWidth+"px"; c.style.height = innerHeight+"px"; }
  size(); addEventListener("resize", size);
  for (var i=0;i<70;i++) flakes.push({x:Math.random(),y:Math.random(),r:Math.random()*1.8+.6,s:Math.random()*.0006+.0003,d:Math.random()*Math.PI*2});
  (function tick(){
    x.clearRect(0,0,w,h); x.fillStyle = "rgba(247,241,230,.5)";
    for (var i=0;i<flakes.length;i++){ var f = flakes[i];
      f.y += f.s; f.d += .01; if (f.y > 1){ f.y = -.02; f.x = Math.random(); }
      x.beginPath(); x.arc((f.x+Math.sin(f.d)*.01)*w, f.y*h, f.r*dpr, 0, Math.PI*2); x.fill(); }
    requestAnimationFrame(tick);
  })();
})();
