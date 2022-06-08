import axios from 'axios';
import authHeader from './auth-header';
import getApiUrl from './auth-config';
const API_URL = getApiUrl();

class UserService {
  
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUser() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getUserByloginName() {
    return axios.get(API_URL + 'app/user-profile', { headers: authHeader() });
  }

  saveUserProfiling(profiling){
    let param = {profiling :  profiling}
    return axios.post(API_URL + 'app/userp' , param , { headers: authHeader() });
  }

  getAllCvs(){
    return axios.get(API_URL + 'app/cvs' ,   { headers: authHeader() });
  }

  createUserCv(dataModel,preference,libelle,template=0){
    let param = {
      "data": dataModel,
      "template": template,
      "preference":preference,
      "libelle":libelle,
      "creationDate":new Date(),
      "lastModification":new Date()
    }
    return axios.post(API_URL + 'app/cv', param , { headers: authHeader() });
  }

  deleteUserCv(id){
    let param = {
      "id": id
    }
    return axios.post(API_URL + 'app/cvd/'+id, param , { headers: authHeader() });
  }

  eidtLibelleCv(id,libelle){
    let param = {
      "id": id,
      "libelle":libelle
    }
    return axios.post(API_URL + 'app/cv_edit_title', param , { headers: authHeader() });
  };

  updateUserCv(dataModel,pref,id,template=0){
    let param = {
      "data": dataModel,
      "preference":pref,
      "template": template
    }
    return axios.post(API_URL + 'app/cvp/'+id, param , { headers: authHeader() });
  }

  getProfillingQuestions(){
    return axios.get(API_URL + 'app/profiling_question?status=1', { headers: authHeader() });
  }


}

export default new UserService();
