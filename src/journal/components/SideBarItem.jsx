import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {
    const dispatch = useDispatch();

    const onClickNote = () => {
        //setActiveNote needs a payload composed of all these props in a note 
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) );
    }
    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [ title ]);


  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid 
                container 
                flexDirection='column'
            >
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ body }/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
