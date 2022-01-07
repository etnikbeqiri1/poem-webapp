import {get, post} from '../api_help';


export async function getOrders(){
     return await get('http://localhost:8000/api/user/orders');
}

export async function getOrdersByName(data){
     return await post('http://localhost:8000/api/user/orders/name',data);
}

export async function addOrder(data){
     return await post('http://localhost:8000/api/user/order/new',data);
}




