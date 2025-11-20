import axios from "axios";

const createComment = async (data, token) => { 
  const { postId, text } = data; // Destructure the postId and text from the input object
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(
    // Use the correct ID (postId) in the URL
    "/api/comment/createcomment/" + postId,
    // Send the text in the body, as expected by the controller (Snippet 4)
    { text }, 
    config
  );
  return res.data ;
};
const updateComment = async (comData, id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.update(
    "/api/comment/updatecomment/" + id,
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

  const res = await axios.post("/api/comment/deletecomment/" + id, config);
  return res.data;
};

export default { createComment, updateComment, deleteComment };
