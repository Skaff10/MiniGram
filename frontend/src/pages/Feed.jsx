import Sidebar from "../Components/Feed/Sidebar";
import PostCard from "../Components/Feed/PostCard";
import LoadingSpinner from "../utils/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts, reset } from "../features/feed/feedSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      toast.info("Please login First");
      navigate("/login");
      return; 
    }
    if (isError) toast.error(message);
    console.log("Posts in feed:", posts);
    dispatch(fetchPosts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message , navigate]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 overflow-hidden">
      {isLoading && <LoadingSpinner />}

      <Sidebar />

      <div className="flex flex-col flex-auto max-w-2xl mx-auto border-x border-gray-700 overflow-hidden">
        <div className="p-4 sticky top-0 bg-gray-900 z-10">
          <h1 className="text-3xl font-bold text-green-400">MiniGram</h1>
        </div>
        <div className="p-4 overflow-y-auto no-scrollbar grow">
          {Array.isArray(posts) &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>

      <div className="w-1/4 p-4 hidden lg:block border-l border-gray-900">
        <p className="text-gray-500">Chatting Will be added later</p>
      </div>
    </div>
  );
};

export default Feed;
