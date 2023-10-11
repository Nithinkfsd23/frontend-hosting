import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../UserHome.css';
import 'font-awesome/css/font-awesome.min.css';
import BookAdd from './BookAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../services/helper";



const UserHome = () => {
  const [data, setData] = useState([]);
  const [updation, setUpdation] = useState(false);
  const [singleval, setSingleval] = useState([]);
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'));
  const [userRole, setUserrole] = useState(sessionStorage.getItem('userRole'));
  const [loading, setLoading] = useState(true);
  const [clickedCard, setClickedCard] = useState(null);
  const navigate = useNavigate();


  const logout = () => {
    sessionStorage.clear(); // Clear sessionStorage
    console.clear(); // Clear console output
    navigate("/")
  }

  // Fetch Users data from the database
  const fetchDatafromAPI = () => {
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

  const editReview = (val) => {
    setUpdation(true);
    setSingleval(val); // Set the book data to be edited
  };

  const updateBook = (val) => {
    setUpdation(true);
    setSingleval(val);
  };

  // Delete users
  const deleteBook = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');

    if (confirmed) {
      axios
        .delete(`${BASE_URL}/api/delbdata/${id}`)
        .then((response) => {
          if (response.data.message === 'Deleted successfully') {
            window.location.reload(true);
            Swal.fire('', response.data.message, 'success');
          } else {
            Swal.fire('Sorry', response.data.message, '');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchDatafromAPI()
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  }, []);

  const handleAddUserClick = () => {
    setUpdation(false);
  };

  const reloadData = () => {
    fetchDatafromAPI()
      .then(() => setLoading(false))
      .catch((error) => console.log(error));
  };

  // Function to show full card details when a card is clicked
  const showFullCard = (card) => {
    setClickedCard(card);
  };


  // Check the role admin or user before rendering the form
  const isAuthorized = userRole === 'admin' || userRole === 'user';
  const isAdmin = userRole === 'admin';

  if (!isAuthorized) {
    return (
      <div>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page.</p>
        <Link to="/login">
          <Button primary>Login</Button>
        </Link>
      </div>
    );
  }




  // To display users data
  let finalJSX = (

    <div className="user-home-container">
      <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12">


          {/* navbar */}
          <nav class="navbar navbar-expand-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}>
            <div class="container-fluid">
              <a class="navbar-brand white-text" href="#">USER DASHBOARD</a>

              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">


                </ul>
                <form class="d-flex" >

                  {isAdmin && (
                    <Link to='/ahome'>
                      <Button className="go-to-books-button" style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}
                      >  ADMIN DASHBOARD
                      </Button>
                    </Link>
                  )}

                  <Button className="logout-button" onClick={logout} style={{ backgroundColor: '#ff4500', color: 'white', marginLeft: '10px', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}>
                    LOGOUT
                  </Button>


                </form>
              </div>
            </div>
          </nav>
          {/* navbar end */}

          {/* Conditional check for user login */}

          <div className="container text-center mt-4">
            <h2 className="user-data-heading">BOOKS </h2>
          </div>




          {clickedCard ? (
            <div className="container ">
              {/* Full card details */}
              <div className="card expanded-card">
                {/* Render all the card details here */}
                <h1 className="expanded-card-title  ">{clickedCard.bookName}</h1>
                <div className="expanded-card-details">
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
                {/*  button or link to go back to the card view */}
                <div><button onClick={() => setClickedCard(null)} className="go-back-button">
                  Go Back
                </button></div>
              </div>
            </div>
          ) : (
            <div className="container w-75 mt-4 pt-4">
              {userRole === 'admin' && (
                <>
                  <Link to="/badd">
                    <Button variant="success" className="mb-3" onClick={handleAddUserClick}>
                      <FontAwesomeIcon
                        icon={faBook}
                        className="book-icon-animation"
                        style={{
                          fontSize: '48px', // Increase the size of the icon
                          animation: 'rotateIcon 2s infinite', // Add animation
                        }}
                      />{' '}

                    </Button>
                  </Link>
                </>
              )}

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

                        <div className="card-body animated" style={{ height: '250px' }}>
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
                            <br />
                            <strong>Description:</strong> {value.description}
                            <br />
                          </p>
                        </div>
                        <div className="card-footer">
                          {/*image */}
                          {userToken && (
                            <>
                              <Button variant="primary" className="custom-button" onClick={() => editReview(value)}>
                                Review
                              </Button>
                              {/* Conditionally render the buttons based on the user's role */}
                              {userRole === 'admin' && (
                                <>
                                  <Button variant="success" className="custom-button" onClick={() => updateBook(value)}>
                                    Edit{/* Edit button */}
                                  </Button>{' '}
                                  <Button variant="danger" className="custom-button" onClick={() => deleteBook(value._id)}>
                                    Delete
                                  </Button>{/* Delete button */}
                                </>
                              )}
                              <Link to="/rentbook/:id" className="custom-link">
                                {/* Add Link component here */}
                                <Button variant="primary" className="custom-button">
                                  Rent
                                </Button>
                              </Link>{/* Rent button */}
                            </>
                          )}
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

  if (updation) finalJSX = <BookAdd method="put" data={singleval} reloadData={reloadData} />;


  return (
    finalJSX
  )
};

export default UserHome;
