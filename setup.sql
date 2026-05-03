DROP DATABASE IF EXISTS library;
CREATE DATABASE library;
USE library;

CREATE TABLE user (
    user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT NOT NULL,
    full_name TEXT,
    role VARCHAR(20) DEFAULT 'member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE book (
    book_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    description TEXT,
    genre TEXT,
    year_published INTEGER,
    publisher TEXT,
    is_loaned INTEGER DEFAULT 0
);

CREATE TABLE loan (
    loan_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    book_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    loan_date VARCHAR(20) DEFAULT (CURRENT_DATE),
    due_date TEXT NOT NULL,
    return_date TEXT,
    status VARCHAR(20) DEFAULT 'active',
    FOREIGN KEY (book_id) REFERENCES book(book_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
