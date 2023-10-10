import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import BG2 from '../../utils/images/BG2.jpg';
import '../Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../services/helper";


const Signup = () => {

  const navigate = useNavigate();

  const initialFormData = {
    name: '',
    email: '',
    username: '',
    password: '',
    libraryId: '',
    contactNumber: '',
    roleInputs: 'user',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'));
  const [userRole, setUserRole] = useState(sessionStorage.getItem('userRole'));

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [libraryIdError, setLibraryIdError] = useState('');
  const [contactNumberError, setContactNumberError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const eyeIcon = <FontAwesomeIcon icon={faEye} />;
  const eyeSlashIcon = <FontAwesomeIcon icon={faEyeSlash} />;


  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const usernameRegex = /^[A-Za-z0-9_]{5,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const contactNumberRegex = /^[0-9]{10}$/;

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;

    if (formData.name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!usernameRegex.test(formData.username)) {
      setUsernameError('Username must be at least 5 characters long and can only contain letters, numbers, and underscores');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!passwordRegex.test(formData.password)) {
      setPasswordError('Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (formData.libraryId.trim() === '') {
      setLibraryIdError('Library ID is required');
      isValid = false;
    } else {
      setLibraryIdError('');
    }

    if (!contactNumberRegex.test(formData.contactNumber)) {
      setContactNumberError('Contact number must be a 10-digit numeric value');
      isValid = false;
    } else {
      setContactNumberError('');
    }
    return isValid;
  };


  const handleSubmit = (event) => {

    event.preventDefault();
    console.log('Form submitted');

    if (validateForm()) {
      const data = {
        token: userToken,
        role: userRole,
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        libraryId: formData.libraryId,
        contactNumber: formData.contactNumber,
        roleInputs: formData.roleInputs,
      };

      axios
        .post(`${BASE_URL}/api/postudata`, data)
        .then((response) => {
          console.log(response)
          if (response.data.message === 'User added successfully') {
            Swal.fire('', response.data.message, 'success');
            navigate('/login');
          } else {
            Swal.fire('Sorry', response.data.message, '');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div style={{ backgroundImage: `url(${BG2})`, backgroundSize: 'cover', height: '100vh' }}>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12"></div>
        </div>

        <Link to="/">
          <Button
            class="d-flex"
            style={{
              backgroundColor: '#008080',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '20px',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            GO TO HOME
          </Button>
        </Link>
        <div className="signup-box">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={inputHandler}

              />
              <span className="error">{nameError}</span>
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={inputHandler}

              />
              <span className="error">{emailError}</span>
            </div>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={inputHandler}

              />
              <span className="error">{usernameError}</span>
            </div>
            <div>
              <label>Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={inputHandler}
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? eyeSlashIcon : eyeIcon}
                </span>
              </div>
              <span className="error">{passwordError}</span>
            </div>

            <div>
              <label>Library ID:</label>
              <input
                type="text"
                name="libraryId"
                value={formData.libraryId}
                onChange={inputHandler}

              />
              <span className="error">{libraryIdError}</span>
            </div>
            <div>
              <label>Contact Number:</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={inputHandler}

              />
              <span className="error">{contactNumberError}</span>
            </div>
            <div>
              <button type="submit">SIGNUP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
