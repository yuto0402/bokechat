import { Button, Typography } from "@mui/material"
import { useAuth } from "../hook/AuthContext";

const ProfilePage = () => {
  const { logout } = useAuth();

  return (
    <>
      <Button onClick={() => logout()}>aho</Button>
    </>
 )
}

export default ProfilePage;
