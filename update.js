document.body.innerHTML = "A new update is available<br><button onclick='installUpdate()'>Would you like to update now?</button>";
function installUpdate() {
  document.body.innerHTML = "Loading Setup...";
  window.parent.fs.removeDirectory("C:/outways/bin/boot");
  window.parent.fs.removeDirectory("C:/outways/setup");
  window.parent.command('run /outways/run');
}
