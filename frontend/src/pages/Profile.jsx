import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser, resetVisitedUser, uploadDP, removeDP } from "../features/user/userSlice";
import { fetchProfilePosts, reset as resetFeed } from "../features/feed/feedSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/Spinner";
import PostCard from "../Components/PostCard";
import Sidebar from "../Components/Sidebar";
import { useState, useRef } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user, visitedUser, isLoading: userLoading, isError: userError, message: userMessage } = useSelector(
    (state) => state.user
  );

  // Determine which user profile to show
  // If 'id' param is present, show visitedUser.
  // If 'id' param is NOT present, show logged-in user.
  const profileUser = id ? visitedUser : user;

  const { posts, isLoading: postsLoading } = useSelector(state => state.feed);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const loggedInUserId = JSON.parse(storedUser)._id;
    const targetUserId = id || loggedInUserId;

    console.log("Profile useEffect - targetUserId:", targetUserId);

    if (id) {
      // Visiting another user's profile
      dispatch(getUser(targetUserId));
      dispatch(fetchProfilePosts(targetUserId));
    } else {
      // Visiting own profile
      dispatch(fetchProfilePosts(loggedInUserId));
    }

    return () => {
      dispatch(resetFeed());
      dispatch(resetVisitedUser());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (userError) toast.error(userMessage);
  }, [userError, userMessage]);

  const loading = userLoading || postsLoading;

  // Helper to get display name - handles both 'username' (from login) and 'user_name' (from API)
  const getDisplayName = (u) => {
    if (!u) return "User";
    return u.user_name || u.username || "User";
  };

  const getFullName = (u) => {
    if (!u) return "";
    return u.name || "";
  };

  // --- Profile Picture Logic ---
  const [showDpMenu, setShowDpMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleDpClick = () => {
    // Only allow editing if it's the logged-in user's profile
    if (!id) {
      setShowDpMenu(!showDpMenu);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
    setShowDpMenu(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      dispatch(uploadDP(formData));
    }
  };

  const handleRemoveClick = () => {
    if (window.confirm("Are you sure you want to remove your profile picture?")) {
      dispatch(removeDP());
      setShowDpMenu(false);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300 ">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 bg-white dark:bg-black transition-colors duration-300 no-scrollbar">
        {loading && <LoadingSpinner />}

        {/* Profile Info */}
        <section className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-black flex flex-col items-center text-black dark:text-white transition-colors duration-300">
          <div className="relative">
            <div 
              className={`w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 dark:border-zinc-800 ${!id ? "cursor-pointer hover:opacity-80" : ""}`}
              onClick={handleDpClick}
            >
              <img
                src={profileUser?.profilePic || "/nouser.png"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />

            {/* DP Menu */}
            {showDpMenu && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg z-50 overflow-hidden">
                <button 
                  onClick={handleUploadClick}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-blue-500 font-semibold"
                >
                  Upload Photo
                </button>
                {profileUser?.profilePic && (
                  <button 
                    onClick={handleRemoveClick}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-red-500 font-semibold border-t border-gray-100 dark:border-zinc-800"
                  >
                    Remove Current Photo
                  </button>
                )}
                <button 
                  onClick={() => setShowDpMenu(false)}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-zinc-800"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold tracking-wide">{getDisplayName(profileUser)}</h2>
            {getFullName(profileUser) && (
              <p className="text-gray-500 dark:text-gray-400">{getFullName(profileUser)}</p>
            )}
          </div>
        </section>

        {/* Profile Posts */}
        <section className="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 gap-6 pb-10">
          {posts && posts.length > 0 ? (
            posts.map(post => <PostCard key={post._id} post={post} />)
          ) : (
            <h3 className="text-center text-gray-500 dark:text-gray-400">User hasn't posted yet!</h3>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
