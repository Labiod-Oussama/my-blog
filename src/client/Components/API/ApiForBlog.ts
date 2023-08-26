import { serverAddress } from "../Global/Config"

export const getAllBlogs = async () => {
    const response = await fetch(`https://my-blogs-eqye.onrender.com/getBlogs`, {
        method: 'get'
    })
    const json = await response.json();
    return json
}
export const getOneBlog = async (blogID: string) => {
    const response = await fetch(`${serverAddress}/OneBlog/${blogID}`, {
        method: 'get'
    })
    const json = await response.json();
    return {
        json,
        ok: response.ok,
        status: response.status
    }
}