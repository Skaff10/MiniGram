
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const navItems = ["Home", "Search", "Create", "Profile"];
  const navLogos = [<GoHomeFill className="size-7" />, <CiSearch className="size-7" />, <FaPlus className="size-7" />, <CgProfile className="size-7" />];
  return (
    <div className="w-1/5 mybrk:w-1/10 p-4 border-r border-gray-700 flex flex-col justify-between">
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
               hover:text-green-400`}
            >
              {navLogos[index]} 
              <span className="">{item}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings Button */}
      <button className="w-full py-2 px-4 border border-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-800 transition duration-200">
        Settings
      </button>
    </div>
  );
};

export default Sidebar;
