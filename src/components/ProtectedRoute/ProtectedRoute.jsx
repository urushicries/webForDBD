import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../../utils/authStore';

export default function ProtectedRoute({ children, adminOnly = false }) {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
