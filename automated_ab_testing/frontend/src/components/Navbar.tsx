import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    title: {
        textDecoration: 'none',
        color: 'inherit',
    },
    button: {
        marginLeft: theme.spacing(2),
    },
}));

const Navbar: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" className={classes.title} component={Link} to="/">
                        AB/AI
                    </Typography>
                    <div>
                        <Button color="inherit" className={classes.button} component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" className={classes.button} component={Link} to="/contact">
                            Contact
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;