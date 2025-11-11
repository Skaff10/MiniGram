import Sidebar from "../Components/Feed/Sidebar";
import PostCard from "../Components/Feed/PostCard";

const Feed = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Feed Column (Center) */}
      <div className="flex flex-col flex-auto max-w-2xl mx-auto border-x border-gray-700">
        {/* Fixed Header Section */}
        <div className="p-4">
          <h1 className="text-3xl font-bold text-green-400">MiniGram </h1>
        </div>

        {/* Scrollable Post Section - Scrollbar Hidden */}
        {/* Added 'scrollbar-hide' utility class */}
        <div className="p-4 grow overflow-y-scroll no-scrollbar">
          {/* Render multiple PostCards here */}
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          {/* ... Add many more PostCards to ensure scrolling is necessary ... */}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/4 p-4 hidden lg:block border-l border-gray-900">
        <p className="text-gray-500">Chatting Will be added later</p>
      </div>
    </div>
  );
};

export default Feed;
