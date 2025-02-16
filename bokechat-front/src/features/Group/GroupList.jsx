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
import { useNavigate } from "react-router-dom";

const GroupList = (props) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ja');
  const { groups } = props;
  const navigate = useNavigate();

  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 3, mb: 2}}>
      {groups &&
        groups.map((group) => {
          return (
            <Button
              sx={{
                height: '200px',
                borderRadius: '10px',
                color: "inherit",
                backgroundImage: "url(https://picty.jp/storage/product_sample/12646/sample-12646.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
                onClick={() => navigate(`/group/${group.uuid}`)}
                key={group.uuid}
            >
              <Typography>{group.name}</Typography>
            </Button>
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
