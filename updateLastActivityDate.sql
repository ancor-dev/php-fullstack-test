--
-- Update data for table `user`
--
UPDATE user AS u
  JOIN (
    SELECT
        u.id,
        IFNULL(MAX(ur.updated_at), u.updated_at) AS lastActivityDate
      FROM user AS u
      LEFT JOIN user_recipient AS ur ON u.id = ur.account_owner_id
      GROUP BY u.id
  ) AS s1 ON s1.id = u.id
  SET u.lastActivityDate = s1.lastActivityDate;
