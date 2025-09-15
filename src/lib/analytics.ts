export function initAnalytics() {
const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.GA_MEASUREMENT_ID;
if (!id) return;
// Hook for your analytics provider; left minimal for privacy
// Example: inject gtag script here if needed
}