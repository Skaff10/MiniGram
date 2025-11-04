import axios from "axios";

const createComment = async (comData, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post("/comment/createcomment/" + id, comData, config);
  return res.data;
};
const updateComment = async (comData, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.update(
    "/comment/updatecomment/" + id,
    comData,
    config
  );
  return res.data;
};
const deleteComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post("/comment/deletecomment/" + id, config);
  return res.data;
};

export default { createComment, updateComment, deleteComment };
