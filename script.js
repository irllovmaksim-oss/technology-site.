(()=>{
'use strict';
function strength(p){
 const types=[/\p{Ll}/u,/\p{Lu}/u,/\p{N}/u,/[^\p{L}\p{N}\s]/u].filter(r=>r.test(p)).length;
 const n=Array.from(p).length, diverse=new Set(p.toLowerCase()).size>=6;
 const common=/(password|qwerty|пароль|123456|йцукен)/iu.test(p);
 if(n<8||!diverse||common)return 0;
 return n>=12&&types>=3?2:1;
}

const cities = [
  {code:'NQZ', name:'Астана'}, {code:'ALA',name:'Алматы'}, {code:'CIT',name:'Шымкент'},
  {code:'CDG',name:'Париж'}, {code:'DPS',name:'Бали'}, {code:'FCO',name:'Рим'},
  {code:'IST',name:'Стамбул'}, {code:'DXB',name:'Дубай'}, {code:'LHR',name:'Лондон'}, {code:'NRT',name:'Токио'}
];
const catalog = [
 {id:'dest_bali',title:'Бали, Индонезия',short:'Бали',country:'Индонезия',code:'DPS',type:'Направление',basePrice:320000,image:'bali',tag:'Тропический побег',detail:'Океан, рисовые террасы и рассветы над вулканами. Время замедлиться и побыть ближе к природе.',facts:['Перелёт туда','Ручная кладь 7 кг','Даты на выбор'],color:'teal'},
 {id:'dest_rome',title:'Рим, Италия',short:'Рим',country:'Италия',code:'FCO',type:'Направление',basePrice:250000,image:'rome',tag:'Город с историей',detail:'Улицы вечного города, античная архитектура и маленькие траттории. Начните свою итальянскую историю.',facts:['Перелёт туда','Ручная кладь 7 кг','Даты на выбор'],color:'orange'},
 {id:'dest_ist',title:'Стамбул, Турция',short:'Стамбул',country:'Турция',code:'IST',type:'Направление',basePrice:120000,image:'istanbul',tag:'Выбор путешественников',detail:'Два континента, один удивительный город. Прогулки у Босфора, восточные базары и вкусный турецкий завтрак.',facts:['Перелёт туда','Ручная кладь 7 кг','Даты на выбор'],color:'purple'},
 {id:'dest_paris',title:'Париж, Франция',short:'Париж',country:'Франция',code:'CDG',type:'Направление',basePrice:195000,image:'paris',tag:'Город вдохновения',detail:'Утренний кофе, прогулки вдоль Сены и вечерние огни Эйфелевой башни. Париж ждёт вашей встречи.',facts:['Перелёт туда','Ручная кладь 7 кг','Даты на выбор'],color:'blue'},
 {id:'dest_dubai',title:'Дубай, ОАЭ',short:'Дубай',country:'ОАЭ',code:'DXB',type:'Направление',basePrice:155000,image:'dubai',tag:'Солнце круглый год',detail:'Небоскрёбы, тёплое море и песчаные дюны. Соберите своё путешествие между городом и пустыней.',facts:['Перелёт туда','Ручная кладь 7 кг','Даты на выбор'],color:'orange'},
 {id:'dest_almaty',title:'Алматы, Казахстан',short:'Алматы',country:'Казахстан',code:'ALA',type:'Направление',basePrice:28000,image:'mountain',tag:'Ближе к горам',detail:'Горные панорамы, уютные кофейни и прогулки в яблочном городе. Небольшое путешествие с большим настроением.',facts:['Перелёт туда','Ручная кладь 7 кг','Даты на выбор'],color:'teal'},
 {id:'hotel_bali',title:'Ubud Garden Resort',short:'Ubud Garden Resort',country:'Убуд, Бали',type:'Отель',basePrice:42000,image:'resort',tag:'Уединение в зелени',detail:'Уютный курорт среди тропической зелени: бассейн, терраса и неспешные завтраки.',facts:['Цена за ночь','Для 2 гостей','Завтрак включён'],rating:'4.9',color:'teal'},
 {id:'hotel_paris',title:'Maison de Paris',short:'Maison de Paris',country:'Париж, Франция',type:'Отель',basePrice:68000,image:'cityhotel',tag:'В сердце города',detail:'Небольшой городской отель для прогулок и отдыха после насыщенного дня.',facts:['Цена за ночь','Для 2 гостей','Завтрак включён'],rating:'4.8',color:'purple'},
 {id:'hotel_dubai',title:'Marina Sky Hotel',short:'Marina Sky Hotel',country:'Дубай, ОАЭ',type:'Отель',basePrice:55000,image:'hotel',tag:'Отдых у воды',detail:'Светлые номера, бассейн и панорама города для вашего отпуска.',facts:['Цена за ночь','Для 2 гостей','Завтрак включён'],rating:'4.9',color:'orange'},
 {id:'exp_balloon',title:'Рассвет над Каппадокией',short:'Каппадокия с высоты',country:'Гёреме, Турция',type:'Впечатление',basePrice:85000,image:'balloon',tag:'Незабываемый рассвет',detail:'Полёт на воздушном шаре и невероятные виды долин.',facts:['Программа 3 часа','Цена за человека','Трансфер включён'],color:'orange'},
 {id:'exp_mountain',title:'День в горах Алматы',short:'День в горах',country:'Алматы, Казахстан',type:'Впечатление',basePrice:22000,image:'mountain',tag:'Время для приключений',detail:'Прогулка по горным тропам с гидом и остановками для фотографий.',facts:['Программа 6 часов','Цена за человека','В сопровождении гида'],color:'teal'},
 {id:'exp_paris',title:'Париж глазами местных',short:'Другой Париж',country:'Париж, Франция',type:'Впечатление',basePrice:35000,image:'paris',tag:'За пределами открыток',detail:'Прогулка по любимым кварталам парижан, маленьким пекарням и набережным.',facts:['Программа 3 часа','Цена за человека','Русскоязычный гид'],color:'purple'},
 {id:'bruno',title:'Концерт Bruno Mars',short:'Bruno Mars',country:'Музыкальный вечер',type:'Событие',basePrice:65000,image:'concert',tag:'Feel the music',detail:'Музыка, свет и атмосфера большого концерта.',facts:['Событие','Цена за человека','Без реального билета'],color:'orange'},
 {id:'coldplay',title:'Coldplay World Tour',short:'Coldplay World Tour',country:'Музыкальное путешествие',type:'Событие',basePrice:75000,image:'concert',tag:'Момент, который останется',detail:'Сохраните идею музыкального путешествия.',facts:['Событие','Цена за человека','Без реального билета'],color:'purple'},
 {id:'tech',title:'Tech Summit',short:'Tech Summit',country:'Идеи и технологии',type:'Событие',basePrice:45000,image:'dubai',tag:'Вдохновение будущим',detail:'Технологии и новые знакомства.',facts:['Событие','Цена за человека','Без реального билета'],color:'blue'}
];
const tariffSets = {
 'Направление':[{name:'Эконом',factor:1,features:['Ручная кладь 7 кг','Стандартное место','Без возврата']},{name:'Комфорт',factor:1.45,features:['Ручная кладь + багаж 23 кг','Выбор места','Обмен с доплатой']},{name:'Бизнес',factor:2.3,features:['Багаж 32 кг','Приоритетная посадка','Гибкий обмен']}],
 'Отель':[{name:'Стандарт',factor:1,features:['Уютный номер для двоих','Завтрак','Wi-Fi']},{name:'Делюкс',factor:1.65,features:['Просторный номер с видом','Завтрак и поздний выезд','Wi-Fi']},{name:'Президентский люкс',factor:3,features:['Люкс с гостиной','Индивидуальный сервис','Трансфер']}],
 default:[{name:'Стандарт',factor:1,features:['Основная программа','Групповой формат','Подтверждение в заказах']},{name:'VIP',factor:1.8,features:['Быстрый доступ','Небольшая группа','Дополнительный сервис']},{name:'Индивидуальный тур',factor:2.8,features:['Персональная программа','Сопровождение','Гибкий маршрут']}]
};
const faq = [
 ['Как работает отслеживание цен?','Нажмите на сердечко у направления, отеля или впечатления. Во вкладке «Отслежка» можно задать желаемую цену. Кнопка «Смоделировать изменение» показывает, как меняются цены. Реальные цены и уведомления по почте пока не подключены.'],
 ['Какой багаж входит в тариф?','В тарифах «Эконом» предусмотрена ручная кладь до 7 кг (55 × 40 × 20 см), «Комфорт» — багаж 23 кг, «Бизнес» — 32 кг. При настоящей покупке условия нужно проверять у перевозчика.'],
 ['Когда открывается онлайн-регистрация?','Для примера в проекте используется период от 24 часов до вылета до 60 минут перед вылетом. Фактическое время зависит от авиакомпании и аэропорта.'],
 ['Можно ли путешествовать с питомцем?','Возможность перевозки, размеры переноски и доплата зависят от перевозчика. Перед реальной поездкой согласуйте перевозку с авиакомпанией. Этот сайт не оформляет перевозку животных.'],
 ['Что делать при задержке или отмене рейса?','Для реального рейса обратитесь к перевозчику и следите за табло аэропорта.'],
 ['Как оформить и найти заказ?','Выберите предложение и тариф, укажите дату и добавьте его в заказы. Во вкладке «Заказы» проверьте количество и нажмите «Оформить заказ». Он появится в истории. Оплата и банковские данные не нужны.'],
 ['Где сохраняются мои данные?','Имя, выбранные предложения, отслеживание и заказы сохраняются в браузере на этом устройстве. На другом устройстве будет отдельный список. При очистке данных браузера записи будут удалены.']
];

const money = n => new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₸';
function localDate(d = new Date()) {return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function validDate(s) {if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00');return !Number.isNaN(d.getTime())&&localDate(d)===s;}
function validateSearch(q,today=localDate()) {
 if(!cities.some(c=>c.code===q.origin)||!cities.some(c=>c.code===q.destination))return 'Выберите города из списка.';
 if(q.origin===q.destination)return 'Города вылета и прилёта должны отличаться.';
 if(!validDate(q.date)||q.date<today)return 'Выберите сегодняшнюю или будущую дату вылета.';
 if(q.returnDate&&(!validDate(q.returnDate)||q.returnDate<q.date))return 'Дата возвращения не может быть раньше вылета.';
 if(!Number.isInteger(q.passengers)||q.passengers<1||q.passengers>9)return 'Выберите от 1 до 9 пассажиров.';
 return '';
}
function searchFlights(q) {
 const item=catalog.find(i=>i.code===q.destination&&i.type==='Направление');
 if(!item)return [];
 const base=item.basePrice*(q.origin==='ALA'?0.96:1)*(q.returnDate?1.85:1);
 const options=[{provider:'AspanAir',time:'08:20',arrival:'13:40',duration:'6 ч 20 мин',stops:0,factor:1},{provider:'Sky Connect',time:'12:45',arrival:'21:10',duration:'9 ч 25 мин',stops:1,factor:0.88},{provider:'AspanAir',time:'18:10',arrival:'23:45',duration:'6 ч 35 мин',stops:0,factor:1.15}];
 return options.map((o,index)=>({...o,...q,id:`flight_${q.origin}_${q.destination}_${q.date}_${q.returnDate||'one'}_${index}`,catalogId:item.id,title:`${cities.find(c=>c.code===q.origin).name} → ${cities.find(c=>c.code===q.destination).name}`,type:'Направление',image:item.image,basePrice:Math.round(base*o.factor/100)*100,short:item.short,country:item.country,detail:'Информация о маршруте и выбранном тарифе.',facts:[q.returnDate?'Туда и обратно':'В одну сторону',`${q.passengers} пасс.`,o.stops?'1 пересадка':'Прямой рейс']}));
}
function tariffs(item){return tariffSets[item.type]||tariffSets.default;}
function price(item,tariff=0){return Math.round(item.basePrice*tariffs(item)[tariff].factor/100)*100;}
function lineTotal(item){return item.unitPrice*item.quantity;}
function total(cart){return cart.reduce((sum,item)=>sum+lineTotal(item),0);}
function addToCart(cart,item,tariffIndex,date,quantity=1){
 const t=tariffs(item)[tariffIndex];
 if(!t||!validDate(date)||!Number.isInteger(quantity)||quantity<1||quantity>9)throw new Error('Некорректное предложение');
 const key=`${item.id}:${tariffIndex}:${date}:${item.returnDate||''}`;
 const old=cart.find(i=>i.key===key);
 if(old)return cart.map(i=>i.key===key?{...i,quantity:Math.min(9,i.quantity+quantity)}:i);
 return [...cart,{key,itemId:item.id,title:item.title,type:item.type,image:item.image,tariff:t.name,unitPrice:price(item,tariffIndex),quantity,date,returnDate:item.returnDate||'',route:item.origin?`${item.origin} → ${item.destination}`:'',provider:item.provider||''}];
}
function cleanState(raw){
 const clean={profile:'Ержан',cart:[],tracked:[],orders:[],tick:0};
 if(!raw||typeof raw!=='object')return clean;
 if(typeof raw.profile==='string'&&raw.profile.trim())clean.profile=raw.profile.slice(0,40);
 const goodLine=i=>i&&typeof i.key==='string'&&typeof i.title==='string'&&typeof i.tariff==='string'&&Number.isSafeInteger(i.unitPrice)&&i.unitPrice>0&&Number.isInteger(i.quantity)&&i.quantity>0&&i.quantity<=9&&validDate(i.date);
 clean.cart=Array.isArray(raw.cart)?raw.cart.filter(goodLine).slice(0,100):[];
 clean.tracked=Array.isArray(raw.tracked)?raw.tracked.filter(t=>t&&catalog.some(i=>i.id===t.id)&&Number.isSafeInteger(t.target)&&t.target>0&&Number.isSafeInteger(t.current)&&t.current>0).filter((t,i,a)=>a.findIndex(x=>x.id===t.id)===i):[];
 clean.orders=Array.isArray(raw.orders)?raw.orders.filter(o=>o&&typeof o.id==='string'&&Array.isArray(o.items)&&o.items.length&&o.items.every(goodLine)&&typeof o.createdAt==='string'&&Number.isFinite(Date.parse(o.createdAt))).slice(0,100):[];
 clean.tick=Number.isSafeInteger(raw.tick)&&raw.tick>=0?raw.tick:0;
 return clean;
}
function makeOrder(cart,name,id=globalThis.crypto.randomUUID(),date=new Date().toISOString()){
 if(!cart.length)throw new Error('Корзина пуста');
 return {id,createdAt:date,name:name.trim()||'Путешественник',items:cart.map(i=>({...i})),total:total(cart),status:'Оформлен'};
}

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=(n,c='')=>`<svg class="icon ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const prettyDate=s=>new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short',year:'numeric'}).format(new Date(s+'T12:00:00'));
let account=null, storageKey='aspanair-state-v1';
let storageAvailable=true;
let state;
try{state=cleanState(JSON.parse(localStorage.getItem(storageKey)));}catch{state=cleanState(null);storageAvailable=false;}
let activeTab='flights', flightResults=[], resultQuery=null, searchBusy=false, returnFocus=null;
function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{if(storageAvailable)toast('Браузер не разрешил сохранение. Данные останутся до закрытия страницы.',true);storageAvailable=false;}}
function toast(message,warning=false){const node=document.createElement('div');node.className='toast'+(warning?' warning':'');node.innerHTML=icon(warning?'bell':'check')+`<span>${esc(message)}</span>`;$('#toast-container').append(node);setTimeout(()=>node.remove(),4200);}
function openDialog(id){const d=$('#'+id);returnFocus=document.activeElement;d.showModal();document.body.style.overflow='hidden';}
function closeDialog(id){const d=$('#'+id);if(d.open)d.close();}
$$('dialog').forEach(d=>{d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',()=>{document.body.style.overflow='';if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});});
function setMobileMenu(open){$('#mobile-menu').hidden=!open;$('#mobile-menu-toggle').setAttribute('aria-expanded',String(open));$('#mobile-menu-toggle').setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');$('#mobile-menu-toggle').innerHTML=icon(open?'close':'menu');}
function switchTab(tab,scroll=true){
 if(!['flights','hotels','experiences','tracking','faq','cart'].includes(tab))tab='flights';
 activeTab=tab;$$('.tab-pane').forEach(el=>el.hidden=el.id!==`tab-${tab}-content`);
 $$('[data-tab]').forEach(el=>{el.classList.toggle('active',el.dataset.tab===tab);if(el.dataset.tab===tab)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
 setMobileMenu(false);if(tab==='cart')renderCart();if(tab==='tracking')renderTracking();
 document.title={flights:'AspanAir — Дешевые авиабилеты, отели и туры',hotels:'Отели — AspanAir',experiences:'Впечатления — AspanAir',tracking:'Отслеживание — AspanAir',faq:'FAQ — AspanAir',cart:'Мои заказы — AspanAir'}[tab];
 if(scroll){window.scrollTo({top:0,behavior:'instant'});$('#main').focus({preventScroll:true});}
}
window.addEventListener('hashchange',()=>switchTab(location.hash.slice(1)));
window.addEventListener('resize',()=>{if(window.innerWidth>900)setMobileMenu(false);});
$('#mobile-menu-toggle').addEventListener('click',()=>setMobileMenu($('#mobile-menu').hidden));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#mobile-menu').hidden){setMobileMenu(false);$('#mobile-menu-toggle').focus();}});
function go(tab){if(location.hash==='#'+tab)switchTab(tab);else location.hash=tab;}
function count(){const n=state.cart.reduce((a,i)=>a+i.quantity,0),t=state.tracked.length;$('#cart-badge').textContent=n;$('#cart-badge').hidden=n===0;$('#tracking-badge').textContent=t;$('#tracking-badge').hidden=t===0;$('#mobile-cart-count').textContent=n;$('#mobile-tracking-count').textContent=t;$('#tracking-total').textContent=t;$('#profile-name').textContent=account?.name||'Войти';$$('.personal-name').forEach(e=>e.textContent=state.profile);}
function card(item,index){const trackedState=state.tracked.find(t=>t.id===item.id),tracked=!!trackedState;item=trackedState?{...item,basePrice:trackedState.current}:item;return `<article class="travel-card"><div class="card-image"><img src="./assets/${esc(item.image)}.jpg" alt="${esc(item.title)}" loading="lazy" width="800" height="530"><span class="card-tag">${esc(item.tag)}</span><button type="button" class="heart-button" data-track="${item.id}" aria-pressed="${tracked}" aria-label="${tracked?'Убрать из отслеживания':'Отслеживать'}: ${esc(item.title)}">${icon('heart')}</button><span class="photo-index">${String(index+1).padStart(2,'0')} / ${item.type==='Направление'?'ВРЕМЯ ОТКРЫВАТЬ':item.type==='Отель'?'ВРЕМЯ ОТДЫХАТЬ':'ВРЕМЯ ЧУВСТВОВАТЬ'}</span></div><div class="card-body"><div class="card-location">${icon('location')}${esc(item.country)}${item.rating?`<span class="rating">${icon('star')}${item.rating}</span>`:''}</div><h3><button type="button" data-info="${item.id}">${esc(item.short)}</button></h3><p class="card-subtitle">${item.type==='Направление'?'Из Астаны · в одну сторону':item.facts[0]}</p><div class="card-bottom"><div class="card-price"><small>${item.type==='Отель'?'за ночь от':'от'}</small><strong>${money(item.basePrice)}</strong></div><button type="button" class="card-action" data-info="${item.id}">Выбрать ${icon('arrow')}</button></div></div></article>`;}
function renderCards(){
 $('#destinations-grid').innerHTML=catalog.filter(i=>i.type==='Направление').map(card).join('');
 const hotelFilter=$('#hotel-filter').value;
 $('#hotels-grid').innerHTML=catalog.filter(i=>i.type==='Отель'&&(hotelFilter==='all'||i.country.includes(hotelFilter))).map(card).join('');
 const expFilter=$('#experience-filter').value;
 $('#experiences-grid').innerHTML=catalog.filter(i=>['Впечатление','Событие'].includes(i.type)&&(expFilter==='all'||i.type===expFilter)).map(card).join('');
 $('#events-grid').innerHTML=catalog.filter(i=>i.type==='Событие').map(i=>`<article class="event-card"><img src="./assets/${i.image}.jpg" alt="" loading="lazy"><small>${esc(i.tag.toUpperCase())}</small><h3>${esc(i.short)}</h3><button type="button" data-info="${i.id}" aria-label="Подробнее: ${esc(i.title)}">Открыть впечатление ${icon('arrow')}</button></article>`).join('');
}
function toggleTrack(id){const item=catalog.find(i=>i.id===id);if(!item)return;const index=state.tracked.findIndex(t=>t.id===id);if(index>=0){state.tracked.splice(index,1);toast('Предложение удалено из отслеживания');}else{state.tracked.push({id,target:Math.round(item.basePrice*.9/100)*100,current:item.basePrice});toast('Сохранено в отслеживание');}save();count();$$(`[data-track="${id}"]`).forEach(b=>{const yes=index<0;b.setAttribute('aria-pressed',String(yes));b.setAttribute('aria-label',`${yes?'Убрать из отслеживания':'Отслеживать'}: ${item.title}`);});renderCards();if(activeTab==='tracking')renderTracking();}
$('#hotel-filter').addEventListener('change',renderCards);$('#experience-filter').addEventListener('change',renderCards);
function cityOptions(selected){return cities.map(c=>`<option value="${c.code}" ${c.code===selected?'selected':''}>${c.name} (${c.code})</option>`).join('');}
$('#origin').innerHTML=cityOptions('NQZ');$('#destination').innerHTML=cityOptions('CDG');
const today=localDate();$('#flight-date').value=today;$('#flight-date').min=today;$('#return-date').min=today;$('#year').textContent=new Date().getFullYear();
$('#swap-cities').addEventListener('click',()=>{const origin=$('#origin').value;$('#origin').value=$('#destination').value;$('#destination').value=origin;});
function setTripType(round){$('#return-field').hidden=!round;$('#return-date').disabled=!round;$('#return-date').required=round;if(round&&!$('#return-date').value){const d=new Date($('#flight-date').value+'T12:00:00');d.setDate(d.getDate()+7);$('#return-date').value=localDate(d);}$('#round-trip').classList.toggle('selected',round);$('#round-trip').setAttribute('aria-pressed',String(round));$('#one-way').classList.toggle('selected',!round);$('#one-way').setAttribute('aria-pressed',String(!round));}
$('#one-way').addEventListener('click',()=>setTripType(false));$('#round-trip').addEventListener('click',()=>setTripType(true));
$('#flight-date').addEventListener('change',()=>{$('#return-date').min=$('#flight-date').value||today;});
$('#flight-search-form').addEventListener('submit',async e=>{
 e.preventDefault();if(searchBusy)return;
 const q={origin:$('#origin').value,destination:$('#destination').value,date:$('#flight-date').value,returnDate:$('#return-date').disabled?'':$('#return-date').value,passengers:Number($('#passengers').value)};
 let error=validateSearch(q);if(!$('#return-date').disabled&&!q.returnDate)error='Выберите дату обратного вылета.';
 $('#search-error').hidden=!error;$('#search-error').textContent=error;if(error)return;
 searchBusy=true;$('#search-button').disabled=true;$('#flight-search-form').setAttribute('aria-busy','true');$('#runway-container').hidden=false;
 await new Promise(r=>setTimeout(r,850));
 flightResults=searchFlights(q);resultQuery=q;$('#direct-only').checked=false;$('#sort-results').value='price';renderResults();$('#search-results').hidden=false;
 searchBusy=false;$('#search-button').disabled=false;$('#flight-search-form').removeAttribute('aria-busy');$('#runway-container').hidden=true;
 if(activeTab==='flights'){$('#search-results').scrollIntoView({behavior:'smooth',block:'start'});$('#search-results').focus({preventScroll:true});}
});
function renderResults(){if(!resultQuery)return;const q=resultQuery;const o=cities.find(c=>c.code===q.origin),d=cities.find(c=>c.code===q.destination);let list=flightResults.filter(i=>!$('#direct-only').checked||i.stops===0);list.sort($('#sort-results').value==='price'?(a,b)=>a.basePrice-b.basePrice:(a,b)=>a.time.localeCompare(b.time));$('#results-title').textContent=`${o.name} → ${d.name}`;$('#results-meta').textContent=`${prettyDate(q.date)}${q.returnDate?' — '+prettyDate(q.returnDate):''} · ${q.passengers} пасс. · ${list.length} рейса`;
 $('#results-list').innerHTML=list.length?list.map(i=>`<article class="flight-card"><div class="flight-provider"><span class="logo-mark">${icon('plane')}</span><div>${esc(i.provider)}</div></div><div class="flight-route"><div class="flight-time"><strong>${i.time}</strong><p>${i.origin}</p></div><div class="route-line"><p>${i.duration}</p><div class="line"></div><small>${i.stops?'1 пересадка':'Прямой рейс'}</small></div><div class="flight-time"><strong>${i.arrival}</strong><p>${i.destination}</p></div></div><div class="flight-buy"><strong>${money(i.basePrice*q.passengers)}</strong><small>за ${q.passengers} пасс.${q.returnDate?' · туда-обратно':''}</small><button class="btn btn-primary" type="button" data-flight="${i.id}">Выбрать тариф ${icon('arrow')}</button></div></article>`).join(''):empty('plane','Пока нет предложений','Для этого маршрута нет рейсов. Попробуйте Бали, Рим, Стамбул, Париж, Дубай или Алматы.','Изменить поиск','search');}
$('#direct-only').addEventListener('change',renderResults);$('#sort-results').addEventListener('change',renderResults);$('#close-results').addEventListener('click',()=>{$('#search-results').hidden=true;$('#search-button').focus();});
function empty(symbol,title,copy,label,action){return `<div class="empty-state"><span class="large-icon">${icon(symbol)}</span><h3>${esc(title)}</h3><p>${esc(copy)}</p><button type="button" class="btn btn-dark" data-empty-action="${action}">${esc(label)} ${icon('arrow')}</button></div>`;}
function openInfo(id,isFlight=false){
 const original=isFlight?flightResults.find(i=>i.id===id):catalog.find(i=>i.id===id);if(!original)return;const tracked=!isFlight&&state.tracked.find(t=>t.id===id);const item=tracked?{...original,basePrice:tracked.current}:original;
 const options=tariffs(item),initDate=item.date||localDate();
 $('#info-modal-content').innerHTML=`<div class="info-cover"><img src="./assets/${item.image}.jpg" alt="${esc(item.title)}"><button type="button" class="icon-button modal-close" data-close="info-modal" aria-label="Закрыть предложение">${icon('close')}</button><span class="info-type">${esc(item.type)}</span></div><div class="info-intro"><h2>${esc(item.title)}</h2><p>${esc(item.detail)}</p><div class="info-facts">${item.facts.map(f=>`<span>${icon('check')}${esc(f)}</span>`).join('')}</div></div><form id="info-order-form"><fieldset class="tariff-grid" aria-label="Выберите тариф" style="border:0;margin:0;min-inline-size:0">${options.map((t,n)=>`<label class="tariff"><input type="radio" name="tariff" value="${n}" ${n===0?'checked':''}><h3>${t.name}</h3><ul>${t.features.map(f=>`<li>${icon('check')}${f}</li>`).join('')}</ul><strong>${money(price(item,n))}</strong><small>${item.type==='Отель'?'за ночь · для 2 гостей':item.returnDate?'за человека · туда-обратно':'за человека'}</small></label>`).join('')}</fieldset><div class="info-order-form"><div class="info-form-row"><label><span class="field-label">${item.type==='Отель'?'Дата заезда':'Дата'}${item.returnDate?' вылета':''}</span><input type="date" id="item-date" class="text-input" value="${initDate}" min="${localDate()}" required ${isFlight?'readonly':''}></label><label><span class="field-label">${item.type==='Отель'?'Количество ночей':'Количество человек'}</span><select id="item-quantity" class="text-input" aria-label="${item.type==='Отель'?'Количество ночей':'Количество человек'}">${Array.from({length:9},(_,n)=>`<option value="${n+1}" ${item.passengers===n+1?'selected':''}>${n+1}</option>`).join('')}</select></label><button type="submit" class="btn btn-primary" id="add-to-cart">В заказы · ${money(price(item)*(item.passengers||1))} ${icon('bag')}</button></div>${item.returnDate?`<p class="subtle-note">Обратный вылет: ${prettyDate(item.returnDate)}. Расписание обратного рейса не детализировано.</p>`:''}<p class="subtle-note">${item.type==='Отель'?'Номер для 2 гостей, стоимость за выбранное число ночей. ':''} ${!isFlight&&item.type==='Направление'?'Базовый вылет из Астаны. Для другого города воспользуйтесь поиском.':''}</p><p class="form-error" id="info-error" role="alert" hidden></p></div></form>`;
 const form=$('#info-order-form');
 const updatePrice=()=>{const t=Number(form.querySelector('[name=tariff]:checked').value),q=Number($('#item-quantity').value);$('#add-to-cart').innerHTML=`В заказы · ${money(price(item,t)*q)} ${icon('bag')}`;};
 form.addEventListener('change',updatePrice);
 form.addEventListener('submit',e=>{e.preventDefault();const date=$('#item-date').value;if(!validDate(date)||date<localDate()){$('#info-error').hidden=false;$('#info-error').textContent='Выберите сегодняшнюю или будущую дату.';return;}const t=Number(form.querySelector('[name=tariff]:checked').value);const q=Number($('#item-quantity').value);const old=state.cart.reduce((n,x)=>n+x.quantity,0);state.cart=addToCart(state.cart,item,t,date,q);save();count();renderCart();closeDialog('info-modal');toast(state.cart.reduce((n,x)=>n+x.quantity,0)>old?'Добавлено в заказы. Продолжайте выбирать или переходите к оформлению.':'Для одного предложения можно выбрать не больше 9 единиц.');});
 openDialog('info-modal');
}
function renderTracking(){
 $('#simulate-prices').disabled=!state.tracked.length;
 $('#tracking-items-list').innerHTML=state.tracked.length?state.tracked.map(t=>{const item=catalog.find(i=>i.id===t.id),change=Math.round((t.current/item.basePrice-1)*100),reached=t.current<=t.target;return `<article class="track-card"><img src="./assets/${item.image}.jpg" alt="${esc(item.title)}" loading="lazy"><div class="track-main"><h3><button type="button" class="text-button" style="font:inherit;color:inherit;text-align:left" data-info="${item.id}">${esc(item.title)}</button></h3><p>${esc(item.type)} · Базовый тариф${item.type==='Отель'?' / ночь':''}</p><span class="track-current">${money(t.current)}</span>${change?`<span class="track-change ${change>0?'up':''}">${change>0?'+':''}${change}%</span>`:''}</div><form class="track-target" data-target-form="${item.id}"><label class="target-label" for="target-${item.id}">Желаемая цена, ₸</label><div class="target-row"><input type="number" id="target-${item.id}" min="100" max="100000000" step="100" required value="${t.target}"><button type="submit" aria-label="Сохранить желаемую цену: ${esc(item.title)}">${icon('check')}</button></div><span class="target-status ${reached?'reached':''}">${reached?'Желаемая цена достигнута':'Цена · '+(t.updated?'обновлено по кнопке':'ещё без изменений')}</span></form><button type="button" class="icon-button track-remove" data-track="${item.id}" aria-label="Убрать из отслеживания: ${esc(item.title)}" aria-pressed="true">${icon('close')}</button></article>`;}).join(''):empty('heart','Здесь будут ваши мечты','Нажмите на сердечко у понравившегося предложения, и оно появится здесь.','Выбрать направление','flights');
}
$('#tracking-items-list').addEventListener('submit',e=>{const form=e.target.closest('[data-target-form]');if(!form)return;e.preventDefault();const v=Number(form.querySelector('input').value);if(!Number.isSafeInteger(v)||v<100||v>100000000||v%100){form.querySelector('input').reportValidity();return;}const item=state.tracked.find(i=>i.id===form.dataset.targetForm);item.target=v;save();renderTracking();toast('Желаемая цена сохранена');});
$('#simulate-prices').addEventListener('click',()=>{if(!state.tracked.length)return;state.tick++;state.tracked=state.tracked.map((t,index)=>{const base=catalog.find(i=>i.id===t.id).basePrice,factors=[.94,.87,1.04,.91,1.02],current=Math.round(base*factors[(state.tick-1+index)%factors.length]/100)*100;return {...t,current,updated:true};});save();renderCards();renderTracking();toast('Цены обновлены. '+state.tracked.filter(t=>t.current<=t.target).length+' предложений достигли желаемой цены.');});
function renderCart(){
 const n=state.cart.reduce((s,i)=>s+i.quantity,0);$('#cart-total-count').textContent=n;$('#summary-quantity').textContent=n;$('#summary-price').textContent=money(total(state.cart));$('#checkout-button').disabled=!state.cart.length;
 $('#cart-items-list').innerHTML=state.cart.length?state.cart.map(i=>`<article class="cart-line"><img src="./assets/${esc(i.image)}.jpg" alt="${esc(i.title)}" loading="lazy"><div class="cart-line-content"><h3>${esc(i.title)}</h3><p>${esc(i.tariff)} · ${prettyDate(i.date)}${i.returnDate?' — '+prettyDate(i.returnDate):''}${i.route?' · '+esc(i.route):''}</p><p>${esc(i.type)}${i.provider?' · '+esc(i.provider):''}${i.type==='Отель'?' · номер для 2 гостей · количество ночей':''}</p><div class="cart-line-controls"><div class="quantity-control" aria-label="Количество"><button type="button" data-quantity="-1" data-key="${esc(i.key)}" aria-label="Уменьшить количество: ${esc(i.title)}" ${i.quantity<=1?'disabled':''}>−</button><span>${i.quantity}</span><button type="button" data-quantity="1" data-key="${esc(i.key)}" aria-label="Увеличить количество: ${esc(i.title)}" ${i.quantity>=9?'disabled':''}>+</button></div><strong class="line-price">${money(lineTotal(i))}</strong></div></div><button type="button" class="icon-button" data-remove="${esc(i.key)}" aria-label="Удалить из заказа: ${esc(i.title)}">${icon('close')}</button></article>`).join(''):empty('bag','Путешествие начинается с идеи','Выберите направление, уютный отель или новое впечатление. Мы сохраним ваш выбор здесь.','Найти вдохновение','flights');
 renderHistory();
}
function renderHistory(){
 $('#order-history-list').innerHTML=state.orders.length?state.orders.map(o=>`<article class="order-card"><div class="order-card-header"><div><h3>Заказ <span class="order-id">AA-${esc(o.id.slice(0,8).toUpperCase())}</span></h3><p>${esc(o.name)} · ${new Intl.DateTimeFormat('ru-RU',{dateStyle:'medium',timeStyle:'short'}).format(new Date(o.createdAt))}</p></div><span class="order-status ${o.status==='Отменён'?'cancelled':''}">${o.status==='Отменён'?'Отменён':'Оформлен'}</span></div>${o.items.map(i=>`<div class="order-item"><div>${esc(i.title)}<small>${esc(i.tariff)} · ${prettyDate(i.date)}${i.returnDate?' — '+prettyDate(i.returnDate):''} · ${i.quantity} ${i.type==='Отель'?'ноч.':'чел.'}</small></div><strong>${money(lineTotal(i))}</strong></div>`).join('')}<div class="order-footer"><span class="subtle-note">${o.status==='Отменён'?'Заказ отменён':'Заказ без оплаты'}</span><strong>${money(total(o.items))}</strong>${o.status!=='Отменён'?`<button class="text-button" type="button" data-cancel="${esc(o.id)}">Отменить</button>`:''}</div><div id="cancel-${esc(o.id)}" hidden class="cancel-confirm">Отменить этот заказ?<button type="button" data-confirm-cancel="${esc(o.id)}">Да, отменить</button><button type="button" data-keep-order="${esc(o.id)}">Оставить</button></div></article>`).join(''):`<div class="empty-state"><span class="large-icon">${icon('calendar')}</span><h3>Планы ещё впереди</h3><p>Оформленные заказы появятся здесь. Они сохранятся после перезагрузки страницы.</p></div>`;
}
$('#checkout-button').addEventListener('click',()=>{if(!state.cart.length)return;if(state.cart.some(i=>i.date<localDate())){toast('В заказах есть прошедшая дата. Удалите предложение и выберите его заново.',true);return;}$('#checkout-details').innerHTML=`<p class="checkout-name">Путешественник: ${esc(state.profile)}</p>`+state.cart.map(i=>`<div class="checkout-line"><div>${esc(i.title)}<small>${esc(i.tariff)} · ${prettyDate(i.date)}${i.returnDate?' — '+prettyDate(i.returnDate):''} · ${i.quantity} ${i.type==='Отель'?'ноч.':'чел.'}</small></div><strong>${money(lineTotal(i))}</strong></div>`).join('')+`<div class="checkout-price"><span>Итого</span><strong>${money(total(state.cart))}</strong></div>`;openDialog('payment-modal');});
$('#confirm-order').addEventListener('click',()=>{if(!state.cart.length||state.cart.some(i=>i.date<localDate()))return;const order=makeOrder(state.cart,state.profile);state.orders.unshift(order);state.cart=[];save();count();renderCart();closeDialog('payment-modal');toast(`Заказ AA-${order.id.slice(0,8).toUpperCase()} оформлен. Он сохранён в истории.`);$('#order-history-list').scrollIntoView({behavior:'smooth',block:'start'});});
let registering=false,busy=false;
function accountView(){
 $('#account-form').hidden=!!account;$('#auth-switch').hidden=!!account;$('#account-logout').hidden=!account;
 $('#auth-title').textContent=account?'Ваш профиль':registering?'Регистрация':'Вход';
 $('#account-message').textContent=account?account.name+' · '+account.email:'';
 $('#auth-switch').textContent=registering?'Уже есть аккаунт? Войти':'Создать аккаунт';
 $('#name-row').hidden=!registering;$('#account-name').required=registering;
 $('#account-pass').autocomplete=registering?'new-password':'current-password';
 $('#strength-box').hidden=!registering;$('#account-submit').textContent=registering?'Зарегистрироваться':'Войти';meter();
}
function meter(){const p=$('#account-pass').value,level=strength(p);
 $('#strength-box').dataset.level=p?String(level):'';$('#strength-label').textContent=!p?'Введите пароль': ['Низкий — измените пароль','Средний — усильте пароль','Хороший пароль'][level];
 $('#account-submit').disabled=busy||(registering&&level!==2);}
async function requestAccount(route,data){if(location.protocol==='file:')throw Error('Для входа запустите node server.mjs и откройте http://localhost:3000');const res=await fetch('/api/'+route,data?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}:{cache:'no-store'});const r=await res.json();if(!res.ok)throw Error(r.error||'Не удалось выполнить запрос');return r.user||null;}
function setAccount(u){account=u;storageKey=u?'aspanair-user:'+u.email:'aspanair-state-v1';try{state=cleanState(JSON.parse(localStorage.getItem(storageKey)))}catch{state=cleanState(null)}if(u)state.profile=u.name;count();renderCards();renderTracking();renderCart();}
$('#profile-button').addEventListener('click',()=>{registering=false;$('#account-form').reset();accountView();openDialog('auth-modal');});
$('#auth-switch').onclick=()=>{if(busy)return;registering=!registering;$('#account-pass').value='';accountView();};
$('#account-pass').oninput=meter;
$('#account-form').onsubmit=async e=>{e.preventDefault();if(busy||(registering&&strength($('#account-pass').value)!==2))return;busy=true;meter();try{const u=await requestAccount(registering?'register':'login',{email:$('#account-email').value,password:$('#account-pass').value,name:$('#account-name').value});setAccount(u);$('#account-form').reset();closeDialog('auth-modal');toast('Вы вошли в AspanAir');}catch(err){$('#account-message').textContent=err.message;}finally{busy=false;meter();}};
$('#account-logout').onclick=async()=>{try{await requestAccount('logout',{});setAccount(null);closeDialog('auth-modal');}catch(err){$('#account-message').textContent=err.message;}};
requestAccount('me').then(u=>{if(u)setAccount(u)}).catch(()=>{});

$('#faq-list').innerHTML=faq.map(([q,a],i)=>`<details ${i===0?'open':''}><summary>${q}</summary><p>${a}</p></details>`).join('');
document.addEventListener('click',e=>{
 const close=e.target.closest('[data-close]');if(close){closeDialog(close.dataset.close);return;}
 const track=e.target.closest('[data-track]');if(track){toggleTrack(track.dataset.track);return;}
 const info=e.target.closest('[data-info]');if(info){openInfo(info.dataset.info);return;}
 const flight=e.target.closest('[data-flight]');if(flight){openInfo(flight.dataset.flight,true);return;}
 const qty=e.target.closest('[data-quantity]');if(qty){const item=state.cart.find(i=>i.key===qty.dataset.key);if(!item)return;item.quantity=Math.max(1,Math.min(9,item.quantity+Number(qty.dataset.quantity)));save();count();renderCart();const next=$$('[data-quantity]').find(b=>b.dataset.key===qty.dataset.key&&b.dataset.quantity===qty.dataset.quantity);next?.focus({preventScroll:true});return;}
 const remove=e.target.closest('[data-remove]');if(remove){state.cart=state.cart.filter(i=>i.key!==remove.dataset.remove);save();count();renderCart();toast('Предложение удалено из заказа');return;}
 const cancel=e.target.closest('[data-cancel]');if(cancel){const box=document.getElementById('cancel-'+cancel.dataset.cancel);box.hidden=!box.hidden;if(!box.hidden)box.querySelector('button').focus();return;}
 const confirmed=e.target.closest('[data-confirm-cancel]');if(confirmed){const order=state.orders.find(o=>o.id===confirmed.dataset.confirmCancel);if(order){order.status='Отменён';save();renderHistory();toast('Заказ отменён');}return;}
 const keep=e.target.closest('[data-keep-order]');if(keep){document.getElementById('cancel-'+keep.dataset.keepOrder).hidden=true;return;}
 const emptyAction=e.target.closest('[data-empty-action]');if(emptyAction){if(emptyAction.dataset.emptyAction==='search'){$('#flight-search-form').scrollIntoView({behavior:'smooth'});$('#destination').focus({preventScroll:true});}else go(emptyAction.dataset.emptyAction);return;}
 const nav=e.target.closest('a[data-tab]');if(nav&&location.hash==='#'+nav.dataset.tab){e.preventDefault();switchTab(nav.dataset.tab);}
});
document.addEventListener('error',e=>{if(e.target.tagName==='IMG'&&!e.target.dataset.fallback){e.target.dataset.fallback='1';e.target.src='./assets/hero.jpg';}},true);
renderCards();renderTracking();renderCart();count();switchTab(location.hash.slice(1)||'flights',false);
if(!storageAvailable)toast('Сохранение в этом браузере недоступно. Изменения сохранятся только до закрытия страницы.',true);

})();
