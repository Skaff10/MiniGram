import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createComment, updateComment, deleteComment } from "../features/comment/commentSlice";
import { toast } from "react-toastify";
import { Edit2, Trash2 } from "lucide-react";

const Comment = ({ post, showInputFromParent = false }) => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [showInput, setShowInput] = useState(showInputFromParent);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = currentUser._id;

  const comments = post.comments || [];

  useEffect(() => {
    setShowInput(showInputFromParent);
  }, [showInputFromParent]);

  const handleToggleComments = () => {
    setShowAll((prev) => !prev);
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
      setShowAll(true);
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment._id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (commentId) => {
    if (!editText.trim()) return toast.error("Cannot save empty comment");

    try {
      await dispatch(
        updateComment({ id: commentId, data: { text: editText } })
      ).unwrap();

      toast.success("Comment updated");
      setEditingCommentId(null);
    } catch (err) {
      toast.error(err?.message || "Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Delete this comment?")) {
      try {
        await dispatch(deleteComment(commentId)).unwrap();
        toast.success("Comment deleted");
      } catch (err) {
        toast.error(err?.message || "Failed to delete comment");
      }
    }
  };

  const commentsToShow = showAll ? comments : comments.slice(0, 2);

  return (
    <div className="px-3">
      {comments.length > 2 && (
        <div
          className="text-gray-500 cursor-pointer mb-2 text-sm"
          onClick={handleToggleComments}
        >
          {showAll ? "View less comments" : `View all ${comments.length} comments`}
        </div>
      )}
      
      <div className="flex flex-col gap-1.5 mb-2">
        {commentsToShow.map((comment) => {
          const isOwner = comment.user?._id === userId;
          const isEditing = editingCommentId === comment._id;

          return (
            <div key={comment._id} className="group">
              {isEditing ? (
                <div>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 bg-zinc-900 rounded text-white border border-zinc-800 focus:outline-none focus:border-zinc-700 resize-none text-sm"
                    rows={2}
                  />
                  <div className="flex gap-2 mt-1.5">
                    <button
                      onClick={() => handleSaveEdit(comment._id)}
                      className="px-3 py-1 bg-white text-black rounded text-xs font-semibold hover:bg-gray-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-3 py-1 bg-zinc-900 rounded text-xs font-semibold hover:bg-zinc-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start text-sm">
                  <div className="flex-1">
                    <span className="font-semibold mr-2 text-black dark:text-white">{comment.user?.user_name}</span>
                    <span className="text-gray-700 dark:text-gray-200">{comment.text}</span>
                  </div>

                  {isOwner && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-3 h-3 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showInput && (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2 pb-2">
          <input
            type="text"
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-500 text-black dark:text-white"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="text-blue-500 font-semibold text-sm hover:text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Comment;
