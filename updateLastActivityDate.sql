UPDATE `user`
SET `lastActivityDate` = (CASE
	WHEN (SELECT COUNT(id) FROM user_recipient WHERE account_owner_id = `user`.id ) > 0
	THEN (SELECT MAX(updated_at) FROM user_recipient WHERE account_owner_id = `user`.id)
	ELSE `user`.updated_at
	END)
WHERE lastActivityDate is null