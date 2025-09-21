// Simple audit logger (wire to App Insights later)
export function audit(event: string, details: Record<string, unknown>) {
  // Keep logs in prod for now; you can gate with NODE_ENV if desired
  console.log(`[AUDIT] ${event}`, JSON.stringify(details));
}
