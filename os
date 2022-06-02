<script>
$('#windowContent').load(fs.readFile('C:/OS/console.html',true));
outwaysOSTimer = setInterval(function() {
  if (typeof(command) == "function") {
    command("run /outways/run");
    clearInterval(outwaysOSTimer);
  }

},1);
</script>