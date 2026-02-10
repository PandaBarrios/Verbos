const verbos = [
  { esp: "ir", past: "went" },
  { esp: "comer", past: "ate" },
  { esp: "ver", past: "saw" },
  { esp: "tener", past: "had" },
  { esp: "hacer", past: "did" },

  { esp: "preguntar", past: "asked" },
  { esp: "reír", past: "laughed" },
  { esp: "mirar", past: "looked" },
  { esp: "extrañar", past: "missed" },
  { esp: "recoger", past: "picked" },
  { esp: "pasar", past: "passed" },
  { esp: "colocar", past: "placed" },
  { esp: "detener", past: "stopped" },
  { esp: "lavar", past: "washed" },
  { esp: "trabajar", past: "worked" },

  { esp: "quemar", past: "burned" },
  { esp: "limpiar", past: "cleaned" },
  { esp: "llenar", past: "filled" },
  { esp: "seguir", past: "followed" },
  { esp: "vivir", past: "lived" },
  { esp: "amar", past: "loved" },
  { esp: "quedarse", past: "stayed" },
  { esp: "llover", past: "rained" },
  { esp: "mirar fijamente", past: "stared" },
  { esp: "estudiar", past: "studied" },

  { esp: "agregar", past: "added" },
  { esp: "contar", past: "counted" },
  { esp: "terminar", past: "ended" },
  { esp: "doblar", past: "folded" },
  { esp: "cazar", past: "hunted" },
  { esp: "necesitar", past: "needed" },
  { esp: "imprimir", past: "printed" },
  { esp: "sonar", past: "sounded" },
  { esp: "empezar", past: "started" },
  { esp: "querer", past: "wanted" }
];

let actual;

function siguiente() {
  document.getElementById("resultado").innerText = "";
  document.getElementById("respuesta").value = "";

  actual = verbos[Math.floor(Math.random() * verbos.length)];
  document.getElementById("verbo").innerText = actual.esp;
}

function verificar() {
  const r = document.getElementById("respuesta").value
              .toLowerCase()
              .trim();

  if (r === actual.past) {
    document.getElementById("resultado").innerText = "✅ Correcto";
  } else {
    document.getElementById("resultado").innerText =
      "❌ Era: " + actual.past;
  }
}

siguiente();
