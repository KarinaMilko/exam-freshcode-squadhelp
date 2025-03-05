-- Для ролі сreative необхідно виплатити 3-м юзерам з найвищим рейтингом по 10$ на їхні рахунки.

INSERT INTO "Ratings" ("offerId", "userId", mark) 
VALUES
    (51, 33, 4.5),
    (52, 34, 4.8),
    (53, 35, 3.9),
    (54, 36, 4.2),
    (55, 37, 4.7),
    (56, 38, 5.0),
    (57, 39, 3.8),
    (58, 40, 4.4),
    (59, 41, 4.9),
    (60, 42, 4.1);

UPDATE "Users"
SET balance = 10 + balance
WHERE id IN (
    SELECT "userId"
    FROM "Ratings" 
    WHERE "userId" IN (SELECT id FROM "Users" WHERE role='creator') 
    ORDER BY mark DESC
    LIMIT 3  
)
RETURNING id, role, balance


