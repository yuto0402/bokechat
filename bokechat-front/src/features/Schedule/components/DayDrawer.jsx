import { Button, Divider, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import holidays from "holiday-jp"
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import HourCell from "./HourCell";

export const DayDrawer = (props) => {
  const { open, setOpen, today, todaySchedule } = props;
  const date = dayjs(today);

  const toggleDrawer = () => {
    setOpen(!open);
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
      }}
    >
      <Box sx={{position: 'sticky', minHeight: '88px', top: 0, zIndex: 1000, backgroundColor: 'white'}}>
        <Divider sx={{width: '50px', borderWidth: '2.5px', borderRadius: '5px', mx: 'auto', mt: '20px'}} />
        <Box sx={{m: 2, display: "flex", justifyContent: "space-between"}}>
          <Box sx={{display: "flex", gap:2, alignItems: "center"}}>
            <Typography sx={{fontSize: '20px'}}>{date.format('MM月DD日ddd曜日')}</Typography>
            {holidays.isHoliday(date.toDate()) &&
              <Typography sx={{color: 'red'}}>{holidays.between(date.toDate(), date.toDate())[0]['name']}</Typography>
            }
          </Box>
          <Button sx={{minWidth: '24px'}} onClick={toggleDrawer}>
            <CloseIcon />
          </Button>
        </Box>
        <Divider />
      </Box>

      <Box sx={{pt: 4, px: '15px'}}>
        <HourCell dateSchedule={todaySchedule} date={today} />
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
