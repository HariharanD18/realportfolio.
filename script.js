const menuToggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menuToggle?.addEventListener("click",()=>{const o=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(o))});
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false")}));

const loader=document.getElementById("loader");
if(loader){const b=loader.firstElementChild,ws=["Hello","Hariharan","Portfolio"];let i=0;
(function t(){b.textContent=ws[i++];setTimeout(i<ws.length?t:()=>loader.classList.add("done"),i<ws.length?520:800)})()}

const io="IntersectionObserver"in window?new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");o.unobserve(e.target)}}),{threshold:.12}):null;
const watch=el=>io?io.observe(el):el.classList.add("visible");
document.querySelectorAll(".reveal").forEach(watch);

document.querySelectorAll(".mq div").forEach(d=>d.innerHTML+=d.innerHTML);

const cv=document.getElementById("stars");
if(cv){const c=cv.getContext("2d"),m={x:-999,y:-999},slow=matchMedia("(prefers-reduced-motion: reduce)").matches,por=document.getElementById("portrait"),img=new Image(),t0=performance.now()+(loader&&!slow?2900:0);
let w,h,stars=[],pts=[],on=true,run=false;
function build(){w=cv.width=cv.offsetWidth;h=cv.height=cv.offsetHeight;
stars=Array.from({length:Math.min(220,w*h/7000|0)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+.3,s:Math.random()*.25+.05}));
pts=[];if(!img.naturalWidth)return;
const th=h*.82,tw=th*img.naturalWidth/img.naturalHeight,ox=(w-tw)/2,oy=h-th,st=Math.max(4,Math.round(w/230)),o=document.createElement("canvas");
o.width=Math.ceil(tw/st);o.height=Math.ceil(th/st);const oc=o.getContext("2d");oc.drawImage(img,0,0,o.width,o.height);
let d;try{d=oc.getImageData(0,0,o.width,o.height).data}catch(e){return}
for(let j=0;j<o.height;j++)for(let i=0;i<o.width;i++){const k=(j*o.width+i)*4,a=d[k+3]/255,l=d[k]*a;if(a<.35||l<22)continue;
const v=Math.min(255,(l*1.2)>>4<<4);pts.push({hx:ox+i*st,hy:oy+j*st,x:Math.random()*w,y:Math.random()*h,vx:0,vy:0,rx:Math.random()-.5,ry:Math.random()-.5,z:st-1,c:`rgb(${v},${v},${v+8>255?255:v+8})`})}
pts.sort((p,q)=>p.c<q.c?-1:1);if(pts.length)por?.classList.add("off")}
function frame(){c.clearRect(0,0,w,h);const sp=slow?0:Math.min(scrollY/h,1),k=performance.now()<t0?0:.045;
c.fillStyle="#fff";for(const s of stars){if(!slow){s.y-=s.s;if(s.y<0)s.y=h}c.globalAlpha=.3+s.r/2.2;c.fillRect(s.x,s.y,s.r*1.4,s.r*1.4)}
c.globalAlpha=Math.max(1-sp*.9,.05);let last="";
for(const p of pts){const tx=p.hx+p.rx*sp*420,ty=p.hy+p.ry*sp*420-sp*120,dx=p.x-m.x,dy=p.y-m.y,dd=Math.hypot(dx,dy)||1;
if(dd<95){const f=(95-dd)/95*2.2;p.vx+=dx/dd*f;p.vy+=dy/dd*f}
p.vx+=(tx-p.x)*k;p.vy+=(ty-p.y)*k;p.vx*=.86;p.vy*=.86;p.x+=p.vx;p.y+=p.vy;
if(p.c!==last){c.fillStyle=p.c;last=p.c}c.fillRect(p.x,p.y,p.z,p.z)}}
function loop(){if(!on){run=false;return}run=true;frame();requestAnimationFrame(loop)}
img.onload=build;img.src=por?por.getAttribute("src"):"images/profile.png";build();
addEventListener("resize",build);
cv.parentElement.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});
cv.parentElement.addEventListener("pointerleave",()=>{m.x=m.y=-999});
new IntersectionObserver(e=>{on=e[0].isIntersecting;if(on&&!run)loop()}).observe(cv);loop()}

addEventListener("scroll",()=>document.documentElement.style.setProperty("--p",scrollY/Math.max(document.body.scrollHeight-innerHeight,1)*100+"%"),{passive:true});

const page=document.body.dataset.page,links=document.querySelectorAll(".nav a"),secs=document.querySelectorAll("main section[id]");
function spy(){let cur="home";secs.forEach(s=>{if(scrollY>=s.offsetTop-160)cur=s.id});links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${cur}`))}
if(page)links.forEach(a=>a.classList.toggle("active",a.dataset.page===page));else{addEventListener("scroll",spy,{passive:true});spy()}

const gal=document.getElementById("certificateGallery"),modal=document.getElementById("certificateModal"),mImg=document.getElementById("certificateModalImage"),mCap=document.getElementById("certificateModalCaption"),exts=["png","jpg","jpeg","webp"];
function findImg(n,i=0){if(i===exts.length)return Promise.resolve(null);const src=`images/certificates/certificate${n}.${exts[i]}`;
return new Promise(res=>{const im=new Image();im.onload=()=>res({src});im.onerror=()=>findImg(n,i+1).then(res);im.src=src})}
function addCard(n,src){const t=`Certificate ${n}`,card=document.createElement("button");
card.className="certificate-card reveal";card.type="button";card.setAttribute("aria-label",`View ${t}`);
card.innerHTML=`<span class="certificate-image-wrap"><img src="${src}" alt="" class="certificate-image" loading="lazy"></span><span class="certificate-card-title">${t}</span>`;
card.addEventListener("click",()=>{mImg.src=src;mImg.alt=t;mCap.textContent=t;modal.showModal()});
gal.append(card);watch(card)}
async function load(n=1,found=0){const r=await findImg(n);
if(r){document.getElementById("certificateEmptyState")?.remove();addCard(n,r.src);return load(n+1,found+1)}
if(!found){const e=document.getElementById("certificateEmptyState");if(e)e.textContent="Certificate images will appear here when added to the images/certificates folder."}}
if(gal)load();
document.getElementById("certificateModalClose")?.addEventListener("click",()=>modal.close());
modal?.addEventListener("click",e=>{if(e.target===modal)modal.close()});
const y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();

const gc=document.getElementById("game");
if(gc){const x=gc.getContext("2d"),btn=document.getElementById("playBtn"),F={H:["10001","10001","10001","11111","10001","10001","10001"],E:["11111","10000","10000","11110","10000","10000","11111"],L:["10000","10000","10000","10000","10000","10000","11111"],O:["01110","10001","10001","10001","10001","10001","01110"]};
let W,H,b,bricks,pad,ball,pw,play=false,won=false,seen=true,run=false;
const py=()=>H-b*1.2;
function reset(){play=false;btn.classList.remove("hide");ball={x:pad.x,y:py()-b*.3,vx:0,vy:0,r:Math.max(5,b*.3)}}
function init(){const r=gc.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=Math.round(W*.6);gc.width=W*d;gc.height=H*d;gc.style.height=H+"px";x.setTransform(d,0,0,d,0,0);
b=Math.floor(W*.86/29);const ox=(W-29*b)/2,oy=b*1.5;bricks=[];
[..."HELLO"].forEach((ch,n)=>F[ch].forEach((row,j)=>[...row].forEach((v,i)=>{if(v==="1")bricks.push({x:ox+(n*6+i)*b,y:oy+j*b,on:1})})));
pw=W*.2;pad={x:W/2};reset()}
function step(){if(!play||won){ball.x=pad.x;ball.y=py()-ball.r-1;return}
ball.x+=ball.vx;ball.y+=ball.vy;
if(ball.x<ball.r){ball.x=ball.r;ball.vx=Math.abs(ball.vx)}
if(ball.x>W-ball.r){ball.x=W-ball.r;ball.vx=-Math.abs(ball.vx)}
if(ball.y<ball.r){ball.y=ball.r;ball.vy=Math.abs(ball.vy)}
if(ball.vy>0&&ball.y+ball.r>=py()&&ball.y<py()+b*.5&&Math.abs(ball.x-pad.x)<pw/2+ball.r){const s=Math.hypot(ball.vx,ball.vy);ball.vx=s*.8*(ball.x-pad.x)/(pw/2);ball.vy=-Math.sqrt(Math.max(s*s-ball.vx*ball.vx,s*s*.2));ball.y=py()-ball.r}
if(ball.y>H+ball.r*2){reset();return}
for(const k of bricks){if(k.on&&ball.x+ball.r>k.x&&ball.x-ball.r<k.x+b&&ball.y+ball.r>k.y&&ball.y-ball.r<k.y+b){k.on=0;
const a=Math.min(ball.x+ball.r-k.x,k.x+b-ball.x+ball.r),e=Math.min(ball.y+ball.r-k.y,k.y+b-ball.y+ball.r);if(a<e)ball.vx*=-1;else ball.vy*=-1;break}}
if(!won&&!bricks.some(k=>k.on)){won=true;setTimeout(()=>{won=false;init()},1000)}}
function draw(){x.clearRect(0,0,W,H);x.fillStyle="#ecebe4";for(const k of bricks)if(k.on)x.fillRect(k.x+1,k.y+1,b-2,b-2);
x.fillRect(pad.x-pw/2,py(),pw,b*.45);x.fillStyle="#fff";x.beginPath();x.arc(ball.x,ball.y,ball.r,0,6.283);x.fill()}
function gloop(){if(!seen){run=false;return}run=true;step();draw();requestAnimationFrame(gloop)}
btn.addEventListener("click",()=>{if(won)return;const s=W*.0075;ball.vx=s*.6;ball.vy=-s;play=true;btn.classList.add("hide")});
gc.addEventListener("pointermove",e=>{const r=gc.getBoundingClientRect();pad.x=Math.max(pw/2,Math.min(W-pw/2,e.clientX-r.left))});
addEventListener("keydown",e=>{if(!seen||!play)return;const d=e.key==="ArrowLeft"?-1:e.key==="ArrowRight"?1:0;if(d){e.preventDefault();pad.x=Math.max(pw/2,Math.min(W-pw/2,pad.x+d*W*.04))}});
addEventListener("resize",init);
new IntersectionObserver(e=>{seen=e[0].isIntersecting;if(seen&&!run)gloop()}).observe(gc);
init();gloop()}
