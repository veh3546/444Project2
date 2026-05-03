import { useEffect, useState } from "react";
import axios from "./api/axios";

const Loans = ({ userID }) => {
  const [loanedBooks, setLoanedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLoanedBooks = async () => {
    if (!userID) {
      setError("You must be logged in to view your loans.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/userLoaned?userID=${userID}`);
      const data = response.data;

      if (Array.isArray(data.userBooks)) {
        setLoanedBooks(data.userBooks);
      } else {
        setLoanedBooks([]);
        if (data.warning) {
          setError(data.warning);
        }
      }
    } catch (err) {
      setError("Unable to load loaned books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanedBooks();
  }, [userID]);

  const handleReturnBook = async (bookID) => {
    try {
      const response = await axios.put("/loanBook", {
        bookID: bookID,
        userID: userID,
        dateParam: new Date().toISOString().split('T')[0]
      });

      if (response.data.message) {
        // Refresh the list
        await fetchLoanedBooks();
      }
    } catch (err) {
      alert("Failed to return book. Please try again.");
    }
  };

  return (
    <div className="loans-page">
      <header className="home-header">
        <h1>My Loans</h1>
        <p>Books you have currently loaned from the library.</p>
      </header>

      {loading ? (
        <p>Loading your loans...</p>
      ) : error ? (
        <p>{error}</p>
      ) : loanedBooks.length === 0 ? (
        <p>You have no books currently loaned.</p>
      ) : (
        <div className="book-grid">
          {loanedBooks.map((book) => (
            <article key={book.book_id} className="loan-card">
              <div className="book-card-header">
                <h2>
                  <i>{book.title}</i> by {book.author}
                </h2>
              </div>
              <p>Genre: {book.genre}</p>
              <p>Loaned on: {new Date(book.loan_date).toLocaleDateString()}</p>
              <p>Due date: {new Date(book.due_date).toLocaleDateString()}</p>
              <button
                className="return-button"
                onClick={() => handleReturnBook(book.book_id)}
              >
                Return Book
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Loans;