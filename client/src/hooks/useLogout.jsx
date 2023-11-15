import useAuthContext from "./useAuthContext";

function useLogout() {

    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('id');

        dispatch({ type: 'LOGOUT' });
    }

    return { logout }
}

export default useLogout;