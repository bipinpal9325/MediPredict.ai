import { Navigate, useLocation } from 'react-router';
import { useFeatureAccess } from '../utils/featureAccess';
import { FeatureType } from '../utils/subscription';
import { Loader } from 'lucide-react';

interface FeatureGuardProps {
  featureId: FeatureType;
  children: React.ReactNode;
}

export default function FeatureGuard({ featureId, children }: FeatureGuardProps) {
  const { isLoaded, canAccessFeature } = useFeatureAccess();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Route protection logic
  if (!canAccessFeature(featureId)) {
    // Redirect to pricing and pass the intended destination
    return <Navigate to="/pricing" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}