import * as actionTypes from './actionTypes';
import axios from 'axios';



export const get_applicant_id = ( id ) => {
     console.log(id);
    return {
        type: actionTypes.GET_APPLICANT_ID,
        applicant_id:id,

    };
};


export const get_imgurl = ( url ) => {
    console.log(url);
    return {
        type: actionTypes.GET_IMAGE_URL,
        img_url:url,

    };
};

export const get_applicant_details = ( fName,lName,gender,contactNo,workExperience,skills,imgUrl,bio,userName,email ) => {
    // console.log(fName);
    return {
        type: actionTypes.GET_APPLICANT_DETAILS,
        applicant_fName:fName,
        applicant_lName:lName,
        applicant_gender:gender,
        applicant_contactNo:contactNo,
        applicant_workExperience:workExperience,
        applicant_skills:skills,
        applicant_imgUrl:imgUrl,
        applicant_bio:bio,
        applicant_userName:userName,
        applicant_email:email
    };
};