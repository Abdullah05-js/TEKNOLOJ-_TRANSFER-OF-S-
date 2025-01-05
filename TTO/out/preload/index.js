"use strict";
const { contextBridge, ipcRenderer } = require("electron");
const { electronAPI } = require("@electron-toolkit/preload");
const api = {};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", {
      ipcRenderer: {
        ...electronAPI.ipcRenderer,
        send: (channel, data) => {
          ipcRenderer.send(channel, data);
        },
        invoke: (channel, data) => {
          return ipcRenderer.invoke(channel, data);
        }
      }
    });
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = {
    ipcRenderer: {
      ...electronAPI.ipcRenderer,
      send: (channel, data) => {
        ipcRenderer.send(channel, data);
      },
      invoke: (channel, data) => {
        return ipcRenderer.invoke(channel, data);
      }
    }
  };
  window.api = api;
}
