import axios from "axios";

export const friendFecth = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/friend/${userId}/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts"); // エラーメッセージを投げる
  }
};
