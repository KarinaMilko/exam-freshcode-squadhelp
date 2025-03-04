INSERT INTO "Contests" (id, "orderId", "userId", "contestType", "fileName", "originalFileName", "title", "industry", "focusOfWork", "targetCustomer", "status", "prize", "priority")
VALUES 
    (101, 'ORD-001', 3, 'logo', 'logo1.png', 'original_logo1.png', 'Creative logo design contest', 'Design', 'Innovative logos', 'Startups', 'active', 500, 1),
    (102, 'ORD-002', 4, 'name', 'branding2.pdf', 'original_branding2.pdf', 'Modern branding package', 'Marketing', 'Brand identity', 'Corporations', 'active', 700, 2),
    (103, 'ORD-003', 5, 'tagline', NULL, NULL, 'Unique slogan contest', 'Advertising', 'Creative slogans', 'Businesses', 'completed', 300, 3),
    (104, 'ORD-004', 6, 'logo', 'webdesign4.jpg', 'original_webdesign4.jpg', 'Web Design Draft', 'IT', 'Modern UI/UX', 'Tech companies', 'active', 150, 1),
    (105, 'ORD-005', 7, 'logo', 'appui5.psd', 'original_appui5.psd', 'Innovative app UI/UX', 'Technology', 'User-friendly apps', 'Startups', 'active', 200, 2),
    (106, 'ORD-006', 8, 'name', 'illustration6.svg', 'original_illustration6.svg', 'Custom illustration contest', 'Art', 'Digital illustrations', 'Artists', 'completed', 450, 3),
    (107, 'ORD-007', 9, 'tagline', 'jingle7.mp3', 'original_jingle7.mp3', 'Catchy jingle contest', 'Music', 'Commercial jingles', 'Brands', 'active', 600, 1),
    (108, 'ORD-008', 10, 'logo', 'video8.mp4', 'original_video8.mp4', 'Engaging video ad', 'Advertising', 'Creative video ads', 'Companies', 'completed', 800, 2),
    (109, 'ORD-009', 11, 'tagline', NULL, NULL, 'Marketing copywriting contest', 'Content Writing', 'Engaging copy', 'Businesses', 'completed', 400, 3),
    (110, 'ORD-010', 12, 'logo', 'fashionlogo10.ai', 'original_fashionlogo10.ai', 'Stylish fashion logo', 'Fashion', 'Luxury brand logos', 'Fashion industry', 'active', 900, 1);

ALTER TABLE "Offers"
    ADD COLUMN "orderDate" DATE CHECK ("orderDate" <= CURRENT_DATE)

INSERT INTO "Offers" ("userId","contestId",text,"fileName","originalFileName",status,"orderDate")
    VALUES
    (11, 101, 'Creative logo design concept', 'logo1.png', 'original_logo1.png', 'pending', '2025-01-06'),
    (12, 102, 'Modern branding package', 'branding2.pdf', 'original_branding2.pdf', 'approved', '2025-02-18'),
    (3, 103, 'Unique slogan proposal', NULL, NULL, 'pending', '2025-01-14'),
    (4, 104, 'Professional web design draft', 'webdesign4.jpg', 'original_webdesign4.jpg', 'rejected', '2025-02-13'),
    (5, 105, 'Innovative app UI/UX', 'appui5.psd', 'original_appui5.psd', 'pending', '2025-02-14'),
    (6, 106, 'Custom illustration', 'illustration6.svg', 'original_illustration6.svg', 'approved', '2024-12-31'),
    (7, 107, 'Catchy jingle composition', 'jingle7.mp3', 'original_jingle7.mp3', 'pending', '2025-02-16'),
    (8, 108, 'Engaging video ad concept', 'video8.mp4', 'original_video8.mp4', 'rejected', '2025-02-17'),
    (9, 109, 'Compelling marketing copy', NULL, NULL, 'approved', '2024-12-28'),
    (10, 110, 'Stylish fashion logo', 'fashionlogo10.ai', 'original_fashionlogo10.ai', 'pending', '2025-02-19');

-- Усім юзерам з роллю customer, які здійснювали замовлення в новорічні свята в період з 25.12 по 14.01 (наприклад, з 25.12.2024 по 14.01.2025), необхідно зарахувати по 10% кешбеку з усіх замовлень у цей період.;

SELECT u."firstName" || ' ' || u."lastName" AS name, o."orderDate",u.balance, u.role,c.prize AS "prizeContest", sum(u.balance+0.1*c.prize)
FROM "Users" AS u 
    INNER JOIN "Offers" AS o ON u.id = o."userId"
    INNER JOIN "Contests" AS c ON c.id=o."contestId"
WHERE o."orderDate" BETWEEN '2024-12-25' AND '2025-01-14'
    AND u.role='customer'
GROUP BY u."firstName", u."lastName", o."orderDate",u.balance, u.role, c.prize