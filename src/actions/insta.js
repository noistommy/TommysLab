import {
    INSTA_LIST,
    INSTA_LIST_SUCCESS,
    INSTA_LIST_FAILURE
} from './ActionTypes';
import axios from 'axios';



/* INSTA LIST */
export function getInstaList() {
    return (dispatch) => {
        // to be implemented
        dispatch(instaList());

        // return axios.get('/api/insta/')
        return $.ajax({
            url:"https://api.instagram.com/v1/users/self/media/recent?access_token=197987201.a2ce3b4.af945993984b4addac9587b83b321af7",
            dataType: 'jsonp',
            type: 'GET',
            jsonp: "callback",
            jsonpCallback: "jsonpcallback",
            success:function(data){
                console.log("success insta");
            },
            error:function(){
                console.log("ajax error");
            }
        })
        .then((response) => {
            dispatch(instaListSuccess(response.data));
        }).catch((error) => {
            dispatch(instaListFailure(error.response));
        });
    };
}

export function instaList() {
    return {
        type: INSTA_LIST
    };
}

export function instaListSuccess(data) {
    return {
        type: INSTA_LIST_SUCCESS,
        data
    };
}

export function instaListFailure(error) {
    return {
        type: INSTA_LIST_FAILURE,
        error
    };
}
