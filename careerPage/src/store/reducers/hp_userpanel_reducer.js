import {updateObject} from "../utility";
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    applicant_id:8,//2
    error: false,
    applicant_fName:{},
    applicant_lName:null,
    applicant_gender:null,
    applicant_contactNo:null,
    applicant_workExperience:null,
    applicant_skills:null,
    applicant_imgUrl:null,
    applicant_bio:null,
    applicant_userName:null,
    applicant_email:null,
    image_url:null

};

const get_applicant_id = (state, action) => {
     // console.log(action.applicant_id);
    return updateObject( state, {
        applicant_id:action.applicant_id,
        error: false
    } );

};


const get_image_url = (state, action) => {
     console.log(action.img_url);
    return updateObject( state, {
        image_url:action.img_url,

        error: false
    } );

};
const get_applicant_detail = (state, action) => {
     // console.log(action.applicant_fName);
    return updateObject( state,{
        applicant_fName:action.applicant_fName,
        applicant_lName:action.applicant_lName,
        applicant_gender:action.applicant_gender,
        applicant_contactNo:action.applicant_contactNo,
        applicant_workExperience:action.applicant_workExperience,
        applicant_skills:action.applicant_skills,
        applicant_imgUrl:action.applicant_imgUrl,
        applicant_bio:action.applicant_bio,
        applicant_userName:action.applicant_userName,
        applicant_email:action.applicant_email,
        error: false
    } );

};
const hp_userpanel_reducer = (state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_APPLICANT_ID: return get_applicant_id(state, action);
        case actionTypes.GET_APPLICANT_DETAILS: return get_applicant_detail(state, action);
        case actionTypes.GET_IMAGE_URL: return get_image_url(state, action);
        default: return state;
    }
};

export default hp_userpanel_reducer;