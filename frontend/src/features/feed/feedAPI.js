import axios from "axios";

const getProfilePost = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get("/feed/profileposts", config);
  return res.data;
};

const getFeedPost = async () => {
  const res = await axios.get("/feed/feedposts");
  return res.data;
};


