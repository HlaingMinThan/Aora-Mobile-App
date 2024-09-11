import { useGlobalContext } from "@/contexts/GlobalContext";
import { router } from "expo-router";
import { useEffect } from "react";

const useAuthUser = () => {
    let { user, isLogin } = useGlobalContext();

    useEffect(() => {
        if (user || isLogin) {
            return router.push("/home")
        }
    }, [user, isLogin])

    return {
        user,
        isLogin
    }
}


export default useAuthUser;