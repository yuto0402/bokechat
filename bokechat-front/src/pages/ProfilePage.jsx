import { Button, Typography } from "@mui/material"
import { useAuth } from "../hook/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Button onClick={() => logout()}>aho</Button>
      <Typography>{user.username}</Typography>
    </>
 )
}

export default ProfilePage;
