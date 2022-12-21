import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth/thunks";

export const NavBar = ({ drawerWidth }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        //ideally this is an async task, because has to reach firebase do things with the code and return
        dispatch( startLogout() ); 
    }
  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)`},
            ml: { sm: `${ drawerWidth }px` } 
        }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge='start'
                sx={{ mr: 2, display: { sm: 'none'} }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'>JournalApp</Typography>

                <IconButton 
                    color='error'
                    onClick={ onLogout }>
                    <LogoutOutlined/>
                </IconButton>

            </Grid>
        </Toolbar>
    </AppBar>
  )
}
