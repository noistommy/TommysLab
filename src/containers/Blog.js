import React from 'react';
import { connect } from 'react-redux';
import {BlogList, BlogWrite} from 'components';
import { Container, Divider, Segment } from 'semantic-ui-react';



class Blog extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const blogwrite = (<BlogWrite/>);
        return (
            <div className="page blog-page">
                <Container>
                    <h1>BLOG</h1>
                    {this.props.isLoggedIn ? blogwrite : undefined}
                    <BlogList/>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn
    };
}

export default connect(mapStateToProps)(Blog);
