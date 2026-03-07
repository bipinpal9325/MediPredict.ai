// Define scalable plans and features
export type PlanType = 'free' | 'premium' | 'pro' | 'enterprise';
export type FeatureType = 'diabetes' | 'heart_disease' | 'covid' | 'cancer' | 'advanced_analytics';

// Centralized Access Control mapping
export const PLAN_PERMISSIONS: Record<PlanType, FeatureType[]> = {
  free: ['diabetes'],
  premium: ['diabetes', 'heart_disease', 'covid', 'cancer'],
  pro: ['diabetes', 'heart_disease', 'covid', 'cancer', 'advanced_analytics'],
  enterprise: ['diabetes', 'heart_disease', 'covid', 'cancer', 'advanced_analytics']
};

export interface SubscriptionData {
  plan: PlanType;
  subscriptionStatus: 'active' | 'inactive' | 'past_due' | 'canceled';
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
}

/**
 * Validates the user's subscription state.
 * Prevents access if the plan is expired or inactive.
 */
export function validateSubscription(sub: Partial<SubscriptionData> | null | undefined): PlanType {
  // 1. Default to free if no subscription data exists
  if (!sub || !sub.plan || sub.plan === 'free') return 'free';
  
  // 2. Fallback to free if not explicitly active
  if (sub.subscriptionStatus !== 'active') return 'free';

  // 3. Date validation (Payment State Validation)
  if (sub.subscriptionEndDate) {
    const endDate = new Date(sub.subscriptionEndDate);
    const currentDate = new Date();
    
    // If current date passed expiration -> downgrade to free
    if (currentDate > endDate) {
      console.warn("Subscription expired. Downgrading to Free plan.");
      return 'free';
    }
  }

  return sub.plan;
}