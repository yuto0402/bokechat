import axios from "axios";

export const groupsFecth = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/groups/?page=${pageParam}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts"); // エラーメッセージを投げる
  }
};

export const groupFecth = async (uuid) => {
  try {
    const res = await axios.get(`http://localhost:8000/api/group/${uuid}/`);
    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts"); // エラーメッセージを投げる
  }
};

