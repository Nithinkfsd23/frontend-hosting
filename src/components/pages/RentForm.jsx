import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from "../services/helper";



const RentForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [bookInfo, setBookInfo] = useState({
    bookName: '',
    author: '',
    libraryId: '',
    name: '',
    contactNumber: '',
  });
  const [rentedSuccessfully, setRentedSuccessfully] = useState(false);

  useEffect(() => {
    // Fetch book details based on bookId
    axios.get(`${BASE_URL}/api/getbdata/${bookId}`)
      .then((response) => {
        const { data } = response.data;
        if (data) {
          // Autofill the rent form fields with book information
          setBookInfo({
            bookName: data.bookName,
            author: data.author,
            libraryId: '',
            name: '',
            contactNumber: '',
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value,
    });
  };

  const handleRent = () => {
    // Make a POST request to rent the book
    axios.post(`http://localhost:5000/api/rentbook/${bookId}`, bookInfo)
      .then((response) => {
        const { message, rentInfo } = response.data;
        if (message === 'Book rented successfully') {
          // Display a success message and clear the form
          setRentedSuccessfully(true);
          setBookInfo({
            bookName: '',
            author: '',
            libraryId: '',
            name: '',
            contactNumber: '',
          });

        } else {
          // Handle error cases
          console.error(message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div>
      <h2>Rent Book: {bookInfo.bookName}</h2>

      {rentedSuccessfully && <p>Book rented successfully!</p>}


      <form>
        <div>
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={bookInfo.bookName}
            disabled
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={bookInfo.author}
            disabled
          />
        </div>
        <div>
          <label>Library ID:</label>
          <input
            type="text"
            name="libraryId"
            value={bookInfo.libraryId}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={bookInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contact Number:</label>
          <input
            type="text"
            name="contactNumber"
            value={bookInfo.contactNumber}
            onChange={handleInputChange}
          />
        </div>

        {/* Link to User Home */}
        <Link to="/uhome">
          <button type="button">Go Back</button>
        </Link>
        <button type="button" onClick={handleRent}>Rent Book</button>
      </form>
    </div>
  );
};

export default RentForm;
