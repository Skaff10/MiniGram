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
    <section className="border border-gray-200 dark:border-zinc-900 rounded-sm p-4 bg-white dark:bg-black text-black dark:text-white mb-3 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 rounded-sm bg-gray-50 dark:bg-black text-black dark:text-white resize-none focus:outline-none border border-gray-200 dark:border-zinc-800 focus:border-gray-400 dark:focus:border-zinc-700 text-sm"
          rows={3}
        />
        <button
          type="submit"
          className="self-end px-5 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition cursor-pointer text-sm"
        >
          Post
        </button>
      </form>
    </section>
  );
};

export default CreateCard;
