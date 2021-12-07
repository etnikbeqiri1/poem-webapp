import {get, post} from '../api_help';


export async function getCategories(){
    return await get('http://localhost:8000/api/user/categories');
}
