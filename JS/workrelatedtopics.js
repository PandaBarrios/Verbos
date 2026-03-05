let voices = [];

// Cargar voces correctamente
speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices();
};

const palabrasTrabajo = [
  { esp: "arreglar el error", eng: "fixed the bug" },
  { esp: "firmar algunos documentos", eng: "signed some documents" },
  { esp: "asistir a la conferencia", eng: "attended the conference" },
  { esp: "supervisar el equipo", eng: "supervised the team" },
  { esp: "responder algunos correos", eng: "responded to some emails" },
  { esp: "instalar el software", eng: "installed the software" },

  { esp: "escribir reportes", eng: "typed reports" },
  { esp: "probar el software", eng: "tested the software" },
  { esp: "programar reuniones", eng: "scheduled meetings" },
  { esp: "reunirse con clientes", eng: "met with clients" },
  { esp: "depurar el programa", eng: "debugged the program" },
  { esp: "guardar documentos", eng: "stored documents" },

  { esp: "hacer una llamada de conferencia", eng: "made a conference call" },
  { esp: "ver señales de advertencia", eng: "saw warning signs" },
  { esp: "construir la aplicación", eng: "built the app" },
  { esp: "compartir código con el equipo", eng: "shared code with the team" },
  { esp: "encontrar errores", eng: "found bugs" },
  { esp: "ir en un viaje de negocios", eng: "went on a business trip" },

  { esp: "tener una reunión departamental", eng: "had a department meeting" },
  { esp: "leer reportes", eng: "read reports" },
  { esp: "escribir código", eng: "wrote code" },
  { esp: "actualizar el programa", eng: "updated the program" },
  { esp: "construir la base de datos", eng: "built the database" },
  { esp: "hacer algunas llamadas telefónicas", eng: "made some phone calls" },

  { esp: "diseñar un sitio web", eng: "designed a website" },
  { esp: "enviar correos", eng: "sent emails" },
  { esp: "crear algunos proyectos", eng: "created some projects" },
  { esp: "ejecutar pruebas", eng: "ran tests" },
  { esp: "aprender la nueva herramienta", eng: "learned the new tool" },
  { esp: "dejar algunos mensajes", eng: "left some messages" },

  { esp: "confirmar solicitud de soporte", eng: "confirmed support request" },
  { esp: "resolver el problema", eng: "solved the problem" },
  { esp: "revisar el código", eng: "checked the code" },
  { esp: "encontrar errores en los documentos", eng: "found mistakes in the documents" },
  { esp: "trabajar en el proyecto", eng: "worked on the project" },
  { esp: "terminar la tarea", eng: "finished the task" }
];

let pendientes = [...palabrasTrabajo];
let aciertos = [];
let actual;

function siguiente() {

  if (pendientes.length === 0) {
    document.getElementById("verbo").innerText = "🎉 ¡Completado!";
    actual = null;
    return;
  }

  document.getElementById("resultado").innerText = "";
  document.getElementById("respuesta").value = "";

  actual = pendientes[0];
  document.getElementById("verbo").innerText = actual.esp;
}

function verificar() {

  if (!actual) return;

  const r = document.getElementById("respuesta").value
    .toLowerCase()
    .trim();

  pendientes.shift();

  if (r === actual.eng) {

    document.getElementById("resultado").innerText =
      "✅ Correcto — pasa a dominados";

    hablar(actual.eng);

    aciertos.push(actual);
    actualizarLista();

  } else {

    document.getElementById("resultado").innerText =
      "❌ Era: " + actual.eng + " — vuelve al inicio";

    hablar(actual.eng);
    reiniciar();
  }

  siguiente();
}

function actualizarLista() {

  const ul = document.getElementById("listaAciertos");
  ul.innerHTML = "";

  aciertos.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.esp + " → " + p.eng;
    ul.appendChild(li);
  });
}

function reiniciar() {
  pendientes = [...palabrasTrabajo];
  aciertos = [];
  actualizarLista();
  siguiente();
}

function hablar(texto) {

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(texto);

  utterance.rate = 0.95;
  utterance.pitch = 1;

  // Buscar una voz en inglés
  const englishVoice = voices.find(v =>
    v.lang.startsWith("en") &&
    (
      v.name.includes("Google") ||
      v.name.includes("Microsoft") ||
      v.name.includes("English") ||
      v.name.includes("US")
    )
  );

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  synth.cancel();
  synth.speak(utterance);
}

document.getElementById("respuesta")
  .addEventListener("keydown", e => {
    if (e.key === "Enter") verificar();
  });

siguiente();