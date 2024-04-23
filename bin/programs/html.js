console.log(windowID);
console.log(args);
var openFile = "";
for (var i = 0; i < args.length; i++) {
  if (args[i].startsWith("-file=")) {
    openFile = args[i].split("=")[1];
  }
}
if (window.parent.fs.exists(openFile)) {
  document.body.innerHTML = window.parent.fs.readFile(openFile);
} else {
  document.body.innerHTML = "Error Reading the File";
}