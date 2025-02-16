import axios from "axios";

export const postFecth = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/posts/?page=${pageParam}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts"); // エラーメッセージを投げる
  }
};
