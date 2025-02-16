import { Box, Typography } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from "prop-types";
import { nowTime } from "../../../utils/nowDate";
import dayjs from "dayjs";

const ScheduleDetail = (props) => {
  const { schedule } = props;
  const start = nowTime(schedule.start);
  const end = nowTime(schedule.end);

  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 5, mb: 3}}>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography sx={{textAlign: "center", fontSize: '20px'}}>{dayjs(start).format('MM月DD日')}</Typography>
          <Typography sx={{textAlign: "center"}}>{dayjs(start).format('HH:mm')}</Typography>
        </Box>

        <ArrowForwardIosIcon />

        <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Typography sx={{textAlign: "center", fontSize: '20px'}}>{dayjs(end).format('MM月DD日')}</Typography>
        <Typography sx={{textAlign: "center"}}>{dayjs(end).format('HH:mm')}</Typography>
        </Box>
      </Box>

      <Typography>{schedule.todo}</Typography>
    </Box>
  )
}

ScheduleDetail.propTypes = {
  schedule: PropTypes.any.isRequired,
};

export default ScheduleDetail
