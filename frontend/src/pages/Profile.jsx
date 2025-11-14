import { useEffect } from "react";
import PostCard from "../Components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/Spinner";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const id = JSON.parse(storedUser)._id;

    if (!id) {
      toast.info("Please login first");
      navigate("/login");
      return;
    }
    if (isError) toast.error(message);
    dispatch(getUser(id));
  }, [dispatch, message, navigate]);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <section className="w-full max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center text-white">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
          <img
            src={user?.profilePic}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold tracking-wide">
            {user?.user_name}
          </h2>
          <p className="text-gray-400">{user?.name}</p>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 gap-6 pb-10">
        {Array.isArray(user?.posts) && user.posts.length > 0 ? (
          user.posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <h3>User hasn't posted yet!</h3>
        )}
      </section>
    </>
  );
};

export default Profile;
