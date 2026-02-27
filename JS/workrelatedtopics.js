speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

const palabrasTrabajo = [
  { esp: "arreglar el error", eng: "fix the bug" },
  { esp: "firmar algunos documentos", eng: "sign some documents" },
  { esp: "asistir a la conferencia", eng: "attend the conference" },
  { esp: "supervisar el equipo", eng: "supervise the team" },
  { esp: "responder algunos correos", eng: "respond to some emails" },
  { esp: "instalar el software", eng: "install the software" },

  { esp: "escribir reportes", eng: "type reports" },
  { esp: "probar el software", eng: "test the software" },
  { esp: "programar reuniones", eng: "schedule meetings" },
  { esp: "reunirse con clientes", eng: "meet with clients" },
  { esp: "depurar el programa", eng: "debug the program" },
  { esp: "guardar documentos", eng: "store documents" },

  { esp: "hacer una llamada de conferencia", eng: "make a conference call" },
  { esp: "ver señales de advertencia", eng: "see warning signs" },
  { esp: "construir la aplicación", eng: "build the app" },
  { esp: "compartir código con el equipo", eng: "share code with the team" },
  { esp: "encontrar errores", eng: "find bugs" },
  { esp: "ir en un viaje de negocios", eng: "go on a business trip" },

  { esp: "tener una reunión departamental", eng: "have a department meeting" },
  { esp: "leer reportes", eng: "read reports" },
  { esp: "escribir código", eng: "write code" },
  { esp: "actualizar el programa", eng: "update the program" },
  { esp: "construir la base de datos", eng: "build database" },
  { esp: "hacer algunas llamadas telefónicas", eng: "make some phone calls" },

  { esp: "diseñar un sitio web", eng: "design a website" },
  { esp: "enviar correos", eng: "send emails" },
  { esp: "crear algunos proyectos", eng: "create some projects" },
  { esp: "ejecutar pruebas", eng: "run tests" },
  { esp: "aprender la nueva herramienta", eng: "learn the new tool" },
  { esp: "dejar algunos mensajes", eng: "leave some messages" },

  { esp: "confirmar solicitud de soporte", eng: "confirm support request" },
  { esp: "resolver el problema", eng: "solve the problem" },
  { esp: "revisar el código", eng: "check the code" },
  { esp: "encontrar errores en los documentos", eng: "find mistakes in the documents" },
  { esp: "trabajar en el proyecto", eng: "work on the project" },
  { esp: "terminar la tarea", eng: "finish the task" }
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
      "❌ Era: " + actual.eng + " — vuelve al final";

    hablar(actual.eng);
    reiniciar();
   // pendientes.push(actual);
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
  const voz = new SpeechSynthesisUtterance(texto);

  voz.lang = "en-US";
  voz.rate = 0.9;

  const voces = synth.getVoices();

  // Buscar una voz en inglés
  const vozIngles = voces.find(v => 
    v.lang === "en-US" || v.lang.startsWith("en-")
  );

  if (vozIngles) {
    voz.voice = vozIngles;
  }

  synth.speak(voz);
}

document.getElementById("respuesta")
  .addEventListener("keydown", e => {
    if (e.key === "Enter") verificar();
  });

siguiente();