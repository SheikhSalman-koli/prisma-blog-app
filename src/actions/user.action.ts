'use server'

import { userServices } from "../services/user.services"

export const getUserInfo = async ()=>{
    return await userServices.getSession()
}