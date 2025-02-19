import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from "prop-types";

export const Header = (props) => {
  const { back } = props;
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333333", position: "fixed", top: 0, zIndex: 4000 }}>
      <Toolbar
        sx={{
          backgroundImage: "url(https://wallpaper.forfun.com/fetch/4a/4ac71567ab4e0d5f92cdfd3740fdb76a.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {back &&
          <Button sx={{color: "white", minWidth: '30px'}} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </Button>
        }
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          BakaChat
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
    back: PropTypes.any,
};
