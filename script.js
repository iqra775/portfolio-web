(function(){
  var menu=document.getElementById('menu'),b=document.getElementById('burger');
  b.addEventListener('click',function(){var o=menu.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  menu.addEventListener('click',function(e){if(e.target.tagName==='A'){menu.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){menu.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  window.addEventListener('resize',function(){if(window.innerWidth>820){menu.classList.remove('open');b.setAttribute('aria-expanded','false')}});

  // theme toggle
  var root=document.documentElement,tb=document.getElementById('theme');
  function applyTheme(t){root.setAttribute('data-theme',t);tb.textContent=t==='dark'?'☀':'☾'}
  var saved=null;try{saved=localStorage.getItem('theme')}catch(e){}
  if(saved){applyTheme(saved)}
  else{applyTheme(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
  tb.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    applyTheme(n);try{localStorage.setItem('theme',n)}catch(e){}
  });

  // marquee: duplicate for seamless loop
  var t=document.getElementById('track');t.innerHTML+=t.innerHTML;

  // accordion
  var items=document.querySelectorAll('.item');
  items.forEach(function(it){
    it.querySelector('button').addEventListener('click',function(){
      var open=it.classList.contains('open');
      items.forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});
      if(!open){it.classList.add('open');it.querySelector('button').setAttribute('aria-expanded','true')}
    });
  });

  // active nav link
  var links=document.querySelectorAll('.menu a');
  var secs=['home','services','projects','about','contact'].map(function(i){return document.getElementById(i)});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){if(s)io.observe(s)});
  }

  // form validation
  var f=document.getElementById('form'),ok=document.getElementById('ok');
  function setErr(id,msg){var i=document.getElementById(id);document.querySelector('[data-for="'+id+'"]').textContent=msg;i.classList.toggle('bad',!!msg);return !msg}
  f.addEventListener('submit',function(e){
    e.preventDefault();ok.classList.remove('show');
    var a=setErr('fn',document.getElementById('fn').value.trim()?'':'Enter your name.');
    var em=document.getElementById('fe').value.trim();
    var c=setErr('fe',/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)?'':'Enter a valid email address.');
    var d=setErr('fm',document.getElementById('fm').value.trim().length>=10?'':'Write at least 10 characters.');
    if(a&&c&&d){ok.classList.add('show');f.reset()}
  });
  document.getElementById('yr').textContent=new Date().getFullYear();
})();