import { useAuth } from "./AuthProvider";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

function ProtectedPage({ children }) {
    const { user, loading } = useAuth();
    if (loading) {
        return <Spinner />;
    } else if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedPage;