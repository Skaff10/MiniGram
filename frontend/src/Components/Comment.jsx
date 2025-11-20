import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../features/comment/commentSlice";
import { toast } from "react-toastify";
import { MdKeyboardArrowRight } from "react-icons/md";

const Comment = ({ post, showInputFromParent = false }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [showInput, setShowInput] = useState(showInputFromParent);
  const [newComment, setNewComment] = useState("");
  const [localComments, setLocalComments] = useState(post.comments || []);

  useEffect(() => {
    setShowInput(showInputFromParent);
  }, [showInputFromParent]);

  useEffect(() => {
    setLocalComments(post.comments || []);
  }, [post.comments]);

  const handleToggleComments = () => {
    setShowAll((prev) => !prev);
  };

  const handleToggleInput = () => {
    setShowInput((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return toast.error("Cannot submit empty comment");

    try {
      const result = await dispatch(
        createComment({ postId: post._id, text: newComment })
      ).unwrap();

      // Build a display-ready comment immediately (fallback if server doesn't populate user)
      const currentUser = JSON.parse(localStorage.getItem("user")) || {};
      const serverComment = result?.comment || {};
      const immediateComment = {
        _id: serverComment._id || `temp-${Date.now()}`,
        text: serverComment.text || newComment,
        createdAt: serverComment.createdAt || new Date().toISOString(),
        user:
          serverComment.user?.user_name || serverComment.user?.user_name === ""
            ? serverComment.user
            : {
                _id: currentUser._id,
                user_name: currentUser.user_name || "You",
                profilePic:
                  currentUser.profilePic || currentUser.profilePic === ""
                    ? currentUser.profilePic
                    : undefined,
              },
      };

      // Add to local comments so UI updates instantly
      setLocalComments((prev) => [...prev, immediateComment]);

      setNewComment("");
      setShowInput(false);
      setShowAll(true); // ensure new comment is visible
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const commentsToShow = showAll
    ? localComments
    : localComments.slice(0, 1);

  return (
    <div className="mt-2">
      {localComments.length > 0 && (
        <div
          className="text-gray-400 cursor-pointer mb-1"
          onClick={handleToggleComments}
        >
          {" "}
          {showAll
            ? "Hide comments"
            : localComments.length > 1
            ? `View all ${localComments.length} comments`
            : ""}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {commentsToShow.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-800 p-2 rounded-lg text-white"
          >
            <strong>{comment.user?.user_name}:</strong> {comment.text}
          </div>
        ))}
      </div>

      {showInput && (
        <form onSubmit={handleSubmit} className="mt-2 flex">
          <input
            type="text"
            className="flex-1 p-2  bg-gray-700 rounded-l-lg text-white focus:outline-none"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2  bg-gray-700 rounded-r-lg hover:bg-gray-800"
          >
            <MdKeyboardArrowRight />
          </button>
        </form>
      )}
    </div>
  );
};

export default Comment;
