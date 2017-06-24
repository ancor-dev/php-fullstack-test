/* RESULT */
UPDATE `user` AS `u`
  LEFT JOIN (

      SELECT MAX(`ur`.`updated_at`) AS `max_recipient`,
             `ur`.`account_owner_id` AS `id`
      FROM `user_recipient` AS `ur`
      GROUP BY `ur`.`account_owner_id`

  ) AS `res` ON `u`.`id` = `res`.`id`

SET `u`.`lastActivityDate` = IFNULL(`res`.`max_recipient`, `u`.`updated_at`)
WHERE lastActivityDate IS NULL;

/*
// clear
UPDATE `user` SET `lastActivityDate` = NULL;

// test
SELECT `u`.`id`,
       `u`.`lastActivityDate`,
       MAX(`ur`.`updated_at`) AS `max_recipient_date`,
       `u`.`updated_at`
FROM `user` AS `u`
  LEFT JOIN `user_recipient` AS `ur` ON `u`.`id` = `ur`.`account_owner_id`
GROUP BY `u`.`id`;
*/
