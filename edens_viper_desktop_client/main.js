const { app, BrowserWindow, Menu, shell, session, dialog } = require('electron');
const path = require('path');

const CHAT_URL = 'https://chat-666.onrender.com/';
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#080808',
    title: "Eden's Viper Chat",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(CHAT_URL)) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    const allowed = url.startsWith(CHAT_URL);
    if (!allowed) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadFile('offline.html');
  });

  mainWindow.loadURL(CHAT_URL);
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback, details) => {
    const allowedOrigin = details.requestingUrl && details.requestingUrl.startsWith(CHAT_URL);
    const allowedPermissions = new Set(['media', 'microphone', 'camera', 'notifications']);
    callback(Boolean(allowedOrigin && allowedPermissions.has(permission)));
  });

  const template = [
    {
      label: 'Chat',
      submenu: [
        { label: 'Reload Chat', accelerator: 'CmdOrCtrl+R', click: () => mainWindow?.loadURL(CHAT_URL) },
        { label: 'Open in Browser', click: () => shell.openExternal(CHAT_URL) },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'About', click: () => dialog.showMessageBox({
          type: 'info',
          title: "About Eden's Viper Chat",
          message: "Eden's Viper Chat",
          detail: `Desktop client connected to ${CHAT_URL}\nVersion ${app.getVersion()}`
        }) }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
