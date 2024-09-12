import { useGlobalContext } from "@/contexts/GlobalContext";

const useAuthUser = () => {
    let { user, isLogin, setUser, setIsLogin } = useGlobalContext();

    return {
        user,
        isLogin,
        setUser,
        setIsLogin
    }
}


export default useAuthUser;