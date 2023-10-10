import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import '../AdminAdd.css';
import addUser from '../../utils/images/addUser.jpg'
import { CSSTransition } from 'react-transition-group';
import { BASE_URL } from '../services/helper';

const AdminAdd = (props) => {

  const [inputs, setInputs] = useState(props.data);
  const [userToken, setUserToken] = useState(sessionStorage.getItem("userToken"))
  const [userID, setUserID] = useState(sessionStorage.getItem("userId"))
  const [userRole, setUserrole] = useState(sessionStorage.getItem("userRole"));
  const navigate = useNavigate();

  const [showHeader, setShowHeader] = useState(false);


  useEffect(() => {
    setShowHeader(true);
  }, []);


  // to display form validation warning
  const [displayNamewarn, setDisplayNamewarn] = useState(false);
  const [displayEmailwarn, setDisplayEmailwarn] = useState(false);
  const [displayUwarn, setDisplayUwarn] = useState(false);
  const [displayPwarn, setDisplayPwarn] = useState(false);
  const [displayLibraryIdWarn, setDisplayLibraryIdWarn] = useState(false);
  const [displayContactNumberWarn, setDisplayContactNumberWarn] = useState(false);



  // to handle inputs from the form
  const inputHandler = (e) => {
    setDisplayNamewarn(false);
    setDisplayEmailwarn(false);
    setDisplayUwarn(false);
    setDisplayPwarn(false);

    const { name, value } = e.target;

    setInputs({
      ...inputs, [name]: value
    });


    console.log(inputs);
  }


  // function to handle inputs when submit button is clicked
  const submitHandler = () => {


    let isValid = true;

    // Name validation: Check if it contains only letters
    if (!/^[a-zA-Z\s]+$/.test(inputs.name)) {
      setDisplayNamewarn(true);
      isValid = false;
    } else {
      setDisplayNamewarn(false);
    }

    // Email validation: Check if it's a valid email address
    if (!/^\S+@\S+\.\S+$/.test(inputs.email)) {
      setDisplayEmailwarn(true);
      isValid = false;
    } else {
      setDisplayEmailwarn(false);
    }

    // Username validation: Check if it contains at least 5 characters with letters and numbers only
    if (!/^[a-zA-Z0-9]{5,}$/.test(inputs.username)) {
      setDisplayUwarn(true);
      isValid = false;
    } else {
      setDisplayUwarn(false);
    }

    // Password validation: Check if it's at least 8 characters long with one alphabet, one special character, and one number
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputs.password)) {
      setDisplayPwarn(true);
      isValid = false;
    } else {
      setDisplayPwarn(false);
    }

    // Library ID validation: Check if it's a valid Library ID
    if (!/^[0-9]+$/.test(inputs.libraryId)) {
      setDisplayLibraryIdWarn(true);
      isValid = false;
    } else {
      setDisplayLibraryIdWarn(false);
    }

    // Contact Number validation: Check if it's a valid phone number
    if (!/^[0-9]{10}$/.test(inputs.contactNumber)) {
      setDisplayContactNumberWarn(true);
      isValid = false;
    } else {
      setDisplayContactNumberWarn(false);
    }

    if (isValid) {
      let data = {
        userId: userID,
        token: userToken,
        role: userRole,
        name: inputs.name,
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
        roleInputs: inputs.roleInputs,
        libraryId: inputs.libraryId,
        contactNumber: inputs.contactNumber,
      }
      console.log(data)
      // post function
      if (props.method === "post") {
        axios.post(`${BASE_URL}/api/postudata`, data)
          .then((response) => {
            if (response.data.message === "User added successfully") {
              Swal.fire('', response.data.message, 'success');
              navigate('/ahome');
            }
            else {
              Swal.fire('Sorry', response.data.message, '');
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
      // update function
      if (props.method === "put") {
        axios.put(`${BASE_URL}/api/putudata/${inputs._id}`, inputs)
          .then((response) => {
            if (response.data.message === "Updated successfully") {
              Swal.fire('', response.data.message, 'success');
              window.location.reload(false);
            }
            else {
              Swal.fire('Sorry', response.data.message, '');
            }
          })
          .catch((err) => { console.log(err) })
      }
    }
  };

  // Check if the user is an admin before rendering the form
  const isAdmin = userRole === 'admin';

  if (!isAdmin) {
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

    <div style={{ backgroundImage: `url(${addUser})`, backgroundSize: "cover", height: "120vh" }}>
      <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>
        {/* Users Form */}
        <div className="container-form mt-5 pt-5">
          {/* Form header */}
          <CSSTransition
            in={showHeader}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <h3 className="form-header">ADD USERS</h3>
          </CSSTransition>
          <br></br>
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <div className="row g-1">




                {/* Name */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="name" className="form-label">Name:</label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input type="text"
                        id="name"
                        className="form-control"
                        name="name"
                        placeholder="Enter name"
                        value={inputs.name}
                        onChange={inputHandler}
                        required
                      />
                      {displayNamewarn ? <p className="fw-light fst-italic text-start warning-text">Must contain letters only</p> : <p></p>}
                    </div>
                  </div>
                </div>
                {/* Email ID */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="email" className="form-label">Email:</label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input type="text"
                        id="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        value={inputs.email}
                        onChange={inputHandler}
                        required
                      />
                      {displayEmailwarn ? <p className="fw-light fst-italic text-start warning-text">Must be a valid Email ID</p> : <p></p>}
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="username" className="form-label">Username:</label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input type="text"
                        id="username"
                        className="form-control"
                        name="username"
                        placeholder="Enter username"
                        value={inputs.username}
                        onChange={inputHandler}
                      />
                      {displayUwarn ? <p className="fw-light fst-italic text-start warning-text">Must be min 5 characters with alphabets and numbers only</p> : <p></p>}
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="password" className="form-label">Password:</label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input type="text"
                        id="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter password"
                        value={inputs.password}
                        onChange={inputHandler}
                        required
                      />
                      {displayPwarn ? <p className="fw-light fst-italic text-start warning-text">Your password must be a minimum of 8 characters long and include at least one alphabet letter, one special character, and one number.</p> : <p></p>}
                    </div>
                  </div>
                </div>



                {/* Library ID Number */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="libraryId" className="form-label">Library ID:</label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input
                        type="text"
                        id="libraryId"
                        className="form-control"
                        name="libraryId"
                        placeholder="Enter Library ID"
                        value={inputs.libraryId}
                        onChange={inputHandler}
                      />
                      {displayLibraryIdWarn ? (
                        <p className="fw-light fst-italic text-start warning-text">Must be a valid Library ID</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Number */}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                      <input
                        type="text"
                        id="contactNumber"
                        className="form-control"
                        name="contactNumber"
                        placeholder="Enter Contact Number"
                        value={inputs.contactNumber}
                        onChange={inputHandler}
                      />
                      {displayContactNumberWarn ? (
                        <p className="fw-light fst-italic text-start warning-text">Must be a valid 10 digit Number</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                </div>


                {/* Button*/}
                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                  <div className="row">
                    {/* offset */}
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                    </div>
                    {/* Button Submit*/}
                    <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                      <button className="form-button" onClick={submitHandler}>Submit</button>
                    </div>
                    {/* Button */}
                    <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 mb-4">
                      <a href="/ahome"><button className="form-button back-button">Back to Dashboard</button></a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAdd