import {$authHost,$host} from "./index";
import jwt_decode from 'jwt-decode'

export const createCourse = async(course)=>{
    const {data} = await $authHost.post('api/course',course)
    return data
}
export const fetchCourse = async()=>{
    const {data} = await $host.get('api/course')
    return data
}
export const fetchOneCourse = async(id)=>{
    const {data} = await $authHost.get(`api/course/${id}`)
    return data
}