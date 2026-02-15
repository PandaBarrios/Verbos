const verbos = [
  { esp: "ser/estar", past: "was/were" },
  { esp: "decir", past: "said" },
  { esp: "hacer (crear)", past: "made" },
  { esp: "tomar", past: "took" },
  { esp: "venir", past: "came" },
  { esp: "dar", past: "gave" },
  { esp: "obtener", past: "got" },
  { esp: "saber/conocer", past: "knew" },
  { esp: "pensar", past: "thought" },
  { esp: "sentir", past: "felt" },
  { esp: "encontrar", past: "found" },
  { esp: "dejar", past: "left" },
  { esp: "poner", past: "put" },
  { esp: "traer", past: "brought" },
  { esp: "comenzar", past: "began" },
  { esp: "beber", past: "drank" },
  { esp: "conducir", past: "drove" },
  { esp: "escribir", past: "wrote" },
  { esp: "leer", past: "read" },
  { esp: "dormir", past: "slept" },
  { esp: "hablar", past: "spoke" },
  { esp: "romper", past: "broke" },
  { esp: "elegir", past: "chose" },
  { esp: "caer", past: "fell" },
  { esp: "oír", past: "heard" },
  { esp: "mantener", past: "kept" },
  { esp: "perder", past: "lost" },
  { esp: "pagar", past: "paid" },
  { esp: "correr", past: "ran" },
  { esp: "vender", past: "sold" },
  { esp: "enviar", past: "sent" },
  { esp: "sentarse", past: "sat" },
  { esp: "enseñar", past: "taught" },
  { esp: "entender", past: "understood" },
  { esp: "ganar", past: "won" },
  { esp: "construir", past: "built" },
  { esp: "cortar", past: "cut" },
  { esp: "golpear", past: "hit" },
  { esp: "dejar permitir", past: "let" }
];

let verbosPendientes = [...verbos];
let verbosAciertos = [];
let actual;

function siguiente() {

  if (verbosPendientes.length === 0) {
    document.getElementById("verbo").innerText = "🎉 ¡Completado!";
    actual = null;
    return;
  }

  document.getElementById("resultado").innerText = "";
  document.getElementById("respuesta").value = "";

  
  actual = verbosPendientes[0];

  document.getElementById("verbo").innerText = actual.esp;
}


function verificar() {
  if (!actual) return;

  const r = document.getElementById("respuesta").value
    .toLowerCase()
    .trim();

  const opciones = actual.past.split("/");

  // sacar de la cola (siempre está al frente)
  verbosPendientes.shift();

  if (opciones.includes(r)) {

    document.getElementById("resultado").innerText =
      "✅ Correcto — pasa a dominados";

    hablar(r);

    verbosAciertos.push(actual);
    actualizarLista();

  } else {

    document.getElementById("resultado").innerText =
      "❌ Era: " + actual.past + " — vuelve al final";

    hablar(opciones[0]);

    // 👇 mandar al final de la cola
    verbosPendientes.push(actual);
  }

  siguiente();
}

function actualizarLista() {
  const ul = document.getElementById("listaAciertos");
  ul.innerHTML = "";

  verbosAciertos.forEach(v => {
    const li = document.createElement("li");
    li.textContent = v.esp + " → " + v.past;
    ul.appendChild(li);
  });
}

function reiniciar() {
  verbosPendientes = [...verbos];
  verbosAciertos = [];
  actualizarLista();
  siguiente();
}

function hablar(texto) {
  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "en-US";
  voz.rate = 0.9;
  speechSynthesis.speak(voz);
}

document.getElementById("respuesta")
  .addEventListener("keydown", e => {
    if (e.key === "Enter") verificar();
  });

siguiente();

