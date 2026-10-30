/* Sapatinho — shared helpers: encoding of invite links, draw algorithm, small utils. */
var Sap = (function(){
  function toB64url(bytes){
    var s = ""; for (var i=0;i<bytes.length;i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
  }
  function fromB64url(str){
    str = str.replace(/-/g,"+").replace(/_/g,"/"); while (str.length % 4) str += "=";
    var s = atob(str), out = new Uint8Array(s.length);
    for (var i=0;i<s.length;i++) out[i] = s.charCodeAt(i);
    return out;
  }
  function encode(obj){
    var data = new TextEncoder().encode(JSON.stringify(obj));
    var key = new Uint8Array(6); crypto.getRandomValues(key);
    var out = new Uint8Array(6 + data.length); out.set(key, 0);
    for (var i=0;i<data.length;i++) out[6+i] = data[i] ^ key[i % 6] ^ ((i*31) & 255);
    return toB64url(out);
  }
  function decode(str, anyVersion){
    try{
      str = String(str).split(".")[0];
      var b = fromB64url(str); if (b.length < 8) return null;
      var key = b.slice(0,6), data = b.slice(6), out = new Uint8Array(data.length);
      for (var i=0;i<data.length;i++) out[i] = data[i] ^ key[i % 6] ^ ((i*31) & 255);
      var o = JSON.parse(new TextDecoder("utf-8",{fatal:true}).decode(out));
      if (anyVersion) return o || null;
      return (o && o.v === 2 && o.n && o.t) ? o : null;
    }catch(e){ return null; }
  }
  /* Um link pode ser fabricado por qualquer pessoa (a assinatura só o servidor verifica),
     por isso tudo o que vem do link é validado antes de aparecer na página. */
  function safe(o){
    if (!o || typeof o.n !== "string" || typeof o.t !== "string") return null;
    var str = function(v, max){ return typeof v === "string" ? v.slice(0, max) : ""; };
    var out = { v:o.v, n:str(o.n,30), t:str(o.t,30), g:str(o.g,60) || null, x:o.x, e:o.e };
    out.l = (typeof o.l === "number" && isFinite(o.l) && o.l > 0 && o.l <= 1000) ? Math.round(o.l) : null;
    out.d = (typeof o.d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(o.d)) ? o.d : null;
    out.p = Array.isArray(o.p) ? o.p.filter(function(x){ return typeof x === "string"; }).slice(0,30).map(function(x){ return x.slice(0,30); }) : [];
    if (out.p.length < 2) out.p = [out.n, out.t];
    if (!out.n || !out.t) return null;
    return out;
  }
  function rnd(n){ var a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
  function shuffle(a){ for (var i=a.length-1;i>0;i--){ var j = rnd(i+1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* names: array; blocked: { name: Set(names it may not draw) } -> { giver: receiver } or null */
  function draw(names, blocked){
    for (var attempt=0; attempt<5000; attempt++){
      var r = shuffle(names.slice()), ok = true;
      for (var i=0;i<names.length;i++){
        var g = names[i], t = r[i];
        if (g === t || (blocked[g] && blocked[g].has(t))){ ok = false; break; }
      }
      if (ok){ var m = {}; names.forEach(function(g,i){ m[g] = r[i]; }); return m; }
    }
    return null;
  }
  function esc(s){ return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]}); }
  var MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
  function fmtDate(iso){
    if (!iso) return "";
    var p = iso.split("-"); if (p.length !== 3) return "";
    return parseInt(p[2],10) + " de " + MESES[parseInt(p[1],10)-1];
  }
  function shortDate(iso){
    if (!iso) return "";
    var p = iso.split("-"); return parseInt(p[2],10) + " " + MESES[parseInt(p[1],10)-1].slice(0,3);
  }
  function getS(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function setS(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function hash(str){ var h = 5381; for (var i=0;i<str.length;i++) h = ((h<<5) + h + str.charCodeAt(i)) >>> 0; return h.toString(36); }
  function copy(text, btn, done){
    var finish = function(){ if (btn){ var o = btn.textContent; btn.textContent = done || "Copiado"; setTimeout(function(){ btn.textContent = o; }, 1600); } };
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(finish, function(){ fallback(); });
    } else fallback();
    function fallback(){
      var t = document.createElement("textarea"); t.value = text; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select(); try{ document.execCommand("copy"); finish(); }catch(e){} t.remove();
    }
  }
  return { safe:safe, encode:encode, decode:decode, draw:draw, esc:esc, fmtDate:fmtDate, shortDate:shortDate, getS:getS, setS:setS, hash:hash, copy:copy };
})();
