import { Typography } from "@mui/material"
import { useAuth } from "../hook/AuthContext";
import { Header } from "../components/Header";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <>
      <Header />

      <Typography>{user.username}</Typography>
    </>
 )
}

export default HomePage;
