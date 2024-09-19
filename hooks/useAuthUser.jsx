import { useGlobalContext } from "@/contexts/GlobalContext";

const useAuthUser = () => {
    let { user, isLogin, setUser, setIsLogin, getCurrentUser } = useGlobalContext();

    return {
        user,
        isLogin,
        setUser,
        setIsLogin,
        getCurrentUser
    }
}


export default useAuthUser;