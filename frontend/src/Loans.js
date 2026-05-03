import { useEffect, useState } from "react";
import axios from "./api/axios";

const formatDate = (dateValue) => {
  if (!dateValue) return "Unknown";

  try {
    let date;
    if (typeof dateValue === "string") {
      if (dateValue.includes("T")) {
        // ISO format: 2026-05-03T10:30:00Z
        date = new Date(dateValue);
      } else if (dateValue.includes("-")) {
        // YYYY-MM-DD format
        const [year, month, day] = dateValue.split("-").map(Number);
        // Create date in UTC to avoid timezone shifts
        date = new Date(Date.UTC(year, month - 1, day));
      } else if (dateValue.includes("/")) {
        // MM/DD/YYYY format
        date = new Date(dateValue);
      } else {
        date = new Date(dateValue);
      }
    } else if (typeof dateValue === "number") {
      date = new Date(dateValue);
    } else if (dateValue instanceof Date) {
      date = dateValue;
    } else {
      return "Unknown";
    }

    // Verify the date is valid
    if (isNaN(date.getTime())) {
      console.warn("Invalid date value:", dateValue);
      return "Unknown";
    }

    return date.toLocaleDateString();
  } catch (err) {
    console.error("Error formatting date:", dateValue, err);
    return "Unknown";
  }
};
// Loans page component
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
      const response = await axios.get("/userLoaned");
      const data = response.data;

      if (Array.isArray(data.userBooks)) {
        console.log("Loaned books data:", data.userBooks);
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
        dateParam: new Date().toISOString().split("T")[0],
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
        <p>Books you have currently loaned from the library:</p>
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
              <p>Loaned on: {formatDate(book.loan_date)}</p>
              <p>Due date: {formatDate(book.due_date)}</p>
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
