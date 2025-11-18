import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../features/comment/commentSlice";
import { toast } from "react-toastify";
const Comment = ({ post, showInputFromParent = false }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [showInput, setShowInput] = useState(showInputFromParent);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    setShowInput(showInputFromParent);
  }, [showInputFromParent]);

  const comments = post.comments || [];
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
      await dispatch(
        createComment({ postId: post._id, text: newComment })
      ).unwrap();
      setNewComment("");
      setShowInput(false);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };
  const commentsToShow = showAll ? comments : comments.slice(0, 1);

  return (
    <div className="mt-2">
      {comments.length > 0 && (
        <div
          className="text-gray-400 cursor-pointer mb-1"
          onClick={handleToggleComments}
        >
          {" "}
          {showAll
            ? "Hide comments"
            : comments.length === 1
            ? `${comments[0].user.user_name}: ${comments[0].text}`
            : `View all ${comments.length} comments`}
        </div>
      )}
      <div className="flex flex-col gap-2">
        {commentsToShow.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-800 p-2 rounded-lg text-white"
          >
            <strong>{comment.user.user_name}:</strong> {comment.text}
          </div>
        ))}
      </div>
      {!showInput && (
        <div className="mt-2">
          <button
            onClick={handleToggleInput}
            className="text-sm text-gray-400 hover:text-white"
          >
            Add a comment
          </button>
        </div>
      )}
      {showInput && (
        <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};
export default Comment;
