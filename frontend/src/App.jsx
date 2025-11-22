import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";
import Create from "./pages/Create";
import Search from "./pages/Search";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Create" element={<Create />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
