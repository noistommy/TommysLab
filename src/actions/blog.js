import {
    BLOG_POST,
    BLOG_POST_SUCCESS,
    BLOG_POST_FAILURE
} from './ActionTypes';
import axios from 'axios';


/* BLOG POST */
export function blogPostRequest(file, title, content) {
    return (dispatch) => {
        // to be implemented
        dispatch(blogPost());

        return axios.post('/api/blog/', { file, title, content })
        .then((response) => {
            dispatch(blogPostSuccess());
        }).catch((error) => {
            dispatch(blogPostFailure(error.response.data.code));
        });
    };
}

export function blogPost() {
    return {
        type: BLOG_POST
    };
}

export function blogPostSuccess() {
    return {
        type: BLOG_POST_SUCCESS
    };
}

export function blogPostFailure(error) {
    return {
        type: BLOG_POST_FAILURE,
        error
    };
}
