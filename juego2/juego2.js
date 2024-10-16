const questions = [
    {
        concept: "Un dato es:",
        options: ["Un", "número", "Una", "cadena", "Un", "espacio", "en", "memoria"],
        correct: ["Un", "número", "Una", "cadena", "Un", "espacio", "en", "memoria"]
    },
    {
        concept: "Un algoritmo es:",
        options: ["Un", "conjunto", "de", "instrucciones","para", "resolver", "un", "problema"],
        correct: ["Un", "conjunto", "de", "instrucciones","para","resolver","un","problema"]
    },
    {
        concept: "Una variable es:",
        options: ["dato", "espacio", "almacenar", "Un", "un", "para","dato"],
        correct: ["Un", "espacio", "para", "almacenar", "un", "dato"]
    },
    {
        concept: "Una array es:",
        options: [ "Una", "secuencia", "de", "posiciones","de", "la", "memoria", "central", "que", "contiene","un","tipo","de","dato"],
        correct: [ "Una", "secuencia ", "de", "posiciones","de", "la", "memoria", "central", "que", "contiene","un","tipo","de","dato"]
    },
    {
        concept: "Un contador es:",
        options: ["Una", "variable", "cuyo", "valor", "se", "incrementa","o", "decrementa", "cada", "vez", "que", "se","produce", "un", "determinado", "suceso", "o", "ocurre","acción"],
        correct: ["Una", "variable", "cuyo", "valor", "se", "incrementa","o", "decrementa", "cada", "vez", "que", "se","produce", "un", "determinado", "suceso", "o", "ocurre","acción"]
    },
    {
        concept: "Un acumulador es:",
        options: ["Una", "variable", "cuyo", "valor", "se", "incrementa","o","decrementa","en","una","cantidad","determinada"],
        correct: ["Una", "variable", "cuyo", "valor", "se", "incrementa","o","decrementa","en","una","cantidad","determinada"]
    },
    {
        concept: "Un bucle es:",
        options: ["Una", "sección ", "de", "código", "que", "se","repite"],
        correct: ["Una", "sección", "de", "código", "que", "se","repite"]
    },
    {
        concept: "Un dato numerico es:",
        options: ["Un", "dato", "que", "contiene", "el", "conjunto","de","los","valores","numéricos"],
        correct: ["Un", "dato", "que", "contiene", "el", "conjunto","de","los","valores","numéricos"]
    },
    {
        concept: "Un dato lógico o booleano es:",
        options: ["Un", "dato", "que", "solo", "puede", "tomar","uno","de","dos","valores","verdaderoo cierto (True)","o","falso(False)"],
        correct: ["Un", "dato", "que", "solo", "puede", "tomar","uno","de","dos","valores","verdadero o cierto(True)","o","falso"]
    },

    {
        concept: "Una constante es:",
        options: ["Un", "dato", "que", "permanece", "sin", "cambios","durante","todo","el","desarrollo","del","algoritmo","o","durante","la","ejecución","del","programa"],
        correct: ["Un", "dato", "que", "permanece", "sin", "cambios","durante","todo","el","desarrollo","del","algoritmo","o","durante","la","ejeución","del","programa"]
    },
    {
        concept: "Un dato tipo caracter es:",
        options: ["Un", "dato", "que", "contiene", "un", "solo","caracter"],
        correct: ["Un", "dato", " que", "contiene", "un", "solo","caracter"]
    },
    {
        concept: "Un dato tipo cadena es :",
        options: ["Un", "dato", "de", "una", "sucesión", "de","caracteres","que","se","encuentran","delimitados","por","una","comilla","o","dobles","comillas"],
        correct: ["Un", "dato", "de", "una", "sucesión", "de","caracteres","que","se","encuentran","delimitados","por","una","comilla","o","dobles","comillas"]
    },
    {
        concept: "La estructura mientras es:",
        options: ["Una", "estructura", "en", "el","que", "el","cuerpo", "del","bucle","se","repite","mientras","se","cumple","una","determinada","condición"],
        correct: ["Una", "estructura", "en", "el","que", "el","cuerpo", "del","bucle","se","repite","mientras","se","cumple","una","determinada","condición"]
    },
    {
        concept: "La estructura desde/para es:",
        options: ["Una", "estructura", "en", "el", "que", "el","número","de","iteraciones","es","fijo","y","las","iteraciones","se","controlan","de","manera","automática"],
        correct: ["Una", "estructura", "en", "el", "que", "el","número","de","iteraciones","es","fijo","y","las","iteraciones","se","controlan","de","manera","automática"]
    }
];

let currentQuestionIndex = 0;
let correctCount = 0;
let attempts = 0; // Contador de intentos

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("concept").innerText = question.concept;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';

    const shuffledOptions = shuffleArray(question.options);
    shuffledOptions.forEach(option => {
        const optionElement = createOptionElement(option);
        optionsContainer.appendChild(optionElement);
    });

    updateMessage('');
    attempts = 0; // Reiniciar el contador de intentos
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createOptionElement(option) {
    const div = document.createElement("div");
    div.className = 'option';
    div.innerText = option;
    div.setAttribute('draggable', true);
    div.ondragstart = (e) => e.dataTransfer.setData("text", option);
    return div;
}

function handleDrop(e) {
    e.preventDefault();
    const option = e.dataTransfer.getData("text");
    const dropArea = document.getElementById("concept");

    // Añadir la respuesta solo si no está ya presente
    const answers = Array.from(dropArea.querySelectorAll(".dropped-option")).map(div => div.innerText);
    if (!answers.includes(option)) {
        const answerElement = document.createElement("div");
        answerElement.className = 'dropped-option';
        answerElement.innerText = option;
        answerElement.onclick = () => removeOption(answerElement);
        dropArea.appendChild(answerElement);
    }
}

function removeOption(element) {
    const optionsContainer = document.getElementById("options");
    optionsContainer.appendChild(createOptionElement(element.innerText));
    element.remove();
}

function checkAnswer() {
    const question = questions[currentQuestionIndex];
    const correctAnswers = question.correct.join(" ");
    const userAnswers = Array.from(document.getElementById("concept").querySelectorAll(".dropped-option")).map(div => div.innerText).join(" ");

    attempts++; // Incrementar el contador de intentos

    if (correctAnswers === userAnswers) {
        updateMessage("¡Correcto!");
        correctCount++;
        document.getElementById("nextButton").disabled = false; // Habilitar el botón siguiente
    } else {
        if (attempts < 3) {
            updateMessage(`Incorrecto. Intentos restantes: ${3 - attempts}`);
        } else {
            updateMessage(`Incorrecto. Respuesta correcta: ${correctAnswers}`);
            document.getElementById("nextButton").disabled = false; // Habilitar el botón siguiente después de 3 intentos
        }
    }
}

function updateMessage(message) {
    document.getElementById("message").innerText = message;
}

function showScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `Tu puntaje: ${correctCount} / ${questions.length}`;
}

function restartGame() {
    currentQuestionIndex = 0;
    correctCount = 0;
    document.getElementById("checkButton").disabled = false; // Habilitar el botón comprobar
    document.getElementById("nextButton").disabled = true; // Deshabilitar el botón siguiente
    document.getElementById("score").innerText = '';
    loadQuestion(); // Cargar la primera pregunta
}

document.getElementById("concept").ondragover = (e) => e.preventDefault();
document.getElementById("concept").ondrop = handleDrop;

document.getElementById("checkButton").onclick = checkAnswer;

document.getElementById("nextButton").onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
        document.getElementById("checkButton").disabled = true;
        document.getElementById("nextButton").disabled = true;
    }
};

// Inicializar el botón de reinicio
document.getElementById("restartButton").onclick = restartGame;

// Inicializar la primera pregunta
loadQuestion();
