import {get, post} from '../api_help';


export async function getProfile(){
     return await get("http://localhost:8000/api/user/address");
}

export async function setUserAddress(data){
     return await post("http://localhost:8000/api/user/address",data);
}

export async function getBank(data){
     return await get("http://localhost:8000/api/user/bank");
}

export async function updateBank(data){
     return await post("http://localhost:8000/api/user/bank",data);
}


