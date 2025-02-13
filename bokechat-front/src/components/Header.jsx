import { AppBar, Toolbar, Typography } from "@mui/material"

export const Header = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#333333' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            BakaChat
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}
