const root=document.documentElement;
const savedTheme=localStorage.getItem("portfolio-theme");
if(savedTheme==="light")root.classList.add("light");

document.querySelectorAll(".theme-toggle").forEach(button=>{
  button.addEventListener("click",()=>{
    root.classList.toggle("light");
    localStorage.setItem("portfolio-theme",root.classList.contains("light")?"light":"dark");
  });
});

const menuButton=document.querySelector(".menu-button");
const navLinks=document.querySelector(".nav-links");
if(menuButton&&navLinks){
  menuButton.addEventListener("click",()=>{
    const open=navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded",String(open));
  });
  navLinks.querySelectorAll("a").forEach(link=>{
    link.addEventListener("click",()=>navLinks.classList.remove("open"));
  });
}

document.querySelectorAll("#year").forEach(element=>{
  element.textContent=new Date().getFullYear();
});

const progress=document.getElementById("progress-bar");
window.addEventListener("scroll",()=>{
  const maximum=document.documentElement.scrollHeight-innerHeight;
  if(progress)progress.style.width=(maximum>0?(scrollY/maximum)*100:0)+"%";
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(element=>revealObserver.observe(element));

const counterObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const element=entry.target;
    const target=Number(element.dataset.target);
    const duration=1000;
    const start=performance.now();

    function update(now){
      const progress=Math.min((now-start)/duration,1);
      element.textContent=Math.floor(target*(1-Math.pow(1-progress,3)));
      if(progress<1)requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
    counterObserver.unobserve(element);
  });
},{threshold:.5});
document.querySelectorAll(".counter").forEach(element=>counterObserver.observe(element));

const filters=document.querySelectorAll(".filter");
const projectCards=document.querySelectorAll(".project-card");
filters.forEach(button=>{
  button.addEventListener("click",()=>{
    filters.forEach(item=>item.classList.remove("active"));
    button.classList.add("active");
    const selected=button.dataset.filter;
    projectCards.forEach(card=>{
      card.classList.toggle("hide",selected!=="All"&&card.dataset.category!==selected);
    });
  });
});

document.querySelectorAll(".print-case").forEach(button=>{
  button.addEventListener("click",()=>window.print());
});
