import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getUser, getFeeds, removeFeeds,putFeeds } from "../helpers/getFetch";
const URL = "http://localhost:3001";

export const AuthContext = createContext();
export default function AuthProvider({children}) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [feeds, setFeeds] = useState([]);
    const [response, setResponse] = useState(true)
    const history = useHistory();

    useEffect(() => {
        try {
            localStorage.setItem("user",JSON.stringify(user))
        } catch (error) {
            localStorage.removeItem("user");
        }
    }, [user])

    const logIn = (data, fromLocation) => {
        let reqURL = `${URL}/user/login`;
        getUser(reqURL,data, 'POST')
        .then(validate =>{
            if(!validate.hasOwnProperty("errorMessage")){
                setUser(validate);
                let url = `${URL}/feeds?user=${validate.user.id}`
                getFeeds(url,null,'GET')
                .then(data =>{
                    setFeeds(data);
                })
            }else if(user === null){
                setResponse(false)
            }
            if(fromLocation) history.push(fromLocation);
        })
        .catch(error =>{
            throw Error ("hubo un error en get User", error)
        })

    }
    const logOut = () => {
        setResponse(true);
        setUser(null);
        localStorage.clear();
    }
    const createFeed = (data) =>{
        let resURL = `${URL}/feeds`;
        getFeeds(resURL,data,'POST')
        .then(data => {
            setFeeds(data.feeds);
        })
        .catch(error =>{
            setFeeds([])
            throw Error("Hubo un error en createdFeed",error)
        })
    }
    const deleteFeed = (data) =>{
        let resURL = `${URL}/feeds`;
        removeFeeds(resURL,data,'DELETE')
        .then(data => {
            setFeeds(data.feeds);
        })
        .catch(error =>{
            setFeeds([])
            throw Error("Hubo un error en deleteFeed",error)
        })

    }
    const updateFeed = (data)=>{
        let resURL = `${URL}/feeds`;
        putFeeds(resURL,data,'PUT')
        .then(data => {
            setFeeds(data.feeds);
        })
        .catch(error =>{
            setFeeds([])
            throw Error("Hubo un error en createdFeed",error)
        })
    }
    const contextValue = {
        user,
        feeds,
        response,
        logIn,
        logOut,
        createFeed,
        deleteFeed,
        updateFeed,
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
