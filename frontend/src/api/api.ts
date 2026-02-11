import api from "./axios";

export function loginUser(email: string, password: string){
    return api.post('/api/auth/login',{email,password});
}

export function registerUser(name: string, email: string, password: string){
    return api.post('/api/auth/register',{name,email,password});
}

export function getMe(){
    return api.get('/api/auth/me');
}

export function logOutUser(){
    return api.post('/api/auth/logout');
}

export function getTransactions(){
    return api.get('/api/transaction/');
}

export function addTransaction(data: FormData){
    return api.post('/api/transaction/',data);
}

export function deleteTransaction(id:string){
    return api.delete(`/api/transaction/${id}`);
}

export function updateTransaction(id:string, data: FormData){
    return api.put(`/api/transaction/${id}`,data);
}