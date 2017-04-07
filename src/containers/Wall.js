import React from 'react';
import { Comment } from 'containers';

class Wall extends React.Component {
	constructor(props) {
        super(props);
    }

    render() {
        return (
            <Comment>{this.props.params.username}</Comment>
        );
    }
}

export default Wall;
