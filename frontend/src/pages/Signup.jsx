import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../features/user/userSlice";
import LoadingSpinner from "../utils/Spinner";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identifier: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const { firstName, lastName, user_name, email, password, confirmpassword } =
    formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) navigate("/");
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const strength = getPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return "";
    const strong = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&]).{8,}$/;
    const medium = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (strong.test(pass)) return "strong";
    if (medium.test(pass)) return "medium";
    return "weak";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: `${firstName} ${lastName}`,
      email,
      user_name,
      password,
      confirmpassword,
    };

    dispatch(register(userData));
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

      {/* Signup Card */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* First & Last Name */}
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Username */}
          <input
            type="text"
            name="user_name"
            value={user_name}
            onChange={handleChange}
            placeholder="Username"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />

          {/* Password */}
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

          {/* Password Strength */}
          {password && (
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  passwordStrength === "strong"
                    ? "bg-green-500 w-full"
                    : passwordStrength === "medium"
                    ? "bg-yellow-400 w-2/3"
                    : "bg-red-500 w-1/3"
                }`}
              ></div>
            </div>
          )}

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmpassword"
              value={confirmpassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showConfirmPassword ? (
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
