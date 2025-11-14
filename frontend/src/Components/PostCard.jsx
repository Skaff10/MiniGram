import { timeAgo } from "../utils/timeAgo";
import { Heart, MessageCircle } from "lucide-react";

const PostCard = ({ post }) => {
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
        <button className="transition flex gap-1">
          <Heart className="hover:text-pink-500" />
          {post.likes?.length || 0}
        </button>
        <button className="transition flex gap-1">
          <MessageCircle className="hover:text-blue-400" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
