speechSynthesis.onvoiceschanged = () => {
  speechSynthesis.getVoices();
};

const palabrasTrabajo = [
  { esp: "arreglar el error", eng: "fixed the bug", pro: "fikst ðe bag" },
  { esp: "firmar algunos documentos", eng: "signed some documents", pro: "saind som dokiuments" },
  { esp: "asistir a la conferencia", eng: "attended the conference", pro: "atended ðe kanfrens" },
  { esp: "supervisar el equipo", eng: "supervised the team", pro: "supervaizd ðe tim" },
  { esp: "responder algunos correos", eng: "responded to some emails", pro: "risponded tu som imeils" },
  { esp: "instalar el software", eng: "installed the software", pro: "instold ðe sofwer" },

  { esp: "escribir reportes", eng: "typed reports", pro: "taipt ripórts" },
  { esp: "probar el software", eng: "tested the software", pro: "tested ðe sofwer" },
  { esp: "programar reuniones", eng: "scheduled meetings", pro: "skedyuld mitings" },
  { esp: "reunirse con clientes", eng: "met with clients", pro: "met wif claiants" },
  { esp: "depurar el programa", eng: "debugged the program", pro: "dibagd ðe program" },
  { esp: "guardar documentos", eng: "stored documents", pro: "stord dokiuments" },

  { esp: "hacer una llamada de conferencia", eng: "made a conference call", pro: "meid a kanfrens kol" },
  { esp: "ver señales de advertencia", eng: "saw warning signs", pro: "so worning sains" },
  { esp: "construir la aplicación", eng: "built the app", pro: "bilt ðe ap" },
  { esp: "compartir código con el equipo", eng: "shared code with the team", pro: "sherd koud wif ðe tim" },
  { esp: "encontrar errores", eng: "found bugs", pro: "faund bags" },
  { esp: "ir en un viaje de negocios", eng: "went on a business trip", pro: "went on a bisnes trip" },

  { esp: "tener una reunión departamental", eng: "had a department meeting", pro: "jad a dipartment miting" },
  { esp: "leer reportes", eng: "read reports", pro: "red ripórts" },
  { esp: "escribir código", eng: "wrote code", pro: "rout koud" },
  { esp: "actualizar el programa", eng: "updated the program", pro: "apdeited ðe program" },
  { esp: "construir la base de datos", eng: "built the database", pro: "bilt ðe deitabeis" },
  { esp: "hacer algunas llamadas telefónicas", eng: "made some phone calls", pro: "meid som foun kols" },

  { esp: "diseñar un sitio web", eng: "designed a website", pro: "dizáind a websait" },
  { esp: "enviar correos", eng: "sent emails", pro: "sent imeils" },
  { esp: "crear algunos proyectos", eng: "created some projects", pro: "crieited som proyeks" },
  { esp: "ejecutar pruebas", eng: "ran tests", pro: "ran tests" },
  { esp: "aprender la nueva herramienta", eng: "learned the new tool", pro: "lernd ðe niu tul" },
  { esp: "dejar algunos mensajes", eng: "left some messages", pro: "left som mesaches" },

  { esp: "confirmar solicitud de soporte", eng: "confirmed support request", pro: "confirmd saport rikwest" },
  { esp: "resolver el problema", eng: "solved the problem", pro: "solvd ðe problem" },
  { esp: "revisar el código", eng: "checked the code", pro: "chekt ðe koud" },
  { esp: "encontrar errores en los documentos", eng: "found mistakes in the documents", pro: "faund misteiks in ðe dokiuments" },
  { esp: "trabajar en el proyecto", eng: "worked on the project", pro: "workt on ðe proyekt" },
  { esp: "terminar la tarea", eng: "finished the task", pro: "finisht ðe task" }
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

    hablar(actual.pro);

    aciertos.push(actual);
    actualizarLista();

  } else {

    document.getElementById("resultado").innerText =
      "❌ Era: " + actual.eng + " — vuelve al final";

    hablar(actual.pro);
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