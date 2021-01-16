import React from "react";
import NoImg from '../images/noimg2.png'
import PropTypes from 'prop-types'
//MUI
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

import withStyles from '@material-ui/core/styles/withStyles'
import Paper from "@material-ui/core/Paper";
import {LocationOn} from "@material-ui/icons";

const styles = (theme) => ({
    ...theme.profileStyles,
    handle: {
        borderRadius: 5,
        height: 20,
        backgroundColor: "#f44336",
        width: 60,
        margin: "0 auto 7px auto",
    },
    fullLine: {
        borderRadius: 5,
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: "100%",
        marginBottom: 10,
    },
    halfLine: {
        borderRadius: 5,
        height: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: "50%",
        margin: "0 auto 7px auto"
    }

})
const ProfileSkeleton = (props) => {
    const {classes} = props

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className={"image-wrapper"}>
                    <img src={NoImg} alt="profile" className={"profile-image"}/>
                </div>
                <hr/>
                <div className={"profile-details"}>
                    <div className={classes.handle}/>
                    <hr/>
                    <div className={classes.fullLine}/>
                    <div className={classes.halfLine}/>
                    <hr/>
                    <LocationOn color={"primary"}/>
                    <hr/>
                    <LinkIcon color={"primary"}/> http://website.com<br/>
                    <CalendarToday color={"primary"}/> Joined date
                </div>
            </div>
        </Paper>

    )

}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(ProfileSkeleton)