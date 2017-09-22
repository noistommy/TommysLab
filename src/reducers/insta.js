import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    list: {
        status: 'INIT',
        data: []
    }
};

export default function insta(state, action) {
    if(typeof state === "undefined")
        state = initialState;
    switch(action.type) {
        /* LOGIN */
        case types.INSTA_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.INSTA_LIST_SUCCESS:
            return update(state, {
                list: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data }
                }
            });
        case types.INSTA_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            });
        default:
            return state;
    }
}
