import React, {Component} from 'react'
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types'
import ScreamSkeleton from '../util/ScreamSkeleton'
import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'

import {connect} from 'react-redux'
import {getScreams} from "../Redux/Actions/dataActions";


class home extends Component {

    componentDidMount() {
        this.props.getScreams()
    }
    render() {
        const { screams, loading } = this.props.data
        let recentScreamsMarkUp = !loading
            ? (screams ? screams.map(scream => <Scream key={scream.screamId} scream={scream}/> ): null )
            : (<ScreamSkeleton/>)
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkUp}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
})

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
export default connect(mapStateToProps, {getScreams})(home)
