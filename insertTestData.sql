use library;

INSERT INTO book (title, author, description, genre, year_published, publisher, is_loaned)
VALUES ('The Hobbit', 'J.R.R. Tolkien', 'A hobbit goes on an adventure', 'Fantasy', 1937, 'Allen & Unwin', 1),
('Brave New World', 'Aldous Huxley', 'A dystopian future society', 'Science Fiction', 1932, 'Chatto & Windus', 0),
('The Catcher in the Rye', 'J.D. Salinger', 'A teenage boy in New York', 'Fiction', 1951, 'Little Brown', 0),
('The Alchemist', 'Paulo Coelho', 'A journey of self-discovery', 'Fiction', 1988, 'HarperOne', 1),
('Fahrenheit 451', 'Ray Bradbury', 'A future where books are burned', 'Science Fiction', 1953, 'Ballantine Books', 0),
('The Da Vinci Code', 'Dan Brown', 'A mystery thriller', 'Thriller', 2003, 'Doubleday', 1),
('Gone Girl', 'Gillian Flynn', 'A psychological thriller', 'Thriller', 2012, 'Crown Publishing', 0),
('The Road', 'Cormac McCarthy', 'A post-apocalyptic journey', 'Fiction', 2006, 'Knopf', 1),
('The Hunger Games', 'Suzanne Collins', 'A dystopian survival competition', 'Science Fiction', 2008, 'Scholastic', 0),
('The Shining', 'Stephen King', 'A family trapped in a haunted hotel', 'Horror', 1977, 'Doubleday', 1),
('Pride and Prejudice', 'Jane Austen', 'A romantic novel of manners', 'Romance', 1813, 'T. Egerton', 0),
('The Count of Monte Cristo', 'Alexandre Dumas', 'A tale of revenge and justice', 'Adventure', 1844, 'Chapman and Hall', 1),
('Sherlock Holmes', 'Arthur Conan Doyle', 'The adventures of a famous detective', 'Mystery', 1892, 'George Newnes', 0),
('Animal Farm', 'George Orwell', 'A political allegory about a farm', 'Fiction', 1945, 'Secker & Warburg', 0),
('The Godfather', 'Mario Puzo', 'A powerful mafia family story', 'Thriller', 1969, 'Putnam', 1),
('Dracula', 'Bram Stoker', 'The story of the famous vampire', 'Horror', 1897, 'Archibald Constable', 0);

insert into user (username, password_hash, email, full_name)
VALUES ('test', '112117', 'test@test.com', 'First Last');

insert into loan (book_id, user_id, loan_date, due_date) VALUES
(1, 1, '2026-05-03', '2026-05-12');
(3, 1, '2026-05-01', '2026-05-15', 'active'),
(5, 2, '2026-04-20', '2026-05-05', 'returned'),
(7, 3, '2026-05-02', '2026-05-16', 'active'),
(10, 1, '2026-04-15', '2026-04-30', 'returned'),
(12, 2, '2026-05-03', '2026-05-17', 'active');
