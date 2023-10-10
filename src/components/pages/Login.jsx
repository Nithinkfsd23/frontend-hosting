import axios from "axios";
import React from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import BG2 from '../../utils/images/BG2.jpg'
import { useState } from 'react'
import '../Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../services/helper";


const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false); // State variable for showing the alert
  const [alertMessage, setAlertMessage] = useState(""); // State variable to hold the alert message
  const [showPassword, setShowPassword] = useState(false);
  const eyeIcon = <FontAwesomeIcon icon={faEye} />;
  const eyeSlashIcon = <FontAwesomeIcon icon={faEyeSlash} />;

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log(value)
    console.log(user)
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = (event) => {

    console.log("Clicked", user);

    event.preventDefault();
    let err;

    axios
      .post(`${BASE_URL}/api/login`, user)
      .then((response) => {
        if (response.data.message === "Login Successfull!!") {
          const token = response.data.token;
          const role = response.data.data.roleInputs;
          const nameUser = response.data.data.name;
          sessionStorage.setItem("userToken", token);
          sessionStorage.setItem("userRole", role);
          sessionStorage.setItem("userName", nameUser);
          setShowAlert(true); // Show the success alert
          setAlertMessage(response.data.message); // Set the success alert message
          navigateToHome(role); // Call a separate function to navigate to the home page after showing the alert
        } else {
          setShowAlert(true); // Show the error alert
          setAlertMessage(response.data.message); // Set the error alert message
        }
      })
      .catch((error) => {
        err = error; // Assign the error to the err variable
        setShowAlert(true); // Show the error alert
        setAlertMessage("Try again"); //  error message
        console.log(err);
      });

  };


  // to direct the user to the respective page after login
  const navigateToHome = (role) => {
    console.log("login");
    if (role === 'admin') {
      navigate("/ahome");
    }
    else if (role === 'user') {
      navigate("/uhome");
    }
  };





  return (
    <div>

      <div style={{ backgroundImage: `url(${BG2})`, backgroundSize: "cover", height: "100vh" }}>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>
        </div>

        <Link to='/'>
          <Button class='d-flex' style={{ backgroundColor: '#008080', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '20px', fontSize: '15px', cursor: 'pointer' }}
          >  GO TO HOME
          </Button>
        </Link>

        {/*  JSX block for displaying the alert message */}
        <div className="alert-message">
          {showAlert && (
            <div className={`alert ${alertMessage === "Login Successfull!!" ? "success" : "error"}`}>
              {alertMessage}
            </div>
          )}
        </div>

        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"

                name="username"
                id="username"
                placeholder="Enter your username"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? eyeSlashIcon : eyeIcon}
                </span>
              </div>
            </div>
            <div className="d-flex flex-column">
              <button type="submit">Login</button>
              <div className="forgot-password">
                <Link to>Forgot Password?</Link>
              </div>
            </div>
          </form>
          <div className="new-user-signup">
            <p>New User? <Link to='/signup'>Signup</Link></p>
          </div>
        </div>

      </div>
    </div>


  )
}

export default Login