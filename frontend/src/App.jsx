import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";
import Create from "./pages/Create";

// Wrap your routes in a component that can use useLocation
const AppRoutes = () => {
  const location = useLocation(); // now safe

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Feed />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Create" element={<Create />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer />
    </Router>
  );
};

export default App;
