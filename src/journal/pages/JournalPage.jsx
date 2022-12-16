import { IconButton, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {
  return (
    <JournalLayout>
       {/* <Typography>Cillum tempor amet incididunt dolore et culpa veniam laborum irure voluptate fugiat sint amet. Esse in tempor officia adipisicing voluptate amet anim ullamco Lorem ad ad sint incididunt. Anim do ipsum adipisicing enim ut enim magna officia incididunt ullamco. Dolor irure nisi in qui voluptate laborum sint ullamco non dolor ad. Officia adipisicing duis consectetur ut fugiat nulla irure fugiat magna.</Typography> */}
       <NothingSelectedView />
       {/* <NoteView /> */}

       <IconButton
          size='large'
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 50
           }}
       >
        <AddOutlined sx={{ fontSize: 30 }}/>
       </IconButton>
    </JournalLayout>
  )
}
