document.body.innerHTML = "<style>button {width:200px;}</style><div align=center><button onclick='window.parent.closeOutways();'>Close Outways</button><button onclick=\"window.parent.command('run /outways/run')\">Restart Outways</button><br><br><button onclick='window.parent.chrome.runtime.reload();'>Restart System</button><button onclick=\"window.parent.command('exit');\">Exit System</button></div>";