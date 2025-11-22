import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/post/postSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../utils/Spinner";
import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.posts);
  const choosefile = useRef();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) {
      toast.error("Cannot submit empty post");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image); // <-- MATCH backend key here

    try {
      await dispatch(createPost(formData)).unwrap();
      toast.success("Post created successfully!");
      setText("");
      setImage(null);
      setPreview(null);
      navigate("/");
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden transition-colors duration-300">
      {isLoading && <LoadingSpinner />}
      <Sidebar />
      <div className="flex flex-col flex-auto max-w-2xl mx-auto border-x border-gray-200 dark:border-zinc-900 overflow-hidden transition-colors duration-300">
        <div className="p-4 sticky top-0 bg-white dark:bg-black z-10 border-b border-gray-200 dark:border-zinc-900 transition-colors duration-300">
          <h1 className="text-2xl font-bold">Create Post</h1>
        </div>
        <div className="overflow-y-auto no-scrollbar grow p-4">
          <section className="bg-white dark:bg-black border border-gray-200 dark:border-zinc-900 rounded-sm p-6 flex flex-col gap-4 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a caption..."
                className="w-full p-3 rounded-sm bg-gray-50 dark:bg-black text-black dark:text-white resize-none focus:outline-none border border-gray-200 dark:border-zinc-800 focus:border-gray-400 dark:focus:border-zinc-700 text-sm"
                rows={3}
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-white hidden"
                ref={choosefile}
              />
              <button
                type="button"
                onClick={() => choosefile.current.click()}
                className="self-start px-5 py-2 bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded text-sm font-medium transition cursor-pointer border border-gray-200 dark:border-zinc-800"
              >
                {image ? "Change Photo" : "Add Photo"}
              </button>
              
              {preview && (
                <div className="relative">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-auto rounded-sm border border-gray-200 dark:border-zinc-900"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black/80 hover:bg-black text-white rounded-full p-2 transition"
                  >
                    ✕
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="self-end px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition cursor-pointer text-sm"
              >
                Share
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Create;
