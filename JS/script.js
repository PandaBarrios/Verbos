const verbos = [

  // Present = Past = Past Participle
  { esp: "apostar", past: "bet" },
  { esp: "explotar/estallar", past: "burst" },
  { esp: "costar", past: "cost" },
  { esp: "cortar", past: "cut" },
  { esp: "encajar", past: "fit" },
  { esp: "golpear", past: "hit" },
  { esp: "permitir", past: "let" },
  { esp: "poner", past: "put" },
  { esp: "leer", past: "read" },
  { esp: "deshacerse de", past: "rid" },
  { esp: "colocar", past: "set" },
  { esp: "cerrar", past: "shut" },
  { esp: "dividir", past: "split" },
  { esp: "esparcir", past: "spread" },

  // -t ending
  { esp: "doblar", past: "bent" },
  { esp: "construir", past: "built" },
  { esp: "quemar", past: "burnt" },
  { esp: "tratar (negociar)", past: "dealt" },
  { esp: "soñar", past: "dreamt" },
  { esp: "sentir", past: "felt" },
  { esp: "mantener", past: "kept" },
  { esp: "aprender", past: "learnt" },
  { esp: "dejar", past: "left" },
  { esp: "prestar", past: "lent" },
  { esp: "encender", past: "lit" },
  { esp: "perder", past: "lost" },
  { esp: "significar", past: "meant" },
  { esp: "reunirse", past: "met" },
  { esp: "disparar", past: "shot" },
  { esp: "gastar", past: "spent" },
  { esp: "arruinar", past: "spoilt" },

  // a → u pattern
  { esp: "empezar", past: "began" },
  { esp: "beber", past: "drank" },
  { esp: "correr", past: "ran" },
  { esp: "sonar", past: "rang" },
  { esp: "cantar", past: "sang" },
  { esp: "hundirse", past: "sank" },
  { esp: "nadar", past: "swam" },
  { esp: "saltar", past: "sprang" },

  // -en ending
  { esp: "golpear", past: "beat" },
  { esp: "morder", past: "bit" },
  { esp: "romper", past: "broke" },
  { esp: "elegir", past: "chose" },
  { esp: "conducir", past: "drove" },
  { esp: "comer", past: "ate" },
  { esp: "caer", past: "fell" },
  { esp: "prohibir", past: "forbade" },
  { esp: "perdonar", past: "forgave" },
  { esp: "congelar", past: "froze" },
  { esp: "dar", past: "gave" },
  { esp: "esconder", past: "hid" },
  { esp: "montar (bici/caballo)", past: "rode" },
  { esp: "elevarse", past: "rose" },
  { esp: "ver", past: "saw" },
  { esp: "sacudir", past: "shook" },
  { esp: "hablar", past: "spoke" },
  { esp: "robar", past: "stole" },
  { esp: "tomar", past: "took" },
  { esp: "despertar", past: "woke" },
  { esp: "escribir", past: "wrote" },

  // -ew → -own
  { esp: "soplar", past: "blew" },
  { esp: "volar", past: "flew" },
  { esp: "crecer", past: "grew" },
  { esp: "saber/conocer", past: "knew" },
  { esp: "lanzar", past: "threw" },

  // -ought
  { esp: "traer", past: "brought" },
  { esp: "comprar", past: "bought" },
  { esp: "atrapar", past: "caught" },
  { esp: "pelear", past: "fought" },
  { esp: "buscar", past: "sought" },
  { esp: "enseñar", past: "taught" },
  { esp: "pensar", past: "thought" },

  // otros importantes
  { esp: "venir", past: "came" },
  { esp: "hacer", past: "did" },
  { esp: "ir", past: "went" },
  { esp: "decir", past: "said" },
  { esp: "hacer/crear", past: "made" },
  { esp: "ser/estar", past: "was/were" }
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

