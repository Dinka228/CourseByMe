import {$authHost,$host} from "./index";
import jwt_decode from 'jwt-decode'

export const createTask = async(task)=>{
    const {data} = await $authHost.post('api/task',task)
    return data
}
export const fetchTasks = async(id)=>{
    const {data} = await $host.get(`api/task/${id}`)
    return data
}
export const fetchCompleteTasks = async(id)=>{
    const {data} = await $host.get(`api/task/complete/${id}`)
    return data
}