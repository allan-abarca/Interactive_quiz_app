// PREGUNTAS
let preguntas = [
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        opciones: ["Tierra", "Marte", "Júpiter", "Saturno"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿En qué país se encuentra la Torre Eiffel?",
        opciones: ["Italia", "España", "Alemania", "Francia"],
        respuestaCorrecta: 3
    },
    {
        pregunta: "¿Cuál es el resultado de 7 x 8?",
        opciones: ["54", "56", "64", "48"],
        respuestaCorrecta: 1
    },
    {
        pregunta: "¿Quién pintó la Mona Lisa?",
        opciones: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
        respuestaCorrecta: 2
    },
    {
        pregunta: "¿Cuál es el océano más grande del mundo?",
        opciones: ["Atlántico", "Índico", "Ártico", "Pacífico"],
        respuestaCorrecta: 3
    }
];

// VARIABLES DE CONTEO
let preguntaActualIndex = 0;   // pregunta mostrada actualmente
let respuestasCorrectas = 0;   // contador de aciertos
let respuestasIncorrectas = 0; // contador de fallos

// VARIABLES PARA MANEJO DE LOS DIVS
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaTrivia = document.getElementById("pantalla-trivia");
const pantallaEdicion = document.getElementById("pantalla-edicion");

// FUNCION PARA MOSTRAR/OCULTAR LOS DIVS
function mostrarPantalla(pantallaAMostrar) {
    pantallaInicio.style.display = "none";
    pantallaTrivia.style.display = "none";
    pantallaEdicion.style.display = "none";
    pantallaAMostrar.style.display = "block";
}

//LLAMADO DE FUNCION PARA MOSTRAR DIV DETERMINADO
mostrarPantalla(pantallaInicio);

// VARIABLES PARA BOTONES
const btnIniciarTrivia = document.getElementById("btn-iniciar-trivia");
const btnEditar = document.getElementById("btn-editar");

// LISTENER DE BOTONES
btnIniciarTrivia.addEventListener("click", function () {
    mostrarPantalla(pantallaTrivia);
    renderizarPregunta();
});

btnEditar.addEventListener("click", function () {
    mostrarPantalla(pantallaEdicion);
    mostrarVistaEdicion(vistaListaPreguntas);
    renderizarListaPreguntas();
});

// referencias de la pantalla de edición
const contenedorListaPreguntas = document.getElementById("contenedor-lista-preguntas");
const btnAgregarPregunta = document.getElementById("btn-agregar-pregunta");
const btnVolverInicio = document.getElementById("btn-volver-inicio");

// sub-vistas de pantalla-edicion: lista/formulario
const vistaListaPreguntas = document.getElementById("vista-lista-preguntas");
const vistaFormularioPregunta = document.getElementById("vista-formulario-pregunta");

const tituloFormulario = document.getElementById("titulo-formulario");

// formulario y sus 9 campos 
const formularioPregunta = document.getElementById("formulario-pregunta");

const inputPregunta = document.getElementById("input-pregunta");
const inputOpcion0 = document.getElementById("input-opcion-0");
const inputOpcion1 = document.getElementById("input-opcion-1");
const inputOpcion2 = document.getElementById("input-opcion-2");
const inputOpcion3 = document.getElementById("input-opcion-3");

const radio0 = document.getElementById("radio-0");
const radio1 = document.getElementById("radio-1");
const radio2 = document.getElementById("radio-2");
const radio3 = document.getElementById("radio-3");

const btnCancelarFormulario = document.getElementById("btn-cancelar-formulario");

// variable para recordar que pregunta se está editando. es NULL en caso de ser nueva pregunta
let indiceEnEdicion = null;

// mostrar una de las 2 sub-vistas de edición
function mostrarVistaEdicion(vistaAMostrar) {
    vistaListaPreguntas.style.display = "none";
    vistaFormularioPregunta.style.display = "none";
    vistaAMostrar.style.display = "block";
}

// renderizar la lista de preguntas (texto + botón Editar)
function renderizarListaPreguntas() {
    contenedorListaPreguntas.innerHTML = "";

    preguntas.forEach(function (pregunta, index) {
        const fila = document.createElement("div");
        fila.classList.add("d-flex", "justify-content-between", "align-items-center", "border-bottom", "py-2");
        const texto = document.createElement("span");
        texto.textContent = (index + 1) + ". " + pregunta.pregunta;
        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.classList.add("btn", "btn-sm", "btn-outline-primary");

        // boton para recordar su propio índice
        botonEditar.addEventListener("click", function () {
            abrirFormularioEdicion(index);
        });

        fila.appendChild(texto);
        fila.appendChild(botonEditar);
        contenedorListaPreguntas.appendChild(fila);
    });
}

// abrir el formulario lleno con los datos de una pregunta
function abrirFormularioEdicion(index) {
    indiceEnEdicion = index; // recordamos cuál se está editando
    const pregunta = preguntas[index];
    tituloFormulario.textContent = "Editar pregunta";
    inputPregunta.value = pregunta.pregunta;
    inputOpcion0.value = pregunta.opciones[0];
    inputOpcion1.value = pregunta.opciones[1];
    inputOpcion2.value = pregunta.opciones[2];
    inputOpcion3.value = pregunta.opciones[3];

    // radio que corresponde a la respuesta correcta actual
    radio0.checked = (pregunta.respuestaCorrecta === 0);
    radio1.checked = (pregunta.respuestaCorrecta === 1);
    radio2.checked = (pregunta.respuestaCorrecta === 2);
    radio3.checked = (pregunta.respuestaCorrecta === 3);

    mostrarVistaEdicion(vistaFormularioPregunta);
}

// abrir el formulario vacio para agregar una pregunta nueva
function abrirFormularioAgregar() {
    indiceEnEdicion = null; // null = se agregan, no se edita
    tituloFormulario.textContent = "Agregar nueva pregunta";
    formularioPregunta.reset(); // limpia todos los inputs y radios del <form>
    mostrarVistaEdicion(vistaFormularioPregunta);
}

btnAgregarPregunta.addEventListener("click", function () {
    abrirFormularioAgregar();
});

btnVolverInicio.addEventListener("click", function () {
    mostrarPantalla(pantallaInicio);
});

btnCancelarFormulario.addEventListener("click", function () {
    mostrarVistaEdicion(vistaListaPreguntas);
});

// enviar el formulario (botón "Guardar")
formularioPregunta.addEventListener("submit", function (evento) {
    evento.preventDefault();    // para evitar recargar la pagina al enviar el formulario

    // averiguar cual radio quedó marcado
    let indiceCorrecta;

    if (radio0.checked) {
        indiceCorrecta = 0;
    } else if (radio1.checked) {
        indiceCorrecta = 1;
    } else if (radio2.checked) {
        indiceCorrecta = 2;
    } else {
        indiceCorrecta = 3;
    }

    // armar nueva pregunta
    const preguntaEditada = {
        pregunta: inputPregunta.value,
        opciones: [inputOpcion0.value, inputOpcion1.value, inputOpcion2.value, inputOpcion3.value],
        respuestaCorrecta: indiceCorrecta
    };

    if (indiceEnEdicion === null) {
        preguntas.push(preguntaEditada);    // agregar al final del array
    } else {
        preguntas[indiceEnEdicion] = preguntaEditada;   // sobreescrir posición del array
    }

    // lista actualizada
    renderizarListaPreguntas();
    mostrarVistaEdicion(vistaListaPreguntas);
});

    // DIVS VACIOS PARA TRIVIA
    const textoPregunta = document.getElementById("texto-pregunta");
    const contenedorOpciones = document.getElementById("contenedor-opciones");
    const textoFeedback = document.getElementById("texto-feedback");
    const btnSiguientePregunta = document.getElementById("btn-siguiente-pregunta");

    // SUB-VISTAS (PREGUNTAS / RESULTADO)
    const vistaPregunta = document.getElementById("vista-pregunta");
    const vistaResultados = document.getElementById("vista-resultados");
    const textoResultadoFinal = document.getElementById("texto-resultado-final");
    const btnReiniciar = document.getElementById("btn-reiniciar");
    const btnEditarDesdeResultados = document.getElementById("btn-editar-desde-resultados");
    const btnEditarDuranteJuego = document.getElementById("btn-editar-durante-juego");
    const btnReiniciarDuranteJuego = document.getElementById("btn-reiniciar-durante-juego");

    // AL ELEGIR UNA OPCION
    function manejarRespuesta(indiceElegido) {
        const preguntaActual = preguntas[preguntaActualIndex];
        const botones = contenedorOpciones.querySelectorAll("button");

        if (indiceElegido === preguntaActual.respuestaCorrecta) { // comparacion del indice elegido vs el indice correcto
            textoFeedback.textContent = "¡Correcto!";
            textoFeedback.style.color = "green";
            respuestasCorrectas++;
        } else {
            textoFeedback.textContent = "Incorrecto";
            textoFeedback.style.color = "red";
            respuestasIncorrectas++;
        }

        // deshabilitar los 4 botones para que no se pueda responder de nuevo
        botones.forEach(function (boton) {
            boton.disabled = true;
        });

        // activar el boton para pasar a la siguiente pregunta
        btnSiguientePregunta.style.display = "inline-block";

        // cambiar boton en caso de ser la ultima pregunta
        const esUltimaPregunta = preguntaActualIndex === preguntas.length - 1;
        if (esUltimaPregunta) {
            btnSiguientePregunta.textContent = "Ver resultados";
        } else {
            btnSiguientePregunta.textContent = "Siguiente pregunta";
        }
    }

    // BOTON SIGUIENTE PREGUNTA
    btnSiguientePregunta.addEventListener("click", function () {
        preguntaActualIndex++;

        if (preguntaActualIndex < preguntas.length) {
            renderizarPregunta();
        } else {
            mostrarResultados();
        }
    });

    // RENDERIZAR PREGUNTA Y RESPUESTAS
    function renderizarPregunta() {
        const preguntaActual = preguntas[preguntaActualIndex];    // jalar pregunta a mostrar
        textoPregunta.textContent = preguntaActual.pregunta;  // mostrar texto de la pregunta en el h2
        textoFeedback.textContent = "";   // limpiar feedback de la pregunta anterior
        btnSiguientePregunta.style.display = "none";  // ocultar boton de siguiente hasta que se responda la pregunta
        contenedorOpciones.innerHTML = "";    // limpiar botones de opciones anteriores
        preguntaActual.opciones.forEach(function (textoOpcion, index) {   // por cada opcion se crea un boton y se agrega al contenedor
            const boton = document.createElement("button");
            boton.textContent = textoOpcion;
            boton.classList.add("btn", "btn-outline-primary");

            boton.addEventListener("click", function () {   // avanzar con el indice 
                manejarRespuesta(index);
            });

            contenedorOpciones.appendChild(boton);
        });
    }

    // MOSTRAR RESULTADOS
    function mostrarResultados() {
        vistaPregunta.style.display = "none";
        vistaResultados.style.display = "block";

        textoResultadoFinal.textContent =
            "Respuestas correctas: " + respuestasCorrectas +
            " / Incorrectas: " + respuestasIncorrectas;
    };

    // REINICIAR JUEGO
    function reiniciarJuego() {
        preguntaActualIndex = 0;
        respuestasCorrectas = 0;
        respuestasIncorrectas = 0;

        vistaResultados.style.display = "none";
        vistaPregunta.style.display = "block";
    }

    btnReiniciar.addEventListener("click", function () {
        reiniciarJuego();
        mostrarPantalla(pantallaInicio);
        //renderizarPregunta();
    });

    btnEditarDesdeResultados.addEventListener("click", function () {
        reiniciarJuego();
        mostrarPantalla(pantallaEdicion);
        mostrarVistaEdicion(vistaListaPreguntas);
        renderizarListaPreguntas();
    });

    // EDITAR PREGUNTAS DURANTE EL JUEGO
    // el marcador se reinicia porque la cantidad de preguntas puede cambiar
    btnEditarDuranteJuego.addEventListener("click", function () {
        reiniciarJuego();
        mostrarPantalla(pantallaEdicion);
        mostrarVistaEdicion(vistaListaPreguntas);
        renderizarListaPreguntas();
    });

    // REINICIAR JUEGO DURANTE EL JUEGO
    btnReiniciarDuranteJuego.addEventListener("click", function () {
        reiniciarJuego();
        mostrarPantalla(pantallaInicio)();
    });

