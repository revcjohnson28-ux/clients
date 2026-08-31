const { contextBridge } = require('electron');
contextBridge.exposeInMainWorld('edensViperDesktop', {
  platform: process.platform,
  isDesktopClient: true
});
