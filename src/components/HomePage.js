import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';

const styles = {
    
}

class HomePage extends Component {

    render() {
        const { classes } = this.props
        return (
            <div className="HomePage">
                <h1>{this.props.user.displayName}</h1>
            </div>
        );
    }

}

export default withStyles(styles)(HomePage)