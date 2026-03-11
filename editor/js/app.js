var editorInicial;
var editorTeste;

function initEditors() {
  editorInicial = CodeMirror.fromTextArea(document.getElementById("codigoInicial"), {
    mode: "text/x-meupia",
    theme: "material-darker",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete"
    }
  });

  editorTeste = CodeMirror.fromTextArea(document.getElementById("codigoTeste"), {
    mode: "text/x-meupia",
    theme: "material-darker",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete"
    }
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

document.getElementById("previewBtn").addEventListener("click", function() {
  var descricao = document.querySelector("#descricao").value;
  var preview = document.querySelector("#preview");
  
  if (descricao.trim()) {
    preview.innerHTML = marked(descricao);
    preview.classList.remove("hidden");
  } else {
    preview.classList.add("hidden");
  }
});

function loadJsonFile(callback) {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  
  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function(event) {
      try {
        var dados = JSON.parse(event.target.result);

        if (dados.id) document.querySelector("#id").value = dados.id;
        if (dados.titulo) document.querySelector("#titulo").value = dados.titulo;
        if (dados.descricao) document.querySelector("#descricao").value = dados.descricao;
        
        if (dados.codigoInicial) {
          var codigo = dados.codigoInicial.replace(/\\n/g, "\n");
          editorInicial.setValue(codigo);
        }
        
        if (dados.codigoTeste) {
          var codigo = dados.codigoTeste.replace(/\\n/g, "\n");
          editorTeste.setValue(codigo);
        }

        if (dados.mapa) {
          sessionStorage.setItem("mapa", JSON.stringify(dados.mapa));
        }

        callback && callback();
      } catch (err) {
        showStatus("Erro ao processar JSON: " + err.message, "error");
      }
    };
    reader.readAsText(file);
  };

  input.click();
}

document.getElementById("openJson").addEventListener("click", function() {
  loadJsonFile(function() {
    showStatus("Arquivo aberto com sucesso!", "success");
  });
});

document.getElementById("importJson").addEventListener("click", function() {
  loadJsonFile(function() {
    showStatus("JSON importado com sucesso!", "success");
  });
});

document.getElementById("exportJson").addEventListener("click", function() {
  var dados = {};
  
  var id = document.querySelector("#id").value.trim();
  if (id) dados.id = id;

  var titulo = document.querySelector("#titulo").value.trim();
  if (titulo) dados.titulo = titulo;

  var descricao = document.querySelector("#descricao").value.trim();
  if (descricao) dados.descricao = descricao;

  var codigoInicial = editorInicial.getValue();
  if (codigoInicial) dados.codigoInicial = codigoInicial.replace(/\n/g, "\\n");

  var codigoTeste = editorTeste.getValue();
  if (codigoTeste) dados.codigoTeste = codigoTeste.replace(/\n/g, "\\n");

  var mapa = sessionStorage.getItem("mapa");
  if (mapa) dados.mapa = JSON.parse(mapa);

  var json = JSON.stringify(dados, null, 2);
  var blob = new Blob([json], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  
  var a = document.createElement("a");
  a.href = url;
  a.download = (id || "desafio") + ".json";
  a.click();
  
  URL.revokeObjectURL(url);
  showStatus("JSON exportado com sucesso!", "success");
});

document.getElementById("editMapa").addEventListener("click", function() {
  var dadosAtuais = {
    id: document.querySelector("#id").value,
    titulo: document.querySelector("#titulo").value,
    descricao: document.querySelector("#descricao").value,
    codigoInicial: editorInicial.getValue(),
    codigoTeste: editorTeste.getValue(),
    mapa: sessionStorage.getItem("mapa")
  };
  
  sessionStorage.setItem("currentData", JSON.stringify(dadosAtuais));
  window.location.href = "mapa.html";
});

function restoreData() {
  var dados = sessionStorage.getItem("currentData");
  if (!dados) return;

  var o = JSON.parse(dados);
  
  if (o.id) document.querySelector("#id").value = o.id;
  if (o.titulo) document.querySelector("#titulo").value = o.titulo;
  if (o.descricao) document.querySelector("#descricao").value = o.descricao;
  if (o.codigoInicial) editorInicial.setValue(o.codigoInicial);
  if (o.codigoTeste) editorTeste.setValue(o.codigoTeste);
  if (o.mapa) sessionStorage.setItem("mapa", o.mapa);

  sessionStorage.removeItem("currentData");
}

window.addEventListener("DOMContentLoaded", function() {
  initEditors();
  restoreData();
});
