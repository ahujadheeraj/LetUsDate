let socket = io();
socket.on("connected", () => {
  console.log("Connected " + socket.id);
  socket.emit("user", {
    user: $.trim(currentuser.text())
  });
});

let like = $(".like-btn");
let superlike = $(".superlike-btn");
let block = $(".block-btn");
let currentuser = $("#currentUser");
//    let consideruser = $("#considerUser")
let nBox = $("#notifications");
let nlist = $("#notification-list");
let user = "";

like.click(function() {
  console.log("=========" + currentuser.text());
  let consideruser = $(this)
    .parent()
    .parent()
    .attr("id");
    console.log(consideruser)
  consideruser = consideruser.split("@")[0];
  console.log(consideruser);
  socket.emit("like", {
    user: currentuser.text(),
    cuser: consideruser,
    message: currentuser.text() + "like you " + consideruser + "  "
  });
});

superlike.click(function() {
    console.log("=========" + currentuser.text());
    let consideruser = $(this)
      .parent()
      .parent()
      .attr("id");
    console.log(consideruser)
    consideruser = consideruser.split("@")[0];
    console.log(consideruser);
    socket.emit("superlike", {
      user: currentuser.text(),
      cuser: consideruser,
      message: currentuser.text() + "superlike you " + consideruser +"  "
    });
});

block.click(function() {
    $(this)
        .parent()
        .parent().parent().hide()
    console.log("=========" + currentuser.text());
    let consideruser = $(this)
      .parent()
      .parent()
      .attr("id");
    console.log(consideruser)
    consideruser = consideruser.split("@")[0];
    console.log(consideruser);
    socket.emit("block", {
      user: currentuser.text(),
      cuser: consideruser,
      message: currentuser.text() + "block you " + consideruser
    });
});

socket.on('like_msg', function (data) {
    nlist.append($('<li>'+ data.message + '</li>'))
})

socket.on('superlike_msg', function (data) {
    nlist.append('<li>' + data.message + '<img src=' + data.image + 'height="40px" width="42px">'+'</li>')
})

socket.on('block_msg', function (data) {

    nlist.append($('<li>' + data.user + ': ' + data.message + '</li>'))
})