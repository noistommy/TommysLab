import React from 'react';
import { Link } from 'react-router';
import { Segment, Dropdown, Icon, Button, Comment, TextArea, List } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

class Memo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.data.contents
        };
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleEdit() {
        if(this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.value;

            this.props.onEdit(id, index, contents).then(() => {
                this.setState({
                    editMode: !this.state.editMode
                });
            })
        } else {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }

    handleRemove() {
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onRemove(id, index);
    }

    handleStar() {
        let id = this.props.data._id;
        let index = this.props.index;
        this.props.onStar(id, index);
    }


    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let current = {
            props: this.props,
            state: this.state
        };

        let next = {
            props: nextProps,
            state: nextState
        };

        let update = JSON.stringify(current) !== JSON.stringify(next);
        return update;
    }

    render() {
        const { data, ownership } = this.props;
        const dropDownMenu = (
            <div className="option-button">
                <Dropdown text="OPTION ">
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} text="EDIT"></Dropdown.Item>
                        <Dropdown.Item as={Link} text="REMOVE"></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
        const commentActions = (
            <Comment.Actions>
                <Comment.Action onClick={this.toggleEdit}>Edit</Comment.Action>
                <Comment.Action onClick={this.handleRemove}>Remove</Comment.Action>
            </Comment.Actions>
            )
        // EDITED info
        let editedInfo = (
            <span> · edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );
        let starStyle = (this.props.data.starred.indexOf(this.props.currentUser) > -1) ? { color: '#ff9980' } : {} ;
        const memoView = (

                <Comment.Group>
                    <Comment>
                      <Comment.Content>
                        <Comment.Author as='a'> {this.props.data.writer}</Comment.Author>
                        <Comment.Metadata>
                          <div>wrote a log · <TimeAgo date={this.props.data.date.created}/></div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {data.contents}
                        </Comment.Text>
                        <div className="favorits">
                          <Icon name='heart' style={starStyle} onClick={this.handleStar} />
                          좋아요 {data.starred.length}
                        </div>
                        { ownership ? commentActions : undefined }
                      </Comment.Content>
                    </Comment>
              </Comment.Group>

        );
        const editView = (
            <Segment.Group raised>
                <Segment>
                    <TextArea name='comment' rows='3' placeholder='Edit your comment.' value={this.state.value}
                            onChange={this.handleChange} />
                </Segment>
                <Segment className="btn-post">
                    <Button basic color='yellow' onClick={this.toggleEdit}>
                        <Icon name='edit'/>
                        OK
                    </Button>
                </Segment>
            </Segment.Group>
            )
        return (
            <List.Item>
                { this.state.editMode ? editView : memoView }
            </List.Item>
        );
    }
}

Memo.propTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    index: React.PropTypes.number,
    onRemove: React.PropTypes.func,
    onStar: React.PropTypes.func,
    starStatus: React.PropTypes.object,
    currentUser: React.PropTypes.string
};

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true,
    onEdit: (id, index, contents) => {
        console.error('onEdit function not defined');
    },
    index: -1,
    onRemove: (id, index) => {
        console.error('remove function not defined');
    },
    onStar: (id, index) => {
        console.error('star function not defined');
    },
    starStatus: {},
    currentUser: ''
};

export default Memo;
