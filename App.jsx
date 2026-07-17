import React, { useState } from "react";
import { Home, Ticket, Users, BarChart3, ArrowLeft, RefreshCw, Check } from "lucide-react";

const presets = [
  { text: "眠い", ready: true },
  { text: "時間がない", ready: false, days: 2 },
  { text: "疲れている", ready: true },
  { text: "気分が乗らない", ready: false, days: 1 },
  { text: "完璧にできそうにない", ready: true },
  { text: "今日はもう頑張った", ready: true },
];
const feed = [
  "参考文献を探していたら、関係ない論文に詳しくなった",
  "パソコンは開いた。心はまだ開いていない",
  "完璧な書き出しが来るまで待機していた",
];
const results=["しっかりできた","少しできた","最低ラインだけできた","意識的に休んだ","できなかった","記録なし"];
const actions=["卒論ファイルを開く","1分だけ取り組む","準備だけする","今日は意識的に休む"];

function Meter({ value=57 }) {
  const label=value<50?"休みが多め":value<=70?"ちょうどいい":"頑張りが多め";
  return <div className="card meter-card"><div className="meter-head"><div><small>今週のペース</small><strong>{value}%</strong></div><b>{label}</b></div><div className="meter"><i className="low"/><i className="good"/><i className="high"/><span style={{left:`calc(${value}% - 6px)`}}/></div><div className="meter-label"><em>休み多め</em><em>ちょうどいい</em><em>頑張り多め</em></div></div>
}
function Header({title,back,onBack}) { return <header>{back&&<button className="icon" onClick={onBack}><ArrowLeft/></button>}<h1>{title}</h1></header> }
function TicketCard({item,selected,onClick}) { return <button onClick={onClick} className={`ticket-card ${selected?'selected':''} ${item.ready?'':'charging'}`}><div><b>{item.text}</b><small>{item.ready?'使用できます':`チャージ中・あと${item.days}日`}</small></div>{item.ready?<Ticket/>:<RefreshCw/>}</button> }

export default function App(){
  const [tab,setTab]=useState("home"),[view,setView]=useState("home"),[step,setStep]=useState(0);
  const [result,setResult]=useState(""),[excuse,setExcuse]=useState(null),[action,setAction]=useState("卒論ファイルを開く");
  const [locked,setLocked]=useState(null),[checked,setChecked]=useState(false),[likes,setLikes]=useState([18,34,26]);
  const openCheckin=()=>{setStep(0);setView("checkin")};
  const back=()=>setView("home");

  if(view==="checkin") return <div className="app"><Header title="今日のチェックイン" back onBack={back}/><main><div className="progress"><i style={{width:`${(step+1)*33.33}%`}}/></div>{step===0&&<><p className="eyebrow">昨日の記録</p><h2>昨日はどこまでできた？</h2><div className="stack">{results.map(x=><button className={`choice ${result===x?'selected':''}`} onClick={()=>setResult(x)} key={x}>{x}{result===x&&<Check/>}</button>)}</div></>}{step===1&&<><p className="eyebrow">言い訳チケット</p><h2>今日使いそうな言い訳は？</h2><p className="muted">チャージ中のチケットは、まだ使えません。</p><div className="stack">{presets.map((x,i)=><TicketCard key={i} item={x} selected={excuse?.text===x.text} onClick={()=>x.ready?setExcuse(x):setLocked(x)}/>)}</div></>}{step===2&&<><p className="eyebrow">今日の最低ライン</p><h2>その言い訳が出ても、どこまでならできそう？</h2><div className="stack">{actions.map(x=><button className={`choice ${action===x?'selected':''}`} onClick={()=>setAction(x)} key={x}>{x}{action===x&&<Check/>}</button>)}</div><div className="card summary"><small>今日の言い訳</small><b>{excuse?.text}</b><hr/><small>それでもやること</small><b>{action}</b></div></>}</main><div className="bottom-action"><button className="primary" disabled={(step===0&&!result)||(step===1&&!excuse)} onClick={()=>step<2?setStep(step+1):(setChecked(true),setView("home"),setTab("home"))}>{step<2?'次へ':'今日の作戦を決める'}</button></div>{locked&&<div className="modal"><div className="sheet"><h3>この言い訳チケットはチャージ中</h3><p>「{locked.text}」は、あと{locked.days}日でまた使えます。</p><button className="secondary" onClick={()=>setLocked(null)}>別の言い訳を考える</button><button className="primary" onClick={()=>{setLocked(null);setView('now')}}>今ちょっとだけやる</button></div></div>}</div>;

  if(view==="now") return <div className="app"><Header title="今ちょっとだけやる" back onBack={back}/><main><p className="eyebrow">今日の最低ライン</p><h2 className="big">卒論ファイルを開く</h2><div className="card notice"><b>ここまでできたら記録に残ります。</b><p>時間は測りません。終わったら結果だけ選んでください。</p></div><div className="stack actions"><button className="primary" onClick={()=>{setChecked(true);setView('home')}}>できた</button><button className="secondary" onClick={()=>{setView('checkin');setStep(1)}}>やってみたが難しかった</button></div></main></div>;

  let content;
  if(tab==="home") content=<><Header title="みんだめ"/><main><p className="eyebrow">今日</p><h2 className="big">卒業論文を書く</h2><Meter/>{!checked?<><h3 className="section-title">今日の作戦を決める</h3><p className="muted">昨日の確認と言い訳選び。約30秒。</p><button className="primary" onClick={openCheckin}>今日のチェックイン</button></>:<div className="stack after"><div className="card"><small>今日の言い訳チケット</small><b>{excuse?.text||'言い訳を使わず着手'}</b></div><div className="card"><small>今日の最低ライン</small><b>{action}</b></div><button className="primary" onClick={()=>setView('now')}>今ちょっとだけやる</button></div>}</main></>;
  if(tab==="feed") content=<><Header title="みんなの言い訳"/><main><p className="muted intro">同じジャンルの人が、今日選んだ言い訳。</p><div className="stack">{feed.map((x,i)=><div className="card feed" key={x}><div className="meta"><span>勉強</span><span>{i+1}時間前</span></div><p>{x}</p><button className="pill" onClick={()=>setLikes(likes.map((v,j)=>j===i?v+1:v))}>わかる {likes[i]}</button></div>)}</div></main></>;
  if(tab==="tickets") content=<><Header title="言い訳チケット一覧"/><main><p className="muted intro">言い訳のパターンと、現在のチャージ状況。</p><div className="stack">{presets.map((x,i)=><TicketCard item={x} onClick={()=>{}} key={i}/>)}</div></main></>;
  if(tab==="stats") content=<><Header title="今のペース"/><main><Meter/><div className="stats">{[["今月開いた日","18日"],["最低ライン","9回"],["翌日に戻った","4回"],["すぐ行動した","3回"]].map(([a,b])=><div className="card" key={a}><small>{a}</small><strong>{b}</strong></div>)}</div><div className="card notice"><b>ちょうどいいペース</b><p>今週もこのくらいで。増やす必要はありません。</p></div></main></>;
  return <div className="app">{content}<nav>{[["home",Home,"ホーム"],["feed",Users,"みんな"],["tickets",Ticket,"チケット"],["stats",BarChart3,"記録"]].map(([id,Icon,label])=><button key={id} className={tab===id?'active':''} onClick={()=>{setTab(id);setView('home')}}><Icon/><span>{label}</span></button>)}</nav></div>
}
