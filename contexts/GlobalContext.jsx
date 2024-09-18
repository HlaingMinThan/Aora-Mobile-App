import { createContext, useContext, useEffect, useState } from "react";
import axios from '@/lib/axios';
import { router } from "expo-router";

const GlobalContext = createContext();
const useGlobalContext = () => useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
    let [user, setUser] = useState(null);
    let [isLogin, setIsLogin] = useState(false);

    let getCurrentUser = async () => {
        try {
            let res = await axios.get('/api/auth/user');
            console.log(res.data, 'res')
            if (res.status === 200) {
                setUser(res.data)
                setIsLogin(true);
                router.replace('/home')
            }
        } catch (e) {
            if (e.status === 401) {
                setIsLogin(false);
                router.navigate('/')
            }
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [isLogin])

    return (
        <GlobalContext.Provider value={{ user, isLogin, setUser, setIsLogin }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { useGlobalContext, GlobalContextProvider }