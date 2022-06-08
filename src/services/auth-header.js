import AuthService from "./auth.service"
export default function authHeader() {
  const jwt = JSON.parse(AuthService.getJwt());
  if (jwt) {
    return { Authorization: 'Bearer ' + jwt.access_token };
  }else{
    return "";
  }
}
