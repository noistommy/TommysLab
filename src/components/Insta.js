import React from 'react';
import { InstaItem } from 'components';
import { Segment, Image } from 'semantic-ui-react';

class Insta extends React.Component {
    render() {
        const mapToComponents = data => {
            return data.map((insta, i) => {
                if(insta.type == "image"){
                    return (<InstaItem
                                data={insta}
                                index={i}
                                key={insta.id}
                    />);
                }

            });
        };
        return (
            <div className="insta">
                <Segment>
                    <Image.Group className="memolist">
                        {mapToComponents(this.props.data)}
                    </Image.Group>
                </Segment>

            </div>
        )

    }
};

Insta.propTypes = {
    data: React.PropTypes.array,
};

Insta.defaultProps = {
    data: [],

};
export default Insta;
