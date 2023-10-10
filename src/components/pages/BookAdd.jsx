import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../AdminAdd.css';
import addBooks from '../../utils/images/addBooks.jpg';
import { CSSTransition } from 'react-transition-group';
import { Button } from 'semantic-ui-react';
import { BASE_URL } from '../services/helper';

const BookAdd = (props) => {
  const [inputs, setInputs] = useState(props.data);
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'));
  const [userID, setUserID] = useState(sessionStorage.getItem('userId'));
  const [userRole, setUserrole] = useState(sessionStorage.getItem('userRole'));
  const navigate = useNavigate();

  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setShowHeader(true);
  }, []);

  // To display form validation warning
  const [displayNameWarn, setDisplayNameWarn] = useState(false);
  const [displayAuthorWarn, setdisplayAuthorWarn] = useState(false);
  const [displayGenreWarn, setDisplayGenreWarn] = useState(false);
  const [displayLanguagesWarn, setDisplayLanguagesWarn] = useState(false);
  const [displayRentalPeriodWarn, setDisplayRentalPeriodWarn] = useState(false);
  const [displayDescriptionWarn, setDisplayDescriptionWarn] = useState(false);
  const [displayAvailabilityStatusWarn, setDisplayAvailabilityStatusWarn] = useState(false);
  const [displayIsbnNumberWarn, setDisplayIsbnNumberWarn] = useState(false);
  const [displayPublicationYearWarn, setDisplayPublicationYearWarn] = useState(false);

  // To handle inputs from the form
  const inputHandler = (e) => {
    setDisplayNameWarn(false);
    setdisplayAuthorWarn(false);
    setDisplayGenreWarn(false);
    setDisplayLanguagesWarn(false);
    setDisplayRentalPeriodWarn(false);
    setDisplayDescriptionWarn(false);
    setDisplayAvailabilityStatusWarn(false);
    setDisplayIsbnNumberWarn(false);
    setDisplayPublicationYearWarn(false);

    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // Function to handle inputs when submit button is clicked
  const submitHandler = () => {
    // Check if any of the required fields are empty and set the corresponding warnings
    setDisplayNameWarn(inputs.bookName === '');
    setdisplayAuthorWarn(inputs.author === '');
    setDisplayGenreWarn(inputs.genre === '');
    setDisplayLanguagesWarn(inputs.languages === '');
    setDisplayRentalPeriodWarn(inputs.rentalPeriod === '');
    setDisplayDescriptionWarn(inputs.description === '');
    setDisplayAvailabilityStatusWarn(inputs.availabilityStatus === '');
    setDisplayIsbnNumberWarn(inputs.isbnNumber === '');
    setDisplayPublicationYearWarn(inputs.publicationYear === '');

    // Check if any of the required fields are empty and prevent form submission
    if (
      inputs.bookName === '' ||
      inputs.author === '' ||
      inputs.genre === '' ||
      inputs.languages === '' ||
      inputs.rentalPeriod === '' ||
      inputs.description === '' ||
      inputs.availabilityStatus === '' ||
      inputs.isbnNumber === '' ||
      inputs.publicationYear === ''
    ) {
      return;
    }

    let data = {
      userId: userID,
      token: userToken,
      role: userRole,
      bookName: inputs.bookName,
      author: inputs.author,
      genre: inputs.genre,
      languages: inputs.languages,
      rentalPeriod: inputs.rentalPeriod,
      description: inputs.description,
      availabilityStatus: inputs.availabilityStatus,
      isbnNumber: inputs.isbnNumber,
      publicationYear: inputs.publicationYear,
    };

    // post function
    if (props.method === 'post') {
      axios
        .post(`${BASE_URL}/api/postbdata`, data)
        .then((response) => {
          if (response.data.message === 'Book added successfully') {
            Swal.fire('', response.data.message, 'success');
            navigate('/uhome');
          } else {
            Swal.fire('Sorry', response.data.message, '');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // update function
    if (props.method === 'put') {
      axios
        .put(`${BASE_URL}/api/putbdata/${inputs._id}`, inputs)
        .then((response) => {
          if (response.data.message === 'Updated successfully') {
            Swal.fire('', response.data.message, 'success');
            window.location.reload(false);
          } else {
            Swal.fire('Sorry', response.data.message, '');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const generatePublicationYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  const genreOptions = [
    'Kids',
    'Fiction',
    'Non-Fiction',
    'Biography',
    'Drama',
    'Thriller',
    'Comedy',
    'Fantasy',
    'Romance',
    'Adventure',
    'Sports',
    'Action',
    'Horror',
    'Musical',
    'Mystery',
  ];



  // Check the role admin or user before rendering the form
  const isAuthorized = userRole === 'admin' || userRole === 'user';

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





  return (
    <div style={{
      backgroundImage: `url(${addBooks})`,
      backgroundSize: 'cover',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      overflow: 'auto'
    }}>
      <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>
        {/* Users Form */}
        <div className="container-form mt-5 pt-5">
          {/* Form header */}
          <CSSTransition in={showHeader} timeout={500} classNames="fade" unmountOnExit>
            <h3 className="form-header">ADD BOOKS</h3>
          </CSSTransition>
          <br></br>
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <div className="row g-1">
                {/* Name */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="bookName" className="form-label">
                        Name:
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input
                        type="text"
                        id="bookName"
                        className="form-control"
                        name="bookName"
                        placeholder="Enter Book Name"
                        value={inputs.bookName}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      />
                      {displayNameWarn && (
                        <p className="fw-light fst-italic text-start text-danger">Name is required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Author */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="author" className="form-label">
                        Author:
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input
                        type="text"
                        id="author"
                        className="form-control"
                        name="author"
                        placeholder="Enter author"
                        value={inputs.author}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      />
                      {displayAuthorWarn && (
                        <p className="fw-light fst-italic text-start text-danger">Author is required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Genre */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="genre" className="form-label">
                        Genre
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <select
                        id="genre"
                        className="form-select"
                        name="genre"
                        placeholder="Select genre"
                        value={inputs.genre}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      >
                        <option value="" disabled>
                          Select a genre
                        </option>
                        {genreOptions.map((genre, index) => (
                          <option key={index} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                      {displayGenreWarn && (
                        <p className="fw-light fst-italic text-start text-danger">Genre is required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* review */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="review" className="form-label">
                        Review:
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input
                        type="text"
                        id="review"
                        className="form-control"
                        name="review"
                        placeholder="review"
                        value={inputs.review}
                        onChange={inputHandler}
                        required

                      />
                    </div>
                  </div>
                </div>
                {/* Languages */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="languages" className="form-label">
                        Languages:
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <select
                        id="languages"
                        className="form-control"
                        name="languages"
                        placeholder="Enter languages"
                        value={inputs.languages}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      >
                        <option value="" disabled>
                          Select a language
                        </option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Other">Other</option>
                      </select>
                      {displayLanguagesWarn && (
                        <p className="fw-light fst-italic text-start text-danger">Languages are required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* RentalPeriod */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="rentalPeriod" className="form-label">
                        Rental Period
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input
                        type="text"
                        id="rentalPeriod"
                        className="form-control"
                        name="rentalPeriod"
                        placeholder="Enter Rental Period"
                        value={inputs.rentalPeriod}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      />
                      {displayRentalPeriodWarn && (
                        <p className="fw-light fst-italic text-start text-danger">Rental Period is required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* description */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input
                        type="text"
                        id="description"
                        className="form-control"
                        name="description"
                        placeholder="Enter description"
                        value={inputs.description}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      />
                      {displayDescriptionWarn && (
                        <p className="fw-light fst-italic text-start text-danger">Description is required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Availability Status */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="availabilityStatus" className="form-label">
                        Availability
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <select
                        id="availabilityStatus"
                        className="form-control"
                        name="availabilityStatus"
                        placeholder="Enter availabilityStatus"
                        value={inputs.availabilityStatus}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      >
                        <option value="" disabled>
                          Select availability status
                        </option>
                        <option value="Available">Available</option>
                        <option value="Rented">Rented</option>
                      </select>
                      {displayAvailabilityStatusWarn && (
                        <p className="fw-light fst-italic text-start text-danger">Availability is required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* isbnNumber */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="isbnNumber" className="form-label">
                        ISBN Number
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input
                        type="text"
                        id="isbnNumber"
                        className="form-control"
                        name="isbnNumber"
                        placeholder="Enter ISBN Number"
                        value={inputs.isbnNumber}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      />
                      {displayIsbnNumberWarn && (
                        <p className="fw-light fst-italic text-start text-danger">ISBN Number is required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* PublicationYear */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="publicationYear" className="form-label">
                        Publication Year
                      </label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <select
                        id="publicationYear"
                        className="form-select"
                        name="publicationYear"
                        value={inputs.publicationYear}
                        onChange={inputHandler}
                        required
                        disabled={userRole !== 'admin'}
                      >
                        <option value="" disabled>
                          Select publication year
                        </option>
                        {generatePublicationYearOptions()}
                      </select>
                      {displayPublicationYearWarn && (
                        <p className="fw-light fst-italic text-start text-danger">Publication Year is required</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Button*/}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    {/* offset */}
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3"></div>
                    {/* Button Submit*/}
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                      <button className="form-button" onClick={submitHandler}>
                        Submit
                      </button>
                    </div>
                    {/* Button */}
                    <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-4">
                      <a href="/uhome">
                        <button className="form-button back-button">Back to Dashboard</button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookAdd;
