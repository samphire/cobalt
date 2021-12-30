import React from 'react';
import {Paper, Card, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "ivory"
    },
    pageHeader: {
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(2)
    },
    icon: {
        display: 'inline-block',
        padding: theme.spacing(2),
        color: '#3c44b1',
        fontSize: 'xx-large'
    },
    pageTitle: {
        paddingLeft: theme.spacing(8),
        fontSize: 'xx-large',
        '& .MuiTypography-h4':{
            opacity: '0.5'
        }
    }
}))
export default function PageHeader(props) {

    const classes = useStyles()
    const {title, subTitle, icon, image} = props;

    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.icon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h2"
                        component="div">
                        {title}
                    </Typography>
                    <Typography
                        variant="h4"
                        component="div">
                        {subTitle}
                    </Typography>
                </div>
            </div>
        </Paper>
    );
}
