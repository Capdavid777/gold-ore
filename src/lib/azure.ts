import { audit } from '@/lib/logger';

export async function getSignedUrl(blobPath: string, userId: string) {
  // Placeholder; replace with backend-issued short-lived SAS
  audit('request_sas', { blobPath, userId });
  const base = process.env.AZURE_STORAGE_ACCOUNT_URL;
  const container = process.env.AZURE_STORAGE_CONTAINER;
  return `${base}/${container}/${blobPath}?sig=demo`;
}

