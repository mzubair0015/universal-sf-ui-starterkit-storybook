const VIEWPORTS = [
  { width: 320, height: 568, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1024, height: 768, name: 'desktop' },
  { width: 1440, height: 900, name: 'large' }
];

const viewportSizes = VIEWPORTS.reduce((acc, viewport) => {
  acc[viewport.name] = { width: viewport.width, height: viewport.height };
  return acc;
}, {});

module.exports = {
  VIEWPORTS,
  viewportSizes
}; 