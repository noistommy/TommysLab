import React from 'react';
import { Link } from 'react-router';
import { Segment, Dropdown, Icon, Button, Comment, TextArea, Image } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

class InstaItem extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {

        return (
                <a href={this.props.data.link} >
                    <Image src={this.props.data.images.thumbnail.url}/>
                </a>
        );
    }
}

InstaItem.propTypes = {
    data: React.PropTypes.object,

};

InstaItem.defaultProps = {
    data: {
        user: {
            username:"User"
        }

    }
};

export default InstaItem;
