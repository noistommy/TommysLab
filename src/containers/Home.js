import React from 'react';
import { Comment, InstaContainer } from 'containers';
import { Container, Divider, Segment } from 'semantic-ui-react';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <div id="Commentview" className="commentView"><Comment/></div>
                <div className="homeView">
                    <Main/>
                    <About/>
                </div>
                <div className="instaView"><InstaContainer/></div>
            </div>
        );
    }
}

class Main extends React.Component {
    render() {
        return(
                <Container>Main Section</Container>
            )
    }
}

class About extends React.Component {
    render() {
        return(
                <Container>About Section</Container>
            )
    }
}



export default Home;
