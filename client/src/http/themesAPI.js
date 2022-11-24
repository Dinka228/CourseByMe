import {$authHost,$host} from "./index";
import jwt_decode from 'jwt-decode'

export const createTheme = async(name)=>{
    const {data} = await $authHost.post('api/themes',name)
    return data
}
export const fetchThemes = async()=>{
    const {data} = await $host.get('api/themes')
    return data
}