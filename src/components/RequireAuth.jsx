import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function RequireAuth({ children }) {
  const { user, loading } = useSelector((state) => state.user);
  if (loading) {
    return <div>loading...</div>;
  }

  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
