import { useEffect, useState } from "react";
import img from "../utils/logo.png";
import { toast } from "react-toastify";
import LoadingSpinner from "../Components/Spinner";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../features/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const { identifier, password } = formData;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      identifier,
      password,
    };

    dispatch(login(userData));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      {isLoading && <LoadingSpinner />}
      <div className="flex flex-col md:flex-row w-full max-w-6xl border border-gray-300 rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left Section (Visual / Branding) */}
        <section className="md:w-1/2 w-full flex flex-col items-center justify-center p-12 bg-linear-to-br from-gray-200 via-gray-100 to-white">
          <div
            style={{ backgroundImage: `url(${img})` }}
            className="ml-4 mb-8 w-64 h-64 bg-cover bg-center "
          ></div>
          <h1 className="text-5xl font-extrabold text-black mb-3 tracking-tight">
            MiniGram
          </h1>
          <p className="text-gray-600 text-lg max-w-md text-center leading-relaxed">
            Capture moments. Connect with people. Create your story — one post
            at a time.
          </p>
        </section>

        {/* Right Section (Form) */}
        <section className="md:w-1/2 w-full p-12 flex flex-col justify-center">
          <h2 className="text-4xl font-semibold mb-8 text-center text-black">
            Welcome Back 👋
          </h2>

          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <input
                type="text"
                name="identifier"
                value={identifier}
                onChange={handleChange}
                autoComplete="username"
                placeholder="Enter your username or email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition duration-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition duration-300"
              />
              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-black transition"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-3 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition duration-300 shadow-sm"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-8">
            Not on <span className="font-semibold text-black">MiniGram</span>?{" "}
            <Link
              to="/signup"
              className="underline hover:text-gray-700 transition"
            >
              Register
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
