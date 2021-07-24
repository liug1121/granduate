import axios from "axios";
import store from "../store";
// function get(method, uri, mSucess = null, mError = null, params = {}) {
//     axios({ method: method, url: uri, params: params }).then(
//       result => {
//         if (mSucess != null) mSucess(result);
//       },
//       error => {
//         console.error(error);
//         if (mError != null) mError(error);
//       }
//     );
//   }

function getWithToken(uri, params, mSucess = null, mError = null, token) {
  if (params == null) params = {};
  console.log("token:" + token);
  let headers = {
    key: token
  };
  axios
    .get(uri, { params, headers })
    .then(function(response) {
      if (mSucess != null) mSucess(response);
    })
    .catch(function(error) {
      if (mError != null) mError(error);
    });
}
function postWithToken(uri, mSucess = null, mError = null, params = {}, token) {
    console.log("token:" + token);
    let headers = {
      token: token,
      "Content-Type": "application/json"
    };
    axios
      .post(uri, params, { headers })
      .then(function(response) {
        if (mSucess != null) mSucess(response);
      })
      .catch(function(error) {
        if (mError != null) mError(error);
      });
  }
export default {
  getUser(params, mSuccess, mError) {
    let token = store.state.positionUser.key;
    console.log("params:" + JSON.stringify(params));
    getWithToken(
      "/car/v1/open/user/pageSubUser.json",
      params,
      mSuccess,
      mError,
      token
    );
  },
  getGroup(params, mSuccess, mError) {
    let token = store.state.positionUser.key;
    getWithToken(
      "/car/v1/open/vehicleGroup/pageBindGroup.json",
      params,
      mSuccess,
      mError,
      token
    );
  },
  getcars(params, mSuccess, mError) {
    let token = store.state.positionUser.key;
    getWithToken(
      "/car/v1/open/vehicle/multi/pageVehicleInfo.json",
      params,
      mSuccess,
      mError,
      token
    );
  },
  modifyCarGroup(params, mSuccess, mError){
      let token = store.state.positionUser.key;
      postWithToken(
          '/car/v1/open/vehicle/base/updateVehicle.json', 
          mSuccess, 
          mError, 
          params, 
          token
      );
  }
};
