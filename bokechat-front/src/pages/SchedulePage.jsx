import { Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { getMonth } from "../lib/day";
import { Calendar } from "../components/Calendar";
import dayjs from "dayjs";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Header } from "../components/Header";

const SchedulePage = () => {
  const [now, setNow] = useState(dayjs());
  const prevMonth = () => setNow((now) => now.subtract(1, "month"))
  const nextMonth = () => setNow((now) => now.add(1, "month"))
  const thisMonth = () => setNow(dayjs())

  return (
    <Box>
      <Header />

      <Box sx={{display: 'flex', justifyContent: "center", position: "relative", my: 1}}>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Button onClick={prevMonth}>
            <ArrowBackIosNewIcon />
          </Button>
          <Typography sx={{ mx: 2 }}>{now.format('YYYY年MM月')}</Typography>
          <Button onClick={nextMonth}>
            <ArrowForwardIosIcon />
          </Button>
        </Box>
        <Button sx={{position: "absolute", right: '10px'}} onClick={thisMonth}>
          <Typography>今日</Typography>
        </Button>
      </Box>

      <Calendar calendar={getMonth(now.month())} month={now.month()} />
    </Box>
 )
}

export default SchedulePage;
