import axios from "axios";
export const getUser = async(URL,data,method) =>{
    try {
        if(method === "GET"){
            const res = await axios(URL);
            return res.data;
        }else{
            const res = await axios({
                method: method,
                url: URL,
                data: 
                { 
                email: data.email, 
                password: data.password
                }
            })
            return res.data;
        }
    } catch (error) {
        throw Error ("el error fue en getfetch ", error);
    }
}
export const getFeeds = async(URL,data,method) =>{
    try {
        if(method === "GET"){
            const res = await axios(URL);
            return res.data;
        }else{
            const res = await axios({
                method: method,
                url: URL,
                data: 
                { 
                    userId: data.userId,
                    image: data.image,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    status: data.status,
                    payment: data.payment,
                }
            })
            return res.data;
        }
    } catch (error) {
        throw Error ("el error fue en getfetch ", error);
    }
}
export const removeFeeds = async(URL,data,method) =>{
    try {
        const res = await axios({
            method: method,
            url: URL,
            data: 
            { 
                feedId: data.feedId,
                userId: data.userId,
            }
        })
        return res.data;
    } catch (error) {
        throw Error ("el error fue en getfetch ", error);
    }
}
export const putFeeds = async(URL,data,method) =>{
    try {
        const res = await axios({
            method: method,
            url: URL,
            data: 
            { 
                feedId: data.feedId,
                userId: data.userId,
                image: data.image,
                title: data.title,
                description: data.description,
                price: data.price,
                status: data.status,
                payment: data.payment,
            }
        })
        return res.data;
    } catch (error) {
        throw Error ("el error fue en getfetch ", error);
    }
}
