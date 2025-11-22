import axios from "axios";

const API_URL = "api/post/";

const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // REMOVE "Content-Type": "multipart/form-data" - let axios auto-detect FormData
    },
  };
  const res = await axios.post(API_URL + "createpost", postData, config);
  return res.data;
};

const updatePost = async (id, postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(API_URL + "updatepost/" + id, postData, config);
  return res.data;
};

const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.delete(API_URL + "deletepost/" + id, config);
  return res.data;
};

const likePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(API_URL + "like/" + id, {}, config); // Add {} as data

  return res.data;
};

const getPost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + "getpost/" + id, config);
  return res.data;
};

export default { createPost, updatePost, deletePost, likePost, getPost };
