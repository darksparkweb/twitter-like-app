import React, {Component} from "react";
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from "react-router-dom";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import MyButton from "../../util/MyButton";
import ScreamDialog from './ScreamDialog'
//MUI STUFF
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
//Icons
import ChatIcon from "@material-ui/icons/Chat"
//Redux stuff
import {connect} from 'react-redux'

import DeleteScream from "./DeleteScream";
import LikeButton from "./LikeButton";


const styles = theme => ({

    card: {
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
        },
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        minHeight: 150,
    },
    image: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 120,
        },
        minWidth: 200,
    },
    content: {
        [theme.breakpoints.down('sm')]: {
            padding: 10
        },
        padding: 20,
        objectFit: 'cover'
    },
    buttons: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: -30,
            marginTop: 30
        },
        marginLeft: -10,
        marginBottom: -20
    }
})

class Scream extends Component {


    render() {
        dayjs.extend(relativeTime)
        const {
            classes,
            scream: {
                body, createdAt, userImage, userHandle, screamId, likeCount, commentCount
            },
            user: {
                authenticated,
                credentials: {handle}
            }
        } = this.props

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image}
                    image={userImage}
                    title="Profile image"/>
                <CardContent className={classes.content}>
                    <Typography
                        variant='h5'
                        component={Link}
                        to={`/users/${userHandle}`}
                        color={"secondary"}
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant='body2' color={"textSecondary"}>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                    <div className={classes.buttons}><LikeButton  screamId={screamId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip={"comments"}>
                        <ChatIcon color={"secondary"}/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                        <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                    </div>

                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user
})


export default connect(mapStateToProps)(withStyles(styles)(Scream))