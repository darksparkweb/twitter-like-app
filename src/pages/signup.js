import React, {Component} from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from 'prop-types'
import AppLogo from '../images/logo.png'
//MUI STUFF
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux stuff
import {connect} from 'react-redux'
import {signUpUser} from "../Redux/Actions/userActions";

const styles = (theme) => ({
    ...theme.signStyles
})

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {},
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors})
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signUpUser(newUserData, this.props.history)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes, UI: {loading}} = this.props;
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img className={classes.logo} src={AppLogo} alt="Logo"/>
                    <Typography variant={"h2"} className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id={"email"}
                                   type={"email"}
                                   name={"email"}
                                   label={"Email"}
                                   className={classes.textField}
                                   helperText={errors.email}
                                   error={!!errors.email}
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                        <TextField id={"password"}
                                   type={"password"}
                                   name={"password"}
                                   label={"Password"}
                                   className={classes.textField}
                                   helperText={errors.password}
                                   error={!!errors.password}
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                        <TextField id={"confirmPassword"}
                                   type={"password"}
                                   name={"confirmPassword"}
                                   label={"Confirm Password"}
                                   className={classes.textField}
                                   helperText={errors.confirmPassword}
                                   error={!!errors.confirmPassword}
                                   value={this.state.confirmPassword}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                        <TextField id={"handle"}
                                   type={"text"}
                                   name={"handle"}
                                   label={"Handle"}
                                   className={classes.textField}
                                   helperText={errors.handle}
                                   error={!!errors.handle}
                                   value={this.state.handle}
                                   onChange={this.handleChange}
                                   fullWidth
                        />
                        {errors.general && (
                            <Typography variant={'body2'} className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            className={classes.button}
                            disabled={loading}
                        >

                            {loading ? (
                                <CircularProgress size={30} className={classes.progress}/>
                            ) : 'Sign Up'}
                        </Button>
                        <br />
                        <small>Already have an account? login <Link to={"/login"}>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})
export default connect(mapStateToProps, {signUpUser})(withStyles(styles)(signup))
