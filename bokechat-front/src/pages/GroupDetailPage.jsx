import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom"
import { Header } from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { groupFecth } from "../api/GroupFecth";

const GroupDetailPage = () => {
  const { uuid } = useParams();
  const { data: group, isLoading } = useQuery({
    queryKey: ['post', uuid],
    queryFn: () => groupFecth(uuid),
    staleTime: 1000 * 60 * 5,
    enabled: !!uuid,
  })
console.log(uuid);

  return (
    <>
      <Header />

      <Box sx={{mt: 8}}>
        {isLoading || !group ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '16px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Typography>{group.name}</Typography>
          </Box>
        )
    }
      </Box>
    </>
  )
}

export default GroupDetailPage
