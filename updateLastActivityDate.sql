UPDATE user SET user.lastActivityDate = IFNULL(
    (SELECT MAX(user_recipient.updated_at) FROM user_recipient WHERE user_recipient.account_owner_id = user.id GROUP BY user_recipient.account_owner_id),
    user.updated_at
)
WHERE user.lastActivityDate IS null;