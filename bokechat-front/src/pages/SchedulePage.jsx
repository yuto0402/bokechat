import { Typography, Box, Button, Fab } from "@mui/material";
import { useState } from "react";
import { getMonth } from "../lib/day";
import { Calendar } from "../features/Schedule/components/Calendar";
import dayjs from "dayjs";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import { Header } from "../components/Header";

const SchedulePage = () => {
  const [now, setNow] = useState(dayjs().month());
  const prevMonth = () => setNow((now) => now - 1)
  const nextMonth = () => setNow((now) => now + 1)
  const thisMonth = () => setNow(dayjs().month())

  return (
    <Box>
      <Header />

      <Box sx={{display: 'flex', justifyContent: "center", position: "relative", my: 1, mt: 8}}>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Button onClick={prevMonth}>
            <ArrowBackIosNewIcon />
          </Button>
          <Typography sx={{ mx: 2 }}>{dayjs(new Date(dayjs().year(), now)).format('YYYY年MM月')}</Typography>
          <Button onClick={nextMonth}>
            <ArrowForwardIosIcon />
          </Button>
        </Box>
        <Button sx={{position: "absolute", right: '10px'}} onClick={thisMonth}>
          <Typography>今月</Typography>
        </Button>
      </Box>

      <Calendar calendar={getMonth(now)} month={now + 1} />

      <Fab sx={{position: "fixed", right: '24px', bottom: '100px'}} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
 )
}

export default SchedulePage;
