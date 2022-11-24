import {$authHost,$host} from "./index";
import jwt_decode from 'jwt-decode'

export const createVariant = async(variant)=>{
    const {data} = await $authHost.post('api/variant',variant)
    return data
}
export const fetchVariants = async(id)=>{
    const {data} = await $host.get(`api/variant/${id}`)
    return data
}
export const checkCorrect = async(id)=>{
    const {data} = await $host.post(`api/variant/${id}`)
    return data
}