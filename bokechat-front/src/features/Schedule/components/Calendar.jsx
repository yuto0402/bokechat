import { Box, Typography, Button } from "@mui/material"
import dayjs from "dayjs";
import holidays from "holiday-jp"
import isBetween from "dayjs/plugin/isBetween"
import { DayDrawer } from "./DayDrawer";
import { useState } from "react";
import PropTypes from 'prop-types';
import { useAuth } from "../../../hook/AuthContext";
import { nowDate } from "../../../utils/nowDate";

export const Calendar = (props) => {
  const { calendar, month } = props;
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState('');
  const [todaySchedule, setTodaySchedule] = useState([]);
  const { user } = useAuth();
  dayjs.extend(isBetween);

  const toggleDrawer = (date, todaySchedule) => {
    setOpen(!open);
    setToday(date);
    setTodaySchedule(todaySchedule)
  };

  const isDateInRange = (date, startDate, endDate) => {
    const currentDate = dayjs(date);
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    return currentDate.isBetween(start, end, null, '[]');
  };

  return (
    <Box>
      <Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          {days.map((day, index) => {
            return(
              <Box sx={{flex: 1, textAlign: "center"}} key={index}>
                <Typography sx={{fontSize: '15px'}}>{day}</Typography>
              </Box>
            )
          })}
        </Box>
        <Box sx={{mt: 1}}>
          {calendar.map((week, index) => {
            return (
              <Box sx={{display: 'flex', flexDirection: 'row'}} key={index}>
                {week.map((date) => {
                  const styles = style(date, month);
                  const todaySchedule = user.mySchedule.filter((schedule) => {
                    return isDateInRange(date, nowDate(schedule.start), nowDate(schedule.end));
                  });
                  return (
                    <Button onClick={()=>toggleDrawer(date, todaySchedule)} sx={{flexDirection: "column", justifyContent: 'flex-start', minWidth: '30px', flex: 1, height: '120px', ...styles.date, overflow: "hidden", p:0}} key={dayjs(date).date()}>
                      <Typography sx={{fontSize: '13px', mb: '4px'}}>{dayjs(date).date()}</Typography>
                      <Box sx={{display: 'flex', flexDirection: "column", justifyContent: "center", gap: '4px', width: '100%'}}>
                        {todaySchedule.length > 0 && todaySchedule.map((schedule, index) => {
                          return (
                            <Box sx={{width: '100%', backgroundColor: '#30F9B2', borderRadius: '5px'}} key={index}>
                              <Typography sx={{color: "white", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontSize: '12px'}}>{schedule.title}</Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    </Button>
                  )
                })}
              </Box>
            )
          })}
        </Box>
      </Box>

      <DayDrawer open={open} setOpen={setOpen} today={today} todaySchedule={todaySchedule} />
    </Box>
  )
}

const style = (date, month) => ({
  date: {
    backgroundColor: dayjs().format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD')
      ? "#EEEEEE"
      : "transparent",
    color: dayjs(date).day() === 0 || holidays.isHoliday(date.toDate())
      ? "red"
      : dayjs(date).day() === 6
      ? "blue"
      : month !== dayjs(date).month()
      ? "gray"
      : "black"
  }
});

Calendar.propTypes = {
  calendar: PropTypes.any.isRequired,
  month: PropTypes.any.isRequired,  // 必要な場合は.isRequiredを追加
};

