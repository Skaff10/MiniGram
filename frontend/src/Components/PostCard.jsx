import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { MessageCircle, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleLike, toggleLikeLocally, deletePostFromFeed } from "../features/feed/feedSlice";
import { deletePost, updatePost } from "../features/post/postSlice";
import { timeAgo } from "../utils/timeAgo";
import Comment from "./Comment";
import { useState } from "react";
import { toast } from "react-toastify";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const u = JSON.parse(localStorage.getItem("user"));
  const userId = u ? u._id : null;

  const liked = post.likes?.includes(userId);
  const likes = post.likes?.length || 0;
  const isOwner = post.user?._id === userId;

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(post.text || "");

  const handleClick = () => {
    dispatch(toggleLikeLocally({ postId: post._id, userId }));
    dispatch(toggleLike(post._id));
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await dispatch(deletePost(post._id)).unwrap();
        dispatch(deletePostFromFeed(post._id));
        toast.success("Post deleted");
        setShowMenu(false);
      } catch (err) {
        toast.error(err || "Failed to delete post");
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) {
      toast.error("Post cannot be empty");
      return;
    }
    
    try {
      await dispatch(updatePost({ id: post._id, data: { text: editText } })).unwrap();
      toast.success("Post updated");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.message || "Failed to update post");
    }
  };

  const handleCancelEdit = () => {
    setEditText(post.text || "");
    setIsEditing(false);
  };

  return (
    <div className="bg-black border border-zinc-900 rounded-sm mb-3 pb-2">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img
            src={post.user?.profilePic || "/nouser.png"}
            alt={post.user?.user_name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">{post.user?.user_name}</span>
            <span className="text-gray-500 text-sm">• {timeAgo(post.createdAt)}</span>
          </div>
        </div>

        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-zinc-900 rounded-full transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-zinc-900 rounded-lg shadow-xl border border-zinc-800 overflow-hidden z-10 min-w-[150px]">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-zinc-800 transition-colors text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2.5 flex items-center gap-2 hover:bg-zinc-800 text-red-500 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {post.image?.url && (
        <img
          src={post.image.url}
          alt="post"
          className="w-full object-cover"
        />
      )}

      <div className="px-3 pt-3">
        {isEditing ? (
          <div className="mb-3">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 bg-zinc-900 rounded text-white border border-zinc-800 focus:outline-none focus:border-zinc-700 resize-none text-sm"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 bg-white text-black rounded font-semibold hover:bg-gray-200 transition-colors text-sm"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-1.5 bg-zinc-900 rounded font-semibold hover:bg-zinc-800 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          post.text && (
            <div className="text-sm mb-2">
              <span>{post.text}</span>
            </div>
          )
        )}
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={handleClick}
            className="transition-transform hover:scale-110"
          >
            {liked ? (
              <FaHeart className="text-red-500 w-6 h-6" />
            ) : (
              <Heart className="w-6 h-6" />
            )}
          </button>
          <button
            onClick={() => setShowCommentInput((s) => !s)}
            className="transition-transform hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>

        {likes > 0 && (
          <div className="font-semibold text-sm mb-2">
            {likes} {likes === 1 ? 'like' : 'likes'}
          </div>
        )}

        
      </div>

      <Comment post={post} showInputFromParent={showCommentInput} />
    </div>
  );
};

export default PostCard;
