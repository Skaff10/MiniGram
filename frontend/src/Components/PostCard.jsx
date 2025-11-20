import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { MessageCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleLike, toggleLikeLocally } from "../features/feed/feedSlice";
import { timeAgo } from "../utils/timeAgo";
import Comment from "./Comment";
import { useState } from "react";

const PostCard = ({ post}) => {
  const dispatch = useDispatch();
  const u = JSON.parse(localStorage.getItem("user"));
  const userId = u ? u._id : null;

  const liked = post.likes?.includes(userId);
  const likes = post.likes?.length || 0;

  const handleClick = () => {
    dispatch(toggleLikeLocally({ postId: post._id, userId }));
    dispatch(toggleLike(post._id));
  };

  const [showCommentInput, setShowCommentInput] = useState(false);

  return (
    <div className="border border-gray-700 rounded-2xl p-4 bg-gray-900 text-white mb-1">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.user?.profilePic || "/nouser.png"}
          alt={post.user?.user_name}
          className="w-7 h-7 rounded-full"
        />
        <h2 className="font-semibold text-lg">{post.user?.user_name}</h2>
        <span className="ml-auto text-gray-400 text-sm">
          {timeAgo(post.createdAt)}
        </span>
      </div>

      {post.text && <p className="mb-3">{post.text}</p>}

      {post.image?.url && (
        <img
          src={post.image.url}
          alt="post image"
          className="w-full rounded-xl mb-3 object-cover"
        />
      )}

      <div className="flex items-center gap-6 text-gray-400 justify-between">
        <button
          onClick={handleClick}
          className="transition flex items-center gap-1"
        >
          {liked ? (
            <FaHeart className="text-pink-500 w-5 h-5 cursor-pointer" />
          ) : (
            <Heart className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
          )}
          <span>{likes}</span>
        </button>
        <button onClick={() => setShowCommentInput((s) => !s)}>
          <MessageCircle className="w-5 h-5 cursor-pointer" />
        </button>
      </div>
      <Comment
        post={post}
        showInputFromParent={showCommentInput}
        
      />
    </div>
  );
};

export default PostCard;
