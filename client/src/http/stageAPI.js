import {$authHost,$host} from "./index";
import jwt_decode from 'jwt-decode'

export const createStage = async(stage)=>{
    const {data} = await $authHost.post('api/stage',stage)
    return data
}
export const fetchStages = async(id)=>{
    const {data} = await $host.get(`api/stage/${id}`)
    return data
}