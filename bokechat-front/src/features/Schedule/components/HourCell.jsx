import { Box, Button, Typography } from "@mui/material"
import ScheduleBlock from "./ScheduleBlock"
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import { nowDate, nowTime } from "../../../utils/nowDate";

const HourCell = (props) => {
  const { dateSchedule, date } = props;
  const hourList = new Array(25).fill(0).map((_, index) => index);
  const today = dayjs(date).format('YYYY-MM-DD');

  const todaySchedule = dateSchedule.map((schedule => {
    const startDate = nowDate(schedule.start);
    const endDate = nowDate(schedule.end);

    let start = schedule.start;
    let end = schedule.end;

    if (startDate !== today) {
      start = dayjs(today).local().startOf("day").format();
    };

    if (endDate !== today) {
      end = dayjs(today).local().endOf("day").format();
    };

    return {
      ...schedule,
      start,
      end,
    }
  }))

  const calculatePosition = (schedule) => {
    const start = nowTime(schedule.start);
    const end = nowTime(schedule.end);

    const hourHeight = 45; // 1時間あたりの高さ(px)
    const startHour = dayjs(start).hour();;
    const startMinute = dayjs(start).minute();;
    const endHour = dayjs(end).hour();;
    const endMinute = dayjs(end).minute();;

    const top = (startHour + (startMinute / 60)) * hourHeight;
    const height = ((endHour - startHour) + ((endMinute - startMinute) / 60)) * hourHeight;

    return { top, height };
  };

  const resolveOverlaps = (schedules) => {
    if (!schedules || schedules.length === 0) return [];

    schedules.sort((a, b) => dayjs(a.start).valueOf() - dayjs(b.start).valueOf());

    let columns = [];
    let maxColumns = 1;

    schedules.forEach((schedule) => {
      let assigned = false;

      for (let i = 0; i < columns.length; i++) {
        if (columns[i].every((s) => dayjs(s.end).isBefore(schedule.start))) {
          columns[i].push(schedule);
          assigned = true;
          break;
        }
      }

      if (!assigned) {
        columns.push([schedule]);
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

HourCell.propTypes = {
  dateSchedule: PropTypes.any,
  date: PropTypes.any.isRequired,
};

export default HourCell
