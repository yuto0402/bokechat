import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from "@mui/system";

export default function Bottom() {
  const navigate = useNavigate();
  const location = useLocation();

  const urlToValue = {
    "/": 0,
    "/search": 1,
    "/group": 2,
    "/schedule": 3,
    "/profile": 4,
  };
  const [currentValue, setCurrentValue] = useState(urlToValue[location.pathname] ?? 0);

  useEffect(() => {
    setCurrentValue(urlToValue[location.pathname]);
  }, [location.pathname])

  const handleNavigation = (url) => {
    navigate(url);
  };

  const menu = [
    { title: 'ホーム', href: '/', icon: <HomeIcon /> },
    { title: '検索', href: '/search', icon: <SearchIcon /> },
    { title: 'グループ', href: '/group', icon: <GroupsIcon /> },
    { title: 'スケジュール', href: '/schedule', icon: <CalendarMonthIcon /> },
    { title: 'マイページ', href: '/profile', icon: <AccountCircleIcon /> },
  ]

  return (
    <>
      <Box sx={{mb: 7}}>
        <Outlet />
      </Box>

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >

      <BottomNavigation showLabels value={currentValue}>
        {menu.map(obj => {
          return (
            <BottomNavigationAction
              key={obj.title}
              label={obj.title}
              icon={obj.icon}
              onClick={() => handleNavigation(obj.href)}
            />
          )
        })}
      </BottomNavigation>
    </Paper>
    </>
  );
}
