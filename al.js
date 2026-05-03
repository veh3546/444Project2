import *  as db from './db.js';
import * as bus from './bus.js';
const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// ********************* MIDDLEWARE *************************

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true
}));
// Middleware to parse JSON bodies
app.use(express.json());


// Serve static files from React build
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// ************************** GET *************************
app.get('/api/message', async (req, res) => {
  res.send('Hello World!');
});


/**
 * The get method for a book given bookID
 * 
 * EX. http://localhost:3000/book?bookID=1
 * 
 * @param bookID - the bookId
 */
app.get('/book', async (req, res) => {
    // Gets the id or -1 if invalid
    const bookID = req.query.bookID != undefined ? req.query.bookID: -1;
    console.log(bookID);

    //TODO: check if valid data Type
    if(bookID == -1 || bus.isNum(bookID) != true){
        res.status(400).json({"error": "Invalid Params"});
        return;
    }
    //if valid data type, attempt to get book from DB
    try {
        const Book = await db.getBookById(bookID);
        // console.log(Book);

        //on success
        res.status(200).json({ Book });       
    } catch (error) {

        // on failure
        res.status(500).json({"error": "Unexpected server error"});
    }
});


/**
 * The get method to return all books in a give genre
 * 
 * EX. http://localhost:3000/genre?genre='Epic'
 * 
 * @param genre - the genre of the book
 */
app.get('/genre', async (req, res) => {
    // Gets the 
    const genre = req.query.genre != undefined ? req.query.genre : null;
    // console.log(genre);

    //TODO: check if valid data Type (string)
    if(genre == null || bus.isString(genre) != true){
        res.status(400).json({"error": "Invalid Params"});
        return;
    }
    //if valid data type, attempt to get book from DB
    try {
        const genreBooks = await db.getBooksByGenre(genre);
        console.log(genreBooks);

        //if no books in genre
        if(genreBooks.length == 0){
            res.status(200).json({"warning": "No books in given genre"});
            return
        }

        //on success
        res.status(200).json({ genreBooks });       
    } catch (error) {
        // on failure
        res.status(500).json({"error": "Unexpected server error"});
    }
});


/**
 * The get method to return all the books loaned
 * 
 * EX. http://localhost:3000/loaned
 * 
 */
app.get('/loaned', async (req, res) => {
    //Return all the loaned books
    try {
        const loanedBooks = await db.getLoanedBooks();
        
        //if no loaned books
        if(loanedBooks.length == 0){
            res.status(200).json({"warning": "No books are loaned right now"});
            return
        }
        else{
        // on success
        res.status(200).json({ loanedBooks });
        }
    } catch (error) {
    // on failure
        res.status(500).json({"error": "An unexpected error occured"});
    }
});

/**
 * The get method to return all the books currently availible
 * 
 * EX. http://localhost:3000/free
 * 
 */
app.get('/free', async (req, res) => {
   //Return all the loaned books
    try {
        const loanedBooks = await db.getFreeBooks();
        
        //if no loaned books
        if(loanedBooks.length == 0){
            res.status(200).json({"warning": "No books are availible right now"});
            return
        }
        else{
        // on success
        res.status(200).json({ loanedBooks });
        }
    } catch (error) {
    // on failure
        res.status(500).json({"error": "An unexpected error occured"});
    }
});

/**
 * The get method to return all the books
 * 
 * EX. http://localhost:3000/allBooks
 * 
 */
app.get('/allBooks', async (req, res) => {
   //Return all the loaned books
    try {
        const allBooks = await db.getAllBooks();
        
        //if no books
        if(allBooks.length == 0){
            res.status(200).json({"warning": "No books are in the library right now"});
            return
        }
        else{
        // on success
        res.status(200).json({ allBooks });
        }
    } catch (error) {
    // on failure
        res.status(500).json({"error": "An unexpected error occured"});
    }
});


/**
 * The get method to return all books loaned by a given user
 * 
 * EX. http://localhost:3000/userLoaned?userID='1'
 * 
 * @param userID - the users userID
 */
app.get('/userLoaned', async (req, res) => {
    // Gets the userID, -1 if undefined
    const userID = req.query.userID != undefined ? req.query.userID : -1;
    // console.log(userID);

    //TODO: check if valid data Type (int)
    if(userID == -1 || bus.isNum(userID) != true){
        res.status(400).json({"error": "Invalid Params"});
        return;
    }
    
    //if valid data type, attempt to get all book loaned from given user
    try {
        const userBooks = await db.getBooksByUser(userID);
                
        //if no loaned books
        if(userBooks.length == 0){
            res.status(200).json({"warning": "User has no books currently loaned"});
            return
        }

        //on success
        res.status(200).json({ userBooks });
    } catch (error) {
        
        // on failure
        res.status(400).json({"error": "Invalid Params"});
    }
});


/**
 * The get method to attempt to login
 * 
 * EX. http://localhost:3000/login?username='uname'&pass='pass'
 * 
 * @param username - the username of the user
 * @param password - the password of the user
 */
app.post('/login', async (req, res) => {
    // Gets the userID, -1 if undefined
    const username = req.query.username != undefined ? req.query.username : null;
    const password = req.query.password != undefined ? req.query.password : null;
    // console.log(username, password);

    //TODO: check if valid data Type (string)
    if(username == null || bus.isString(username) != true || password == null || bus.isString(password) != true){
        res.status(400).json({"error": "Invalid Params"});
        return;
    }
    

    //hash password
    const hashPass = bus.hash(password);
    //TODO: hash password
    
    try {
        //if valid data type, attempt to login
        const loginInfo = await db.login(username, hashPass); 
        console.log(loginInfo)

        //on success
        if (loginInfo.length != 0){

            //create sessionTOken
            //TODO: create JWT token

            //insert into db
            //db.updateSessiontoken(sessionToken, userID);

            //set token in localstorage?
            //TODO put sessionToken somewhere to recall

            //redirect to new page
            res.status(200).json({ "success": "User succesffuly logged in" });

        }
        else{
            // on failure
            res.status(400).json({"error": "Invalid Login"});
        }
    } catch (error) {
        res.status(500).json({"error": "Unexpected error"});
    } 
});


// ******************** POST ***********************

/**
 * The post method to insert a new book into the DB
 * 
 * EX. http://localhost:3000/add
 *  Send JSON body
 * {
        "title" : "The Odyssey",
        "author" : "Homer",
        "description" : "This sample description might be 2 sentances",
        "genre" : "Epic",
        "year_published" : 800,
        "publisher" : "Greeks"
    }
 * 
 */
app.post('/add', async (req, res) => {

    // Gets the params
    const { title, author, description, genre, year_published, publisher } = req.body
    // console.log(userID);

    //TODO: check if valid data Types (int)
    try {
        //title & author
        if(bus.isString(title) != true || bus.isString(author) != true){
            res.status(400).json({"error": "Invalid Params"});
            return;
        }
        //description & genre
        if(bus.isString(author) != true || bus.isString(genre) != true){
            res.status(400).json({"error": "Invalid Params"});
            return;
        }
        //year_published & publisher
        if(bus.isNum(year_published) != true || bus.isString(publisher) != true){
            res.status(400).json({"error": "Invalid Params"});
            return;
        }
    } catch (error) {
        res.status(400).json({"error": "Invalid Params"});
        return;
    }

    //if all valid data types, attempt to insert new book
    const book = {
        "title" : title,
        "author" : author,
        "description" : description,
        "genre" : genre,
        "year_published" : year_published,
        "publisher" : publisher
    }
    try {
        //attempt to insert into DB
        const bookID = await db.insertBook(book);

        //on success
        res.status(200).json({ "success": "Book added succesffuly" });

    } catch (error) {
        // on failure
        res.status(500).json({"error": "An unexpected error occured"});
    }
});

// ************************* PUT **********************


/**
 * The put method to update a book with new params
 * 
 * EX. http://localhost:3000/updateBook
 * sent JSON
  * {
  *     "bookID" : 1,
        "title" : "The Odyssey",
        "author" : "Homer",
        "description" : "This sample description might be 2 sentances",
        "genre" : "Epic",
        "year_published" : 800,
        "publisher" : "Greeks"
    }
 * 
 */
app.put('/updateBook', async (req, res) => {

    // Gets the params
    const { bookID, title, author, description, genre, year_published, publisher } = req.body
    // console.log(userID);

    try {
        //title & author
        if(bus.isString(title) != true || bus.isString(author) != true){
            res.status(400).json({"error": "Invalid Params"});
            return;
        }
        //description & genre
        if(bus.isString(author) != true || bus.isString(genre) != true){
            res.status(400).json({"error": "Invalid Params"});
            return;
        }
        //year_published & publisher & bookID
        if(bus.isNum(year_published) != true || bus.isString(publisher) != true || bus.isNum(bookID) != true){
            res.status(400).json({"error": "Invalid Params"});
            return;
        }
    } catch (error) {
        res.status(400).json({"error": "Invalid Params"});
        return;
    }

    //if all valid data types, attempt to insert new book
    const book = {
        "title" : title,
        "author" : author,
        "description" : description,
        "genre" : genre,
        "year_published" : year_published,
        "publisher" : publisher
    }
    try {
        //attempt to update DB
        const affectedRows = await db.updateBook(bookID,book);
        
        if(affectedRows == 0){
            res.status(200).json({"warning": "No books were updated"});
            return
        }

        //on success
        res.status(200).json({ "success": "Book updated succesffuly" });

    } catch (error) {
        // on failure
        res.status(500).json({"error": "An unexpected error occured"});
    }
});


/**
 * The post method to insert a new book into the DB
 * 
 * EX. http://localhost:3000/loanBook
 * JSON
 * {
 *  'bookID' : 1,
 *  'userID' : 1,
 *  'dateParam' : '2026-05-15'
 * }
 */
app.put('/loanBook', async (req, res) => {

    // Gets the params
 const { bookID, userID, dateParam } = req.body
    // console.log(booID, dateParam);

    //TODO: check if valid data Types
    //year_published & publisher & bookID
    try {
        if(bus.isNum(bookID) != true || bus.isNum(userID) != true || bus.isValidDate(dateParam) != true){
            res.status(400).json({"error": "Invalid Params"});
            return;
        }
    } catch (error) {
        res.status(400).json({"error": "Invalid Params"});
        return;
    }

    try {
        //TODO: check if valid userID
        const isValidUser = await db.validUser(userID);
        if(!isValidUser){
            res.status(400).json({"error": "Invalid Params"});
        }

        //TODO: check if valid bookID
        const is_loaned = await db.validBook(bookID);
        console.log(is_loaned);

        //If invalid book
        if(is_loaned.length == 0){
            res.status(400).json({"error": "Invalid Params"});
            return;
        }

        //if all valid data types and loan is false, update is_loaned status and create new loan objectx
        console.log(is_loaned[0]['is_loaned']);
        if (is_loaned[0]['is_loaned'] == 0){
            //update loan
            await db.updateBookLoan(bookID, 1);
            await db.addLoan(bookID, userID, dateParam);

            // on success
            res.status(200).json({ 'message': 'Book succesffuly loaned '});
        }
        else{
            await db.updateBookLoan(bookID, 0);
            await db.deleteLoan(bookID);

            //on success
            res.status(200).json({ 'message': 'Book succesffuly returned '});
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({"error": "Unexpected error occured", "e": error});
    }


});

// ************************* DELETE ***********************************8

/**
 * The delete method for getting rid of a book
 * 
 * EX. http://localhost:3000/deleteBook?bookID='1'
 * 
 * @param bookID = the books id
 */
app.delete('/deleteBook', async (req, res) => {
    // Gets the id or -1 if invalid
    const bookID = req.query.bookID != undefined ? req.query.bookID: -1;
    // console.log(bookID);

    //TODO: check if valid data Type
    if(bookID == -1 || bus.isNum(bookID) != true){
        res.status(400).json({"error": "Invalid Params"});
        return;
    }
    //if valid data type, attempt to get book from DB
    try {
        //get rid of loans using book
        await db.deleteLoan(bookID);
        const affectedRows = await db.deleteBook(bookID);
        // console.log(Book);
        if(affectedRows == 1){
            res.status(200).json({ "success": "Book deleted succesffuly" });       
        }
        else{
            res.status(200).json({ "warning": affectedRows + " books were deleted" });       
        }

        //on success
    } catch (error) {
        console.log(error)
        // on failure
        res.status(500).json({"error": "Unexpected server error"});
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});