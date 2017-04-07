import React from 'react';
import { Authentication } from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import { browserHistory } from 'react-router';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(
            () => {
                // alert("status:"+this.props.status);
                if(this.props.status === "SUCCESS") {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };
                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));
                    browserHistory.push('/');
                    return true;
                } else {
                    return false;
                }
            }
        );
    }

    render() {
        return (
                <Authentication mode={true} onLogin={this.handleLogin}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);