import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
      <Toolbar
        sx={{
          backgroundImage: "url(https://wallpaper.forfun.com/fetch/4a/4ac71567ab4e0d5f92cdfd3740fdb76a.jpeg)",
          backgroundSize: "cover", // 画像をカバーさせる
          backgroundPosition: "center", // 中央配置
        }}
      >
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          BakaChat
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
