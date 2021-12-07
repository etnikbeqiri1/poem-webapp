import {get, post} from '../api_help';


export async function getProducts(){
     return await get('http://localhost:8000/api/user/products');
}

export async function addProduct(data){
     return await post('http://localhost:8000/api/user/product',data);
}


export async function getProductsByCategory(data){
     return await post('http://localhost:8000/api/user/products/category',data);
}




