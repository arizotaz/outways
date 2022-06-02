document.body.innerHTML = "<style>button {width:200px;}</style><div align=center><button onclick='close();'>Close Outways</button><button onclick='restart()'>Restart Outways</button><br><br><button onclick='reboot()'>Restart System</button><button onclick='exit()'>Exit System</button></div>";
function close() {
  window.parent.closeOutways();
}
function restart() {
  window.parent.setTimeout(function(){command("run /outways/run");},500);
  window.parent.closeOutways();
}
function reboot() {
  window.parent.chrome.runtime.reload();
}
function exit() {
  window.parent.closeOutways();
  window.parent.command("exit");
}
