import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import {
    memoPostRequest,
    memoListRequest,
    memoEditRequest,
    memoRemoveRequest,
    memoRemoveFromData,
    memoStarRequest
} from 'actions/memo';
import { Container, Divider, Segment, Icon, Button } from 'semantic-ui-react';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleStar = this.handleStar.bind(this);
        this.loadNewMemo = this.loadNewMemo.bind(this);
        this.loadOldMemo = this.loadOldMemo.bind(this);
        this.removeClass = this.removeClass.bind(this);
    }

    componentDidMount() {
        // LOAD NEW MEMO EVERY 5 SECONDS
       const loadMemoLoop = () => {
           this.loadNewMemo().then(
               () => {
                   this.memoLoaderTimeoutId = setTimeout(loadMemoLoop, 5000);
               }
           );
       };

        this.props.memoListRequest(true, undefined, undefined, this.props.username).then(
            () => {
                // BEGIN NEW MEMO LOADING LOOP
                loadMemoLoop();
            }
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.username !== prevProps.username) {
            this.componentWillUnmount();
            this.componentDidMount();
        }
    }

    componentWillUnmount() {
        // STOPS THE loadMemoLoop
        clearTimeout(this.memoLoaderTimeoutId);
    }

    loadNewMemo() {
        // CANCEL IF THERE IS A PENDING REQUEST
        if(this.props.listStatus === 'WAITING')
            return new Promise((resolve, reject)=> {
                resolve();
            });

        // IF PAGE IS EMPTY, DO THE INITIAL LOADING
        if(this.props.memoData.length === 0 )
            return this.props.memoListRequest(true, undefined, undefined, this.props.username);

        return this.props.memoListRequest(false, 'new', this.props.memoData[0]._id, this.props.username);
    }

    loadOldMemo() {
        // CANCEL IF USER IS READING THE LAST PAGE
        if(this.props.isLast) {
            return new Promise(
                (resolve, reject)=> {
                    resolve();
                }
            );
        }

        // GET ID OF THE MEMO AT THE BOTTOM
        let lastId = this.props.memoData[this.props.memoData.length - 1]._id;

        // START REQUEST
        return this.props.memoListRequest(false, 'old', lastId, this.props.username).then(() => {
            // IF IT IS LAST PAGE, NOTIFY
            if(this.props.isLast) {
                console.log('You are reading the last page');
            }
        });
    }

    /* POST MEMO */
    handlePost(contents) {
        return this.props.memoPostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    console.log(this.props.postStatus.status );
                    this.loadNewMemo().then(
                        () => {
                            console.log('Success!');
                        }
                    );
                } else {

                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
                    let toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            toastContent = 'You are not logged in';
                            console.log(toastContent);
                            setTimeout(()=> {location.reload(false)}, 2000);
                            break;
                        case 2:
                            toastContent = 'Please write something';
                            console.log(toastContent);
                            break;
                        default:
                            toastContent = 'Something Broke';
                            console.log(toastContent);
                            break;
                    }

                }
            }
        );
    }

    handleEdit(id, index, contents) {
        return this.props.memoEditRequest(id, index, contents).then(
            () => {
                if(this.props.editStatus.status==="SUCCESS") {
                    console.log('Success!');
                } else {
                    /*
                        ERROR CODES
                            1: INVALID ID,
                            2: EMPTY CONTENTS
                            3: NOT LOGGED IN
                            4: NO RESOURCE
                            5: PERMISSION FAILURE
                    */
                    let errorMessage = [
                        'Something broke',
                        'Please write soemthing',
                        'You are not logged in',
                        'That memo does not exist anymore',
                        'You do not have permission'
                    ];

                    let error = this.props.editStatus.error;

                    // NOTIFY ERROR
                    let toastContent = 'errorMassage' + errorMessage[error - 1];
                    console.log(toastContent);

                    // IF NOT LOGGED IN, REFRESH THE PAGE AFTER 2 SECONDS
                    if(error === 3) {
                        setTimeout(()=> {location.reload(false)}, 2000);
                    }

                }
            }
        );
    }

    handleRemove(id, index) {
        this.props.memoRemoveRequest(id, index).then(() => {
            if(this.props.removeStatus.status==="SUCCESS") {
                // LOAD MORE MEMO IF THERE IS NO SCROLLBAR
                // 1 SECOND LATER. (ANIMATION TAKES 1SEC)
                setTimeout(() => {
                    this.loadOldMemo();
                }, 1000);
                console.log("SUCCESS!");
            } else {
                // ERROR
                /*
                    DELETE MEMO: DELETE /api/memo/:id
                    ERROR CODES
                        1: INVALID ID
                        2: NOT LOGGED IN
                        3: NO RESOURCE
                        4: PERMISSION FAILURE
                */
                let errorMessage = [
                    'Something broke',
                    'You are not logged in',
                    'That memo does not exist',
                    'You do not have permission'
                ];

                 // NOTIFY ERROR
                let toastContent = 'remove error:' + errorMessage[this.props.removeStatus.error - 1];
                console.log(toastContent);


                // IF NOT LOGGED IN, REFRESH THE PAGE
                if(this.props.removeStatus.error === 2) {
                    setTimeout(()=> {location.reload(false)}, 2000);
                }
            }
        });
    }

    handleStar(id, index) {
        this.props.memoStarRequest(id, index).then(
            () => {
                if(this.props.starStatus.status !== 'SUCCESS') {
                   /*
                        TOGGLES STAR OF MEMO: POST /api/memo/star/:id
                        ERROR CODES
                            1: INVALID ID
                            2: NOT LOGGED IN
                            3: NO RESOURCE
                    */
                    let errorMessage= [
                        'Something broke',
                        'You are not logged in',
                        'That memo does not exist'
                    ];


                    // NOTIFY ERROR
                    let toastContent = 'starerror' + errorMessage[this.props.starStatus.error - 1];
                    console.log(toastContent);


                    // IF NOT LOGGED IN, REFRESH THE PAGE
                    if(this.props.starStatus.error === 2) {
                        setTimeout(()=> {location.reload(false)}, 2000);
                    }
                } else {
                    console.log("Success!!");
                }
            }
        );
    }

    removeClass() {
        let element = document.getElementById('Commentview');
		element.classList.remove('open');
    }

    render() {
        const write = ( <Write onPost={this.handlePost} /> );
        return (

            <Container>
                <Button className="btn-cancel" icon basic onClick={this.removeClass}>
                    <Icon name="cancel"/>
                </Button>
                <h1>COMMMENT</h1>
                <Segment.Group className="commentBox">
                    { this.props.isLoggedIn ? write : undefined }
                    <MemoList data={this.props.memoData}
                                currentUser={this.props.currentUser}
                                onEdit={this.handleEdit}
                                onRemove={this.handleRemove}
                                onStar={this.handleStar}
                                />
                </Segment.Group>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data,
        listStatus: state.memo.list.status,
        editStatus: state.memo.edit,
        removeStatus: state.memo.remove,
        starStatus: state.memo.star,
        isLast: state.memo.list.isLast
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        },
        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        },
        memoEditRequest: (id, index, contents) => {
            return dispatch(memoEditRequest(id, index, contents));
        },
        memoRemoveRequest: (id, index) => {
            return dispatch(memoRemoveRequest(id, index));
        },
        memoStarRequest: (id, index) => {
            return dispatch(memoStarRequest(id, index));
        }
    };
};

Comment.PropTypes = {
    username: React.PropTypes.string
};

Comment.defaultProps = {
    username: undefined
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
