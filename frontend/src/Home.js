import { useEffect, useState } from "react";
import axios from "./api/axios";

const Home = ({ userID }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loanMessage, setLoanMessage] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year_published: "",
    publisher: "",
  });
  const [createMessage, setCreateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  // get all books from backend
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
        dateParam: new Date().toISOString().split("T")[0],
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

  const handleCreateBook = () => {
    setShowCreateModal(true);
    setCreateMessage("");
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreateForm({
      title: "",
      author: "",
      description: "",
      genre: "",
      year_published: "",
      publisher: "",
    });
    setCreateMessage("");
  };

  const handleCreateFormChange = (e) => {
    const { name, value } = e.target;
    setCreateForm({ ...createForm, [name]: value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/add", createForm);
      if (response.data.success) {
        setCreateMessage("Book created successfully!");
        await fetchBooks(); // Refresh the book list
        setTimeout(() => handleCloseCreateModal(), 2000); // Close modal after 2 seconds
      } else {
        setCreateMessage("Failed to create book. Please try again.");
      }
    } catch (err) {
      setCreateMessage("Failed to create book. Please try again.");
    }
  };

  const handleDeleteBook = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
    setDeleteMessage("");
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
    setDeleteMessage("");
  };

  const handleConfirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      const response = await axios.delete(
        `/deleteBook?bookID=${bookToDelete.book_id}`,
      );
      if (response.data.success) {
        setDeleteMessage("Book deleted successfully!");
        await fetchBooks(); // Refresh the book list
        setTimeout(() => handleCloseDeleteModal(), 2000); // Close modal after 2 seconds
      } else {
        setDeleteMessage("Failed to delete book. Please try again.");
      }
    } catch (err) {
      setDeleteMessage("Failed to delete book. Please try again.");
    }
  };

  return (
    <div className="home-page">
      <header className="home-header">
        {userID && (
          <button onClick={handleCreateBook} className="create-btn">
            Create New Book
          </button>
        )}
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
                {userID && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBook(book);
                    }}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}
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
              <p>
                <strong>Title:</strong> {selectedBook.title}
              </p>
              <p>
                <strong>Author:</strong> {selectedBook.author}
              </p>
              <p>
                <strong>Genre:</strong> {selectedBook.genre}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedBook.description || "No description available."}
              </p>
              <p>
                <strong>Year Published:</strong> {selectedBook.year_published}
              </p>
              <p>
                <strong>Publisher:</strong> {selectedBook.publisher}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedBook.is_loaned === 0 ? "Available" : "Loaned"}
              </p>

              {selectedBook.is_loaned === 0 && userID && (
                <div className="loan-section">
                  <button onClick={handleLoanRequest}>Request Book</button>
                </div>
              )}

              {selectedBook.is_loaned === 0 && !userID && (
                <p>Please log in to request books.</p>
              )}

              {loanMessage && (
                <p
                  className={`loan-message ${loanMessage.includes("success") || loanMessage.includes("Success") ? "success" : "error"}`}
                >
                  {loanMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={handleCloseCreateModal}>
          <div
            className="create-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Create New Book</h2>
              <button className="close-button" onClick={handleCloseCreateModal}>
                &times;
              </button>
            </div>
            <div className="create-modal-body">
              <form onSubmit={handleCreateSubmit}>
                <div style={{ marginBottom: "10px" }}>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={createForm.title}
                    onChange={handleCreateFormChange}
                    required
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Author:</label>
                  <input
                    type="text"
                    name="author"
                    value={createForm.author}
                    onChange={handleCreateFormChange}
                    required
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={createForm.description}
                    onChange={handleCreateFormChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      marginTop: "5px",
                      minHeight: "60px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Genre:</label>
                  <input
                    type="text"
                    name="genre"
                    value={createForm.genre}
                    onChange={handleCreateFormChange}
                    required
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Year Published:</label>
                  <input
                    type="number"
                    name="year_published"
                    value={createForm.year_published}
                    onChange={handleCreateFormChange}
                    required
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label>Publisher:</label>
                  <input
                    type="text"
                    name="publisher"
                    value={createForm.publisher}
                    onChange={handleCreateFormChange}
                    required
                    style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button className="create-create-btn" type="submit">
                    Create Book
                  </button>
                  <button
                    className="create-cancel-btn"
                    type="button"
                    onClick={handleCloseCreateModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {createMessage && (
                <p
                  className={`loan-message ${createMessage.includes("success") ? "success" : "error"}`}
                  style={{ marginTop: "10px" }}
                >
                  {createMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && bookToDelete && (
        <div className="modal-overlay" onClick={handleCloseDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="close-button" onClick={handleCloseDeleteModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the book:</p>
              <p>
                <strong>{bookToDelete.title}</strong> by {bookToDelete.author}?
              </p>
              <p style={{ color: "#991313", fontWeight: "bold" }}>
                This action cannot be undone.
              </p>
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button
                  onClick={handleConfirmDelete}
                  style={{
                    backgroundColor: "#991313",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete Book
                </button>
                <button
                  onClick={handleCloseDeleteModal}
                  style={{
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
              {deleteMessage && (
                <p
                  className={`loan-message ${deleteMessage.includes("success") ? "success" : "error"}`}
                  style={{ marginTop: "10px" }}
                >
                  {deleteMessage}
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
