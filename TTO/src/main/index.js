import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import connectDB from './Backend/DB/ConnectDB'
import { AuthUser, CreateAcccount } from './Backend/Services/UsersService.js'
import { SearchConversations, SetConversation ,GetSelectors} from "./Backend/Services/ConversationsService.js"
import { CreateTodo, GetUserTodos, UpdateTodoStatus, DeleteTodo} from "./Backend/Services/TodoService.js"
import path from 'path'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: icon,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: true
    }
  })


  //bu şey için istedin shortcutı düzenlemek yada görev atamak.
  globalShortcut.register('Ctrl+Shift+I', () => {
    console.log('İPiniz kaydedilmiştir');
  });




  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }

  //------------------------------------------------------------------------Selçuk burda route tanımları .handle kullanımı frontend invoke kullanılır ordan gelen veri data parametresine gelir return kullanrak ta response yapabilirsin ve yapmak zorundasın frontend bekliyor çünkü

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle("Auth", async (event, data) => {
    console.log(data);
    return await AuthUser(data);
  })

  ipcMain.handle("Filter", async (event, data) => {
    console.log(data);
    return await SearchConversations(data);
  })

  ipcMain.handle("SetConversation", async (event, data) => {
    console.log(data);
    return await SetConversation(data);
  })


  ipcMain.handle("GetSelectors", async (event, data) => {
    console.log(data);
    return await GetSelectors()
  })

 

  // Todo handlers
  ipcMain.handle("CreateTodo", async (event, data) => {
    console.log('Creating todo:', data);
    return await CreateTodo(data);
  })

  ipcMain.handle("GetUserTodos", async (event, userId) => {
    console.log('Fetching todos for user:', userId);
    return await GetUserTodos(userId);
  })

  ipcMain.handle("UpdateTodoStatus", async (event, { todoId, completed }) => {
    console.log('Updating todo status:', todoId, completed);
    return await UpdateTodoStatus(todoId, completed);
  })

  ipcMain.handle("DeleteTodo", async (event, todoId) => {
    console.log('Deleting todo:', todoId);
    return await DeleteTodo(todoId);
  })

  //---------------------------------------------------------------------------

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.