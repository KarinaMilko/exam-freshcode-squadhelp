CREATE TABLE "Conversation" (
    id SERIAL PRIMARY KEY,
    blackList_creative BOOLEAN DEFAULT FALSE,
    blackList_buyer BOOLEAN DEFAULT FALSE,
    favoriteList_creative BOOLEAN DEFAULT FALSE,
    favoriteList_buyer BOOLEAN DEFAULT FALSE,
    id_creative INTEGER NOT NULL REFERENCES "Users"(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT, 
    id_buyer INTEGER NOT NULL REFERENCES "Users"(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT 
)

CREATE TABLE "Catalog" (
    id SERIAL PRIMARY KEY,
    catalogName VARCHAR(50) NOT NULL,
    id_user INTEGER NOT NULL REFERENCES "Users"(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
  )

CREATE TABLE "Chats"(
    id SERIAL PRIMARY KEY,
    id_catalog INTEGER NOT NULL REFERENCES "Catalog"(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    id_conversation INTEGER NOT NULL REFERENCES "Conversation"(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
)

CREATE TABLE "Message"(
    id SERIAL PRIMARY KEY,
    body VARCHAR(500) NOT NULL,
    sender INTEGER NOT NULL REFERENCES "Users"(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT,
    id_conversation INTEGER NOT NULL REFERENCES "Conversation"(id)
            ON UPDATE CASCADE
            ON DELETE RESTRICT
)