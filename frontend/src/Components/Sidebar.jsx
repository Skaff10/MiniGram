import { FaPlus, FaSun, FaMoon } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const navItems = ["Home", "Search", "Create", "Profile"];
  const navLogos = [
    <GoHomeFill className="size-7" />,
    <CiSearch className="size-7" />,
    <FaPlus className="size-7" />,
    <CgProfile className="size-7" />,
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logout Succesfully");
    navigate("/login");
  };

  return (
    <div className="w-1/5 mybrk:w-1/10 p-4 border-r border-gray-200 dark:border-gray-700 flex flex-col justify-between bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div>
        <div className="relative">
          <section className="flex relative">
            <img src="/logo.png" className="size-10 " alt="" />
            <h2 className="text-2xl font-extrabold mb-8 mt-1 ml-2">MiniGram</h2>
          </section>
        </div>

        <nav className="space-y-4">
          {navItems.map((item, index) => (
            <Link
              key={item}
              to={item === "Home" ? `/` : `/${item}`}
              className={`flex gap-2 items-center text-lg font-medium p-2 rounded-lg transition duration-200 
               hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-green-500`}
            >
              {navLogos[index]}
              <span className="">{item}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 w-full py-2 px-4 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-900 transition duration-200"
        >
          {theme === "dark" ? <FaSun className="size-5" /> : <FaMoon className="size-5" />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>

        <button
          className="w-full py-2 px-4 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
