import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../features/user/userSlice";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [activeTab, setActiveTab] = useState("username");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    email: "",
  });

  const { identifier, password, email } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) navigate("/");
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "username") {
      dispatch(login({ identifier, password }));
    } else {
      dispatch(login({ identifier: email, password }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-black via-gray-900 to-black text-gray-900">
      {isLoading && <LoadingSpinner />}

      {/* Logo & Title */}
      <div className="flex flex-col items-center mb-6">
        <img src="/logo.png" alt="MiniGram" className="w-20 h-20 mb-3" />
        <h1 className="text-3xl font-bold text-white tracking-wide">
          MINIGRAM
        </h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Tabs */}
        <div className="flex mb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("username")}
            className={`w-1/2 py-2 font-medium text-sm ${
              activeTab === "username"
                ? "border-b-2 border-purple-500 text-purple-600"
                : "text-gray-500"
            }`}
          >
            Username
          </button>
          <button
            onClick={() => setActiveTab("phone")}
            className={`w-1/2 py-2 font-medium text-sm ${
              activeTab === "phone"
                ? "border-b-2 border-purple-500 text-purple-600"
                : "text-gray-500"
            }`}
          >
            Email
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {activeTab === "username" ? (
            <input
              type="text"
              name="identifier"
              value={identifier}
              onChange={handleChange}
              placeholder="Enter your username"
              autoComplete="username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          ) : (
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} className="cursor-pointer" />
              ) : (
                <Eye size={18} className="cursor-pointer" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm py-2 rounded-lg transition duration-300"
          >
            Next
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center mt-4">
          <a href="#" className="text-xs text-gray-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        <p className="text-center text-sm mt-5 text-gray-700">
          Not on <b>MiniGram?</b>{" "}
          <Link
            to="/signup"
            className="font-semibold text-black hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
