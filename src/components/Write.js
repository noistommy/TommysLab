import React from 'react';
import { Link } from 'react-router';
import { Segment, Card, Icon, Form, TextArea, Button } from 'semantic-ui-react';

class Write extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contents: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleChange(e) {
        console.log("change");
        this.setState({
            contents: e.target.value
        });
    }

    handlePost() {
        let contents = this.state.contents;
        console.log("click"+contents);
        this.props.onPost(contents).then(
            () => {
                this.setState({
                    contents: ""
                });
            }
        );
    }

    render(){
        return(
                <Segment>
                    <TextArea name='comment' rows='3' placeholder='Write down your comment.' value={this.state.contents}
                            onChange={this.handleChange} />
                
                    <Button className="btn-post" color='teal' onClick={this.handlePost}>
                        <Icon name='write'/>
                        POST
                    </Button>
                </Segment>
 
        )
    }
}

Write.propTypes = {
    onPost: React.PropTypes.func
};

Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); }
};

export default Write;
