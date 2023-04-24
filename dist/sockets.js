"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uuid = require("uuid");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var notes = [];

var _default = function _default(io) {
  io.on("connection", function (socket) {
    // console.log(socket.handshake.url);
    console.log("nuevo socket connectado:", socket.id); // Send all messages to the client

    socket.emit("server:loadnotes", notes);
    socket.on("client:newnote", function (newNote) {
      var note = _objectSpread(_objectSpread({}, newNote), {}, {
        id: (0, _uuid.v4)()
      });

      notes.push(note);
      io.emit("server:newnote", note);
    });
    socket.on("client:deletenote", function (noteId) {
      console.log(noteId);
      notes = notes.filter(function (note) {
        return note.id !== noteId;
      });
      io.emit("server:loadnotes", notes);
    });
    socket.on("client:getnote", function (noteId) {
      var note = notes.find(function (note) {
        return note.id === noteId;
      });
      socket.emit("server:selectednote", note);
    });
    socket.on("client:updatenote", function (updatedNote) {
      notes = notes.map(function (note) {
        if (note.id === updatedNote.id) {
          note.title = updatedNote.title;
          note.description = updatedNote.description;
        }

        return note;
      });
      io.emit("server:loadnotes", notes);
    });
    socket.on("disconnect", function () {
      console.log(socket.id, "disconnected");
    });
  });
};

exports["default"] = _default;