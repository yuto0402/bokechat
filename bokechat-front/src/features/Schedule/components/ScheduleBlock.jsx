import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types";

const ScheduleBlock = (props) => {
  const { schedule, sx } = props;

  return (
    <Box
       sx={{
        ...sx,
        backgroundColor: 'lightblue',
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpacen: "nowrap",
        borderRadius: '10px'
       }}>
        <Typography sx={{color: '#006bff', textAlign: "center"}}>
          {schedule.title}
        </Typography>
    </Box>
  )
}

ScheduleBlock.propTypes = {
    schedule: PropTypes.any,
    sx: PropTypes.any,
  };

export default ScheduleBlock
