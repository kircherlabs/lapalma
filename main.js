(() => {
  'use strict';

  const CFG = window.LA_PALMA || {};
  const TODAY = '2026-10-04';
  const END = '2026-12-31';

  const pad = n => String(n).padStart(2, '0');
  const key = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  const parseKey = s => { const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d); };
  const fmtMonth = d => d.toLocaleDateString('en-US',{month:'long',year:'numeric'});
  const fmtShortMonth = d => d.toLocaleDateString('en-US',{month:'short'}).toUpperCase();
  const fmtLong = d => d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});

  const weekly = {
    1:{title:'Cafecito & Dominoes',time:'5:00–8:00 PM',category:'Social',description:'Dominoes on the terrace, cafecito at the bar and an easy start to the week.'},
    2:{title:'Rum Room Tuesday',time:'6:00–9:00 PM',category:'Cocktails',description:'A slower night for aged rum, classic cocktails and Latin vinyl by the water.'},
    3:{title:'Salsa Social',time:'7:30–11:30 PM',category:'Dance',description:'A short opening lesson, followed by salsa and bachata until late.'},
    4:{title:'Havana Live',time:'6:30–9:30 PM',category:'Live Music',description:'Live boleros, Latin standards and contemporary Cuban sets through dinner.'},
    5:{title:'La Noche Cubana',time:'9:00 PM–1:00 AM',category:'Dance',description:'Dinner gives way to a late Latin dance floor.'},
    6:{title:'Sunset to Salsa',time:'6:00 PM–1:00 AM',category:'Dance',description:'Sunset cocktails, then salsa, bachata and Latin sets into the night.'},
    0:{title:'Brunch & Boleros',time:'10:00 AM–3:00 PM',category:'Brunch',description:'A long brunch with boleros, cafecito and the water in view.'}
  };

  const specials = {
    '2026-10-04':{title:'Opening Sunday Social',time:'10:00 AM–8:00 PM',category:'Social',description:'Brunch, cafecito and boleros by the water to open the fall social season.',holiday:true},
    '2026-10-31':{title:'Noche de Máscaras',time:'9:00 PM–1:00 AM',category:'Holiday',description:'A Halloween salsa ball with masks, dinner by candlelight and a late dance floor.',holiday:true},
    '2026-11-01':{title:'Día de los Muertos Brunch & Boleros',time:'10:00 AM–3:00 PM',category:'Holiday',description:'A Sunday brunch with seasonal florals, boleros, cafecito and a Día de los Muertos tribute.',holiday:true},
    '2026-11-11':{title:'Veterans Sunset Social',time:'5:00–9:00 PM',category:'Holiday',description:'Dinner, live Latin standards and a sunset toast by the water.',holiday:true},
    '2026-11-25':{title:'Noche de Gracias',time:'7:30 PM–12:00 AM',category:'Holiday',description:'Thanksgiving Eve turns Salsa Social into a lively night for friends, family and returning faces.',holiday:true},
    '2026-11-26':{title:'Thanksgiving at La Palma',time:'12:00–9:00 PM',category:'Holiday',description:'Thanksgiving by the water with family tables, dinner and an easy evening pace.',holiday:true},
    '2026-12-06':{title:'Coquito & Dominoes Holiday Social',time:'3:00–8:00 PM',category:'Holiday',description:'Dominoes, café, holiday sweets and tropical holiday music by the water.',holiday:true},
    '2026-12-18':{title:'Parranda Friday',time:'8:30 PM–1:00 AM',category:'Holiday',description:'A holiday edition of La Noche Cubana with live percussion and dancing late.',holiday:true},
    '2026-12-20':{title:'Holiday Brunch & Boleros',time:'10:00 AM–3:00 PM',category:'Holiday',description:'A holiday Sunday brunch with boleros, café and tropical florals by the water.',holiday:true},
    '2026-12-24':{title:'Nochebuena at La Palma',time:'5:00–11:00 PM',category:'Holiday',description:'Christmas Eve with family tables, dinner, rum, cafecito and live music.',holiday:true},
    '2026-12-25':{title:'Navidad on the Water',time:'12:00–9:00 PM',category:'Holiday',description:'Christmas Day by the water with dinner, boleros and a relaxed family atmosphere.',holiday:true},
    '2026-12-31':{title:'Medianoche en La Palma',time:'8:00 PM–2:00 AM',category:'Holiday',description:'New Year’s Eve dinner, a midnight toast and a dance floor that carries into the new year.',holiday:true}
  };

  function buildEvents(){
    const result=[];
    const start=parseKey(TODAY), end=parseKey(END);
    for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
      const k=key(d);
      const base=weekly[d.getDay()];
      const ev=specials[k] || base;
      result.push({date:k,title:ev.title,time:ev.time,category:ev.category,description:ev.description,holiday:!!ev.holiday});
    }
    return result;
  }
  const EVENTS=buildEvents();

  // Header + mobile navigation
  const header=document.querySelector('[data-header]');
  const nav=document.querySelector('[data-nav]');
  const toggle=document.querySelector('[data-nav-toggle]');
  const onScroll=()=>header && header.classList.toggle('scrolled',window.scrollY>30);
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  if(toggle && nav){
    toggle.addEventListener('click',()=>{ const open=nav.classList.toggle('open'); toggle.setAttribute('aria-expanded',String(open)); });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
  }

  // Reveal animations
  const reveals=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:.08});
    reveals.forEach(el=>obs.observe(el));
  } else reveals.forEach(el=>el.classList.add('visible'));

  // Footer year
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent='2026');

  // Weekly schedule cards
  document.querySelectorAll('[data-weekly-rhythm]').forEach(container=>{
    const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const dayIndex={Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6,Sunday:0};
    container.innerHTML=days.map(day=>{
      const e=weekly[dayIndex[day]];
      return `<article class="rhythm-card"><span class="day">${day}</span><h3>${e.title}</h3><p>${e.description}</p><span class="time">${e.time}</span><span class="category">${e.category}</span></article>`;
    }).join('');
  });

  // Today panel
  const todayEvent=EVENTS.find(e=>e.date===TODAY);
  document.querySelectorAll('[data-today-event]').forEach(el=>{
    if(todayEvent) el.textContent=`${todayEvent.title} · ${todayEvent.time}`;
  });

  // Home event preview
  document.querySelectorAll('[data-event-preview]').forEach(container=>{
    const picks=EVENTS.slice(0,4);
    container.innerHTML=picks.map(e=>{
      const d=parseKey(e.date);
      return `<article class="event-preview-card"><span class="event-month">${fmtShortMonth(d)}</span><span class="event-date">${d.getDate()}</span><h3>${e.title}</h3><p>${e.description}</p><span class="event-time">${e.time}</span></article>`;
    }).join('');
  });

  // Calendar page
  const calGrid=document.querySelector('[data-calendar-grid]');
  if(calGrid){
    let current=new Date(2026,9,1);
    let filter='All';
    const title=document.querySelector('[data-calendar-title]');
    const prev=document.querySelector('[data-prev-month]');
    const next=document.querySelector('[data-next-month]');

    function renderCalendar(){
      title.textContent=fmtMonth(current);
      calGrid.innerHTML='';
      const year=current.getFullYear(), month=current.getMonth();
      const first=new Date(year,month,1); const daysIn=new Date(year,month+1,0).getDate();
      for(let i=0;i<first.getDay();i++) calGrid.insertAdjacentHTML('beforeend','<div class="calendar-day empty" aria-hidden="true"></div>');
      for(let n=1;n<=daysIn;n++){
        const d=new Date(year,month,n), k=key(d), ev=EVENTS.find(x=>x.date===k);
        const isToday=k===TODAY;
        const filtered=ev && filter!=='All' && ev.category!==filter && !(filter==='Holiday' && ev.holiday);
        let html=`<div class="calendar-day ${isToday?'today':''} ${filtered?'filtered-out':''}"><span class="num">${n}</span>`;
        if(ev){html+=`<span class="dot"></span><div class="mini-event"><span class="mini-title">${ev.title}</span><span class="mini-time">${ev.time}</span></div>`;}
        html+='</div>'; calGrid.insertAdjacentHTML('beforeend',html);
      }
      const cells=first.getDay()+daysIn; for(let i=cells;i%7!==0;i++) calGrid.insertAdjacentHTML('beforeend','<div class="calendar-day empty" aria-hidden="true"></div>');
      if(prev) prev.disabled=month===9;
      if(next) next.disabled=month===11;
    }
    prev?.addEventListener('click',()=>{if(current.getMonth()>9){current.setMonth(current.getMonth()-1);renderCalendar();}});
    next?.addEventListener('click',()=>{if(current.getMonth()<11){current.setMonth(current.getMonth()+1);renderCalendar();}});
    document.querySelectorAll('[data-event-filter]').forEach(btn=>btn.addEventListener('click',()=>{
      document.querySelectorAll('[data-event-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');filter=btn.dataset.eventFilter;renderCalendar();renderList();
    }));

    const list=document.querySelector('[data-event-list]');
    function renderList(){
      if(!list) return;
      const filtered=EVENTS.filter(e=>filter==='All'||e.category===filter||(filter==='Holiday'&&e.holiday));
      list.innerHTML=filtered.map(e=>{const d=parseKey(e.date);return `<article class="event-row"><div class="event-datebox"><b>${d.getDate()}</b><span>${fmtShortMonth(d)}</span></div><div><h3>${e.title}</h3><p>${e.description}</p></div><span class="row-time">${e.time}</span><span class="row-tag">${e.holiday?'Holiday':e.category}</span></article>`}).join('');
    }
    renderCalendar();renderList();
  }

  // Holiday cards
  document.querySelectorAll('[data-holiday-events]').forEach(container=>{
    const holidayEvents=EVENTS.filter(e=>e.holiday).slice(0,8);
    container.innerHTML=holidayEvents.map(e=>{const d=parseKey(e.date);return `<article class="holiday-card"><span class="date">${fmtLong(d)}</span><h3>${e.title}</h3><p>${e.description}</p><span class="time">${e.time}</span></article>`}).join('');
  });

  // Reservations: prepare a mailto request
  const form=document.querySelector('[data-reservation-form]');
  if(form){
    const dateInput=form.querySelector('input[name="date"]'); if(dateInput) dateInput.value='2026-10-04';
    form.addEventListener('submit',ev=>{
      ev.preventDefault();
      if(!form.reportValidity()) return;
      const f=new FormData(form); const date=f.get('date'); const d=date?parseKey(date):null;
      const body=[
        'La Palma Reservation Request','',
        `Guest: ${f.get('firstName')} ${f.get('lastName')}`,
        `Email: ${f.get('email')}`,
        `Phone: ${f.get('phone')}`,
        `Date: ${d?fmtLong(d):date}`,
        `Preferred time: ${f.get('time')}`,
        `Party size: ${f.get('partySize')}`,
        `Visit type: ${f.get('visitType')}`,
        `Seating preference: ${f.get('seating')}`,
        '',`Notes: ${f.get('notes')||'None'}`
      ].join('\n');
      const subject=`Reservation request — ${date} — ${f.get('lastName')}`;
      const href=`mailto:${CFG.reservationsEmail||'reservations@lapalmabahia.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status=form.querySelector('[data-form-status]'); if(status) status.textContent='Your reservation request is ready in your email app.';
      window.location.href=href;
    });
  }

  // Gallery lightbox
  const modal=document.querySelector('[data-lightbox-modal]');
  if(modal){
    const img=modal.querySelector('img'); const close=modal.querySelector('.lightbox-close');
    const shut=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');img.src='';};
    document.querySelectorAll('[data-lightbox]').forEach(item=>item.addEventListener('click',()=>{img.src=item.dataset.lightbox;img.alt=item.querySelector('img')?.alt||'La Palma gallery image';modal.classList.add('open');modal.setAttribute('aria-hidden','false');}));
    close?.addEventListener('click',shut); modal.addEventListener('click',e=>{if(e.target===modal) shut();}); document.addEventListener('keydown',e=>{if(e.key==='Escape') shut();});
  }
})();
