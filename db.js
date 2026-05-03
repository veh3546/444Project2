import mysql from 'mysql2/promise'

//create connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'library' //CHANGED
});

connection.connect();

// 1. Get book by ID
async function getBookById(bookId) {
    const [results, fields] = await connection.execute('SELECT * FROM book WHERE book_id = ?', [bookId]);
    // console.log(results);
    return results;
}

// 2. Get books by genre
async function getBooksByGenre(genre) {
    const [results, fields ] = await connection.query('SELECT * FROM book WHERE genre = ?', [genre]);
    return results;
}

// 3. Get all loaned books
async function getLoanedBooks() {
    const [results, field] = await connection.query('SELECT * FROM book WHERE is_loaned = 1');
    return results;
}

// 4. Get all free books
async function getFreeBooks() {
    const [results, field] = await connection.query('SELECT * FROM book WHERE is_loaned = 0');
    return results;

}

// 5. Get all books
async function getAllBooks() {
    const [results, field] = await connection.query('SELECT * FROM book');
    return results;

}

// 6. Get all books loaned to a user by userID
async function getBooksByUser(userId) {
     const [results, field] = await connection.query(
        'SELECT b.* FROM book b JOIN loan l ON b.book_id = l.book_id WHERE l.user_id = ? AND l.status = "active"',
        [userId]
    );
    return results;
}

// 7. Login
async function login(username, passwordHash) {
     const [results, field] = await connection.query(
        'SELECT * FROM user WHERE username = ? AND password_hash = ?',
        [username, passwordHash]
    );
    return results;
}

// 8. Insert a new book
async function insertBook(book) {
     const [results, field] = await connection.query('INSERT INTO book SET ?', [book]);
    //  console.log(results, field);
     return results.insertId;
     
}

// 9. Update a book by bookID
async function updateBook(bookId, book) {
     const [results, field] = await connection.query('UPDATE book SET ? WHERE book_id = ?', [book, bookId]);
     return results.affectedRows;
}

// 10. Add a loan
async function addLoan(bookID, userID, due_date) {
     const [results, field] = await connection.query('INSERT INTO loan (book_id, user_id, due_date) VALUES (?, ?, ?)', [bookID, userID, due_date]);
     return results.insertId;
}

// 11. Delete a loan
async function deleteLoan(bookID) {
     const [results, field] = await connection.query('DELETE FROM loan WHERE book_id = ?', [bookID]);
     return results.affectedRows;
}

// 12. Delete a book by bookID
async function deleteBook(bookId) {
    const [results, field] = await connection.query('DELETE FROM book WHERE book_id = ? ', [bookId]);
    return results.affectedRows;
}

// ***************** Validator functions *******************
async function validUser(userID) {
    const [results, field] = await connection.query('SELECT * FROM user where user_id = ?', [userID]);
    return results.length == 1;
}

async function validBook(bookID) {
    const [results, field] = await connection.query('SELECT is_loaned FROM book where book_id = ?', [bookID]);
    return results;
}

// **************** Helper functions ***********************
async function updateBookLoan(bookId, state) {
     const [results, field] = await connection.query('UPDATE book SET is_loaned = ? WHERE book_id = ?', [state, bookId]);
     return results.affectedRows;
}

export {
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
    deleteBook,
    validBook,
    validUser,
    updateBookLoan
};