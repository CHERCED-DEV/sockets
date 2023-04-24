"use strict";

var socket = io.connect();
/**
 * create a new note
 * @param {string} title a title for a new note
 * @param {string} description a description for a new note
 */

var saveNote = function saveNote(title, description) {
  socket.emit("client:newnote", {
    title: title,
    description: description
  });
};
/**
 * delete a note based on an Id
 * @param {string} id a note ID
 */


var deleteNote = function deleteNote(id) {
  socket.emit("client:deletenote", id);
};
/**
 * 
 * @param {string} id note ID
 * @param {string} title note title 
 * @param {string} description note description
 */


var updateNote = function updateNote(id, title, description) {
  socket.emit("client:updatenote", {
    id: id,
    title: title,
    description: description
  });
};

socket.on("server:loadnotes", renderNotes);
socket.on("server:newnote", appendNote);
socket.on("server:selectednote", function (note) {
  var title = document.getElementById("title");
  var description = document.getElementById("description");
  title.value = note.title;
  description.value = note.description;
  savedId = note.id;
});