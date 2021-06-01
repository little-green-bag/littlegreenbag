export function cleanFileName(s): string {
  let strippedResult = s;
  strippedResult = strippedResult.replace('.jpg', '');
  strippedResult = strippedResult.replace('.png', '');
  strippedResult = strippedResult.replace('.jpeg', '');
  strippedResult = strippedResult.trim();
  return strippedResult;
}