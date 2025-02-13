import { Box, Typography, Button } from "@mui/material"
import dayjs from "dayjs";
import holidays from "holiday-jp"
import { DayDrawer } from "./DayDrawer";
import { useState } from "react";
import PropTypes from 'prop-types';

export const Calendar = (props) => {
  const { calendar, month } = props;
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const [open, setOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const toggleDrawer = (date) => {
    setOpen(!open);
    setDrawerContent(date);
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
                  return (
                    <Button onClick={()=>toggleDrawer(date)} sx={{minWidth: '30px', flex: 1, height: '120px', textAlign: "center", alignItems: 'flex-start', ...styles.date}} key={dayjs(date).date()}>
                      <Typography sx={{fontSize: '13px'}}>{dayjs(date).date()}</Typography>
                    </Button>
                  )
                })}
              </Box>
            )
          })}
        </Box>
      </Box>

      <DayDrawer open={open} setOpen={setOpen} drawerContent={drawerContent} />
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

