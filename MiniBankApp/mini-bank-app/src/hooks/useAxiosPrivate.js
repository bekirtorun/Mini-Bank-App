import { useEffect } from "react";
import useAuth from "./useAuth";
import { axiosPrivate } from "../auth/axios";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                let accessToken = auth?.access_token;
                if (!accessToken && localStorage.getItem('access_token')) {
                    accessToken = localStorage.getItem('access_token');
                }
                if (!config.headers['Authorization'] && accessToken) {
                    config.headers['Authorization'] = "Bearer " + accessToken;
                }
                return config;
            }, (error) => Promise.reject(error)
        );



        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    }, [auth]);

    return axiosPrivate;
}

export default useAxiosPrivate;