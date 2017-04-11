import React from 'react';
import { Insta } from 'components';
import { Container } from 'semantic-ui-react';

// import { getInstaPost } from '../services/insta';

class InstaContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    // componentDidMount() {
	// 	getInstaPost()
    //     .then((instadata) => {
    //         console.log(instadata.data);
    //     });
    // }
    //

    render() {
        return (
            <Container>
                <Insta/>
            </Container>
        );
    }
}

export default InstaContainer;
