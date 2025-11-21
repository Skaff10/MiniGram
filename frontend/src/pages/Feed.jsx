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
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {isLoading && <LoadingSpinner />}
      <Sidebar />
      <div className="flex flex-col flex-auto max-w-lg mx-auto border-x border-zinc-900 overflow-hidden">
        <div className="p-4 sticky top-0 bg-black z-10 border-b border-zinc-900">
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
      <div className="w-1/4 p-6 hidden lg:block border-l border-zinc-900">
        <p className="text-gray-600 text-sm">Suggestions for you</p>
      </div>
    </div>
  );
};

export default Feed;
