export function checkInstaUrl(url: string) {
  const pattern = /^(https?\:\/\/)?(www\.)?instagram\.com\/.+$/;
  return pattern.test(url);
}

export function isValidUrl(url: string | URL) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
