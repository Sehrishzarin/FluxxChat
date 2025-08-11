export const getFullImageUrl = (req, filePath) => {
  if (!filePath) return null;
  return `${req.protocol}://${req.get('host')}${filePath}`;
};
