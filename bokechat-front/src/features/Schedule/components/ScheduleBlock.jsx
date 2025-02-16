import { Button, Typography } from "@mui/material"
import PropTypes from "prop-types";

const ScheduleBlock = (props) => {
  const { schedule, sx, setSchedule } = props;

  return (
    <Button
      onClick={() => setSchedule(schedule)}
      sx={{
        ...sx,
        backgroundColor: 'lightblue',
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpacen: "nowrap",
        borderRadius: '10px'
       }}>
        <Typography sx={{color: '#006bff'}}>
          {schedule.title}
        </Typography>
    </Button>
  )
}

ScheduleBlock.propTypes = {
    schedule: PropTypes.any,
    sx: PropTypes.any,
    setSchedule: PropTypes.any,
};

export default ScheduleBlock
