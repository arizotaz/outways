var fileIconData = window.parent.fs.readFile('C:/outways/bin/icon.png');
var folderIconData = window.parent.fs.readFile('C:/outways/bin/folder.png');
document.body.innerHTML = "<style>html,body{margin:0;padding:0;width:100%;height:100%;}#context{width:100%;height:100%;display:flex;flex-direction:column;}#topBar{width:100%;height:20px;}#files{width:100%;flex: 1;background-color:rgb(200,200,200);}.icon{width:50px;height:50px;background-size:contain;background-repeat:no-repeat;background-position:center;}.file{background-image:url('"+fileIconData+"');}.folder{background-image:url('"+folderIconData+"');}.fileIcon{padding:10px;text-align:center;max-width:50px;display:inline-block;}</style><div id=context><div id=topBar><button onclick=\"backDirectory();\">Back</button><button onclick=\"viewDirectory = '"+homeFolder+"';renderDirectory();\">Home Folder</button><button onclick=\"viewDirectory = 'C:/';renderDirectory();\">Root</button><button onclick=\"createFolder();\">Create Folder</button><button onclick=\"createFile();\">Create File</button><button onclick=\"pasteFile();\">Paste</button></div><div id=files></div></div>";
//window.parent.fs.writeFile("C:/thistest.txt","Hello");
document.body.addEventListener("contextmenu", function(e){e.preventDefault();});

var viewDirectory = "C:/outways/bin/";
var lastDirectory = "";
var files = [];
var openFile = "";
for (var i = 0; i < args.length; i++) {
  if (args[i].startsWith("-file=")) {
    viewDirectory = args[i].split("=")[1];
    if (!viewDirectory.endsWith("/")) {
      viewDirectory += "/";
    }
  }
}
var fileIcons = [];
var fileContentMenu = [];
var lastFilesLength = -1;
function renderDirectory() {
  if (viewDirectory != lastDirectory) {
    lastDirectory = viewDirectory;
    lastFilesLength = -1;
    fileIcons = [];
  }
  files = [];
  var _files = window.parent.fs.listFiles(viewDirectory);
  for(var i = 0; i < _files.length; i++) {
    var fileName = _files[i];
    fileName = fileName.substring(1,fileName.length);
    var fileLocation = viewDirectory;
    var type = "file";
    if (_files[i].charAt(0) == "d") {
      type = "folder";
    }
    files.push({location:fileLocation,name:fileName,type:type});
  }
  if (files.length != lastFilesLength) {
    fileContentMenu = [];
    lastFilesLength = files.length;
    document.getElementById('files').innerHTML = "";
    for (var i = 0; i < files.length; i++) {
      if (files[i].type == "folder") {
        document.getElementById('files').innerHTML += "<div class=fileIcon oncontextmenu=\"contentMenu("+i+")\"><div class='icon folder' ondblclick=\"viewDirectory += '"+files[i].name+"/';renderDirectory();\"></div><div style='font-size:12px;width:50px;height:26px;max-height:26px;overflow:auto;'>"+files[i].name+"</div></div>"
        fileContentMenu[i] = "<button onclick=\"var move = prompt('File Name','"+files[i].name+"');if (move != null && move != '') {fs.moveFile('"+viewDirectory+files[i].name+"','"+viewDirectory+"'+move);}\">Rename</button><button onclick=\"window.parent.outways_copyFile_location = '"+viewDirectory+files[i].name+"';\">Copy</button><button onclick=\"fs.removeDirectory('"+viewDirectory+files[i].name+"')\">Delete</button>";
      }
    }
    for (var i = 0; i < files.length; i++) {
      if (files[i].type == "file") {
        if (fileIcons[files[i].location+"/"+files[i].name] == null) {
          fileIcons[files[i].location+"/"+files[i].name] = "";
          if (window.parent.fs.size(files[i].location+"/"+files[i].name) < 1500000) {
            var fileDat = window.parent.fs.readFile(files[i].location+"/"+files[i].name);
            if (fileDat != null && fileDat.startsWith("data:image")) {
              fileIcons[files[i].location+"/"+files[i].name] = "style=\"background-image:url('"+fileDat+"');\"";
            }
          }
        }
        document.getElementById('files').innerHTML += "<div class=fileIcon oncontextmenu=\"contentMenu("+i+")\"><div class='icon file' "+fileIcons[files[i].location+"/"+files[i].name]+" ondblclick=\"window.parent.outways_openFile('"+files[i].location+"','"+files[i].name+"','"+files[i].type+"');\"></div><div style='font-size:12px;width:50px;height:26px;max-height:26px;overflow:auto;'>"+files[i].name+"</div></div>"
        var addedContext = "";
        var ext = files[i].name.toLowerCase();
        if (ext.endsWith(".png") || ext.endsWith(".jpg") || ext.endsWith(".jpeg") || ext.endsWith(".gif") || ext.endsWith(".webp") || ext.endsWith(".mp4") || ext.endsWith(".mov")) {
          addedContext += "<button onclick=\"window.parent.fs.copyFile('"+viewDirectory+files[i].name+"','C:/outways/data/users/"+window.parent.outways_username+"/.settings/desktopBackground');window.parent.updateDesktopWallpaper();\">Set Wallpaper</button>";

        }
        fileContentMenu[i] = addedContext+"<button onclick=\"var move = prompt('File Name','"+files[i].name+"');if (move != null && move != '') {fs.moveFile('"+viewDirectory+files[i].name+"','"+viewDirectory+"'+move);}\">Rename</button><button onclick=\"window.parent.outways_copyFile_location = '"+viewDirectory+files[i].name+"';\">Copy</button><button onclick=\"fs.removeDirectory('"+viewDirectory+files[i].name+"')\">Delete</button>";
        //window.parent.rightClickMenu(\"<button 'onclick=fs.removeDirectory(\'C:/outways/data/users/Dog12312/desktop/folder/test.txt\');'>Delete</button>\");
      }
    }
  }

}
renderDirectory();
setInterval(renderDirectory,1000);

function contentMenu(i) {
  window.parent.rightClickMenu(fileContentMenu[i]);
}

function backDirectory() {
  var dir = viewDirectory.split("/");
  var _dir = "";
  for (var i = 0; i < dir.length-2; i++) {
    _dir += dir[i] + "/";
  }
  console.log(_dir);
  viewDirectory = _dir;
  renderDirectory();
}
function createFile() {
  var file = prompt('Enter file name and extension');
  if (file != null && file != "") {
    window.parent.fs.writeFile(viewDirectory+file,'');
    window.parent.renderFiles();
    renderDirectory();
  }
}
function createFolder() {
  var file = prompt('Enter folder name');
  if (file != null && file != "") {
    window.parent.fs.createDirectory(viewDirectory+file);
    window.parent.renderFiles();
    renderDirectory();
  }
}


function pasteFile() {
  if (window.parent.outways_copyFile_location != "") {
    if (window.parent.fs.exists(window.parent.outways_copyFile_location)) {
      var dir = window.parent.outways_copyFile_location;
      if (dir.endsWith("/")) {
        dir = dir.substring(0,dir.length-1);
      }
      dir = dir.split("/");
      var fileName = dir[dir.length-1];
      if (window.parent.fs.exists(viewDirectory+fileName)) {
        if (confirm(fileName + ' already exists, would you like to override it.')) {
          window.parent.fs.copyFile(window.parent.outways_copyFile_location,viewDirectory+fileName);
        }
      } else {
        window.parent.fs.copyFile(window.parent.outways_copyFile_location,viewDirectory+fileName);
      }
      renderDirectory();
    } else {
      alert("Failed to copy: the file has been moved");
      window.parent.outways_copyFile_location = "";
    }
  } else {
    alert("No file selected to copy");
  }
}
