import { Heart, MessageCircle } from "lucide-react"; // Using lucide-react for icons

const PostCard = ({ userName = "user_name", time = "2h" }) => {
  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-xl bg-gray-800 shadow-lg">
      {/* Post Header (user_name, time) */}
      <div className="flex items-center space-x-3 mb-3">
        {/* Avatar Placeholder */}
        <div className="w-8 h-8 rounded-full bg-blue-500 border border-blue-400"></div>
        <div className="grow">
          <span className="font-semibold text-white">{userName}</span>
          <span className="text-xs text-gray-500 ml-2">{time}</span>
        </div>
      </div>

      {/* Post Image/Content Area */}
      <div className="w-full bg-gray-900 aspect-square flex items-center justify-center border border-pink-500">
        {/* Placeholder for the image or video */}
        <p className="text-pink-500 text-6xl font-light italic">///</p>
      </div>

      {/* Actions and Comment Input */}
      <div className="pt-3">
        {/* Like and Comment Icons */}
        <div className="flex items-center space-x-4 mb-3">
          {/* Like Button (Heart) */}
          <button className="text-pink-500 hover:text-red-500 transition">
            <Heart size={24} fill="currentColor" />
          </button>

          {/* Comment Icon */}
          <button className="text-gray-400 hover:text-white transition">
            <MessageCircle size={24} />
          </button>
        </div>

        {/* Comment Input Box */}
        <div className="border border-red-400 rounded-full p-2 flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            className="grow bg-transparent text-sm focus:outline-none placeholder-gray-500 px-1"
          />
          <button className="text-xs text-red-400 font-medium hover:text-red-300 transition ml-2">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
