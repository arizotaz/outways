document.body.innerHTML = "<style>html,body{margin:0;padding:0;width:100%;height:100%;}#context{width:100%;height:100%;display:flex;flex-direction:column;}#topBar{width:100%;height:20px;}#fileContent{width:100%;flex: 1;}</style><div id=context><div id=topBar><button onclick='save()'>Save</button><button onclick='change()'>Change Location</button></div><textarea id=fileContent></textarea></div>";
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
  document.getElementById('fileContent').value = window.parent.fs.readFile(openFile);
}
function save() {
  window.parent.fs.writeFile(openFile,document.getElementById('fileContent').value);
  window.parent.closeWindow(windowID);
}
function change() {

}
