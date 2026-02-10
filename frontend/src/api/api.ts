import api from "./axios";

export function loginUser(email: string, password: string){
    return api.post('/api/auth/login',{email,password});
}

export function registerUser(name: string, email: string, password: string){
    return api.post('/api/auth/register',{name,email,password});
}