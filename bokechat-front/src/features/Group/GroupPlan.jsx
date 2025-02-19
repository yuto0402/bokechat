import { Box, Button, Typography } from "@mui/material"
import ScheduleBlock from "../Schedule/components/ScheduleBlock";
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import { nowDate, nowTime } from "../../utils/nowDate";

const GroupPlan = (props) => {
  const { todaySchedule, setSchedule, plans } = props;
  const hourList = new Array(25).fill(0).map((_, index) => index);

  const calculatePosition = (plan) => {
    const start = nowTime(plan.start);
    const end = nowTime(plan.end);

    const hourHeight = 45;
    const startHour = dayjs(start).hour();;
    const startMinute = dayjs(start).minute();;
    const endHour = dayjs(end).hour();;
    const endMinute = dayjs(end).minute();;

    const top = (startHour + (startMinute / 60)) * hourHeight;
    const height = ((endHour - startHour) + ((endMinute - startMinute) / 60)) * hourHeight;

    return { top, height };
  };

  const resolveOverlaps = (plans) => {
    if (!plans || plans.length === 0) return [];

    plans.sort((a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf());

    let columns = [];
    let maxColumns = 1;

    plans.forEach((plan) => {
      let assigned = false;

      for (let i = 0; i < columns.length; i++) {
        if (columns[i].every((s) => dayjs(s.end).isBefore(plan.start))) {
          columns[i].push(plan);
          assigned = true;
          break;
        }
      }

      if (!assigned) {
        columns.push([plan]);
        maxColumns = Math.max(maxColumns, columns.length);
      }
    });

    let schedulePosition = {};
    columns.forEach((col, index) => {
      col.forEach((schedule) => {
        schedulePosition[schedule.id] = { column: index, totalColumns: maxColumns };
      });
    });

    return schedulePosition;
  };

  const schedulePosition = resolveOverlaps(todaySchedule);

  return (
    <Box sx={{display: "flex", gap: 2}}>
      <Box>
        {hourList.map((hour) => {
          return (
            <Typography sx={{textAlign: "right", width: '45px', height: '45px', alignItems: "center"}} key={hour}>{hour}:00</Typography>
          )
        })}
      </Box>
      <Box sx={{position: "relative", display: "flex", flexDirection: 'column', flex: 1, mt: '11px'}}>
        {hourList.map((hour) => {
          return (
            <Button sx={{borderTop: '1px solid gray', borderRadius: 0, flex: 1, minHeight: '45px', p: 0}} key={hour} />
          )
        })}
        {todaySchedule &&
          todaySchedule.map((schedule, index) => {
            const { top, height } = calculatePosition(schedule);
            const { column, totalColumns } = schedulePosition[schedule.id] || { column: 0, totalColumns: 1 };
            return (
              <ScheduleBlock
                key={index}
                schedule={schedule}
                setSchedule={setSchedule}
                sx={{
                  position: 'absolute',
                  top: `${top}px`,
                  height: `${height}px`,
                  width: `${90 / totalColumns}%`,
                  left: `${(100 / totalColumns) * column + 3.5}%`,
                  backgroundColor: "lightblue",
                  border: "1px solid #007bff",
                  boxSizing: "border-box",
                }}
              />
            )
        })}
      </Box>
    </Box>
  )
}

GroupPlan.propTypes = {
  todaySchedule: PropTypes.any,
  setSchedule: PropTypes.any.isRequired,
  plans: PropTypes.any,
};

export default GroupPlan
