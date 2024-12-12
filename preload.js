const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getData: async () => ipcRenderer.invoke("get-data"),
  setData: async (data) => ipcRenderer.invoke("set-data", data),
});
