import { createContext, useContext, useEffect, useState } from "react";
import axios from '@/lib/axios';
import { router } from "expo-router";
import { getItem, setItem } from "expo-secure-store";

const GlobalContext = createContext();
const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    let [isLogin, setIsLogin] = useState(false);

    let getCurrentUser = async (token) => {
        token = token ?? await getItem("token");
        try {
            if (token) {
                console.log('getting user with token', token)
                setItem("token", token);
                let res = await axios.get('/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(res.data, 'res')
                if (res.status === 200) {
                    setUser(res.data)
                    setIsLogin(true);
                    router.replace('/home')
                }
            } else {
                setIsLogin(false);
                router.navigate('/')
            }
        } catch (e) {
            console.log(e)
            if (e.status === 401) {
                setIsLogin(false);
                router.navigate('/')
            }
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <GlobalContext.Provider value={{ user, isLogin, setUser, setIsLogin, getCurrentUser }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { useGlobalContext, GlobalContextProvider }