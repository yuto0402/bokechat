import { Avatar, Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hook/AuthContext";
import { friendFecth } from "../api/friendFetch";

const FriendPage = () => {
  const { userId } = useParams();
  const { data: friend, isLoading } = useQuery({
    queryKey: ['friend', userId],
    queryFn: () => friendFecth(userId),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });

  return (
    <>
      <Header back={true} />

      <Box sx={{mt: 8}}>
        {isLoading || !friend ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '16px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{mx: 2}}>
            <Typography>{friend.username}</Typography>
          </Box>
        )
    }
      </Box>
    </>
  )
}

export default FriendPage
