import api from './axios';

export const getAllCategories =()=>{
    return api.get('/customer/categories')
}

