import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import {Link} from 'react-router-dom'
import LikeButton from "./LikeButton";
import Comments from './Comments'
import CommentForm from './CommentForm'
// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography";
//Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from "@material-ui/icons/Chat";
//Redux stuff
import {connect} from 'react-redux'
import {getScream, clearErrors} from "../../Redux/Actions/dataActions";

const styles = theme => ({
    visibleSeparator: {
        width: "96%",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        marginBottom: 10
    },
    invisibleSeparator: {
        border: "none",
        margin: 4,
    },
    profileImage: {
        [theme.breakpoints.down('sm')]: {
            margin: "0 auto 0 auto"
        },
        width: 200,
        height: 200,
        borderRadius: "50%",
        objectFit: 'cover',
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        [theme.breakpoints.down('sm')]: {
            left: "84%",
            top: "1%"
        },
        position: "absolute",
        left: "90%",
        top: "3%"
    },
    expandButton: {
        [theme.breakpoints.down('sm')]: {
            left: "88%"
        },
        position: "absolute",
        left: "94%",
    },
    spinnerDiv: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
    }
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: '',
    }
    componentDidMount() {
        if(this.props.openDialog){
            this.handleOpen()
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname

        const {userHandle, screamId} = this.props
        const newPath = `/users/${userHandle}/scream/${screamId}`

        if(oldPath === newPath) oldPath = `/users/${userHandle}`
        window.history.pushState(null, null, newPath)

        this.setState({ open: true, oldPath, newPath})
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({ open: false})
        this.props.clearErrors()
    }
    render(){
        const {classes, scream:  {screamId, comments, body, createdAt, likeCount, commentCount, userImage, userHandle}, UI: {loading}}= this.props

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={150} thickness={3}/>
            </div>
        ):(
            <Grid container spacing={4}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color={"secondary"}
                        variant={"h5"}
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant={"body2"} color={"textSecondary"}>
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant={"body1"}>
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip={"comments"}>
                        <ChatIcon color={"secondary"}/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm screamId={screamId}/>
                <Comments comments={comments}/>
            </Grid>
        )
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip={"Expand scream"} tipClassName={classes.expandButton}>
                    <UnfoldMore color={"secondary"}/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth={"sm"}>
                    <MyButton tip={'Close'} onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon color={"primary"}/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }

}

ScreamDialog.propType = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI,
})

const mapActionsToProps = {
    getScream, clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))
