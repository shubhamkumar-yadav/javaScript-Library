import React from "react";
import { Box, makeStyles, Typography, Button, AppBar, Toolbar, TextField } from '@material-ui/core';
import { useState } from "react";
import Popover from '@material-ui/core/Popover';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { authenticate } from "../service/api";
const useStyle = makeStyles({
    container: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#dbf2d8",
        justifyContent: "center",
        padding: 15,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0
    },
    text: {
        fontWeight: 600,
        fontSize: 18
    },
    Btn: {
        backgroundColor: "green",
        color: "white",
        textTransform: "capitalize",
        height: "40px",
        "&:hover": {
            backgroundColor: 'rgb(7, 177, 77, 0.8)'
        }
    },
    navigation: {
        backgroundColor: "white"
    },
    Subnavigation: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "black",
    },
    navText: {
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "poppins",
        fontSize: 19
    },
    headingContainer: {
        marginTop: 65,

    },
    popper: {
        zIndex: 1
    }
})
const Annotator = () => {
    const classes = useStyle();
    const [annotator, setAnnotator] = useState(false);
    const [comment, setComment] = useState({
        id: "",
        comment: ""
    })
    const startAnnotation = () => {
        setAnnotator(true);
        console.log(annotator);
    }
    const stopAnnotation = () => {
        window.location.reload();
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    if (annotator === true) {
        document.onmouseover = function (e) {
            // console.log(e.target.id);
            document.getElementById(e.target.id).style.border = '1px dashed black';
            document.getElementById(e.target.id).ondblclick = function (e) {
                setComment({ ...comment, id: e.target.id })
                handleClick(e)
                // document.getElementById("outlined-basic").focus()
            };
        }
        document.onmouseout = function (e) {
            document.getElementById(e.target.id).style.border = '0px';
            // handleClose();
        }
    }
    const submitComment = async (e) => {
        let response = await authenticate(comment);
        console.log(response);
    };
    return (<>
        <AppBar className={classes.navigation}>
            <Toolbar className={classes.Subnavigation} id="nav">
                <Typography className={classes.navText}>Contentstack</Typography>
                <Typography className={classes.navText}>Product</Typography>
                <Typography className={classes.navText}>Resources</Typography>
                <Typography className={classes.navText}>Customers</Typography>
                <Typography className={classes.navText}>Marketplace</Typography>
            </Toolbar>
        </AppBar>
        <Box className={classes.headingContainer}>
            <Typography id="heading" style={{ fontFamily: "poppins", textAlign: "center", fontSize: 50, fontWeight: 500 }}>CONTENT EXPERIENCES MADE<br /> EASIER AND FASTER</Typography>
        </Box>
        <Box className={classes.contentContainer}>
            <Typography style={{ fontFamily: "poppins", textAlign: "center", fontSize: 24 }} id="content">
                Your brand deserves the best.<br />Create the unimaginable with our enterprise Content Experience Platform.<br />
                It's headless CMS taken to the next level.
            </Typography>
        </Box>
        <Box className={classes.container}>
            <Typography className={classes.text}>Website annotator</Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {
                annotator === false && <Button className={classes.Btn} onClick={startAnnotation} >Start</Button>
            }
            {
                annotator === true && <Button className={classes.Btn} onClick={stopAnnotation} >Stop</Button>
            }
        </Box>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            className={classes.popper}
        >
            <Box style={{ padding: 15, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <AccountCircleIcon />
                <Typography>Yuvraj</Typography>
            </Box>
            <Box style={{ padding: 15 }}>
                <TextField id="outlined-basic" label="Add Comment" variant="outlined" onChange={(e) => setComment({ ...comment, comment: e.target.value })} />
            </Box>
            <Box style={{ padding: 15, display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" onClick={() => (handleClose(), submitComment())} style={{ backgroundColor: "orange", color: "white", textTransform: "capitalize" }}>Comment</Button>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            </Box>
        </Popover>
    </>)
};
export { Annotator };