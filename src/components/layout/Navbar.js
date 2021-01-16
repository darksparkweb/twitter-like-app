import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
import {connect} from "react-redux";
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'
//Material-UI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//Icons
import HomeIcon from '@material-ui/icons/Home'

const styles = {
    button: {
        margin: 10,
    }
}

class Navbar extends Component {

    render() {
        const {classes, authenticated} = this.props
        return (
            <div>
                <AppBar>
                    <Toolbar className="nav-container">
                        {authenticated ? (
                            <Fragment>
                                <PostScream/>
                                <Link to={"/"}>
                                    <MyButton tip={"Home"}
                                              children={<HomeIcon fontSize="large" color={"secondary"}/>}>
                                    </MyButton>
                                </Link>
                                <Notifications/>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button className={classes.button} size={'small'} variant="contained" color="secondary"
                                        component={Link} to="/">
                                    Home
                                </Button>
                                <Button className={classes.button} size={'small'} variant="contained" color="secondary"
                                        component={Link} to="/Login">
                                    Login
                                </Button>
                                <Button className={classes.button} size={'small'} variant="contained" color="secondary"
                                        component={Link} to="/signup">
                                    Signup
                                </Button>
                            </Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps)(withStyles(styles)(Navbar));
