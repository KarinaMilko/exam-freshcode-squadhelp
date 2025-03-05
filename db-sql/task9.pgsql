-- Для ролі сreative необхідно виплатити 3-м юзерам з найвищим рейтингом по 10$ на їхні рахунки.

INSERT INTO "Ratings" ("offerId", "userId", mark) 
VALUES
    (41, 23, 4.5),
    (42, 24, 4.8),
    (43, 25, 3.9),
    (44, 26, 4.2),
    (45, 27, 4.7),
    (46, 28, 5.0),
    (47, 29, 3.8),
    (48, 30, 4.4),
    (49, 31, 4.9),
    (50, 32, 4.1);

UPDATE "Users"
SET balance = 10 + balance
WHERE id IN (
    SELECT "userId"
    FROM "Ratings" 
    WHERE "userId" IN (SELECT id FROM "Users" WHERE role='creator') 
    ORDER BY mark DESC
    LIMIT 3  
)


