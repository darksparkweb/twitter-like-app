import React, { Fragment} from "react";
import NoImg from '../images/noimg.png'
import PropTypes from 'prop-types'

//MUI
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
    card: {
        display: 'flex',
        marginBottom: 20,
        height: 173
    },
    cardContent: {
        width: "100%",
        flexDirection: 'column',
        padding: 25.

    },
    cover: {
        minWidth: 200,
        objectFit: 'cover',
    },
    handle: {
        marginBottom: 7,
        borderRadius: 7,
        width: 100,
        height: 20,
        backgroundColor: "rgba(255,156,145,0.55)"
    },
    date: {
        marginBottom: 10,
        borderRadius: 5,
        width: 90,
        height: 14,
        backgroundColor: "rgb(206,206,206)"
    },
    fullLine: {
        marginBottom: 10,
        borderRadius: 5,
        width: "90%",
        height: 15,
        backgroundColor: "rgba(255,156,145,0.55)"
    },
    halfLine: {
        marginBottom: 10,
        borderRadius: 5,
        width: "50%",
        height: 15,
        backgroundColor: "rgba(255,156,145,0.55)"
    },
})
const ScreamSkeleton = (props) => {
    const {classes} = props
    const content = Array.from({length: 5}).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}/>
                <div className={classes.date}/>
                <div className={classes.fullLine}/>
                <div className={classes.fullLine}/>
                <div className={classes.halfLine}/>
                </CardContent>
        </Card>
    ))
    return <Fragment>{content}</Fragment>

}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(ScreamSkeleton)