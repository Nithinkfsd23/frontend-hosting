import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BG1 from '../../utils/images/BG1.jpeg';
import Swal from 'sweetalert2';
import '../UserHome.css';
import 'font-awesome/css/font-awesome.min.css';
import { BASE_URL } from '../services/helper';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedCard, setClickedCard] = useState(null);



  // Fetch Books data from the database
  const fetchDataFromAPI = () => {
    return axios
      .get(`${BASE_URL}/api/getbdata`)
      .then((response) => {
        if (response.data.message === 'Success') {
          setData(response.data.data);
        } else {
          Swal.fire('Sorry', response.data.message, '');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchDataFromAPI()
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Function to show full card details when a card is clicked
  const showFullCard = (card) => {
    setClickedCard(card);
  };

  useEffect(() => {
    // Automatically scroll to the bottom when data changes
    scrollToBottom();
  }, [data]);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${BG1})`,
          backgroundSize: 'cover',
          height: '100vh', // Adjusted height to make cards appear on top
          overflow: 'auto', // Added overflow property to enable scrolling
        }}
      >
        {/* Navbar */}
        <nav class="navbar navbar-expand-lg " style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              BOOK STORE APP
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{color:'white'}}
            >
              <span class="navbar-toggler-icon" ></span>
            </button>
            <div class="collapse navbar-collapse"  id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              </ul>
              <form class="d-flex">
                <Link to="/login">
                  <Button
                    style={{
                      backgroundColor: 'rgba(0, 128, 128, 0.75)',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '15px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                    }}
                    className="login-button"
                  >
                    LOGIN
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    style={{
                      backgroundColor: 'rgba(0, 128, 128, 0.75)',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '15px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                    }}
                    className="signup-button"
                  >

                    SIGNUP
                  </Button>
                </Link>
              </form>
            </div>
          </div>
        </nav>

        {/* Centered content about books */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '20%',
            color: 'white',
            paddingTop: '20px',
          }}
        >
          <h1>Welcome to our Book Store</h1>
          <p>Discover a world of books and reading adventures.</p>
        </div>

        <div className="container text-center mt-4">
          <h2 className="user-data-heading">BOOKS </h2>
        </div>

        <div>



          {clickedCard ? (
            <div className="container ">
              {/* Full card details */}
              <div className="card expanded-card">
                {/* Render all the card details here */}
                <h5 className="card-title  ">{clickedCard.bookName}</h5>
                <div className="card-details">
                  <p>
                    <strong>Author:</strong> {clickedCard.author}
                  </p>
                  <p>
                    <strong>Genre:</strong> {clickedCard.genre}
                  </p>
                  <p>
                    <strong>Review:</strong> {clickedCard.review}
                  </p>
                  <p>
                    <strong>Languages:</strong> {clickedCard.languages}
                  </p>
                  <p>
                    <strong>Rental Period:</strong> {clickedCard.rentalPeriod}
                  </p>
                  <p>
                    <strong>Status:</strong> {clickedCard.availabilityStatus}
                  </p>
                  <p>
                    <strong>ISBN Number:</strong> {clickedCard.isbnNumber}
                  </p>
                  <p>
                    <strong>Publication Year:</strong> {clickedCard.publicationYear}
                  </p>
                  <p>
                    <strong>Description:</strong> {clickedCard.description}
                  </p>
                </div>
                {/* button  go back to the card view */}
                <div>
                  <button onClick={() => setClickedCard(null)} className="go-back-button">
                    Go Back
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="container w-75 mt-4 pt-4">


              <div className="row">
                {loading ? (
                  <p>Loading data...</p>
                ) : data && data.length > 0 ? (
                  data.map((value) => (
                    <div
                      key={value._id}
                      className={`col-md-4 mb-4 card-container ${clickedCard === value ? 'expanded-card' : ''}`}
                      onClick={() => showFullCard(value)}
                    >
                      <div className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
                        {value.imageData && (
                          <img
                            src={`data:${value.imageData.contentType};base64,${Buffer.from(
                              value.imageData.data
                            ).toString('base64')}`}
                            className="card-img-top"
                            alt={value.bookName}
                          />
                        )}

                        <div className="card-body animated" style={{ height: '200px' }}>
                          <h5 className="card-title">{value.bookName}</h5>
                          <p className="card-text">
                            <strong>Author:</strong> {value.author} {/* Display Author */}
                            <br />
                            <strong>Genre:</strong> {value.genre}
                            <br />
                            <strong>Reviews:</strong> {value.review}
                            <br />
                            <strong>Status:</strong>{' '}
                            {value.availabilityStatus === 'Available' ? (
                              <span style={{ color: 'green' }}>{value.availabilityStatus}</span>
                            ) : (
                              <span style={{ color: 'red' }}>{value.availabilityStatus}</span>
                            )}
                          </p>
                        </div>
                        <div className="card-footer">

                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No data available...</p>
                )}
              </div>
            </div>
          )}


        </div>




      </div>
    </div>
  );
};

export default Home;
