var id = windowID;
document.body.innerHTML = "loading...";


setTimeout(function() {

var title = "outways_window_id_"+windowID;
var elem = window.parent.document.getElementById(title);

title += "_"

elem.innerHTML += "<div class='content'><div class='addressBar'><input id='"+title+"address' class=address placeholder='address bar'><button onclick=\"document.getElementById('"+title+"webcontent').src = document.getElementById('"+title+"address').value;document.getElementById('"+title+"webcontent').addEventListener('permissionrequest', function(e) {if (e.permission === 'fullscreen') {e.request.allow();} if (e.permission === 'pointerLock') {e.request.allow();}});\">Search</button></div><webview id='"+title+"webcontent' class='webcontent' src='http://arizotaz.com'></webview></div><style>head,body{width:100%;height:100%;padding:0;margin:0;}.content {width:100%;height:100%;display:flex;flex-direction:column;}.addressBar {display:flex;width:100%;height:30px;}.address{flex:1;}.webcontent{flex:1;width:100%;}</style>";

elem.childNodes[1].remove();

},1000);