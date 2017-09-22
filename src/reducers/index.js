import authentication from './authentication';
import memo from './memo';
import insta from './insta';

import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    memo,
    insta
});
