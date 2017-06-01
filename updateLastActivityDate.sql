UPDATE user AS u, (
  SELECT gr.user_id AS user_id, CASE WHEN gr.max_updated_at IS NULL THEN gr.user_updated_at ELSE gr.max_updated_at END AS lastActivityDate FROM (
    SELECT u.id AS user_id, u.updated_at AS user_updated_at, u.lastActivityDate, MAX(r.updated_at) AS max_updated_at  FROM user AS u LEFT JOIN user_recipient AS r ON u.id=r.account_owner_id
    WHERE u.lastActivityDate IS NULL
    GROUP BY user_id) AS gr
  ) AS compiled
SET u.lastActivityDate = compiled.lastActivityDate WHERE u.id = compiled.user_id