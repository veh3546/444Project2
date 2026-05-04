## Stack
We are using mySQL, Express, React, and Node as a variation of the MERN stack. This stack was chosen based on team familiarity and the preference to use one language, JavaScript, across the stack. We are using mySQL because not everyone on the team was familiar with non-relational databases like Mongo. Additionally, it makes sense for a library system to use strictly structured data relationships. We are using Node and Express because they are commonly used together for JavaScript applications. Finally, we’re using React instead of Angular because it has less bloat while still providing a framework for the frontend.

## API
### GET-
* /book?{id} - returns a book given the id
* /genre?{genre} - returns all books in given genre
* /loaned - returned all loaned books
* /free - returns all available books
* /all - returns all books
* /user?{id} - returns all books loaned to given user

### POST-
* /add{book} - inserts a new book into the library
* /login - attempts to login

### PUT-
* /updateBook?{id, newBook} - updates given book with new info
* /changeLoan?{bookId, userId} - swaps the loan state and updates user table

### DELETE-
* /delete?{id} - deletes given book


## To run the project:
1. Run `node al.js` to start the backend
2. In another terminal, `cd frontend` and run `npm start` to start the frontend
3. Login as user "user", password "pass"
