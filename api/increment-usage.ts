// For Vercel Serverless Functions
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clerkClient } from '@clerk/clerk-sdk-node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, plan } = req.body;

    if (!userId || !plan) {
      return res.status(400).json({ error: "Missing userId or plan" });
    }

    // Update the user's metadata in Clerk
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        plan: plan, // 'premium' or 'free'
      }
    });

    return res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("Error updating plan:", error);
    return res.status(500).json({ error: "Failed to update plan" });
  }
}