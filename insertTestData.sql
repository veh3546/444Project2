use library;
insert into book (book_id, title, author, description, genre, year_published, publisher, is_loaned)
VALUES(1,"The Odyssey","Homer","The Oddyssey follows the king of Ithica, Odysseus and his returning journey after returning from the Trojan war ","Epic", 800,"Greeks", 0);

insert into book (book_id, title, author, description, genre, year_published, publisher, is_loaned)
VALUES(2,"test title","test author","Lorem Ipsu","Horror", 1908,"Me", 0),
(3,"loaned 1","test author 2","Lorem Ipsu","Horror", 1990,"You", 1)
;

insert into user (user_id, username, password_hash, email, full_name)
VALUES (1, 'test', 'pass', 'test@test.com', 'First Last');

insert into loan (loan_id, book_id, user_id, loan_date, due_date) VALUES
(1, 1, 1, '2026-05-03', '2026-05-12');