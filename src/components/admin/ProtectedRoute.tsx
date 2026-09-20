import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/admin/AdminLayout';

type RoleGateProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

function RoleGate({ children, requireAdmin }: RoleGateProps) {
  const { session, loading, role, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-amber-500" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!role) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
          <p className="text-muted-foreground mt-2">
            You do not have access to this panel.
          </p>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGate>{children}</RoleGate>;
}

export function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGate requireAdmin>{children}</RoleGate>;
}
