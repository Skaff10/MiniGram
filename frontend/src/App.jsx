import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Create" element={<Create />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
