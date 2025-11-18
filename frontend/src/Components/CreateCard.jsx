import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/post/postSlice";
import { toast } from "react-toastify";

const CreateCard = ({ onPostCreated }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) {
      toast.error("Cannot submit empty post");
      return;
    }
    const formData = new FormData();
    formData.append("text", text);

    try {
      await dispatch(createPost(formData)).unwrap();
      toast.success("Post created successfully!");
      setText("");
      if (onPostCreated) onPostCreated();

    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  return (
    <section className="border border-gray-700 rounded-2xl p-4 bg-gray-900 text-white mb-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-4 rounded-xl bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <button
          type="submit"
          className="self-end px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition cursor-pointer"
        >
          Post
        </button>
      </form>
    </section>
  );
};

export default CreateCard;
