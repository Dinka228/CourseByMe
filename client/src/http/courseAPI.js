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
export const createUserCourse = async(userId,courseId)=>{
    const {data} = await $authHost.post(`api/course/${userId}/${courseId}`)
    return data
}
export const fetchUserCourse = async(userId,courseId)=>{
    const {data} = await $host.get(`api/course/${userId}/${courseId}`)
    return data
}
export const addUserSertify = async(userId,courseId)=>{
    const {data} = await $host.post(`api/course/getCertificate/${userId}/${courseId}`)
    return data
}
export const fetchUserSertify = async(userId)=>{
    const {data} = await $host.get(`api/certificate/${userId}`)
    return data
}