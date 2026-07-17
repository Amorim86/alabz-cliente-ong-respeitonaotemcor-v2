const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const canvas=document.querySelector("#neonCanvas");
const ctx=canvas.getContext("2d");
let particles=[];
function resize(){
  const dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  particles=Array.from({length:48},(_,i)=>({
    angle:(Math.PI*2/48)*i,
    radius:Math.min(innerWidth,innerHeight)*(.24+Math.random()*.25),
    speed:.001+Math.random()*.002,
    size:Math.random()*2+1,
    offset:Math.random()*Math.PI*2
  }));
}
function draw(t=0){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  ctx.save();ctx.translate(innerWidth/2,innerHeight/2);
  ctx.globalCompositeOperation="lighter";
  particles.forEach((p,i)=>{
    const a=p.angle+t*p.speed;
    const wobble=Math.sin(t*.001+p.offset)*70;
    const x=Math.cos(a)*(p.radius+wobble);
    const y=Math.sin(a*1.7)*(p.radius*.45)+Math.sin(a*3)*45;
    const prevA=a-.035;
    const px=Math.cos(prevA)*(p.radius+wobble);
    const py=Math.sin(prevA*1.7)*(p.radius*.45)+Math.sin(prevA*3)*45;
    const g=ctx.createLinearGradient(px,py,x,y);
    g.addColorStop(0,"rgba(230,199,106,0)");
    g.addColorStop(1,i%4===0?"rgba(255,245,190,.85)":"rgba(201,168,76,.45)");
    ctx.strokeStyle=g;ctx.lineWidth=p.size;ctx.shadowBlur=18;ctx.shadowColor="#e6c76a";
    ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x,y);ctx.stroke();
  });
  ctx.restore();requestAnimationFrame(draw);
}
resize();addEventListener("resize",resize);requestAnimationFrame(draw);
