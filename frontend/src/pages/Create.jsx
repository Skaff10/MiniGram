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
    <div className="flex min-h-screen ">

      {isLoading && <LoadingSpinner />}
      <Sidebar />
      <section className="w-full max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-xl flex flex-col gap-4 text-white self-start">
        {" "}
        {/* changed: self-start so section height follows content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 rounded-xl bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white hidden"
            ref={choosefile}
          />
          <div
            onClick={() => choosefile.current.click()}
            className="self-start px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition cursor-pointer"
          >
            Choose File
          </div>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-auto rounded-xl border border-gray-700"
            />
          )}

          <button
            type="submit"
            className="self-end px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition cursor-pointer"
          >
            Post
          </button>
        </form>
      </section>
    </div>
  );
};

export default Create;
