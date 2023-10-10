import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import AdminAdd from './components/pages/AdminAdd';
import UserHome from './components/pages/UserHome';
import AdminHome from './components/pages/AdminHome';
import Main from './components/pages/Main';
import BookAdd from './components/pages/BookAdd';
import RentForm from './components/pages/RentForm';
import ImageUpload from './components/pages/ImageUpload ';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/imageUpload/:bookId' element={<ImageUpload />} />
        <Route path='/rentbook/:bookId' element={<RentForm />} />
        <Route path='/uhome' element={<Main child={<UserHome />} />} />
        <Route path="/badd" element={<Main child={<BookAdd method="post" data={
          {
            bookName: "",
            author: "",
            imageData: "",
            review: "",
            genre: "",
            languages: "English",
            rentalPeriod: "",
            description: "",
            availabilityStatus: "Available",
            isbnNumber: "",
            publicationYear: ""
          }
        } />} />} />
        <Route path="/ahome" element={<Main child={<AdminHome />} />} />
        <Route path="/aadd" element={<Main child={<AdminAdd method="post" data={
          {
            name: "",
            email: "",
            username: "",
            password: "",
            roleInputs: "user",
            libraryId: "",
            contactNumber: ""

          }
        } />} />} />
      </Routes>
    </div>
  );
}

export default App;
