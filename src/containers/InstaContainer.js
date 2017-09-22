import React from 'react';
import { Insta } from 'components';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { getInstaList } from 'actions/insta';
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

// import { getInstaPost } from '../services/insta';

class InstaContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        return this.props.getInstaList().then(
            () => {
                if(this.props.status === "SUCCESS") {
                    console.log("success insta:");
                    return true;
                }else{
                    return false;
                }

            });

        }




    render() {
        return (
            <Container>
                <Insta data={this.props.instaData}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.insta.list.status,
        instaData: state.insta.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getInstaList: () => {
            return dispatch(getInstaList());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(InstaContainer);
