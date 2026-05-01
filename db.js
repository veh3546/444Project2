const mysql = require('mysql2');

//create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'student',
    database: 'library' //CHANGED
});

connection.connect();

// 1. Get book by ID
function getBookById(bookId, callback) {
    connection.query('SELECT * FROM book WHERE book_id = ?', [bookId], callback);
}

// 2. Get books by genre
function getBooksByGenre(genre, callback) {
    connection.query('SELECT * FROM book WHERE genre = ?', [genre], callback);
}

// 3. Get all loaned books
function getLoanedBooks(callback) {
    connection.query('SELECT * FROM book WHERE is_loaned = 1', callback);
}

// 4. Get all free books
function getFreeBooks(callback) {
    connection.query('SELECT * FROM book WHERE is_loaned = 0', callback);
}

// 5. Get all books
function getAllBooks(callback) {
    connection.query('SELECT * FROM book', callback);
}

// 6. Get all books loaned to a user by userID
function getBooksByUser(userId, callback) {
    connection.query(
        'SELECT b.* FROM book b JOIN loan l ON b.book_id = l.book_id WHERE l.user_id = ? AND l.status = "active"',
        [userId], callback
    );
}

// 7. Login
function login(username, passwordHash, callback) {
    connection.query(
        'SELECT * FROM user WHERE username = ? AND password_hash = ?',
        [username, passwordHash], callback
    );
}

// 8. Insert a new book
function insertBook(book, callback) {
    connection.query('INSERT INTO book SET ?', [book], callback);
}

// 9. Update a book by bookID
function updateBook(bookId, book, callback) {
    connection.query('UPDATE book SET ? WHERE book_id = ?', [book, bookId], callback);
}

// 10. Add a loan
function addLoan(loan, callback) {
    connection.query('INSERT INTO loan SET ?', [loan], callback);
}

// 11. Delete a loan
function deleteLoan(loanId, callback) {
    connection.query('DELETE FROM loan WHERE loan_id = ?', [loanId], callback);
}

// 12. Delete a book by bookID
function deleteBook(bookId, callback) {
    connection.query('DELETE FROM book WHERE book_id = ?', [bookId], callback);
}

module.exports = {
    getBookById,
    getBooksByGenre,
    getLoanedBooks,
    getFreeBooks,
    getAllBooks,
    getBooksByUser,
    login,
    insertBook,
    updateBook,
    addLoan,
    deleteLoan,
    deleteBook
};