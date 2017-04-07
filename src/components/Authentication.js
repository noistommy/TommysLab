import React from 'react';
import { Link } from 'react-router';
import { Grid, Header, Form, Segment, Input, Button, Message } from 'semantic-ui-react';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleLogin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin(id, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onRegister(id, pw).then(
            (result) => {
                if(!result) {
                    this.setState({
                        username: '',
                        password: ''
                    });
                }
            }
        );
    }

    handleKeyPress(e) {
        if(e.charCode==13) {
            if(this.props.mode) {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        }
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    handleSubmit(e) {
         return false;
    }
    render() {
        const inputBoxes = (
            <div className="textbox">
                <Form.Field>
                    <Input fluid icon='user' iconPosition='left' placeholder="username"
                    type='text'
                    name="username"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.username}/>
                </Form.Field>
                <Form.Field>
                    <Input fluid icon='lock' iconPosition='left' placeholder="password"
                    type='password'
                    name="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress}/>
                </Form.Field>
            </div>

        )
        const loginView = (
            <div className="login">
                <Segment raised>
                    {inputBoxes}
                    <Form.Field>
                        <Button fluid color='teal' size='large' onClick={this.handleLogin}>LOGIN</Button>
                    </Form.Field>
                </Segment>
                <Message>New to us? <Link to="/register"> Sign up</Link></Message>
            </div>

        );

        const registerView = (
            <div className="register">
                <Segment stacked>
                    {inputBoxes}
                    <Button fluid color='teal' size='large' onClick={this.handleRegister}>REGISTER</Button>
                </Segment>
            </div>
        );
        return (
            <Grid centered verticalAlign='middle' className="signview">
                <Grid.Column>
                    <Header as='h2' color="teal" textAlign="center">{this.props.mode ? "LOGIN" : "REGISTER"}</Header>
                    { this.props.mode ? loginView : registerView }
                </Grid.Column>
            </Grid>
        );
    }
}

Authentication.propTypes = {
    mode: React.PropTypes.bool,
    onLogin: React.PropTypes.func,
    onRegister: React.PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined"); },
    onRegister: (id, pw) => { console.error("register function not defined"); }
};

export default Authentication;
