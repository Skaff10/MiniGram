import { Link, useNavigate } from "react-router-dom";
import img from "../utils/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { register, reset } from "../features/user/userSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    user_name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { name, user_name, email, password, confirmpassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess) navigate("/");

    dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch, message]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      user_name,
      email,
      password,
      confirmpassword,
    };
    dispatch(register(userData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      <div className="flex flex-col md:flex-row w-full max-w-6xl border border-gray-300 rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left Section (Visual / Branding) */}
        <section className="md:w-1/2 w-full flex flex-col items-center justify-center p-12 bg-linear-to-br from-gray-200 via-gray-100 to-white">
          <div
            style={{ backgroundImage: `url(${img})` }}
            className={`ml-5 mb-10 w-72 h-72  bg-cover bg-center`}
          ></div>
          <h1 className="text-5xl font-extrabold text-black mb-4 tracking-tight">
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
            Create Your Account
          </h2>

          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                autoComplete="name"
                name="name"
                value={name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition duration-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                autoComplete="user_name"
                onChange={handleChange}
                value={user_name}
                name="user_name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition duration-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                onChange={handleChange}
                value={email}
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition duration-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                value={password}
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition duration-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                value={confirmpassword}
                name="confirmpassword"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-black text-white rounded-xl font-semibold text-lg hover:bg-gray-800 transition duration-300 shadow-sm"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already on{" "}
            <span className="font-semibold text-black">MiniGram</span>?{" "}
            <Link
              to="/login"
              className="underline hover:text-gray-700 transition"
            >
              Log in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Signup;
