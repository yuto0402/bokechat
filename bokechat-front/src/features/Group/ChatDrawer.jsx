import { Button, Divider, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const ChatDrawer = (props) => {
  const { chatOpen, setChatOpen } = props;

  const toggleDrawer = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <Drawer
      anchor="bottom"
      open={chatOpen}
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

      </Box>
    </Drawer>
  )
}

ChatDrawer.propTypes = {
  chatOpen: PropTypes.any.isRequired,
  setChatOpen: PropTypes.any.isRequired,
};

export default ChatDrawer
