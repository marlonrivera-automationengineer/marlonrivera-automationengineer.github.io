const root=document.documentElement;
if(localStorage.getItem("portfolio-theme")==="light")root.classList.add("light");
document.querySelectorAll(".theme-toggle").forEach(button=>button.addEventListener("click",()=>{
  root.classList.toggle("light");
  localStorage.setItem("portfolio-theme",root.classList.contains("light")?"light":"dark");
}));
const menuButton=document.querySelector(".menu-button");
const navLinks=document.querySelector(".nav-links");
if(menuButton&&navLinks){
  menuButton.addEventListener("click",()=>{
    const open=navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded",String(open));
  });
  navLinks.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>navLinks.classList.remove("open")));
}
document.querySelectorAll("#year").forEach(el=>el.textContent=new Date().getFullYear());
const bar=document.getElementById("progress-bar");
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  if(bar)bar.style.width=(max>0?(scrollY/max)*100:0)+"%";
});
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target);}
}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,target=Number(el.dataset.target),duration=1000,start=performance.now();
  function tick(now){const p=Math.min((now-start)/duration,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick);}
  requestAnimationFrame(tick);counterObserver.unobserve(el);
}),{threshold:.5});
document.querySelectorAll(".counter").forEach(el=>counterObserver.observe(el));
document.querySelectorAll(".print-case").forEach(button=>button.addEventListener("click",()=>window.print()));
