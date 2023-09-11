import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            // console.log(response.data.username);
            return {
                //NOTE: role and accessToken is given from refreshTokenController
                //NOTE: all variables listed below are necessary for the useAuth hook to work
                ...prev,
                email: response.data.email,
                fullName: response.data.fullName,
                userId: response.data.userId,
                role: response.data.role,
                accessToken: response.data.accessToken,
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;