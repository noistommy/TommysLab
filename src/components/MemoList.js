import React from 'react';
import { Memo } from 'components';
import { Segment, Image, List } from 'semantic-ui-react';

class MemoList extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render() {
        const mapToComponents = data => {
            return data.map((memo, i) => {
                return (<Memo
                            data={memo}
                            ownership={ (memo.writer === this.props.currentUser) }
                            key={memo._id}
                            index={i}
                            onEdit={this.props.onEdit}
                            onRemove={this.props.onRemove}
                            onStar={this.props.onStar}
                            currentUser={this.props.currentUser}
                />);
            });
        };

        return (
            <Segment>
                <List className="memolist">
                    {mapToComponents(this.props.data)}
                </List>
            </Segment>
        );
    }
}

MemoList.propTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes.string,
    onStar: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func
};

MemoList.defaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents) => {
        console.error('edit function not defined');
    },
    onRemove: (id, index) => {
        console.error('remove function not defined');
    },
    onStar: (id, index) => {
        console.error('star function not defined');
    }
};

export default MemoList;
