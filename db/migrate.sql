CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS texts (
    kmom VARCHAR(10) NOT NULL,
    text VARCHAR NOT NULL,
    link VARCHAR(30) NOT NULL,
    UNIQUE(kmom),
    CHECK(like('%github.com%', link))
);
