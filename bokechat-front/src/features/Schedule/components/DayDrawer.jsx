import { Button, Divider, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import holidays from "holiday-jp"
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import HourCell from "./HourCell";
import { useState } from "react";
import ScheduleDetail from "./ScheduleDetail";

export const DayDrawer = (props) => {
  const { open, setOpen, today, todaySchedule } = props;
  const date = dayjs(today);

  const [schedule, setSchedule] = useState();

  const toggleDrawer = () => {
    setOpen(!open);
    setSchedule();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer}
      sx={{
        '& .MuiDrawer-paper': {
          height: '100%',
          borderRadius: '20px 20px 0 0',
        },
        zIndex: 10000
      }}
    >
      <Box
        sx={{
          position: 'sticky', minHeight: '88px', top: 0, zIndex: 1000, backgroundColor: 'white',
          backgroundImage: "url(https://img.freepik.com/premium-photo/dolphin-swimming-sea-beautiful-underwater-colorful-coral-wild-nature_851808-87.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: '88px'
        }}
      >
        <Divider sx={{width: '50px', borderWidth: '2.5px', borderRadius: '5px', mx: 'auto', mt: '20px'}} />
        <Box sx={{m: 2, display: "flex", justifyContent: "space-between"}}>
            {schedule
              ?
                <Box sx={{display: "flex", gap: 1, alignItems: "center"}}>
                  <Button sx={{minWidth: '40px'}} onClick={() => setSchedule()}>
                    <ArrowBackIcon sx={{color: 'white'}} />
                  </Button>
                  <Typography sx={{color: 'white', fontSize: '20px'}}>{schedule.title}</Typography>
                </Box>
              :
                <Box sx={{display: "flex", gap:2, alignItems: "center"}}>
                  <Typography sx={{fontSize: '20px', color: 'white'}}>{date.format('MM月DD日ddd曜日')}</Typography>
                    {holidays.isHoliday(date.toDate()) &&
                      <Typography sx={{color: 'red'}}>{holidays.between(date.toDate(), date.toDate())[0]['name']}</Typography>
                    }
                </Box>
            }
          <Button sx={{minWidth: '24px'}} onClick={toggleDrawer}>
            <CloseIcon  sx={{color: 'white'}} />
          </Button>
        </Box>
        <Divider />
      </Box>

      <Box sx={{pt: 4, px: '15px'}}>
        {schedule
          ? <ScheduleDetail schedule={schedule} />
          : <HourCell dateSchedule={todaySchedule} date={today} setSchedule={setSchedule} />
        }
      </Box>
    </Drawer>
  )
}

DayDrawer.propTypes = {
  open: PropTypes.any.isRequired,
  setOpen: PropTypes.any.isRequired,
  today: PropTypes.any.isRequired,
  todaySchedule: PropTypes.any,
};
