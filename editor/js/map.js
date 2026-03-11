var editorMapa;

function initEditor() {
  editorMapa = CodeMirror.fromTextArea(document.getElementById("mapa"), {
    mode: "application/json",
    theme: "material-darker",
    lineNumbers: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    lineWrapping: true
  });
}

function showStatus(message, type) {
  var status = document.getElementById("status");
  status.textContent = message;
  status.className = "status " + type;
  setTimeout(function() {
    status.className = "status";
  }, 3000);
}

document.getElementById("importMapa").addEventListener("click", function() {
  try {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    
    input.onchange = function(e) {
      var file = e.target.files[0];
      if (!file) return;

      var reader = new FileReader();
      reader.onload = function(event) {
        try {
          JSON.parse(event.target.result);
          editorMapa.setValue(event.target.result);
          showStatus("Mapa importado com sucesso!", "success");
        } catch (err) {
          showStatus("JSON inválido: " + err.message, "error");
        }
      };
      reader.readAsText(file);
    };

    input.click();
  } catch (err) {
    showStatus("Erro ao importar: " + err.message, "error");
  }
});

document.getElementById("saveMapa").addEventListener("click", function() {
  try {
    var mapaText = editorMapa.getValue().trim();
    
    if (mapaText) {
      JSON.parse(mapaText);
      sessionStorage.setItem("mapa", mapaText);
    }
    
    window.location.href = "index.html";
  } catch (err) {
    showStatus("JSON inválido: " + err.message, "error");
  }
});

window.addEventListener("DOMContentLoaded", function() {
  initEditor();
  
  var mapa = sessionStorage.getItem("mapa");
  if (mapa) {
    try {
      var parsed = JSON.parse(mapa);
      editorMapa.setValue(JSON.stringify(parsed, null, 2));
    } catch {
      editorMapa.setValue(mapa);
    }
  }
});
