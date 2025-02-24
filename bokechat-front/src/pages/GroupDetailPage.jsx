import { Avatar, Box, Button, Chip, CircularProgress, Collapse, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hook/AuthContext";
import { groupFecth } from "../api/GroupFecth";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from "dayjs";
import { nowTime } from "../utils/nowDate";
import { useState } from "react";
import ChatDrawer from "../features/Group/ChatDrawer";
import { useGroupJoin } from "../features/Group/GroupJoin";

const GroupDetailPage = () => {
  const { uuid } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const { data: group, isLoading, refetch } = useQuery({
    queryKey: ['group', uuid],
    queryFn: () => groupFecth(uuid),
    staleTime: 1000 * 60 * 5,
    enabled: !!uuid,
  });

  const { mutate } = useGroupJoin(uuid, refetch);

  const toProfile = (userId) => {
    if (userId === user.id) {
      navigate('/profile');
    } else {
      navigate(`/friend/${group.host.id}`);
    }
  }

  return (
    <>
      <Header back={true} />

      <Box sx={{mt: 8}}>
        {isLoading || !group ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '16px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{mx: 2}}>
            <Typography sx={{my: 1, fontSize: '25px'}}>
              {group.name}
            </Typography>

            {group.description && (
              <Box sx={{backgroundColor: '#EEEEEE', borderRadius: '20px', p: 1.5}}>
                <Typography>{group.description}</Typography>
              </Box>
            )}

            {group.tags && group.tags.length > 0 && (
              <Box sx={{mt: 2, display: "flex", gap: 1, alignItems: "center"}}>
                <LocalOfferIcon sx={{color: 'blue'}} />
                {group.tags.map((tag) => (
                  <Chip color="primary" label={tag.name} key={tag.id} />
                ))}
              </Box>
            )}

            <Typography sx={{mt: 2}}>怠け者：</Typography>
            <Button onClick={() => toProfile(group.host.id)} sx={{justifyContent: "flex-start", width: '100%', color: "inherit", gap: 2}}>
              <Avatar src={group.host.icon} alt="" />
              <Typography>{group.host.username}</Typography>
              {group.host.id !== user.id && (
                <Box sx={{cursor: "pointer"}}>
                  <Typography>フォロー</Typography>
                </Box>
              )}
            </Button>

            <Box
              sx={{
                display:"flex",
                flexDirection: "column",
                borderLeft: '6px solid blue',
                borderRadius: 0,
                alignItems: 'flex-start',
                width: '100%',
                mt: 2,
              }}
            >
              <Button sx={{flexDirection:'column', color: "inherit", width: '100%', alignItems: "flex-start"}} onClick={() => setOpen(!open)}>
                <Typography>{dayjs(nowTime(group.start)).format('MM/DD HH:mm')}</Typography>
                {open ? <KeyboardArrowDownIcon sx={{mx: 'auto'}} /> : <KeyboardArrowUpIcon sx={{mx: 'auto'}} />}
              </Button>
              <Collapse in={open} sx={{display: "flex", flexDirection: "column", width: '100%'}}>
                {group.plans.map((plan, index) => (
                  <Button key={index} sx={{py: 0, color: "inherit", display: "flex", flexDirection: "column", width: '100%', alignItems: "flex-start"}}>
                    <Typography>{dayjs(nowTime(plan.start)).format('MM/DD HH:mm')}</Typography>
                    <Typography>{plan.content}</Typography>
                    <Typography>{dayjs(nowTime(plan.en)).format('MM/DD HH:mm')}</Typography>
                  </Button>
                ))}
              </Collapse>
              <Button sx={{flexDirection: 'column', color: "inherit", width: '100%', alignItems: "flex-start"}} onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon sx={{mx: 'auto'}} /> : <KeyboardArrowDownIcon sx={{mx: 'auto'}} />}
                <Typography>{dayjs(nowTime(group.start)).format('MM/DD HH:mm')}</Typography>
              </Button>
            </Box>

            <Typography sx={{mt: 1, fontSize: '18px'}}>
              ¥{group.budget}
            </Typography>

            <Box sx={{mt: 2}}>
              <Typography>参加するアホ共：</Typography>
              {group.participants && group.participants.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    backgroundColor: '#EEEEEE',
                    borderRadius: '20px',
                    p: 1.5,
                    width: '100%',
                  }}>
                  {group.participants.map((person) => (
                    <Avatar src={person.icon} key={person.id} />
                  ))}
                </Box>
              )}
            </Box>

            {group.isParticipant &&
              <Box sx={{mt: 2}}>
                <Button
                  sx={{
                    flexDirection: "column",
                    backgroundColor: '#EEEEEE',
                    borderRadius: '20px',
                    p: 1.5,
                    width: '100%',
                    color: "inherit"
                  }}
                  onClick={() => setChatOpen(!chatOpen)}
                >
                  <Typography>アホ共の戯れ</Typography>
                  {group.lastMessage && (
                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                      <Avatar sx={{width: '30px', height: '30px'}} src={group.lastMessage.sender.icon} alt="" />
                      <Typography>{group.lastMessage.content}</Typography>
                    </Box>
                  )}
                </Button>

                <ChatDrawer chatOpen={chatOpen} setChatOpen={setChatOpen} />
              </Box>
            }


            <Box sx={{my: 2}}>
              <Button onClick={() => mutate()} sx={{color: "inherit", mx: 'auto', width: '100%'}}>
                {group.isParticipant ? (
                  <Typography sx={{mb: 2}}>この集団から逃走する</Typography>
                ) : (
                  <Typography>この集団に入る</Typography>
                )}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default GroupDetailPage
