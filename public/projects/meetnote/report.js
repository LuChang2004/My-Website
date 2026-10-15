const $ = (id) => document.getElementById(id);
const num = (n) => Number(n).toLocaleString('zh-CN');
const pct = (n,d=1) => (100*n).toFixed(d)+'%';
const pp = (n) => (100*n).toFixed(2)+' pp';
const money = (n) => '¥'+num(Math.round(n));
const labels = {Organic:'自然流量',Referral:'用户推荐','Search Ads':'搜索广告','Social Ads':'社交广告',Unknown:'归因缺失'};
const colors = {Organic:'#367c71',Referral:'#97ac93','Search Ads':'#253e47','Social Ads':'#ed8e61',Unknown:'#d3d9d0'};
const point = (x,y) => `${x.toFixed(1)},${y.toFixed(1)}`;
let report, sortKey='users', sortDirection=-1;
function renderChannels(){
  const period=$('period').value;
  const list=(period==='All'?report.channels:report.period.filter(x=>x.period===period)).slice();
  list.sort((a,b)=>sortDirection*((sortKey==='paid_rate'?a.paid/a.users:a[sortKey])-(sortKey==='paid_rate'?b.paid/b.users:b[sortKey])));
  $('channels').innerHTML=`<thead><tr><th>渠道</th><th><button data-sort="users">注册人数 ↕</button></th><th>7 天激活率</th><th>第 2 周回访</th><th><button data-sort="paid_rate">30 天付费率 ↕</button></th><th>付费人数</th>${period==='All'?'<th>推广 CPA</th>':''}</tr></thead><tbody>${list.map(x=>`<tr><td><span class="channel-name"><i class="channel-dot" style="background:${colors[x.channel]}"></i>${labels[x.channel]}</span></td><td>${num(x.users)}</td><td>${pct(x.activated/x.users)}</td><td>${pct(x.retained/x.users)}</td><td><b>${pct(x.paid/x.users)}</b>${x.paid_ci?`<small>95% CI ${pct(x.paid_ci[0])}–${pct(x.paid_ci[1])}</small>`:''}</td><td>${num(x.paid)}</td>${period==='All'?`<td>${x.spend?money(x.spend/x.paid):'— 未建模'}</td>`:''}</tr>`).join('')}</tbody>`;
  $('channels').querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{const k=b.dataset.sort;sortDirection=sortKey===k?-sortDirection:-1;sortKey=k;renderChannels()});
}
function renderTrend(){
  const m=report.monthly,W=880,H=260,left=44,right=830,top=25,bottom=215;
  let svg=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg"><title>注册由 900 增至 2500，付费率按月波动并在 Q2 降低</title>`;
  [0,1000,2000,3000].forEach(n=>{const y=bottom-(n/3000)*(bottom-top);svg+=`<line x1="${left}" x2="${right}" y1="${y}" y2="${y}" stroke="#e7ece4"/><text x="${left-10}" y="${y+4}" text-anchor="end" font-size="10" fill="#8c978f">${num(n)}</text><text x="${right+13}" y="${y+4}" font-size="10" fill="#b98464">${n/200}%</text>`});
  const pts=[];
  m.forEach((x,i)=>{const cx=left+70+i*131,y=bottom-x.users/3000*(bottom-top),py=bottom-x.paid/x.users/.15*(bottom-top);pts.push(point(cx,py));svg+=`<rect x="${cx-25}" y="${y}" width="50" height="${bottom-y}" rx="3" fill="${i<3?'#b6c4b1':'#617e6f'}"><title>${x.month} 注册 ${num(x.users)}</title></rect><text x="${cx}" y="${y-9}" text-anchor="middle" font-size="11" fill="#647965">${num(x.users)}</text><text x="${cx}" y="${bottom+25}" text-anchor="middle" font-size="11" fill="#79847a">${i+1} 月</text>`});
  svg+=`<polyline points="${pts.join(' ')}" stroke="#e88050" stroke-width="2.5" fill="none"/>`;
  m.forEach((x,i)=>{const [cx,y]=pts[i].split(',');svg+=`<circle cx="${cx}" cy="${y}" r="4" stroke="#fff" stroke-width="2" fill="#e88050"><title>${x.month} 付费率 ${pct(x.paid/x.users,2)}</title></circle>`});
  svg+='</svg>';
  $('trend').innerHTML=svg;
  $('trend-note').innerHTML=m.map(x=>`${Number(x.month.slice(-2))} 月：${num(x.paid)} 人付费 / ${pct(x.paid/x.users,2)}`).join('　 ·　 ');
}
function scenario(){
  const r=Number($('rescue').value)/100,o=report.overall,n=o.uploaded-o.succeeded,rate=o.activated/o.succeeded;
  $('rescue-value').textContent=pct(r,0);
  $('scenario-count').textContent=num(Math.round(n*r*rate));
  $('scenario-formula').textContent=`${num(n)} 位最终未成功用户 × ${pct(r,0)} 假设挽回比例 × ${pct(rate)} 成功用户激活率。假设挽回用户与成功用户同样容易激活，实际可能更低。`;
}
async function init(){
  const response=await fetch('report.json');if(!response.ok)throw Error('数据加载失败');report=await response.json();
  const o=report.overall,d=report.decomposition;
  $('headline').textContent=`转化率下降 ${pp(Math.abs(d.q2-d.q1))}，主要与渠道结构变化有关。`;
  $('summary').textContent=`Q1 → Q2，注册人数从 ${num(d.n1)} 增至 ${num(d.n2)}（+${pct(d.n2/d.n1-1)}），付费人数从 ${num(Math.round(d.n1*d.q1))} 增至 ${num(Math.round(d.n2*d.q2))}，30 天付费率从 ${pct(d.q1,2)} 降至 ${pct(d.q2,2)}。按 Q1 转化率为基准分解，渠道构成项为 ${pp(d.mix)}。建议先审视扩投渠道，同时验证长录音可靠性。`;
  const kpis=[['注册用户',num(o.users),'6 个完整成熟月度队列'],['30 天付费率',pct(o.paid/o.users,2),`${num(o.paid)} 位首购用户，含后续退款`],['7 天激活率',pct(o.activated/o.users,2),'至少编辑、导出或分享一次'],['30 天净收款',money(o.revenue),'首购减窗口内退款，非 MRR']];
  $('kpis').innerHTML=kpis.map(([a,b,c])=>`<div class="kpi"><span>${a}</span><strong>${b}</strong><small>${c}</small></div>`).join('');renderTrend();
  $('mix-chart').innerHTML=['Q1','Q2'].map(p=>{const xs=report.period.filter(x=>x.period===p),n=xs.reduce((s,x)=>s+x.users,0);return `<div class="stack-row"><div><b>${p} / ${p==='Q1'?'1—3':'4—6'} 月</b><span>${num(n)} 人</span></div><div class="stack">${xs.map(x=>`<span style="width:${x.users/n*100}%;background:${colors[x.channel]}" title="${labels[x.channel]} ${pct(x.users/n)}"></span>`).join('')}</div></div>`}).join('')+`<div class="legend">${Object.keys(labels).map(c=>`<span><i style="background:${colors[c]}"></i>${labels[c]}</span>`).join('')}</div>`;
  const social1=report.period.find(x=>x.period==='Q1'&&x.channel==='Social Ads'),social2=report.period.find(x=>x.period==='Q2'&&x.channel==='Social Ads');
  $('mix-note').textContent=`社交广告注册占比从 ${pct(social1.users/d.n1)} 升至 ${pct(social2.users/d.n2)}，其渠道内付费率分别为 ${pct(social1.paid/social1.users)} 和 ${pct(social2.paid/social2.users)}。低转化渠道的扩张拉低了整体平均值。`;
  $('decomp').innerHTML=[['整体付费率变化',pp(d.q2-d.q1)],['渠道构成项',pp(d.mix)],['渠道内变化项',pp(d.within)]].map(([k,v],i)=>`<div class="decomp-row ${i===1?'highlight':''}"><span>${k}</span><strong>${v}</strong></div>`).join('');
  $('period').onchange=renderChannels;renderChannels();
  const s=report.channels.find(x=>x.channel==='Social Ads'),search=report.channels.find(x=>x.channel==='Search Ads');
  $('economics').textContent=`社交广告注册成本约 ${money(s.spend/s.users)}，低于搜索广告的 ${money(search.spend/search.users)}；但每位付费用户的推广 CPA 为 ${money(s.spend/s.paid)}，高于搜索广告的 ${money(search.spend/search.paid)}。30 天净收款 / 推广支出分别为 ${pct(s.revenue/s.spend)} 与 ${pct(search.revenue/search.spend)}。`;
  const stages=[['注册',o.users],['上传录音',o.uploaded],['生成成功',o.succeeded],['完成价值操作',o.activated]];
  $('funnel').innerHTML=stages.map(([label,n],i)=>`<div class="funnel-row"><div class="funnel-header"><span>0${i+1} / ${label}</span><b>${num(n)} <span style="color:#89948a;font-weight:400"> / ${pct(n/o.users)}</span></b></div><div class="funnel-bar"><span style="width:${n/o.users*100}%;opacity:${1-i*.13}"></span></div><small>${i?`相对上一步减少 ${num(stages[i-1][1]-n)} 人；到达比例 ${pct(n/stages[i-1][1])}`:'分母：全部注册用户'}</small></div>`).join('');
  $('cohorts').innerHTML=`<div class="table-scroll"><table><thead><tr><th>注册月 / 人数</th><th>7 天激活</th><th>第 2 周回访</th><th>30 天付费</th></tr></thead><tbody>${report.monthly.map(x=>`<tr><td>${x.month}<small>n = ${num(x.users)}</small></td>${['activated','retained','paid'].map(k=>`<td><span class="heat" style="background:rgba(54,124,113,${.05+x[k]/x.users*.65})">${pct(x[k]/x.users)}</span></td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  $('reliability').innerHTML=report.reliability.map(x=>`<div class="reliability-row"><div><span>${x.period} · ${x.length.startsWith('Long')?'长录音':'短录音'}</span><b>${pct(x.failures/x.tasks)}</b></div><div class="reliability-track"><span style="width:${x.failures/x.tasks/.30*100}%;background:${x.period==='Q2'&&x.length.startsWith('Long')?'#e68b5b':'#779786'}"></span></div><small>${num(x.failures)} 次失败 / ${num(x.tasks)} 个任务</small></div>`).join('')+'<p class="body-note">横轴统一范围：0—30% 任务失败率</p>';
  const l1=report.reliability.find(x=>x.period==='Q1'&&x.length.startsWith('Long')),l2=report.reliability.find(x=>x.period==='Q2'&&x.length.startsWith('Long'));
  $('reliability-title').textContent=`长录音失败率：${pct(l1.failures/l1.tasks)} → ${pct(l2.failures/l2.tasks)}`;
  $('experience').innerHTML=`<thead><tr><th>用户类型</th><th>首次任务</th><th>上传人数</th><th>最终生成成功率</th><th>第 2 周回访率</th><th>30 天付费率</th></tr></thead><tbody>${report.experience.map(x=>`<tr><td>${x.segment==='Team'?'团队':'个人'}</td><td>${x.first_status==='failed'?'失败':'成功'}</td><td>${num(x.users)}</td><td>${pct(x.succeeded/x.users)}</td><td>${pct(x.retained/x.users)}</td><td>${pct(x.paid/x.users)} <small>${x.paid} / ${x.users}</small></td></tr>`).join('')}</tbody>`;
  const f=report.feedback.find(x=>x.category==='generation_failure');
  $('feedback-note').textContent=`${report.quality.feedback} 条模板生成的反馈中，${f.n} 条涉及生成失败。模拟机制让失败用户更容易反馈，因此 ${pct(f.n/report.quality.feedback)} 的反馈占比不能视作总体故障率。`;
  $('rescue').oninput=scenario;scenario();
  const p1=.25,p2=.20,p=(p1+p2)/2;
  const n=Math.ceil(((1.96*Math.sqrt(2*p*(1-p))+.84*Math.sqrt(p1*(1-p1)+p2*(1-p2)))/(p1-p2))**2);
  $('power').textContent=`规划假设：首个长任务失败率 25% → 20%（下降 5 pp），双侧 α=0.05、功效 80%，两比例正态近似约 ${num(n)} 人/组；预留 10% 无效样本约 ${num(Math.ceil(n/.9))} 人/组。25% 是参考任务率的规划值，需先核对用户首任务基线。`;
  const q=report.quality;
  $('quality').innerHTML=[['原始事件记录',num(q.raw_events)],['重复 event_id（完全重复）',`${num(q.duplicates)} 条 · 去重`],['无对应用户的事件',`${num(q.orphans)} 条 · 排除`],['清洗后事件',num(q.clean_events)],['渠道缺失',`${q.missing_channels} 人 · 保留 Unknown`]].map(([k,v])=>`<div class="quality-row"><span>${k}</span><b>${v}</b></div>`).join('')+`<div class="checks">✓ ${Object.values(report.checks).filter(Boolean).length} / ${Object.keys(report.checks).length} 项数据一致性检查通过</div>`;
  const sql=await fetch('analysis.sql');$('sql').textContent=await sql.text();
  await renderNotebookFigures();
  document.documentElement.dataset.ready='true';
}
let figureDimensions={};
function notebookFigure(name,caption){
  const [width,height]=figureDimensions[name]||[1800,1000];
  return `<figure class="notebook-figure"><a href="figures/${name}.png" target="_blank" rel="noopener"><img src="figures/${name}.png" width="${width}" height="${height}" alt="${caption}" loading="lazy"></a><figcaption>${caption} <a href="figures/${name}.svg" download>下载 SVG</a> · <a href="figures/${name}.png" download>下载 PNG</a></figcaption></figure>`;
}
async function renderNotebookFigures(){
  const res=await fetch('clustering.json');
  if(!res.ok)throw Error('Notebook 分析结果尚未生成');
  const c=await res.json();
  figureDimensions=c.figure_dimensions||{};
  $('trend').innerHTML=notebookFigure('01_monthly_growth','图 1：月度注册规模与付费率，分别使用人数和比例子图。');
  $('funnel').innerHTML=notebookFigure('03_activation_funnel','图 3：前 7 天用户级价值触达漏斗。');
  $('cohorts').innerHTML=notebookFigure('04_cohort_heatmap','图 4：按注册月份比较激活、回访和付费，不是逐周留存矩阵。');
  $('reliability').innerHTML=notebookFigure('05_task_distributions','图 5：分季度的失败率，以及不同长度录音的任务耗时箱线图。');
  $('channel-figure').innerHTML=notebookFigure('02_channel_heatmap','图 2：渠道行为热力图，分母均为该渠道全部注册用户。');
  $('cluster-summary').textContent=`对 ${num(c.n_clustered)} 位前 7 天有上传的用户进行 K-means 聚类；${num(c.n_excluded)} 位未上传用户作为独立业务状态，不纳入模型。在 K=2—6 中，轮廓系数最高的是 K=${c.best_k}（${c.silhouette.toFixed(3)}）。PCA 前两个主成分合计解释 ${pct(c.pca_variance.reduce((a,b)=>a+b,0))} 的特征方差。`;
  $('cluster-selection').innerHTML=notebookFigure('06_cluster_selection','图 6：用轮廓系数选择 K，类内平方和辅助判断。');
  $('cluster-pca').innerHTML=notebookFigure('07_cluster_pca','图 7：五维行为特征的二维 PCA 投影；颜色为聚类编号，不是预设用户类型。');
  $('cluster-profiles').innerHTML=notebookFigure('08_cluster_profiles','图 8：标准化特征均值，红色表示高于上传用户平均水平，蓝色表示低于平均。');
  $('cluster-outcomes').innerHTML=notebookFigure('09_cluster_outcomes','图 9：聚类后的回访和新增付费比较；误差线为 Wilson 95% 区间。');
  $('cluster-profile-table').innerHTML=`<thead><tr><th>群体</th><th>人数</th><th>平均任务数</th><th>录音时长（分钟）</th><th>任务耗时（秒）</th><th>首次失败率</th><th>7 天激活率</th></tr></thead><tbody>${c.profiles.map(x=>`<tr><td>群体 ${x.cluster}</td><td>${num(x['人数'])}</td><td>${x['任务数'].toFixed(2)}</td><td>${x['首次录音分钟'].toFixed(1)}</td><td>${x['首次任务秒数'].toFixed(1)}</td><td>${pct(x['首次失败'])}</td><td>${pct(x['7天激活'])}</td></tr>`).join('')}</tbody>`;
  $('cluster-stability').textContent=`在相同数据上更换 3 个随机初始化种子，调整兰德指数（ARI）分别为 ${c.initialization_ari.map(x=>x.toFixed(3)).join('、')}。这只反映初始化稳定性，不代表跨时间或真实用户的稳定性。${c.rule_ari===1?' 本次聚类与“首次成功 / 首次失败”的简单规则完全一致（ARI=1），没有提供超出该规则的新分群。因此更适合使用这条简单规则开展访谈和体验分析，而不是把聚类包装成新的市场客群发现。':''}`;
}
$('print').onclick=()=>window.print();
document.querySelector('.back').target='_top';
const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))}}},{rootMargin:'-10% 0px -65% 0px',threshold:0});
document.querySelectorAll('main>section').forEach(s=>observer.observe(s));
init().catch(e=>{$('error').hidden=false;$('error').textContent='报告数据未能加载，请通过本地 HTTP 服务打开此页面。'+e.message;console.error(e)});
