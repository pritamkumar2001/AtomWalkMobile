import { authAxios } from "./httpMethod";
import { profileInfoURL, companyInfoURL, } from "../constants";

export function getProfileInfo() {
    // console.log('getProfileInfo')
    return authAxios(profileInfoURL)
}

export function getCompanyInfo() {
    return authAxios(companyInfoURL)
}