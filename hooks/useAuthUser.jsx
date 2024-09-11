import { useGlobalContext } from "@/contexts/GlobalContext";
import { router } from "expo-router";
import { useEffect } from "react";

const useAuthUser = () => {
    let { user, isLogin, setUser, setIsLogin } = useGlobalContext();

    useEffect(() => {
        if (user || isLogin) {
            return router.push("/home")
        }
    }, [user, isLogin])

    return {
        user,
        isLogin,
        setUser,
        setIsLogin
    }
}


export default useAuthUser;