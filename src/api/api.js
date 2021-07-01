import axios from "axios";

function get(method, uri, mSucess = null, mError = null, params = {}) {
  axios({ method: method, url: uri, params: params }).then(
    result => {
      if (mSucess != null) mSucess(result);
    },
    error => {
      console.error(error);
      if (mError != null) mError(error);
    }
  );
}
// axios.get("https://api.npms.io/v2/search?q=vue")
//     .then(response => this.totalVuePackages = response.data.total);
function getWithToken(uri, mSucess = null, mError = null, token){
  let headers = { 
    "token": token
  };
  axios.get(uri, {headers})
  .then(function(response) {
    if (mSucess != null) mSucess(response);
  })
  .catch(function(error) {
    if (mError != null) mError(error);
  });
}

function postWithToken(uri, mSucess = null, mError = null, params = {}, token) {
  let headers = { 
    "token": token
  };
  axios
    .post(uri, params, {headers})
    .then(function(response) {
      if (mSucess != null) mSucess(response);
    })
    .catch(function(error) {
      if (mError != null) mError(error);
    });
}
function post(uri, mSucess = null, mError = null, params = {}) {
  axios
    .post(uri, params)
    .then(function(response) {
      if (mSucess != null) mSucess(response);
    })
    .catch(function(error) {
      if (mError != null) mError(error);
    });
}

function postFile(uri, formData, mSucess = null, mError = null) {
  let config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  axios
    .post(uri, formData, config)
    .then(res => {
      if (mSucess != null) mSucess(res);
    })
    .catch(err => {
      if (mError != null) mError(err);
    });
}

export default {
  getMajors(mSetMajor) {
    get("GET", "/api/parttime/majors", mSetMajor);
  },
  getMajorsByName(mSetMajor, majorName) {
    get("GET", "/api/parttime/search", mSetMajor, undefined, {
      major: majorName
    });
  },

  getProvinces(mSetProvinces) {
    get("GET", "/api/parttime/provinces", mSetProvinces, undefined, undefined);
  },

  getSchoolsByProvince(mSetSchools, provinceName) {
    get("GET", "/api/parttime/schools", mSetSchools, undefined, {
      province: provinceName
    });
  },

  getStudents(mSetStudents, queryParams) {
    post("/api/parttime/filter", mSetStudents, undefined, queryParams);
  },

  getStudent(mSetStudents, queryParams){
    get("GET", "/api/parttime/detail", mSetStudents, undefined, queryParams);
  },

  addStudent(mSuccess, mError, student) {
    post("/api/parttime/add", mSuccess, mError, student);
  },
  addStudentImage(formData, mSuccess, mError) {
    postFile("/aliyun/upload/graduate_info", formData, mSuccess, mError);
  },

  getNotices(mSetNotices) {
    get("GET", "/api/parttime/nums", mSetNotices);
  },

  getStudentByRandom(mSetStudents) {
    get("GET", "/api/parttime/random", mSetStudents);
  },

  getBuyRecords(mSuccess, mError, queryParams){
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvRm9SbTVfSk16MHE5eXZJa2ZKWUVCTGVXTmZjIiwidHlwZSI6IjQifQ.39PcMhyHz3j6F6cj1JaPkFg3RTkoy5j7GnSdCPXdNc7d1Kbvhw_pIQ2KtIDSMPUDklcvwNIJqSX6LFwVbNO6fw"
    postWithToken("/bigflow/boss/v1.0/wechat/card/buy/products", mSuccess, mError, queryParams,token)
  },
  getCardInfos(mSuccess, mError){
    let token = "eyJhbGciOiJIUzUxMiJ9.eyJvcGVuSWQiOiJvRm9SbTVfSk16MHE5eXZJa2ZKWUVCTGVXTmZjIiwidHlwZSI6IjQifQ.39PcMhyHz3j6F6cj1JaPkFg3RTkoy5j7GnSdCPXdNc7d1Kbvhw_pIQ2KtIDSMPUDklcvwNIJqSX6LFwVbNO6fw"
    getWithToken("/bigflow/boss/v1.0/wechat/user/cards", mSuccess, mError, token)
  }
};
