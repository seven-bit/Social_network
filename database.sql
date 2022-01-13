CREATE DATABASE social_network_db;

-- run this to get into that database
-- \c social_network_db

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    user_name VARCHAR(255)
);

CREATE TABLE posts(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMPTZ,
    user_id INTEGER
);

CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    comment VARCHAR(255),
    post_id INTEGER,
    user_id INTEGER
);


CREATE TABLE likes(
    user_id INTEGER,
    post_id INTEGER
);

CREATE TABLE follow_list(
    user_id INTEGER,
    following_user_id INTEGER
);