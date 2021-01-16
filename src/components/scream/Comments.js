import React, {Component, Fragment} from "react";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    ...theme.signStyles,
    commentImage: {
        width: "100%",
        height: 100,
        objectFit: "cover",
        borderRadius: "50%",
        marginLeft: "10px"
    },
    commentData: {
        marginLeft: 20,
    },
    gridContainer: {
        marginBottom: 5,
    },
    invisibleSeparator: {
        border: "none",
        margin: 4,
    },
    visibleSeparator: {
        width: "96%",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        marginBottom: 10,

    },
})

class Comments extends Component {
    render() {
        const {comments, classes} = this.props
        return (
            <Grid container>
                {comments ? comments.map((comment, index) => {
                    const {body, createdAt, userImage, userHandle} = comment
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container className={classes.gridContainer}>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant={"h5"}
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color={"secondary"}>
                                                {userHandle}
                                            </Typography>
                                            <Typography variant={"body2"} color={"textSecondary"}>
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant={"body1"}>{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length -1 && (<hr className={classes.visibleSeparator}/>)}
                        </Fragment>
                    )
                }) : null }
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
}

export default withStyles(styles)(Comments)