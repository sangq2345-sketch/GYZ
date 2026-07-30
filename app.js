
const fishData = {
  day: [
    {name:"전갱이", chance:"높음", desc:"방파제 안쪽에서 무리로 움직여 초보자도 만나기 쉬워요.", setup:["볼락대 또는 짧은 루어대","1000~2000번 릴","나일론 2~3호","카드채비 6~8호","크릴 또는 어피 바늘"]},
    {name:"고등어", chance:"보통", desc:"회유가 들어오면 짧은 시간에 연속 입질이 올 수 있어요.", setup:["2.4~3.0m 루어대","2500번 릴","PE 0.8~1호","메탈지그 15~30g","빠르게 감기"]},
    {name:"보리멸", chance:"보통", desc:"모래 바닥이 있는 곳에서 원투낚시로 노릴 수 있어요.", setup:["원투대 25~30호","4000번 릴","나일론 4~5호","묶음추 채비","청갯지렁이"]}
  ],
  night: [
    {name:"볼락", chance:"높음", desc:"밤에 항구 불빛 주변과 암초 지대에서 활발해져요.", setup:["볼락대 UL~L","1000~2000번 릴","PE 0.3~0.5호","지그헤드 1~3g","웜 1.5~2인치"]},
    {name:"무늬오징어", chance:"보통", desc:"가을 밤 얕은 암초 주변에서 에깅으로 노릴 수 있어요.", setup:["에깅대 8.3ft 전후","2500번 릴","PE 0.6~0.8호","리더 2~2.5호","에기 2.5~3.5호"]},
    {name:"농어", chance:"낮음", desc:"파도와 조류가 맞으면 해질녘과 밤에 들어올 수 있어요.", setup:["농어대 9~10ft","3000~4000번 릴","PE 1~1.5호","리더 20~30lb","미노우 12~18cm"]}
  ]
};
const spots = [
  ["속초 영금정","방파제 · 초보 추천","주차 가능 · 야간 조명 · 파도 주의"],
  ["양양 남애항","항구 · 가족 낚시","화장실 · 편의점 · 혼잡 가능"],
  ["강릉 주문진항","방파제 · 볼락/전갱이","주차 가능 · 강풍 주의"],
  ["동해 묵호항","항구 · 다양한 어종","상가 인접 · 낚시금지 구역 확인"],
  ["삼척 장호항","맑은 물 · 에깅","관광객 많음 · 안전선 준수"],
  ["울진 후포항","대형 항구 · 원투","차량 접근 편리 · 야간 안전 주의"],
  ["영덕 강구항","방파제 · 고등어","먹거리 인접 · 혼잡 가능"],
  ["포항 구룡포항","항구 · 볼락/고등어","주차 가능 · 방파제 끝 위험"]
];
const lessons = [
  ["물때란 무엇인가요?","달과 태양의 영향으로 바닷물 높이와 흐름이 반복해서 바뀌는 현상이에요."],
  ["간조와 만조","간조는 물이 가장 낮을 때, 만조는 가장 높을 때예요. 전후로 물이 움직일 때 입질이 좋아지는 경우가 많아요."],
  ["사리와 조금","사리는 물 높이 차가 크고 흐름이 강한 시기, 조금은 흐름이 약한 시기예요."],
  ["기본 채비 순서","원줄 → 도래 → 목줄 → 바늘이 기본이에요. 대상어에 따라 찌, 봉돌, 루어를 더해요."],
  ["안전 수칙","구명조끼, 미끄럼 방지 신발, 단독 출조 피하기, 높은 파도와 테트라포드 피하기가 기본입니다."]
];

function renderFish(period="day"){
  const el=document.querySelector("#fishList");
  el.innerHTML=fishData[period].map(f=>`<details class="fish-card"><summary>${f.name} <span class="tag">가능성 ${f.chance}</span></summary><p>${f.desc}</p><b>초보 추천 채비</b><ul>${f.setup.map(x=>`<li>${x}</li>`).join("")}</ul></details>`).join("");
}
function renderGuide(filter=""){
  const all=[...fishData.day,...fishData.night];
  const list=all.filter(f=>f.name.includes(filter));
  document.querySelector("#guideList").innerHTML=list.length?list.map(f=>`<article class="fish-card"><h3>${f.name}</h3><p>${f.desc}</p>${f.setup.map(x=>`<span class="tag">${x}</span>`).join("")}</article>`).join(""):`<p class="empty">검색 결과가 없어요.</p>`;
}
document.querySelectorAll(".segment").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".segment").forEach(x=>x.classList.remove("active"));
  b.classList.add("active"); renderFish(b.dataset.period);
}));
document.querySelectorAll(".bottom-nav button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".page,.bottom-nav button").forEach(x=>x.classList.remove("active"));
  document.querySelector(`#${b.dataset.page}`).classList.add("active"); b.classList.add("active"); scrollTo(0,0);
}));
document.querySelector("#spotList").innerHTML=spots.map(s=>`<article class="spot-card"><h3>${s[0]}</h3><p>${s[1]}</p><p class="spot-meta">${s[2]}</p></article>`).join("");
document.querySelector("#lessonList").innerHTML=lessons.map((l,i)=>`<div class="lesson"><button>${i+1}. ${l[0]}</button><p>${l[1]}</p></div>`).join("");
document.querySelectorAll(".lesson button").forEach(b=>b.addEventListener("click",()=>b.parentElement.classList.toggle("open")));
document.querySelector("#fishSearch").addEventListener("input",e=>renderGuide(e.target.value.trim()));
document.querySelector("#region").addEventListener("change",e=>{
  document.querySelector("#coachText").textContent=`${e.target.value}에서는 초보자가 방파제 안쪽의 안전한 구역부터 확인하세요. 실제 출조 전 현지 바람과 출입 통제 정보를 꼭 확인하세요.`;
});
document.querySelector("#locationBtn").addEventListener("click",()=>{
  if(!navigator.geolocation){alert("이 브라우저에서는 위치 기능을 지원하지 않아요.");return;}
  navigator.geolocation.getCurrentPosition(()=>alert("현재 위치를 확인했어요. v2에서 가까운 포인트 추천에 연결됩니다."),()=>alert("위치 권한을 허용해 주세요."));
});

function loadRecords(){return JSON.parse(localStorage.getItem("gyj-records")||"[]")}
function renderRecords(){
  const data=loadRecords();
  document.querySelector("#recordList").innerHTML=data.length?data.map((r,i)=>`<article class="record-card"><b>${r.place} · ${r.fish}</b><p>${r.size?`${r.size}cm · `:""}${r.date}</p><p>${r.memo||""}</p><button onclick="deleteRecord(${i})">삭제</button></article>`).join(""):`<p class="empty">아직 저장된 기록이 없어요.</p>`;
}
window.deleteRecord=i=>{const a=loadRecords();a.splice(i,1);localStorage.setItem("gyj-records",JSON.stringify(a));renderRecords();}
document.querySelector("#recordForm").addEventListener("submit",e=>{
  e.preventDefault();
  const a=loadRecords();
  a.unshift({place:recordPlace.value,fish:recordFish.value,size:recordSize.value,memo:recordMemo.value,date:new Date().toLocaleDateString("ko-KR")});
  localStorage.setItem("gyj-records",JSON.stringify(a));e.target.reset();renderRecords();
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false;});
document.querySelector("#installBtn").addEventListener("click",async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.hidden=true;}});
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));

renderFish(); renderGuide(); renderRecords();
