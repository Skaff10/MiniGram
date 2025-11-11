import { useState } from "react";
import logo from "../../utils/logo.png";
import { ChevronRight, ChevronLeft } from "lucide-react"; // Using lucide-react for icons

const Sidebar = () => {
  const navItems = ["Home", "Search", "Post", "Profile"];
  const [leftright, setLeftright] = useState(true);
  return (
    <div className="w-1/5 mybrk:w-1/10 p-4 border-r border-gray-700 flex flex-col justify-between">
      <div>
        <div className="relative">
          <section className="flex relative">
            <img src={logo} className="size-10 " alt="" />
            <h2 className="text-2xl font-extrabold mb-8 mt-1 ml-2">MiniGram</h2>
          </section>

          <button
            className="absolute right-1 top-2  "
            onClick={() => {
              setLeftright(!leftright);
            }}
          >
            {leftright ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <nav className="space-y-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`block text-lg font-medium p-2 rounded-lg transition duration-200 
                ${
                  item === "Home"
                    ? "text-green-400 bg-gray-800"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
            >
              {item}
            </a>
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
