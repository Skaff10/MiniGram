import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userAPI from "../features/user/userAPI";
import Sidebar from "../Components/Sidebar";
import { Search as SearchIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Real-time search as user types
  useEffect(() => {
    const searchUsers = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const results = await userAPI.searchUsers(searchQuery, user.token);
        setSearchResults(results);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(searchUsers, 300); // Debounce 300ms
    return () => clearTimeout(timer);
  }, [searchQuery, user.token]);

  const handleUserClick = (userId) => {
 
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Search</h1>
            <p className="text-gray-500 dark:text-gray-400">Find people by name or username</p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <div className="flex bg-gray-100 dark:bg-zinc-900 rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 transition-colors duration-300">
              <div className="p-4 flex items-center">
                <SearchIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 p-4 bg-transparent text-black dark:text-white focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleUserClick(user._id)}
                  className="bg-white dark:bg-black p-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer transition-colors rounded-lg"
                >
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.user_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-black dark:text-white">
                      {user.user_name}
                    </h3>
                    <p className="text-gray-500 text-sm">{user.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Loading */}
          {isSearching && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin h-8 w-8 border-2 border-black dark:border-white border-t-transparent rounded-full"></div>
            </div>
          )}

          {/* No Results */}
          {!searchResults.length && searchQuery && !isSearching && (
            <div className="text-center py-16">
              <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-zinc-700" />
              <p className="text-gray-500 text-lg">No results found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
