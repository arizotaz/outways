window.parent.windowSize(windowID,200,50)

var dat = "";

dat = "<input placeholder=\"URL\" id=\"downloadURL\" style=\"width:200px\"><br><button onclick='download();'>Download</button>";

function download() {
  var url = document.getElementById('downloadURL').value;
  var filename = url.split("/")[url.split("/").length-1];
  dat = "Downloading " + url;
  document.body.innerHTML = dat;
  window.parent.fs.download(url,"C:/outways/data/users/"+window.parent.outways_username+"/desktop/"+filename);
  var downloadInterval = setInterval(function() {
    if (window.parent.fs.downloads() <= 0) {
      clearInterval(downloadInterval);
      window.parent.closeWindow(windowID);
    }
  },1000);
}


document.body.innerHTML = dat;