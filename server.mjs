function strength(p){
 const types=[/\p{Ll}/u,/\p{Lu}/u,/\p{N}/u,/[^\p{L}\p{N}\s]/u].filter(r=>r.test(p)).length;
 const n=Array.from(p).length, diverse=new Set(p.toLowerCase()).size>=6;
 const common=/(password|qwerty|пароль|123456|йцукен)/iu.test(p);
 if(n<8||!diverse||common)return 0;
 return n>=12&&types>=3?2:1;
}

const enc=new TextEncoder(),hex=b=>Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join(''),random=n=>hex(crypto.getRandomValues(new Uint8Array(n))),digest=async s=>hex(await crypto.subtle.digest('SHA-256',enc.encode(s)));
async function hash(p,s){let key=await crypto.subtle.importKey('raw',enc.encode(p),'PBKDF2',false,['deriveBits']);return hex(await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:enc.encode(s),iterations:100000},key,256));}
const reply=(o,status=200,cookie)=>Response.json(o,{status,headers:{'Cache-Control':'no-store',...(cookie?{'Set-Cookie':cookie}:{})}});
const ck=(v,age)=>'__Host-aspan='+v+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+age;
export async function api(req,env){
 const url=new URL(req.url),db=env.BUCKET,route=url.pathname.slice(5),token=(req.headers.get('cookie')||'').match(/(?:^|;\s*)__Host-aspan=([0-9a-f]{64})(?:;|$)/)?.[1];
 const sessionKey=token?'sessions/'+await digest(token):null;
 if(route==='me'&&req.method==='GET'){let item=sessionKey&&await db.get(sessionKey),s=item&&await item.json();return reply({user:s&&s.exp>Date.now()?s.user:null});}
 if(req.method!=='POST'||req.headers.get('origin')!==url.origin||!req.headers.get('content-type')?.startsWith('application/json'))return reply({error:'Недопустимый запрос'},403);
 if(route==='logout'){if(sessionKey)await db.delete(sessionKey);return reply({},200,ck('',0));}
 if(!['register','login'].includes(route))return reply({},404);
 if(Number(req.headers.get('content-length'))>4096)return reply({},413);
 const raw=await req.text();if(raw.length>4096)return reply({},413);let d;try{d=JSON.parse(raw)}catch{return reply({},400)}
 const email=String(d?.email||'').trim().toLowerCase(),p=d?.password,name=String(d?.name||'').trim();
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254||typeof p!=='string'||p.length>256||!p)return reply({error:'Проверьте почту и пароль'},400);
 if(route==='register'&&(!name||name.length>40||strength(p)!==2))return reply({error:'Введите имя и выберите хороший пароль'},400);
 const key='accounts/'+await digest(email),limit='attempts/'+await digest((req.headers.get('CF-Connecting-IP')||'local')+':'+Math.floor(Date.now()/600000));
 let prior=await db.get(limit),n=prior?Number(await prior.text()):0;
 if(n>=30||!await db.put(limit,String(n+1),{onlyIf:prior?{etagMatches:prior.etag}:{etagDoesNotMatch:'*'}}))return reply({error:'Слишком много попыток. Попробуйте позже.'},429);
 let user;
 if(route==='register'){let salt=random(16);user={email,name};let ok=await db.put(key,JSON.stringify({user,salt,hash:await hash(p,salt)}),{onlyIf:{etagDoesNotMatch:'*'}});if(!ok)return reply({error:'Не удалось создать аккаунт. Попробуйте войти.'},409);}
 else{let row=await db.get(key),a=row&&await row.json();let check=await hash(p,a?.salt||'00000000000000000000000000000000');if(!a||a.hash!==check)return reply({error:'Неверная почта или пароль'},401);user=a.user;}
 let t=random(32);await db.put('sessions/'+await digest(t),JSON.stringify({user,exp:Date.now()+604800000}));return reply({user},200,ck(t,604800));
}

import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const app={async fetch(req,env){const path=new URL(req.url).pathname;if(path.startsWith('/api/'))return api(req,env);const name=path==='/'?'index.html':path.slice(1);if(!/^(index\.html|style\.css|script\.js|assets\/[a-zA-Z0-9_-]+\.(jpg|svg|ttf|css))$/.test(name))return new Response('',{status:404});try{return new Response(await readFile(new URL(name,import.meta.url)),{headers:{'content-type':({html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',jpg:'image/jpeg',svg:'image/svg+xml',ttf:'font/ttf'})[name.split('.').pop()]}})}catch{return new Response('',{status:404})}}};
const rows=new Map();
const BUCKET={async get(k){return rows.get(k)||null},async put(k,v,o={}){const prev=rows.get(k),cond=o.onlyIf||{};if((cond.etagDoesNotMatch==='*'&&prev)||(cond.etagMatches&&prev?.etag!==cond.etagMatches))return null;let row={etag:crypto.randomUUID(),text:async()=>v,json:async()=>JSON.parse(v)};rows.set(k,row);return row},async delete(k){rows.delete(k)}};
createServer(async(req,res)=>{try{const parts=[];for await(const x of req)parts.push(x);const r=await app.fetch(new Request(new URL(req.url,'http://localhost:3000'),{method:req.method,headers:req.headers,...(parts.length?{body:Buffer.concat(parts)}:{})}),{BUCKET});res.writeHead(r.status,Object.fromEntries(r.headers));res.end(Buffer.from(await r.arrayBuffer()))}catch{res.writeHead(500);res.end('Local server error')}}).listen(3000,'127.0.0.1',()=>console.log('AspanAir: http://localhost:3000'));
