import { Link } from "react-router-dom";
import img from "../utils/logo.png";
const Register = () => {
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

          <form className="flex flex-col space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                autoComplete="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:border-black transition duration-300"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
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

export default Register;
