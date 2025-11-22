import Sidebar from "../Components/Sidebar";
import PostCard from "../Components/PostCard";
import LoadingSpinner from "../utils/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts, reset } from "../features/feed/feedSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateCard from "../Components/CreateCard";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      toast.info("Please login first");
      navigate("/login");
      return;
    }
    if (isError) toast.error(message);
    dispatch(fetchPosts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate, reloadKey]);

  const handlePostCreated = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">
      {isLoading && <LoadingSpinner />}
      <Sidebar />
      <div className="flex flex-col flex-auto max-w-lg mx-auto border-x border-gray-200 dark:border-zinc-900 overflow-hidden transition-colors duration-300">
        <div className="p-4 sticky top-0 bg-white dark:bg-black z-10 border-b border-gray-200 dark:border-zinc-900 transition-colors duration-300">
          <h1 className="text-2xl font-bold">MiniGram</h1>
        </div>
        <div className="overflow-y-auto no-scrollbar grow">
          <CreateCard onPostCreated={handlePostCreated} />
          {Array.isArray(posts) &&
            posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
              />
            ))}
        </div>
      </div>
      <div className="w-1/4 p-6 hidden lg:block border-l border-gray-200 dark:border-zinc-900 transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Chatting will be added later!</p>
      </div>
    </div>
  );
};

export default Feed;
