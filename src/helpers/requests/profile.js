import {get} from '../api_help';


export async function getProfile(){
     return await get("http://localhost:8000/api/user/address");
}


