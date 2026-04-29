const express = require('express');
const app = express();
const port = 3000;

// ********************* MIDDLEWARE *************************

// Middleware to parse JSON bodies
app.use(express.json());

// ************************** GET *************************
app.get('/', (req, res) => {
  res.send('Hello World!');
});


/**
 * The get method for a book given bookID
 * 
 * EX. http://localhost:3000/book?bookID=1
 * 
 * @param bookID - the bookId
 */
app.get('/book', (req, res) => {
    // Gets the id or -1 if invalid
    const bookID = req.query.bookID != undefined ? req.query.bookID: -1;
    // console.log(bookID);

    //TODO: check if valid data Type
    
    //if valid data type, attempt to get book from DB
    //const Book = db.getBook(bookID);

    //SAMPLE UNTIL DB IMPLEMENTED
    const Book = {
        "bookID" : 1,
        "title" : "The Odyssey",
        "author" : "Homer",
        "description" : "This sample description might be 2 sentances",
        "genre" : "Epic",
        "year_published" : 800,
        "publisher" : "Greeks",
        "is_loaned" : false
    }

    //on success
    res.status(200).json({ Book });

    // on failure
    res.status(400).json({"error": "Invalid Params"});
});


/**
 * The get method to return all books in a give genre
 * 
 * EX. http://localhost:3000/genre?genre='Epic'
 * 
 * @param genre - the genre of the book
 */
app.get('/genre', (req, res) => {
    // Gets the 
    const genre = req.query.genre != undefined ? req.query.genre : null;
    // console.log(genre);

    //TODO: check if valid data Type (string)
    
    //if valid data type, attempt to get all book with given genre from DB
    //const genreBooks = db.getGenre(genre);

    //on success
    // res.status(200).json({ genreBooks });

    // on failure
    // res.status(400).json({"error": "Invalid Params"});
});


/**
 * The get method to return all the books loaned
 * 
 * EX. http://localhost:3000/loaned
 * 
 */
app.get('/loaned', (req, res) => {
    //Return all the loaned books
    //const loanedBooks = db.getLoanedBooks();

    //on success
    // res.status(200).json({ loanedBooks });

    // on failure
    // res.status(500).json({"error": "An unexpected error occured});
});

/**
 * The get method to return all the books currently availible
 * 
 * EX. http://localhost:3000/free
 * 
 */
app.get('/free', (req, res) => {
    //Return all the free books
    //const freeBooks = db.getFreeBooks();

    //on success
    // res.status(200).json({ freeBooks });

    // on failure
    // res.status(500).json({"error": "An unexpected error occured});
});

/**
 * The get method to return all the books
 * 
 * EX. http://localhost:3000/allBooks
 * 
 */
app.get('/allBooks', (req, res) => {
    //Return all the books
    //const allBooks = db.getAllBooks();

    //on success
    // res.status(200).json({ allBooks });

    // on failure
    // res.status(500).json({"error": "An unexpected error occured});
});


/**
 * The get method to return all books loaned by a given user
 * 
 * EX. http://localhost:3000/genre?genre='Epic'
 * 
 * @param genre - the genre of the book
 */
app.get('/userLoaned', (req, res) => {
    // Gets the userID, -1 if undefined
    const userID = req.query.userID != undefined ? req.query.userID : -1;
    // console.log(userID);

    //TODO: check if valid data Type (int)
    
    //if valid data type, attempt to get all book loaned from given user
    //const allInfo = db.getBooksAndLoanedInfo(userID);

    // OR

    //const booksInfo = db.getBooksLoaned(userID)
    //const loansInfo = db.getLoansInfo(userID)
    //combine jsons and send out

    //on success
    // res.status(200).json({ genreBooks });

    // on failure
    // res.status(400).json({"error": "Invalid Params"});
});


/**
 * The get method to attempt to login
 * 
 * EX. http://localhost:3000/login?username='uname'&pass='pass'
 * 
 * @param username - the username of the user
 * @param password - the password of the user
 */
app.get('/login', (req, res) => {
    // Gets the userID, -1 if undefined
    const username = req.query.username != undefined ? req.query.username : null;
    const password = req.query.password != undefined ? req.query.password : null;
    // console.log(useranem, password);

    //TODO: check if valid data Type (string)
    
    //if valid data type, attempt to login

    //hash password
    //TODO: hash password

    //const validLoginID = db.login(username, password); (want userID returned from this)
    const validLoginID = 0; //TEMP

    //on success
    if (validLoginID != -1){

        //create sessionTOken

        //TODO: create JWT token

        //insert into db
        //db.updateSessiontoken(sessionToken, userID);

        //set token in localstorage?
        //TODO put sessionToken somewhere to recall

        //redirect to new page
        // res.status(200).json({ genreBooks });

    }
    else{
        // on failure
        // res.status(400).json({"error": "Invalid Login"});
    }
});


// ******************** POST ***********************

/**
 * The post method to insert a new book into the DB
 * 
 * EX. http://localhost:3000/add
 * 
 * @param genre - the genre of the book
 */
app.post('/add', (req, res) => {

    // Gets the params
    const { title, author, description, genre, year_published, publisher } = req.body
    // console.log(userID);

    //TODO: check if valid data Types (int)
    
    //if all valid data types, attempt to get all book loaned from given user
    //const bookID = db.insertBook(title, author, description, genre, year_published, publisher);

    //on success
    // res.status(200).json({ genreBooks });

    // on failure
    // res.status(400).json({"error": "Invalid Params"});
});




// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
