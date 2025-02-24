import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/ja';
import { Box, Avatar, Typography, Button, Chip, Divider } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PropTypes from "prop-types";
import { nowTime } from "../../utils/nowDate";
import { useNavigate } from "react-router-dom";

const GroupList = (props) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ja');
  const { groups } = props;
  const navigate = useNavigate();

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 3, mb: 2, p: 1.5}}>
      {groups &&
        groups.map((group) => {
          return (
            <Box
              sx={{
                width: '100%',
                border: '1px solid lightblue',
                borderRadius: '10px',
                p: 1.5,
              }}
              key={group.uuid}
            >
              <Button
                sx={{
                  width: '100%',
                  color: "inherit",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexDirection: 'column',
                  mb: 1
                }}
                onClick={() => navigate(`/group/${group.uuid}`)}
              >
                <Box sx={{display:"flex", gap: 2}}>
                  <Box sx={{width: '45%'}}>
                    <Typography sx={{textAlign: 'left'}}>{group.name}</Typography>
                    <Box sx={{width: '100%', aspectRatio: '16 / 9', overflow: "hidden", my: 1, borderRadius: '10px'}} >
                      <img style={{width: '100%', height: '100%', objectFit: "cover"}} src={group.icon} alt="gren" />
                    </Box>
                  </Box>

                  <Box>
                    <Box sx={{display:"flex", gap: 1, alignItems: "center"}}>
                      <Avatar sx={{width: '30px', height: '30px'}} src={group.host.icon} alt="" />
                      <Typography>{group.host.username}</Typography>
                    </Box>

                    <Box>
                      <Typography>
                        {dayjs(nowTime(group.start)).format('YYYY/MM/DD(dd) HH:mm')}
                      </Typography>
                      <KeyboardArrowDownIcon/>
                      <Typography>
                        {dayjs(nowTime(group.end)).format('YYYY/MM/DD(dd) HH:mm')}
                      </Typography>
                    </Box>

                    {group.budget && <Typography sx={{textAlign: "left"}}>¥{group.budget}</Typography>}
                  </Box>
                </Box>

                {group.tags && group.tags.length > 0 && (
                  <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                    <LocalOfferIcon sx={{color: 'blue'}} />
                    {group.tags.map((tag) => (
                      <Chip color="primary" label={tag.name} key={tag.id} />
                    ))}
                  </Box>
                )}
              </Button>

              <Divider />

              <Box sx={{width: '100%', display: "flex", justifyContent: "center", mt: 1, gap: 1}}>
                <Button sx={{border: '1px solid blue', borderRadius: '10px'}}>
                  <Typography>参加する</Typography>
                </Button>
                <Button>
                  <BookmarkBorderIcon sx={{width: '30px', height: '30px'}} />
                </Button>
              </Box>
            </Box>
          )
        })
      }
    </Box>
  )
}

GroupList.propTypes = {
  groups: PropTypes.any,
};

export default GroupList
