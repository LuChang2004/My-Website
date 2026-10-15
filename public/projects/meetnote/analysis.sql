-- SQLite. All dates UTC. Cutoff 2026-08-01 exclusive.
CREATE TABLE users AS SELECT user_id,registered_at,COALESCE(NULLIF(channel,''),'Unknown') channel,segment FROM raw_users;
CREATE TABLE events AS SELECT DISTINCT e.* FROM raw_events e JOIN users u USING(user_id)
 WHERE event_time>=registered_at AND event_time<'2026-08-01';
CREATE INDEX event_user ON events(user_id,event_time);
CREATE INDEX payment_user ON raw_payments(user_id);
CREATE TABLE user_metrics AS
SELECT u.*,substr(registered_at,1,7) month,
 CASE WHEN substr(registered_at,6,2)<='03' THEN 'Q1' ELSE 'Q2' END period,
 EXISTS(SELECT 1 FROM events e WHERE e.user_id=u.user_id AND event_name='upload' AND julianday(event_time)<julianday(registered_at)+7) uploaded,
 EXISTS(SELECT 1 FROM events e WHERE e.user_id=u.user_id AND event_name='generation_success' AND julianday(event_time)<julianday(registered_at)+7) succeeded,
 EXISTS(SELECT 1 FROM events e WHERE e.user_id=u.user_id AND event_name IN ('edit','export','share') AND julianday(event_time)<julianday(registered_at)+7) activated,
 EXISTS(SELECT 1 FROM events e WHERE e.user_id=u.user_id AND event_name='return_session' AND julianday(event_time)>=julianday(registered_at)+7 AND julianday(event_time)<julianday(registered_at)+14) retained,
 EXISTS(SELECT 1 FROM raw_payments p WHERE p.user_id=u.user_id AND status='paid' AND julianday(paid_at)<julianday(registered_at)+30) paid,
 COALESCE((SELECT SUM(CAST(amount AS REAL)) FROM raw_payments p WHERE p.user_id=u.user_id AND julianday(paid_at)<julianday(registered_at)+30),0) revenue,
 (SELECT status FROM raw_tasks t WHERE t.user_id=u.user_id ORDER BY started_at,task_id LIMIT 1) first_status
FROM users u WHERE julianday(registered_at)+30<=julianday('2026-08-01');
-- Example funnel: user-level reach within 7 days, not an ordered session funnel.
-- SELECT COUNT(*) registered,SUM(uploaded) uploaded,SUM(succeeded) generated,SUM(activated) activated FROM user_metrics;
-- SELECT channel,COUNT(*) n,AVG(paid) conversion,AVG(retained) week2_return FROM user_metrics GROUP BY channel;
-- SELECT month,COUNT(*) n,AVG(paid) conversion FROM user_metrics GROUP BY month;
