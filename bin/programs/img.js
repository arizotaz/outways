document.body.innerHTML = "<style>html,body{margin:0;padding:0;width:100%;height:100%;}#context{width:100%;height:100%;background-position:center;background-repeat:no-repeat;background-size:contain;}</style><div id=context></div>";
//window.parent.fs.writeFile("C:/thistest.txt","Hello");
console.log(windowID);
console.log(args);
var openFile = "";
for (var i = 0; i < args.length; i++) {
  if (args[i].startsWith("-file=")) {
    openFile = args[i].split("=")[1];
  }
}
if (window.parent.fs.exists(openFile)) {
  document.getElementById('context').style.backgroundImage = "url('"+window.parent.fs.readFile(openFile)+"')";
} else {
  window.parent.closeWindow(windowID);
}
