"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const buffer = require("buffer");
const icon = path.join(__dirname, "../../resources/icon.png");
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoURL);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
const UsersSchema = mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true
    },
    PassWord: {
      type: String,
      required: true
    }
  }
);
const Users = mongoose.model("Users", UsersSchema);
const GetUsers = async () => {
  try {
    return await Users.find();
  } catch (error) {
    console.log("error from GetUsers:", error);
  }
};
const AuthUser = async (user) => {
  try {
    const foundUser = await Users.findOne({
      UserName: user.UserName
    });
    if (!foundUser || foundUser.PassWord !== user.password) {
      return { success: false };
    }
    return {
      success: true,
      user: {
        id: foundUser._id.toString(),
        username: foundUser.UserName
      }
    };
  } catch (error) {
    console.log("error from AuthUser:", error);
    return { success: false };
  }
};
const ConversationSchema = mongoose.Schema(
  {
    Date: {
      type: String
    },
    CompanyNames: {
      type: String
    },
    Sector: {
      type: String
    },
    ConversationOwner: {
      type: String
    },
    isAcademicJoined: {
      type: Boolean
    },
    AcademicName: {
      type: String
    },
    isProtocolSigned: {
      type: Boolean
    },
    isContractSigned: {
      type: Boolean
    },
    ContractType: {
      type: String
    },
    isArge: {
      type: Boolean
    },
    isArgeBackStatus: {
      type: Boolean
    },
    isSurdurulebilirlik: {
      type: Boolean
    },
    ACCOUNT: {
      type: String
    }
  }
);
const Conversations = mongoose.model("Conversations", ConversationSchema);
const GetConversations = async () => {
  try {
    return await Conversations.find().lean();
  } catch (error) {
    console.log("error from SearchUser:", error);
  }
};
const SearchConversations = async (query) => {
  try {
    return await Conversations.find(query).lean();
  } catch (error) {
    console.log("error from SearchUser:", error);
  }
};
const SetConversation = async (data) => {
  try {
    const newData = { ...data };
    delete newData.isNew;
    delete newData.CompanyNames;
    if (!data.isNew) {
      await Conversations.findOneAndUpdate(
        { CompanyNames: data.CompanyNames },
        { $set: newData }
      );
    } else {
      const newConversation = new Conversations(newData);
      await newConversation.save();
    }
    return true;
  } catch (error) {
    console.log("error from SearchUser:", error);
    return false;
  }
};
const GetSelectors = async () => {
  const Data = {
    Akademiks: [],
    Companies: [],
    DealType: [],
    Users: [],
    Sektor: []
  };
  try {
    const AllData = await GetConversations();
    const AllUsers = await GetUsers();
    AllData.forEach((e) => {
      Data.Akademiks.push(e.AcademicName);
      Data.Companies.push(e.CompanyNames);
      Data.DealType.push(e.ContractType);
      Data.Sektor.push(e.Sector);
    });
    AllUsers.forEach((e) => {
      Data.Users.push(e.UserName);
    });
    console.log("fetched everything successfully");
    return Data;
  } catch (error) {
    console.log("error from SearchUser:", error);
    return Data;
  }
};
const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});
const Todo = mongoose.model("Todo", TodoSchema);
const cleanTodoForIPC = (todo) => {
  if (!todo) return null;
  const cleanedTodo = todo.toObject();
  return {
    ...cleanedTodo,
    _id: cleanedTodo._id.toString(),
    userId: cleanedTodo.userId?._id ? {
      _id: cleanedTodo.userId._id.toString(),
      UserName: cleanedTodo.userId.UserName
    } : cleanedTodo.userId
  };
};
const CreateTodo = async (todoData) => {
  try {
    const todo = new Todo({
      description: todoData.description,
      deadline: todoData.deadline,
      userId: new mongoose.Types.ObjectId(todoData.userId),
      completed: false
    });
    const savedTodo = await todo.save();
    const populatedTodo = await savedTodo.populate("userId", "UserName");
    return cleanTodoForIPC(populatedTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};
const GetUserTodos = async () => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 }).populate("userId", "UserName");
    return todos.map(cleanTodoForIPC);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};
const UpdateTodoStatus = async (todoId, completed) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { completed },
      { new: true }
    ).populate("userId", "UserName");
    return cleanTodoForIPC(todo);
  } catch (error) {
    console.error("Error updating todo status:", error);
    return null;
  }
};
const DeleteTodo = async (todoId) => {
  try {
    const objectId = typeof todoId === "string" ? new mongoose.Types.ObjectId(todoId) : todoId;
    const result = await Todo.findByIdAndDelete(objectId);
    return !!result;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
};
const getTodoForDate = async (year, month) => {
  try {
    const todos = await Todo.find().lean();
    if (!Array.isArray(todos)) {
      console.error("Beklenmeyen veri formatı:", todos);
      return [];
    }
    const filteredTodos = todos.filter((todo) => {
      const todoDate = todo.deadline.toISOString();
      return todoDate.split("-")[0] === year && todoDate.split("-")[1] === month;
    });
    return filteredTodos;
  } catch (error) {
    console.error("Error filtering todos:", error);
    return [];
  }
};
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    icon,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false,
      devTools: false
    }
  });
  electron.globalShortcut.register("Ctrl+Shift+I", () => {
    console.log("İPiniz kaydedilmiştir");
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(async () => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
  electron.ipcMain.on("ping", () => console.log("pong"));
  electron.ipcMain.handle("Auth", async (event, data) => {
    console.log(data);
    return await AuthUser(data);
  });
  electron.ipcMain.handle("Filter", async (event, data) => {
    console.log(data);
    return await SearchConversations(data);
  });
  electron.ipcMain.handle("SetConversation", async (event, data) => {
    console.log(data);
    return await SetConversation(data);
  });
  electron.ipcMain.handle("GetSelectors", async (event, data) => {
    console.log(data);
    return await GetSelectors();
  });
  electron.ipcMain.handle("GetAkademisyenler", async (event, data) => {
    const List = await GetConversations();
    const Data = List.map((e) => {
      return e.AcademicName;
    });
    console.log(Data);
    const ReturnList = Data.map((e, index) => {
      let elements = [];
      for (let index1 = 0; index1 < index; index1++) {
        elements.push(Data[index1]);
      }
      if (!elements.includes(e)) {
        return e;
      }
    });
    console.log("----------\n", ReturnList);
    return ReturnList;
  });
  electron.ipcMain.handle("GetFilter", async (event, data) => {
    const List = await GetConversations();
    const Data = {
      akademisyenSozlesme: 0,
      totalSozlesme: 0,
      totalProtokol: 0,
      totalGorevlendirme: 0
    };
    let filteredContracts = [];
    if (data.AcademicName !== "") {
      filteredContracts = List.filter((conversation) => {
        const conversationDate = conversation.Date;
        console.log(conversationDate);
        return conversationDate.split("-")[0] === data.year && conversationDate.split("-")[1] === data.month && // Aylar 0 bazlı olduğu için +1 eklenir
        conversation.isAcademicJoined === true && // Akademisyen katılmış mı?
        conversation.isContractSigned === true && // Sözleşme imzalanmamış mı?
        conversation.AcademicName === data.AcademicName;
      });
    }
    const totalSozlesme = await SearchConversations({
      isContractSigned: true
    });
    const totalProtokol = await SearchConversations({
      isProtocolSigned: true
    });
    console.log(data);
    const totalGorevlendirme = await getTodoForDate(data.year, data.month);
    Data.totalGorevlendirme = totalGorevlendirme.length;
    Data.totalProtokol = totalProtokol.length;
    Data.totalSozlesme = totalSozlesme.length;
    Data.akademisyenSozlesme = filteredContracts.length;
    return Data;
  });
  electron.ipcMain.handle("CreateTodo", async (event, data) => {
    console.log("Creating todo:", data);
    return await CreateTodo(data);
  });
  electron.ipcMain.handle("GetUserTodos", async (event, userId) => {
    console.log("Fetching todos for user:", userId);
    return await GetUserTodos();
  });
  electron.ipcMain.handle("UpdateTodoStatus", async (event, { todoId, completed }) => {
    console.log("Updating todo status:", todoId, completed);
    return await UpdateTodoStatus(todoId, completed);
  });
  electron.ipcMain.handle("DeleteTodo", async (event, todoId) => {
    console.log("Deleting todo:", todoId);
    return await DeleteTodo(todoId);
  });
  electron.ipcMain.handle("PDF", async (event, data) => {
    try {
      console.log(" i got it");
      const Data = buffer.Buffer.from(data);
      const date = /* @__PURE__ */ new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const savingPath = path.join(electron.app.getPath("downloads"), `Rapor-${year}-${month}.pdf`);
      fs.writeFileSync(savingPath, Data);
      console.log("başarlı");
      return true;
    } catch (error) {
      console.log("didnt ave the file");
      return false;
    }
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
