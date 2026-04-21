import { Inngest } from "inngest";

// Inngest is no longer needed for authentication (switched from Clerk to JWT)
// This file is kept for future event-based functionality if needed

export const inngest = new Inngest({ id: "ecommerce-app" });

// Export empty functions array - no Clerk webhooks needed
export const functions = [];
