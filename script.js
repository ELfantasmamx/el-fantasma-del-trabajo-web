// JavaScript original de los cuestionarios rápido y profundo.
// Se conserva la lógica y los identificadores de la versión ambiciosa.

const preguntasRapidas = [
    "Después de terminar mi jornada, sigo pensando en asuntos pendientes del trabajo.",
    "Me cuesta dejar de revisar mensajes, correos o notificaciones laborales.",
    "Aunque estoy descansando, siento que debería estar haciendo algo relacionado con el trabajo.",
    "Las preocupaciones laborales afectan mi tranquilidad durante mi tiempo libre.",
    "Me resulta difícil disfrutar de mis actividades personales sin pensar en el trabajo.",
    "Siento que necesito mucho tiempo para recuperarme mentalmente después de trabajar.",
    "Me cuesta establecer límites entre mis responsabilidades laborales y mi vida personal.",
    "Cuando termina mi jornada, consigo dedicar tiempo a actividades que me hacen sentir bien."
];

const respuestasRapidas = [
    "Nunca",
    "Rara vez",
    "A veces",
    "Frecuentemente",
    "Siempre"
];

let respuestasSeleccionadas = Array(8).fill(null);
let preguntaActual = 0;

const inicioRapido = document.getElementById("inicio-rapido");
const contenidoRapido = document.getElementById("contenido-rapido");
const resultadoRapido = document.getElementById("resultado-rapido");

const preguntaTexto = document.getElementById("pregunta-rapida");
const opcionesContenedor = document.getElementById("opciones-rapidas");
const numeroPregunta = document.getElementById("numero-pregunta");
const porcentajeProgreso = document.getElementById("porcentaje-progreso");
const rellenoProgreso = document.getElementById("relleno-progreso");

const botonComenzar = document.getElementById("comenzar-rapido");
const botonAnterior = document.getElementById("anterior-rapido");
const botonSiguiente = document.getElementById("siguiente-rapido");
const botonReiniciar = document.getElementById("reiniciar-rapido");

botonComenzar.addEventListener("click", () => {
    inicioRapido.hidden = true;
    resultadoRapido.hidden = true;
    contenidoRapido.hidden = false;
    mostrarPregunta();
});

function mostrarPregunta() {
    preguntaTexto.textContent = preguntasRapidas[preguntaActual];

    numeroPregunta.textContent =
        `Pregunta ${preguntaActual + 1} de 8`;

    const progreso = (preguntaActual / 8) * 100;

    porcentajeProgreso.textContent = `${Math.round(progreso)}%`;
    rellenoProgreso.style.width = `${progreso}%`;

    opcionesContenedor.innerHTML = "";

    respuestasRapidas.forEach((respuesta, indice) => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "opcion-test";
        boton.textContent = respuesta;

        if (respuestasSeleccionadas[preguntaActual] === indice) {
            boton.classList.add("seleccionada");
        }

        boton.addEventListener("click", () => {
            respuestasSeleccionadas[preguntaActual] = indice;

            mostrarPregunta();
        });

        opcionesContenedor.appendChild(boton);
    });

    botonAnterior.disabled = preguntaActual === 0;

    botonSiguiente.disabled =
        respuestasSeleccionadas[preguntaActual] === null;

    botonSiguiente.textContent =
        preguntaActual === 7 ? "Ver resultados" : "Siguiente";
}

botonSiguiente.addEventListener("click", () => {
    if (respuestasSeleccionadas[preguntaActual] === null) return;

    if (preguntaActual < 7) {
        preguntaActual++;
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
});

botonAnterior.addEventListener("click", () => {
    if (preguntaActual > 0) {
        preguntaActual--;
        mostrarPregunta();
    }
});

function mostrarResultados() {
    const puntuacion = respuestasSeleccionadas.reduce(
        (total, respuesta, indice) => {
            // La última pregunta expresa una capacidad protectora.
            const valor = indice === 7 ? 4 - respuesta : respuesta;
            return total + valor;
        },
        0
    );

    contenidoRapido.hidden = true;
    resultadoRapido.hidden = false;

    porcentajeProgreso.textContent = "100%";
    rellenoProgreso.style.width = "100%";

    let titulo;
    let interpretacion;
    let recomendaciones;

    if (puntuacion <= 7) {
        titulo = "Tu desconexión parece favorable";
        interpretacion =
            "Tus respuestas sugieren que generalmente consigues " +
            "separar tus responsabilidades laborales de tu tiempo personal. " +
            "Conviene mantener los hábitos que favorecen tu descanso.";

        recomendaciones = [
            "Conserva horarios definidos para finalizar tu jornada.",
            "Dedica tiempo a actividades recreativas y personales.",
            "Mantén espacios libres de notificaciones laborales."
        ];

    } else if (puntuacion <= 15) {
        titulo = "Hay aspectos que puedes fortalecer";
        interpretacion =
            "Tus respuestas reflejan algunas dificultades para " +
            "desconectar mentalmente del trabajo. Identificar qué " +
            "situaciones mantienen tu atención laboral puede ayudarte " +
            "a construir mejores hábitos de recuperación.";

        recomendaciones = [
            "Establece un pequeño ritual para cerrar tu jornada.",
            "Reduce gradualmente la revisión de mensajes laborales fuera de horario.",
            "Reserva momentos para actividades que disfrutes."
        ];

    } else {
        titulo = "Tu desconexión merece atención";
        interpretacion =
            "Tus respuestas indican que las preocupaciones laborales " +
            "podrían estar ocupando una parte importante de tu tiempo " +
            "personal. Es conveniente explorar qué factores dificultan " +
            "tu descanso y qué límites podrías fortalecer.";

        recomendaciones = [
            "Identifica qué pensamientos laborales aparecen con mayor frecuencia.",
            "Establece límites realistas para las comunicaciones fuera del horario.",
            "Practica actividades de relajación y recuperación.",
            "Si estas dificultades generan malestar persistente, considera buscar orientación profesional."
        ];
    }

    document.getElementById("interpretacion-rapida").innerHTML =
        `<strong>${titulo}</strong><br><br>${interpretacion}`;

    document.getElementById("recomendaciones-rapidas").innerHTML =
        `<h4>Algunas recomendaciones para ti</h4>
        <ul>${recomendaciones.map(item => `<li>${item}</li>`).join("")}</ul>
        <p><strong>Resultado orientativo:</strong> ${puntuacion} de 32 puntos.</p>`;
}

botonReiniciar.addEventListener("click", () => {
    respuestasSeleccionadas = Array(8).fill(null);
    preguntaActual = 0;

    resultadoRapido.hidden = true;
    contenidoRapido.hidden = true;
    inicioRapido.hidden = false;

    rellenoProgreso.style.width = "0%";
});

const preguntasProfundas = [
    "Después de terminar mi jornada, sigo pensando en problemas que ocurrieron durante el trabajo.",
    "Me cuesta dejar de preocuparme por las tareas que quedaron pendientes.",
    "Durante mi tiempo libre, imagino situaciones relacionadas con mis responsabilidades laborales.",
    "Repaso mentalmente conversaciones o conflictos que tuve en el trabajo.",
    "Siento que mi mente continúa trabajando incluso cuando ya terminó mi jornada.",

    "Puedo decidir libremente cómo organizar mi tiempo después del trabajo.",
    "Siento que las responsabilidades laborales limitan mis actividades personales.",
    "Puedo establecer límites cuando alguien intenta contactarme por motivos laborales fuera de mi horario.",
    "Me resulta difícil dedicar tiempo a mis intereses personales debido al trabajo.",
    "Tengo la libertad de elegir cuándo y cómo realizar actividades durante mi tiempo libre.",

    "Después de trabajar, consigo relajarme física y mentalmente.",
    "Siento tensión o preocupación relacionada con el trabajo durante mis momentos de descanso.",
    "Realizo actividades que me ayudan a recuperar energía después de mi jornada.",
    "Me cuesta descansar porque sigo pensando en mis responsabilidades.",
    "Consigo sentir tranquilidad cuando me encuentro fuera del entorno laboral.",

    "Dedico tiempo a aprender cosas nuevas que no están relacionadas con mi trabajo.",
    "Realizo actividades personales que me producen satisfacción.",
    "Durante mis días libres, busco experiencias que representen un reto positivo para mí.",
    "Mantengo actividades recreativas que contribuyen a mi desarrollo personal.",
    "Siento que mi vida fuera del trabajo me permite desarrollar otras habilidades e intereses."
];

const respuestasProfundas = [
    "Nunca",
    "Rara vez",
    "A veces",
    "Frecuentemente",
    "Siempre"
];

// Preguntas positivas: una frecuencia mayor representa
// mejores recursos de recuperación, por lo que se invierte.
const preguntasInversas = [
    5, 7, 9,
    10, 12, 14,
    15, 16, 17, 18, 19
];

const dimensiones = [
    { nombre: "Desconexión mental", inicio: 0 },
    { nombre: "Control del tiempo libre", inicio: 5 },
    { nombre: "Relajación", inicio: 10 },
    { nombre: "Actividades enriquecedoras", inicio: 15 }
];

let respuestasProfundasSeleccionadas = Array(20).fill(null);
let preguntaProfundaActual = 0;

const inicioProfundo = document.getElementById("inicio-profundo");
const contenidoProfundo = document.getElementById("contenido-profundo");
const resultadoProfundo = document.getElementById("resultado-profundo");

const botonComenzarProfundo = document.getElementById("comenzar-profundo");
const botonAnteriorProfundo = document.getElementById("anterior-profundo");
const botonSiguienteProfundo = document.getElementById("siguiente-profundo");
const botonReiniciarProfundo = document.getElementById("reiniciar-profundo");

const preguntaTextoProfundo = document.getElementById("pregunta-profunda");
const opcionesProfundas = document.getElementById("opciones-profundas");
const numeroPreguntaProfunda = document.getElementById("numero-pregunta-profunda");
const porcentajeProfundo = document.getElementById("porcentaje-progreso-profundo");
const rellenoProfundo = document.getElementById("relleno-progreso-profundo");

botonComenzarProfundo.addEventListener("click", () => {
    inicioProfundo.hidden = true;
    resultadoProfundo.hidden = true;
    contenidoProfundo.hidden = false;
    mostrarPreguntaProfunda();
});

function mostrarPreguntaProfunda() {
    preguntaTextoProfundo.textContent =
        preguntasProfundas[preguntaProfundaActual];

    numeroPreguntaProfunda.textContent =
        `Pregunta ${preguntaProfundaActual + 1} de 20`;

    const progreso = (preguntaProfundaActual / 20) * 100;

    porcentajeProfundo.textContent = `${Math.round(progreso)}%`;
    rellenoProfundo.style.width = `${progreso}%`;

    opcionesProfundas.innerHTML = "";

    respuestasProfundas.forEach((respuesta, indice) => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "opcion-test";
        boton.textContent = respuesta;

        if (respuestasProfundasSeleccionadas[preguntaProfundaActual] === indice) {
            boton.classList.add("seleccionada");
        }

        boton.addEventListener("click", () => {
            respuestasProfundasSeleccionadas[preguntaProfundaActual] = indice;
            mostrarPreguntaProfunda();
        });

        opcionesProfundas.appendChild(boton);
    });

    botonAnteriorProfundo.disabled = preguntaProfundaActual === 0;

    botonSiguienteProfundo.disabled =
        respuestasProfundasSeleccionadas[preguntaProfundaActual] === null;

    botonSiguienteProfundo.textContent =
        preguntaProfundaActual === 19 ? "Ver resultados" : "Siguiente";
}

botonSiguienteProfundo.addEventListener("click", () => {
    if (respuestasProfundasSeleccionadas[preguntaProfundaActual] === null) return;

    if (preguntaProfundaActual < 19) {
        preguntaProfundaActual++;
        mostrarPreguntaProfunda();
    } else {
        mostrarResultadosProfundos();
    }
});

botonAnteriorProfundo.addEventListener("click", () => {
    if (preguntaProfundaActual > 0) {
        preguntaProfundaActual--;
        mostrarPreguntaProfunda();
    }
});

function mostrarResultadosProfundos() {
    const puntuaciones = dimensiones.map(dimension => {
        let total = 0;

        for (let i = dimension.inicio; i < dimension.inicio + 5; i++) {
            const respuesta = respuestasProfundasSeleccionadas[i];
            const valor = preguntasInversas.includes(i) ? 4 - respuesta : respuesta;
            total += valor;
        }

        return total;
    });

    contenidoProfundo.hidden = true;
    resultadoProfundo.hidden = false;

    porcentajeProfundo.textContent = "100%";
    rellenoProfundo.style.width = "100%";

    const resultados = document.getElementById("resultados-dimensiones");
    const interpretacion = document.getElementById("interpretacion-profunda");
    const recomendaciones = document.getElementById("recomendaciones-profundas");

    resultados.innerHTML = "";
    recomendaciones.innerHTML = "";

    let totalGeneral = 0;

    dimensiones.forEach((dimension, indice) => {
        const puntuacion = puntuaciones[indice];
        totalGeneral += puntuacion;

        let nivel;
        let descripcion;

        if (puntuacion <= 6) {
            nivel = "Recursos favorables";
            descripcion = "Tus respuestas sugieren recursos que favorecen esta dimensión de tu recuperación.";
        } else if (puntuacion <= 13) {
            nivel = "Aspectos por fortalecer";
            descripcion = "Tus respuestas sugieren algunas dificultades que podrías explorar y atender.";
        } else {
            nivel = "Mayor dificultad percibida";
            descripcion = "Tus respuestas reflejan dificultades frecuentes en esta dimensión que merecen atención.";
        }

        resultados.innerHTML += `
            <div class="resultado-dimension">
                <h3>${dimension.nombre}</h3>
                <p><strong>${nivel}</strong></p>
                <p>${descripcion}</p>
                <p>Puntuación: ${puntuacion} de 20</p>
            </div>
        `;

        const consejos = [
            [
                "Establece un ritual para cerrar mentalmente tu jornada.",
                "Evita revisar pendientes laborales durante tus descansos."
            ],
            [
                "Define horarios para tus actividades personales.",
                "Establece límites claros para las comunicaciones laborales."
            ],
            [
                "Incorpora pausas y actividades de relajación.",
                "Reserva momentos para descansar sin obligaciones."
            ],
            [
                "Recupera actividades recreativas que disfrutes.",
                "Dedica tiempo a aprender o explorar intereses personales."
            ]
        ];

        if (puntuacion > 6) {
            recomendaciones.innerHTML += `
                <h4>${dimension.nombre}</h4>
                <ul>
                    ${consejos[indice].map(consejo => `<li>${consejo}</li>`).join("")}
                </ul>
            `;
        }
    });

    // GENERAR GRAFICA DE LAS CUATRO DIMENSIONES
    const canvas = document.getElementById("grafica-dimensiones");

    if (canvas) {
        const ctx = canvas.getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: dimensiones.map(dimension => dimension.nombre),
                datasets: [{
                    label: "Puntuación",
                    data: puntuaciones,
                    backgroundColor: [
                        "#173F35",
                        "#397466",
                        "#A8B9A1",
                        "#6D927F"
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 20,
                        ticks: {
                            stepSize: 5
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    interpretacion.innerHTML = `
        <h3>Panorama general</h3>
        <p>Tu puntuación global es de <strong>${totalGeneral} de 80 puntos</strong>.</p>
        <p>Los resultados permiten identificar las dimensiones en las que percibes mayores dificultades y aquellas donde reconoces recursos favorables.</p>
    `;

    recomendaciones.innerHTML += `
        <p><strong>Importante:</strong> Este cuestionario es una herramienta orientativa de autoconocimiento elaborada para el proyecto. No constituye una prueba psicométrica validada ni permite establecer diagnósticos.</p>
    `;
}

botonReiniciarProfundo.addEventListener("click", () => {
    respuestasProfundasSeleccionadas = Array(20).fill(null);
    preguntaProfundaActual = 0;

    resultadoProfundo.hidden = true;
    contenidoProfundo.hidden = true;
    inicioProfundo.hidden = false;

    porcentajeProfundo.textContent = "0%";
    rellenoProfundo.style.width = "0%";
});


// Cursor decorativo con forma de fantasma (solo dispositivos con mouse).
(() => {
    const ghostCursor = document.getElementById("ghostCursor");
    if (!ghostCursor || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.classList.add("has-ghost-cursor");
    window.addEventListener("pointermove", (event) => {
        ghostCursor.style.transform = `translate3d(${event.clientX + 14}px, ${event.clientY + 14}px, 0)`;
    }, { passive: true });
})();
