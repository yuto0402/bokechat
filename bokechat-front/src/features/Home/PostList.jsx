import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/ja';
import { Box, Avatar, Typography, Button } from "@mui/material";
import PropTypes from "prop-types";
import { nowTime } from "../../utils/nowDate";
import PinDropIcon from '@mui/icons-material/PinDrop';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

const PostList = (props) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ja');
  const { posts } = props;

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 3, mb: 2}}>
      {posts &&
        posts.map((post) => {
          const ago = dayjs(nowTime(post.created_at)).fromNow();
          return (
            <Box key={post.id}>
              <Box sx={{mb: 1, mx: 1, display: "flex", alignItems: "center", gap: 1, position: "relative"}}>
                <Avatar src={post.created_by.icon} alt="er" />
                <Typography sx={{fontSize: '20px'}}>{post.created_by.username}</Typography>
                <Typography sx={{position: "absolute", right: '10px', color: "gray"}}>{ago}</Typography>
              </Box>
              <Box sx={{width: '100%', aspectRatio: '16 / 9', overflow: "hidden", mb: 1}} >
                <img style={{width: '100%', height: '100%', objectFit: "cover"}} src={post.content} alt="gren" />
              </Box>
              <Box sx={{mx: 1}}>
              {post.location && (
                <Button sx={{px: 0, color: "inherit", justifyContent: "flex-start", gap: 1}}>
                  <PinDropIcon sx={{width: '20px'}} />
                  <Typography sx={{fontSize: '14px'}}>{post.location}</Typography>
                </Button>
              )}
              </Box>
              <Box sx={{display: "flex", gap: 2, ml: 1, mt: '4px'}}>
                <Button sx={{minWidth: '24px', color: "inherit", p: 0, gap: '2px'}}>
                  <FavoriteBorderIcon />
                  <Typography>{post.like.length}</Typography>
                </Button>
                <Button sx={{minWidth: '24px', color: "inherit", p: 0}}>
                  <BookmarkBorderIcon />
                </Button>
                <Button sx={{minWidth: '24px', color: "inherit", p: 0}}>
                  <ChatOutlinedIcon />
                </Button>
              </Box>
            </Box>
          )
        })
      }
    </Box>
  )
}

PostList.propTypes = {
  posts: PropTypes.any,
};

export default PostList
