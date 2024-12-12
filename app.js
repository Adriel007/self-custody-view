const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const dataFilePath = path.join(__dirname, "data.json");
let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        width: 800,
        height: 600,
        webPreferences: {
          contextIsolation: true,
          nodeIntegration: false,
        },
      });
      mainWindow.loadFile("index.html");
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function readData() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify(
        {
          language: "en",
          firstLogin: true,
          wallets: [],
        },
        null,
        2
      )
    );
  }
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
}

function writeData(newData) {
  const currentData = readData();
  const updatedData = { ...currentData, ...newData };
  fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));
  return updatedData;
}

ipcMain.handle("get-data", async () => {
  return readData();
});

ipcMain.handle("set-data", async (event, newData) => {
  return writeData(newData);
});
