var access = false;
try {
  window.parent;
  access = true;
} catch(e){}

if (access) {
window.parent.fs.writeFile('C:/outways/data/users/'+window.parent.outways_username+'/desktop/test.txt',window.parent.generateString(12345678910));
} else {
  document.body.innerHTML = "This app requires file access";
}