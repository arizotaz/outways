var openFile = "";
for (var i = 0; i < args.length; i++) {
  if (args[i].startsWith("-file=")) {
    openFile = args[i].split("=")[1];
  }
}

var infoText = "";
var pkgData;
var waitingForDownload = true;
var startedDownload = false;
var downloadDone = false;
var installLocation = "C/outways/data/program_files/";
try {
  pkgData = JSON.parse(window.parent.fs.readFile(openFile));
  if (pkgData['version'] == null) {
    pkgData['version'] = "0.1";
  }
  infoText += "Do you want to install "+pkgData['name']+" V"+pkgData['version']+"<br>Created by "+pkgData['author']+"<br><br>";

  infoText += "<br>This application will download and create "+pkgData["content"].length+" files<br><br>"

  infoText += "<button onclick='install()'>Yes</button><button onclick='window.parent.closeWindow(windowID)'>No</button>";
} catch(e) {
  infoText = "There was an error parsing the pkg file<br><br>" + e.toString();
}
document.body.innerHTML = infoText;

var launchFile = "";
var launchDir = "";

function install() {
  try {
    startedDownload = true;
    var files = pkgData["content"];
    installLocation = "C:/outways/data/program_files/"+pkgData['id']+"/";

    if (pkgData["bootFile"] != null && pkgData["bootFile"] != "") {
      launchFile = pkgData["bootFile"];
      launchDir = installLocation + pkgData["bootDir"];
    }


    for (var i = 0; i < files.length; i++) {
      var location = "C:/";
      var file = files[i];
      var dir = installLocation+file.location;
      dir = dir.split("/");
      for (var d = 0; d < dir.length-1; d++) {
        if (dir[d] != "" && dir[d] != "C:" && dir[d] != "c:") {
          location += dir[d]+"/";
          window.parent.fs.createDirectory(location);
        }
      }
      window.parent.fs.download(file.url,installLocation+file.location);
    }
    window.parent.fs.writeFile(installLocation+"package",JSON.stringify(pkgData));
  } catch (e) {
    startedDownload = false;
    infoText = "There was an error downloading the software<br><br>" + e.toString();
  }
}
setInterval(function() {
  if (startedDownload) {
    if (window.parent.fs.downloads() <= 0) {
      downloadDone = true;
    } else {
      infoText = window.parent.fs.downloads()+" file downloads remaining";
      waitingForDownload = false;
    }
    if (downloadDone && !waitingForDownload) {
      infoText = pkgData['name'] + " has Been Installed";
      startedDownload = false;
      window.parent.updateDockApps();
      if (launchFile == "") {
        setTimeout(function() {window.parent.closeWindow(windowID);},5000);
      } else {
        infoText += "<br><br><button onclick=\"window.parent.outways_openFile(launchDir,launchFile,'file');window.parent.closeWindow(windowID);\">Launch</button><button onclick='window.parent.closeWindow(windowID)'>Close Window</button>"
      }
      document.body.innerHTML = infoText;
    }
    document.body.innerHTML = infoText;
  }

},20);
