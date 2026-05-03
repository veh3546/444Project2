import { useEffect, useState } from "react";
import axios from "./api/axios";

const Home = ({ userID }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loanMessage, setLoanMessage] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/allBooks");
      const data = response.data;

      if (Array.isArray(data.allBooks)) {
        setBooks(data.allBooks);
      } else {
        setBooks([]);
        if (data.warning) {
          setError(data.warning);
        }
      }
    } catch (err) {
      setError("Unable to load books. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
    setLoanMessage("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setLoanMessage("");
  };

  const handleLoanRequest = async () => {
    if (!userID) {
      setLoanMessage("You must be logged in to request a book.");
      return;
    }

    try {
      const response = await axios.put("/loanBook", {
        bookID: selectedBook.book_id,
        userID: userID,
        dateParam: new Date().toISOString().split('T')[0]
      });

      if (response.data.message) {
        setLoanMessage(response.data.message);
        await fetchBooks(); // Refresh the book list
      } else {
        setLoanMessage("Loan request processed.");
        await fetchBooks();
      }
    } catch (err) {
      setLoanMessage("Failed to process loan request. Please try again.");
    }
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <p>Browse all books currently available in the library:</p>
      </header>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p>{error}</p>
      ) : books.length === 0 ? (
        <p>No books are available in the library right now.</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => {
            const isLoaned = book.is_loaned === 1 || book.is_loaned === "1";
            const statusText = isLoaned ? "Loaned" : "Available";

            return (
              <article
                key={book.book_id}
                className="book-card"
                onClick={() => handleCardClick(book)}
                style={{ cursor: "pointer" }}
              >
                <div className="book-card-header">
                  <h2>
                    <i>{book.title}</i> by {book.author}
                  </h2>
                  <span
                    className={`status ${isLoaned ? "loaned" : "available"}`}
                  >
                    {statusText}
                  </span>
                </div>
                <p>Genre: {book.genre}</p>
                <p>{book.description || "No description available."}</p>
              </article>
            );
          })}
        </div>
      )}

      {showModal && selectedBook && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Book Details</h2>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Title:</strong> {selectedBook.title}</p>
              <p><strong>Author:</strong> {selectedBook.author}</p>
              <p><strong>Genre:</strong> {selectedBook.genre}</p>
              <p><strong>Description:</strong> {selectedBook.description || "No description available."}</p>
              <p><strong>Year Published:</strong> {selectedBook.year_published}</p>
              <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
              <p><strong>Status:</strong> {selectedBook.is_loaned === 0 ? "Available" : "Loaned"}</p>

              {selectedBook.is_loaned === 0 && userID && (
                <div className="loan-section">
                  <button onClick={handleLoanRequest}>Request Book</button>
                </div>
              )}

              {selectedBook.is_loaned === 0 && !userID && (
                <p>Please log in to request books.</p>
              )}

              {loanMessage && (
                <p className={`loan-message ${loanMessage.includes("success") || loanMessage.includes("Success") ? "success" : "error"}`}>
                  {loanMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
