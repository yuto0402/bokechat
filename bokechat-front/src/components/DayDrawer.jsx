import { Button, Divider, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import holidays from "holiday-jp"
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export const DayDrawer = (props) => {
  const { open, setOpen, drawerContent } = props;
  const date = dayjs(drawerContent);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const hourList = new Array(24).fill(0).map((_, index) => index);


  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer}
      sx={{
        '& .MuiDrawer-paper': {
          height: '100%',
          borderRadius: '20px 20px 0 0',
          p: '20px'
        },
      }}
    >
      <Divider sx={{width: '50px', borderWidth: '2.5px', borderRadius: '5px', mx: 'auto'}} />
      <Box sx={{my: 2, display: "flex", justifyContent: "space-between"}}>
        <Box>
          <Typography sx={{fontSize: '20px'}}>{date.format('MM月DD日ddd曜日')}</Typography>
          {holidays.isHoliday(date.toDate()) &&
            <Typography sx={{color: 'red'}}>{holidays.between(date.toDate(), date.toDate())[0]['name']}</Typography>
          }
        </Box>
        <Button onClick={toggleDrawer}>
          <CloseIcon />
        </Button>
      </Box>

      <Box sx={{display: "flex", flexDirection: 'column', gap: 1.5}}>
        {hourList.map((hour) => {
          return(
            <Box key={hour} sx={{display: "flex", alignItems: "center", gap: 1}}>
              <Typography>{hour}:00</Typography>
              <Divider orientation="horizontal" sx={{flexGrow: 1, color: '#BBBBBB'}} />
            </Box>
          )
        })}
      </Box>
    </Drawer>
  )
}

DayDrawer.propTypes = {
  open: PropTypes.any.isRequired,
  setOpen: PropTypes.any.isRequired,
  drawerContent: PropTypes.any.isRequired,
};
