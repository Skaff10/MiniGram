import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { fetchProfilePosts, reset as resetFeed } from "../features/feed/feedSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/Spinner";
import PostCard from "../Components/PostCard";
import Sidebar from "../Components/Sidebar";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading: userLoading, isError: userError, message: userMessage } = useSelector(
    (state) => state.user
  );

  const { posts, isLoading: postsLoading } = useSelector(state => state.feed);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return; // maybe redirect to login if needed

    const id = JSON.parse(storedUser)._id;

    // Fetch user info
    dispatch(getUser(id));

    // Fetch full posts
    dispatch(fetchProfilePosts());

    return () => {
      dispatch(resetFeed()); // clear feed slice on unmount
    };
  }, [dispatch]);

  useEffect(() => {
    if (userError) toast.error(userMessage);
  }, [userError, userMessage]);

  const loading = userLoading || postsLoading;

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        {loading && <LoadingSpinner />}

        {/* Profile Info */}
        <section className="w-full max-w-4xl mx-auto p-6 bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center text-white">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
            <img
              src={user?.profilePic || "/nouser.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold tracking-wide">{user?.user_name}</h2>
            <p className="text-gray-400">{user?.name}</p>
          </div>
        </section>

        {/* Profile Posts */}
        <section className="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 gap-6 pb-10">
          {posts.length > 0 ? (
            posts.map(post => <PostCard key={post._id} post={post} />)
          ) : (
            <h3 className="text-center text-gray-400">User hasn't posted yet!</h3>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
