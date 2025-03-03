-- Вивести кількість юзерів за ролями {admin: 40, customer: 22, ...}
INSERT INTO "Users" ("firstName", "lastName", "displayName", password, email,avatar,role,balance,"accessToken",rating)
VALUES
        ('John', 'Doe', 'john_doe', 'hashed_password_1', 'john.doe@example.com', 'avatar1.jpg', 'customer', 100.50, 'token_12345', 4.5),
        ('Alice', 'Williams', 'alice_williams', 'hashed_password_2', 'alice.williams@example.com', 'avatar2.jpg', 'creator', 200.00, 'token_67890', 4.9),
        ('Bob', 'Smith', 'bob_smith', 'hashed_password_3', 'bob.smith@example.com', 'avatar3.jpg', 'customer', 50.00, 'token_11223', 3.8),
        ('Eva', 'Johnson', 'eva_johnson', 'hashed_password_4', 'eva.johnson@example.com', 'avatar4.jpg', 'creator', 350.75, 'token_33445', 5.0),
        ('Charlie', 'Brown', 'charlie_brown', 'hashed_password_5', 'charlie.brown@example.com', 'avatar5.jpg', 'customer', 120.00, 'token_55678', 4.3),
        ('David', 'Taylor', 'david_taylor', 'hashed_password_6', 'david.taylor@example.com', 'avatar6.jpg', 'creator', 500.00, 'token_99887', 4.7),
        ('Olivia', 'Miller', 'olivia_miller', 'hashed_password_7', 'olivia.miller@example.com', 'avatar7.jpg', 'customer', 80.00, 'token_77665', 3.9),
        ('James', 'Wilson', 'james_wilson', 'hashed_password_8', 'james.wilson@example.com', 'avatar8.jpg', 'creator', 600.50, 'token_44332', 4.6),
        ('Sophia', 'Davis', 'sophia_davis', 'hashed_password_9', 'sophia.davis@example.com', 'avatar9.jpg', 'customer', 150.00, 'token_12321', 4.0),
        ('Liam', 'Moore', 'liam_moore', 'hashed_password_10', 'liam.moore@example.com', 'avatar10.jpg', 'creator', 400.00, 'token_55443', 4.8);

 SELECT role, count("firstName") as count_users
 FROM "Users"  
 GROUP BY role


