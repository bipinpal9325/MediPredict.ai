import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { PLAN_PERMISSIONS, validateSubscription, FeatureType, SubscriptionData } from './subscription';

export const PREDICTION_FEATURES: Record<string, FeatureType> = {
  DIABETES: 'diabetes',
  HEART_DISEASE: 'heart_disease',
  COVID: 'covid',
  CANCER: 'cancer',
};

export const FREE_PLAN_LIMIT = 10;

export function useFeatureAccess() {
  const { user, isLoaded } = useUser();
  const [localUsage, setLocalUsage] = useState<number>(0);

  // Extract raw subscription data from user metadata (or DB context)
  const rawSubData = user?.publicMetadata as unknown as Partial<SubscriptionData>;
  
  // Validate the subscription (Checks expiration, status, etc.)
  const activePlan = validateSubscription(rawSubData);
  const isPremium = activePlan === 'premium' || activePlan === 'pro' || activePlan === 'enterprise';

  useEffect(() => {
    if (user?.id && isLoaded) {
      const stored = localStorage.getItem(`usage_${user.id}`);
      if (stored !== null) {
        setLocalUsage(parseInt(stored, 10));
      } else {
        const metadataUsage = (user?.publicMetadata?.usageCount as number) || 0;
        setLocalUsage(metadataUsage);
        localStorage.setItem(`usage_${user.id}`, metadataUsage.toString());
      }
    }
  }, [user?.id, user?.publicMetadata?.usageCount, isLoaded]);

  const usageCount = isPremium ? 0 : localUsage;

  // Dynamic centralized check
  const canAccessFeature = (featureName: FeatureType) => {
    return PLAN_PERMISSIONS[activePlan].includes(featureName);
  };

  const checkUsageLimit = () => {
    if (isPremium) return true;
    return usageCount < FREE_PLAN_LIMIT;
  };

  const incrementUsage = async () => {
    if (isPremium) return; 
    const newUsage = usageCount + 1;
    setLocalUsage(newUsage);
    if (user?.id) localStorage.setItem(`usage_${user.id}`, newUsage.toString());
  };

  return {
    isLoaded,
    canAccessFeature,
    checkUsageLimit,
    incrementUsage,
    usageCount,
    isPremium,
    activePlan
  };
}