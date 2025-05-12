import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Optional for JS components like modals
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './components/Main';
import Home from './components/Home';
import AddPlatform from './components/AddPlatform';
import ProfilePage from './components/Profile';
function App() {
  return (
    <> 
    <Router> 
      {/* <div className="container">  */}
      {/* <Navbar/>                                                                                   */}
    <Routes>
    {/* <Route exact path="/" element={<Navbar/>}></Route> */}
          <Route exact path="/" element={<Home/>}></Route>
          {/* <Route exact path="/about" element={<About/>}></Route> */}
          <Route exact path="/login" element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/addplatform" element={<AddPlatform/>}></Route>
          <Route exact path="/profile" element={<ProfilePage/>}></Route>
    </Routes>
    {/* </div> */}
    </Router> 
    </>
  );
}

export default App;
