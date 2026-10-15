# MeetNote synthetic business analysis

All companies, users, feedback, spending and outcomes are fictional. This is an educational portfolio case, not a real business result or externally validated causal study.

Run `python3 build_analysis.py` in this folder (Python standard library only). Seed: 20261014. Generates six raw CSV tables, an SQLite database containing raw and cleaned tables, report.json, and a ZIP source/data bundle including the frontend report. Run `python3 -m http.server 8000` here, then open http://127.0.0.1:8000/index.html. Do not open using file:// because the report fetches JSON. The back-to-Works link is for the portfolio host and can be ignored in a standalone copy.

## Scenario and protocol
Question: registrations rise but paid growth lags; should the team expand acquisition or improve activation? Analyze Jan–Jun 2026 signup cohorts, observed through July 31 inclusive. All timestamps UTC. All users have a full 30-day observation period. Months deliberately use signup days 1–28; this is a simplification, not missing collection.

Users: 10,000. Monthly sizes 900/1200/1500/1800/2100/2500. Raw files: users, events, tasks, payments, spend, feedback. All IDs are fictional. Missing channel stays Unknown. Exact duplicate events are removed; orphan user events excluded. No statistical outlier deletion.

## Metric dictionary
Signup denominators: distinct eligible registered users. Upload/success/activation: at least one qualifying event during [signup, signup+7d). Activation = edit/export/share. These are user-level reach rates, not a strictly ordered session funnel. Payment conversion = at least one successful payment in [signup, signup+30d), including users who later refund. Net collections = positive payments plus negative refunds within that window; not accounting revenue, MRR, LTV or profit. Week-2 return = explicit return_session during [signup+7d,signup+14d), not exact day-7 retention. Channel CPA = recorded promotion spending / attributed paid users; organic costs are unrecorded, not free. Missing attribution can bias CPA. Only first purchase and possible refund modeled; no renewal, subscription churn or lifetime extrapolation.

## Generative mechanisms and limits
Channel mix shifts after March; upload propensity differs by channel. Team users more frequently use/share results and pay. Long recordings have increased failure probability after March; some users retry. Continued use and payment depend on synthetic value use and segment. Feedback is more likely after failure and is template-generated: it cannot estimate overall dissatisfaction. Spend is simulated from attributed acquisition volume and assumed channel costs. Event duplication (250) and orphan records (12) are injected. Source assumptions are visible; analyst and generator are the same agent. This is NOT a blind validation and discovering encoded patterns is not empirical business evidence.

## Analysis approach
SQL builds user_metrics from deduplicated event reach and payment windows. Monthly and channel cohorts use identical maturity. Q1/Q2 conversion change is decomposed exactly: mix = Σ(w2−w1)×r1; within = Σw2×(r2−r1). This order-dependent descriptive decomposition is not a causal attribution. Wilson 95% intervals describe synthetic sample uncertainty conditional on the generator; they do not validate real-world generalization. Technical failure comparisons are stratified by segment but still confounded by recording length and user intent.

## Reproducibility and validation
Automated assertions: unique users; monotone reach; full observation; decomposition reconciliation; monthly paid totals; event timing; dedup totals. SQL and report JSON included. Experiment proposal and sensitivity estimates are prospective, never claimed realized results. Future real study needs authorized server events, actual channel invoices, subscription lifecycle and interviews.

## Jupyter / pandas 图表与聚类

`meetnote_analysis.ipynb` 保存实际运行的代码、表格及图像输出。安装 `requirements.txt` 中的依赖后，可在 Jupyter 中从头运行，或运行 `python run_notebook.py` 重新构建并执行 Notebook。后者会在临时目录中注册专用内核，执行完成后清理。工作目录应为此项目目录。中文绘图优先使用 macOS Arial Unicode 字体，其他系统建议安装 Noto Sans CJK SC。

新增 9 组图表：月度增长、渠道热力图、激活漏斗、队列表现、失败率与耗时分布、K 值选择、PCA 聚类投影、标准化群体画像、聚类后回访与付费比较。`figures/` 同时保存 PNG 和 SVG。

聚类只覆盖前 7 天已上传用户，未上传用户单独列为业务状态。任务数、首次录音分钟、首次耗时做 log1p，再与首次失败、7 天激活一起标准化。K-means 比较 2—6 类，轮廓系数在固定抽样上计算，模型拟合全部上传用户。PCA 仅用于二维可视化。支付、回访、渠道和用户类型不参与聚类；新增付费结果只使用第 7 天未付费用户，并观察 [7,30) 天。不同初始化 ARI 仅验证相同数据的初始化稳定性。

当前模拟数据仅有首次任务和可选重试，混合二元特征会影响欧氏距离。聚类可能只是重现生成器中的规则，不代表真实市场分层。反馈为少量模板，因此没有进行虚假的文本语义聚类。`data/cluster_*.csv` 和 `clustering.json` 提供每位用户的标签、群体画像及后续表现。
