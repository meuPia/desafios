/**
 * Sintaxe customizada para CodeMirror 5
 * Baseado em: https://github.com/meuPia/lab/blob/main/src/editor/meupia-lang.js
 */

(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("codemirror"));
  else if (typeof define == "function" && define.amd)
    define(["codemirror"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var keywords = [
    "algoritmo", "var", "inicio", "fim_algoritmo", "se", "entao", "então", "senao", "senão",
    "fim_se", "enquanto", "faca", "faça", "fim_enquanto", "para", "de", "ate", "até", "retorne",
    "passo", "fim_para", "escreva", "leia", "usar", "e", "ou", "nao", "não", "interrompa", "continue", 
    "classe", "metodo", "funcao", "função", "fim_funcao", "fim_função", "novo", "fim_classe",
    "escreva", "mova", "gire", "vire", "pare"
  ];

  var types = [
    "inteiro", "real", "string", "cadeia", "logico", "booleano",
    "fila", "pilha", "heap", "lista", "texto", "numero"
  ];

  var atoms = ["verdadeiro", "falso", "nulo"];

  CodeMirror.defineMode("meupia", function() {
    return {
      startState: function() {
        return { inString: false };
      },
      token: function(stream, state) {
        if (stream.eatSpace()) return null;
        
        // Comments
        if (stream.match(/\/\/.*/)) return "comment";
        
        // Strings
        if (stream.match(/"[^"]*"/)) return "string";
        if (stream.match(/'[^']*'/) || stream.match(/'[^']*$/)) return "string";
        
        // Numbers
        if (stream.match(/\b\d+(\.\d+)?\b/)) return "number";
        
        // Operators
        if (stream.match("<-") || stream.match(/^[+\-*/=<>]+/)) return "operator";
        
        // Words
        if (stream.match(/^[\wÀ-ú]+/)) {
          var word = stream.current().toLowerCase();
          if (keywords.indexOf(word) !== -1) return "keyword";
          if (types.indexOf(word) !== -1) return "type";
          if (atoms.indexOf(word) !== -1) return "atom";
          return "variable";
        }
        
        stream.next();
        return null;
      }
    };
  });

  CodeMirror.defineMIME("text/x-meupia", "meupia");
});
