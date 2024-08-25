import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";

const RequireAuth = () => {
    const dispatch = useDispatch();
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.access_token
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;