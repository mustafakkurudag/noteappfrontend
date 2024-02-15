import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableHead, Typography, colors, styled, useTheme } from '@mui/material';
import React, { useEffect, useRef } from 'react'

const StudentDetail = (props) => {
    const isDialogOpened = props.isDialogOpened;
    const handleCloseDialog = props.handleCloseDialog;
    const student = props.std.tempStudent;
    const theme = useTheme();
    const StyledPaper = styled(Paper)`
        background-color: #d6d6d4;
  `;
  const StyledButton = styled(Button)`
    background-color:info  
  `

    //const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth] = React.useState("sm");

    const handleClickOpen = () => {
        setOpen(true);
        //setTimeout(() => setOpen(false), 16000);
    };

    const handleClose = () => {
        setOpen(false);
        handleCloseDialog(false);
    };
    console.log("student detail: ", student)
    return (
        <React.Fragment>
            <Dialog
                PaperComponent={StyledPaper}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={isDialogOpened}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">
                <Typography sx={{fontWeight:'600', fontSize:20}}>Öğrenci Detayı</Typography></DialogTitle>
                <DialogContent>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: '#d6d6d4' }}
                        aria-label="contacts"
                    >{
                        student !== null ?
                        <>
                        <ListItem disablePadding>
                            <Typography sx={{fontWeight:'600'}}>Adı Soyadı:&nbsp;</Typography>
                            <Typography>{student.name} {student.surname}</Typography>
                        </ListItem>
                        <ListItem disablePadding>
                        <Typography sx={{fontWeight:'600'}}>TC Kimlik No:&nbsp;</Typography>
                        <Typography>{student.trId} </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                    <Typography sx={{fontWeight:'600'}}>Okul No:&nbsp;</Typography>
                        <Typography>{student.schoolNumber} </Typography>
                    </ListItem>
                    <ListItem disablePadding>
                        <span className='font-bold'>Sınıf:&nbsp;</span>
                        <span>{student.className} </span>
                    </ListItem>
                    <ListItem disablePadding>
                        <span className='font-bold'>1. Yazılı Notu:&nbsp;</span>
                        <span>{student.exam1Note} </span>
                    </ListItem>
                    <ListItem disablePadding>
                        <span className='font-bold'>2. Yazılı Notu:&nbsp;</span>
                        <span>{student.exam2Note} </span>
                    </ListItem>
                    <ListItem disablePadding>
                        <span className='font-bold'>Sözlü Notu:&nbsp;</span>
                        <span>{student.oralExamNote} </span>
                    </ListItem>
                    <ListItem disablePadding>
                        <span className='font-bold'>Ortalama:&nbsp;</span>
                        <span>{student.average} </span>
                    </ListItem>
                    <ListItem disablePadding>
                        <span className='font-bold'>Durum:&nbsp;</span>
                        <span>{student.status} </span>
                    </ListItem>
                    </>
                    :       
                    <ListItem disablePadding>
                        <span className='font-bold'>Herhangi bir seçim yapılmadı.&nbsp;</span>
                    </ListItem>
                    
                    } 
                    </List>
                </DialogContent>
                <DialogActions>
                <Button variant="contained" 
                        color="info" 
                        onClick={handleClose}
                        sx={{marginRight:'15px', marginBottom:'10px'}}>
                    Kapat
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default StudentDetail