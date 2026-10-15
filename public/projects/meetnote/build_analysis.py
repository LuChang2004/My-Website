"""Reproduce synthetic raw CSVs -> SQLite cleaning -> SQL analysis -> report JSON.
Python 3 standard library only. Run from any directory; seed 20261014.
"""
from pathlib import Path
import csv, json, random, sqlite3, math, zipfile
from datetime import datetime, timedelta

ROOT = Path(__file__).resolve().parent
DATA = ROOT / 'data'
DATA.mkdir(exist_ok=True)
rng = random.Random(20261014)
ASOF = datetime(2026, 8, 1)
rows = {k: [] for k in ['users', 'events', 'tasks', 'payments', 'spend', 'feedback']}
channels = ['Organic', 'Referral', 'Search Ads', 'Social Ads']
uid = 0
def event(u, t, kind):
    if t < ASOF:
        rows['events'].append(dict(event_id=f'E{len(rows["events"])+1:07}', user_id=u, event_time=t.isoformat(), event_name=kind))
for month, count in enumerate([900, 1200, 1500, 1800, 2100, 2500], 1):
    weights = [.35,.20,.30,.15] if month <= 3 else [.17,.10,.23,.50]
    for _ in range(count):
        uid += 1
        u = f'U{uid:05}'
        signup = datetime(2026, month, rng.randint(1,28), rng.randrange(24), rng.randrange(60))
        channel = rng.choices(channels, weights)[0]
        team = rng.random() < (.37 if channel == 'Referral' else .19)
        intent = rng.random()
        rows['users'].append(dict(user_id=u, registered_at=signup.isoformat(), channel=channel if rng.random()>.012 else '', segment='Team' if team else 'Individual'))
        event(u, signup, 'signup')
        upload_p = {'Organic':.80,'Referral':.87,'Search Ads':.72,'Social Ads':.40}[channel]
        if intent > upload_p: continue
        first = signup + timedelta(minutes=rng.randint(5,1800))
        duration = rng.randint(4,100)
        failed = rng.random() < (.28 if duration>60 and month>=4 else .11 if duration>60 else .045)
        success = False
        for attempt in range(2 if failed and rng.random()<.38 else 1):
            start = first + timedelta(minutes=attempt*20)
            fail = failed if attempt == 0 else rng.random()<.12
            latency = rng.randint(30,110)+duration*rng.randint(2,5)
            end = start+timedelta(seconds=latency)
            rows['tasks'].append(dict(task_id=f'T{len(rows["tasks"])+1:06}', user_id=u, started_at=start.isoformat(), completed_at=end.isoformat(), audio_minutes=duration, latency_seconds=latency, status='failed' if fail else 'success', error_type='timeout' if fail else ''))
            event(u,start,'upload')
            if not fail:
                success=True
                event(u,end,'generation_success')
                event(u,end+timedelta(minutes=2),'view')
                break
        used = success and rng.random() < (.88 if team else .72)
        if used: event(u,end+timedelta(minutes=rng.randint(3,40)),rng.choice(['edit','export','share']))
        retained = rng.random() < ((.52 if team else .31) if used else .12 if success else .045)
        if retained: event(u,signup+timedelta(days=rng.randint(7,13),hours=2),'return_session')
        pay_p = (.36 if team else .17) if used else .045 if success else .008
        if channel == 'Social Ads': pay_p *= .55
        if rng.random() < pay_p:
            pay_time = signup+timedelta(days=rng.randint(1,29),hours=1)
            pay_time = max(pay_time,end+timedelta(minutes=50))
            amount = 149 if team else 49
            rows['payments'].append(dict(payment_id=f'P{len(rows["payments"])+1:05}', user_id=u, paid_at=pay_time.isoformat(), amount=amount, status='paid', plan='Team' if team else 'Pro'))
            event(u,pay_time,'payment')
            if rng.random()<.12:
                rows['payments'].append(dict(payment_id=f'P{len(rows["payments"])+1:05}',user_id=u,paid_at=(pay_time+timedelta(days=2)).isoformat(),amount=-amount,status='refund',plan='Team' if team else 'Pro'))
        if rng.random() < (.40 if not success else .055):
            category = 'generation_failure' if not success else 'editing_effort' if not used else 'positive'
            text = {'generation_failure':'录音上传后没有拿到纪要，希望能重试并保留文件。','editing_effort':'内容还需要调整，希望更方便地编辑重点。','positive':'能导出纪要，方便会后整理。'}[category]
            rows['feedback'].append(dict(feedback_id=f'F{len(rows["feedback"])+1:05}',user_id=u,created_at=(end+timedelta(hours=3)).isoformat(),category=category,text=text))
    for ch in channels:
        n = sum(x['registered_at'][5:7]==f'{month:02}' and x['channel']==ch for x in rows['users'])
        rows['spend'].append(dict(month=f'2026-{month:02}',channel=ch,spend=round(n*({'Organic':0,'Referral':0,'Search Ads':18,'Social Ads':12}[ch])*rng.uniform(.93,1.07),2)))

# Explicit ingestion defects: duplicate event IDs and orphan events.
rows['events'] += [dict(x) for x in rng.sample(rows['events'],250)]
for i in range(12): rows['events'].append(dict(event_id=f'ORPHAN{i}',user_id='U99999',event_time='2026-05-01T12:00:00',event_name='view'))
for name, records in rows.items():
    with (DATA/f'{name}.csv').open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.DictWriter(f,fieldnames=list(records[0]));w.writeheader();w.writerows(records)
db=sqlite3.connect(':memory:');db.row_factory=sqlite3.Row
for name, records in rows.items():
    cols=list(records[0]);db.execute(f'CREATE TABLE raw_{name} ({",".join(c+" TEXT" for c in cols)})')
    db.executemany(f'INSERT INTO raw_{name} VALUES ({",".join("?" for _ in cols)})',[[str(x[c]) for c in cols] for x in records])
sql=(ROOT/'analysis.sql').read_text()
db.executescript(sql)
def q(s): return [dict(x) for x in db.execute(s)]
group='COUNT(*) users, SUM(uploaded) uploaded, SUM(succeeded) succeeded, SUM(activated) activated, SUM(retained) retained, SUM(paid) paid, SUM(revenue) revenue'
monthly=q(f'SELECT month,{group} FROM user_metrics GROUP BY month')
channel=q(f'SELECT channel,{group} FROM user_metrics GROUP BY channel')
period=q(f'SELECT period,channel,{group} FROM user_metrics GROUP BY period,channel')
for x in channel:
    x['spend']=q(f"SELECT SUM(CAST(spend AS REAL)) value FROM raw_spend WHERE channel='{x['channel']}'")[0]['value'] or 0
quality=q('SELECT status,COUNT(*) tasks FROM raw_tasks GROUP BY status')
reliability=q("SELECT CASE WHEN substr(started_at,6,2)<='03' THEN 'Q1' ELSE 'Q2' END period, CASE WHEN CAST(audio_minutes AS REAL)>60 THEN 'Long >60min' ELSE 'Short ≤60min' END length,COUNT(*) tasks,SUM(status='failed') failures FROM raw_tasks GROUP BY period,length")
experience=q(f'SELECT first_status,segment,{group} FROM user_metrics WHERE uploaded=1 GROUP BY first_status,segment')
overall=q(f'SELECT {group} FROM user_metrics')[0]
a={x['channel']:x for x in period if x['period']=='Q1'};b={x['channel']:x for x in period if x['period']=='Q2'}
n1=sum(x['users'] for x in a.values());n2=sum(x['users'] for x in b.values())
p1=sum(x['paid'] for x in a.values())/n1;p2=sum(x['paid'] for x in b.values())/n2
mix=sum((b[c]['users']/n2-a[c]['users']/n1)*a[c]['paid']/a[c]['users'] for c in a)
within=sum(b[c]['users']/n2*(b[c]['paid']/b[c]['users']-a[c]['paid']/a[c]['users']) for c in a)
def wilson(k,n):
    z=1.96;p=k/n;d=1+z*z/n;mid=(p+z*z/(2*n))/d;half=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d
    return [mid-half,mid+half]
for x in channel: x['paid_ci']=wilson(x['paid'],x['users'])
checks={
 '10000_unique_users':len(rows['users'])==10000 and len({x['user_id'] for x in rows['users']})==10000,
 'funnel_monotone':overall['users']>=overall['uploaded']>=overall['succeeded']>=overall['activated'],
 'cohorts_mature':q("SELECT MAX(julianday(registered_at)+30)<julianday('2026-08-01') ok FROM raw_users")[0]['ok']==1,
 'decomposition_reconciles':abs(p2-p1-mix-within)<1e-12,
 'monthly_reconciles':sum(x['paid'] for x in monthly)==overall['paid'],
 'no_pre_signup_events':q('SELECT COUNT(*) n FROM events e JOIN users u USING(user_id) WHERE e.event_time<u.registered_at')[0]['n']==0,
 'dedup_count':q('SELECT COUNT(*) n FROM events')[0]['n']==len(rows['events'])-262,
}
assert all(checks.values()),checks
report=dict(overall=overall,monthly=monthly,channels=channel,period=period,reliability=reliability,experience=experience,decomposition=dict(q1=p1,q2=p2,mix=mix,within=within,n1=n1,n2=n2),quality=dict(raw_events=len(rows['events']),clean_events=q('SELECT COUNT(*) n FROM events')[0]['n'],duplicates=250,orphans=12,missing_channels=sum(x['channel']=='' for x in rows['users']),feedback=len(rows['feedback'])),feedback=q('SELECT category,COUNT(*) n FROM raw_feedback GROUP BY category'),checks=checks)
(ROOT/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
out=sqlite3.connect(DATA/'meetnote.sqlite');db.backup(out);out.close()
with zipfile.ZipFile(ROOT/'meetnote-analysis.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in [*DATA.glob('*'),*sorted((ROOT/'figures').glob('*')),ROOT/'build_analysis.py',ROOT/'analysis.sql',ROOT/'report.json',ROOT/'README.md',ROOT/'index.html',ROOT/'report.css',ROOT/'report.js',ROOT/'meetnote_analysis.ipynb',ROOT/'run_notebook.py',ROOT/'requirements.txt',ROOT/'clustering.json']:
        if p.exists(): z.write(p,p.relative_to(ROOT))
print(json.dumps(report,ensure_ascii=False,indent=2))
