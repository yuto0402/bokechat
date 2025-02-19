import { Button, Divider, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import GroupPlan from "./GroupPlan";

const GroupPlanDrawer = (props) => {
  const { open, setOpen, plans } = props;

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
          <Typography>oew</Typography>
          <Button sx={{minWidth: '24px'}} onClick={toggleDrawer}>
            <CloseIcon  sx={{color: 'white'}} />
          </Button>
        </Box>
        <Divider />
      </Box>

      <Box sx={{pt: 4, px: '15px'}}>
        <GroupPlan plans={plans} />
      </Box>
    </Drawer>
  )
}

GroupPlanDrawer.propTypes = {
  open: PropTypes.any.isRequired,
  setOpen: PropTypes.any.isRequired,
  plans: PropTypes.any,
};

export default GroupPlanDrawer
