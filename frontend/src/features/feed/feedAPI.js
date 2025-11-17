import axios from "axios";

const getProfilePost = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get("api/feed/profileposts", config);
  return res.data;
};

const getFeedPost = async () => {
  const res = await axios.get("api/feed/feedposts");
  return res.data;
};

const likePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put("api/post/like/" + id, {}, config);
  return res.data;
};

const feedApi = {
  getFeedPost,
  getProfilePost,
  likePost,
};

export default feedApi;
