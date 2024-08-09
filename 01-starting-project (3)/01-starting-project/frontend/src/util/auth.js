import { redirect } from "react-router-dom";

export function getTokenDuration(){
    const storedExpiration = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpiration);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export default function getToken(){
    const token = localStorage.getItem('token');

    if(!token){
        return null;
    }

    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0){
        return 'EXPIRED'
    }
    return token;
}

export function isTokenAvailable(){
    return getToken();
}

export function checkAuthToken(){
    const token = getToken();

    if(!token){
     return redirect('/auth')
    }
}

