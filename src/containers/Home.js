import React from 'react';
import { Comment, InstaContainer } from 'containers';
import { Write } from 'components';
import { Sidebar, Container, Divider, Segment, Button, Icon } from 'semantic-ui-react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
         };

        this.toggleVisibillity = this.toggleVisibillity.bind(this);



    }

    toggleVisibillity() {
        this.setState({ visible : !this.state.visible })
    };





    render() {
        const { visible } = this.state
        return (
            <div className="page main-page">
                <Button onClick={this.toggleVisibillity} icon className="btn-comment" color='black'>
                    <Icon name='talk outline'/> Comment
                </Button>
                <Sidebar.Pushable className="wrapper">
                    <Sidebar
                    id="Commentview"
                    className="commentView"
                    animation='overlay'
                    width='wide'
                    direction='right'
                    visible={visible}
                    >
                        {this.state.visible ? <Comment/> : undefined }

                    </Sidebar>
                    <Sidebar.Pusher dimmed={visible}>
                        <div className="homeView">
                            <div id="Main">
                                <Main/>
                            </div>
                            <div id="Service"></div>
                            <div id="About">
                                <About/>
                            </div>
                            <div id="Instagram">
                                <InstaContainer/>
                            </div>
                            <div id="Work">
                                <Works/>
                            </div>
                            <div id="Massage">
                                {this.props.currentUser == "admin" ? <Message/> : undefined }
                            </div>
                            <div id="contact">
                                <Contact/>
                            </div>
                        </div>

                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

class Main extends React.Component {
    render() {
        return(
                <Container>
                    <div className="main-text">
                        <div className="slogun">INTO THE UNIVERSE</div>
                        <p>The universe is Giant, Web is too.<br />But I want to put very important ding in the &#123; universe &#125;</p>
                    </div>
                </Container>
            )
    }
}

class About extends React.Component {
    render() {
        return(
                <Container>
                    <div className="title">About me</div>
                </Container>
            )
    }
}

class Works extends React.Component {
    render() {
        return(
                <Container>
                    <div className="title">Works</div>
                </Container>
            )
    }
}

class Message extends React.Component {
    render() {
        return(
                <Container>
                    <div className="title">Ground Control to Major Tommy!</div>
                    <Write/>
                </Container>
            )
    }
}

class Contact extends React.Component {
    render() {
        return(
                <Container>
                    <div className="title">Contact</div>
                </Container>
            )
    }
}



export default Home;
