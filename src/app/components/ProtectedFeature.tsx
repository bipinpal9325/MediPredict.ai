import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';
import { useFeatureAccess } from '../utils/featureAccess';

interface ProtectedFeatureProps {
  featureName: string;
  children: React.ReactNode;
}

export default function ProtectedFeature({ featureName, children }: ProtectedFeatureProps) {
  const { canAccessFeature, checkUsageLimit, isPremium, isLoaded } = useFeatureAccess();

  // Prevent flash-redirects while Clerk loads
  if (!isLoaded) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const hasAccess = canAccessFeature(featureName);
  const underLimit = checkUsageLimit();

  useEffect(() => {
    if (!hasAccess) {
      toast.error('Upgrade Required', {
        description: 'Upgrade to Premium to unlock this feature.',
      });
    } else if (!underLimit && !isPremium) {
      toast.error('Limit Reached', {
        description: 'You have reached your free limit of 10 predictions. Upgrade to Premium.',
      });
    }
  }, [hasAccess, underLimit, isPremium]);

  // Redirect to pricing if access is denied or limit is hit
  if (!hasAccess || (!underLimit && !isPremium)) {
    return <Navigate to="/pricing" replace />;
  }

  return <>{children}</>;
}