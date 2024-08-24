document.addEventListener("DOMContentLoaded", function () {
    let selectedAnswersByForm = {};

    // Mapa de respuestas correctas para cada formulario
    const correctAnswersMap = {
        'examForm1': ['Centro de Inteligencia criminal CI3 24/7 de la Policía Nacional de Colombia en Bogotá'],
        'examForm2': ['Cámaras de Videovigilancia en ciudades', 'Medios de comunicación y redes sociales', 'Información de servicios de emergencia'],
        'examForm3': ['Activación de unidades de investigación DIJIN en Bogotá, Cali y Medellín.', 'Activación de Plan de Seguridad ante atentados terroristas', 'Cierre y controles en las principales vías de comunicación de las ciudades'],
        'examForm4': ['Portavoz de PNC interviene en TV, llama a la calma y la colaboración ciudadana','Portavoz de PNC da información de punto de contacto único para posibles víctimas', 'Portavoz de PNC informa sobre reinvicación de ELN pero por confirmar']
    };

    // Nombres de las secciones/formularios
    const formSectionNames = {
        'examForm1': 'Mando y Control',
        'examForm2': 'Situación',
        'examForm3': 'Decisión',
        'examForm4': 'Comunicación'
    };

    // Función que guarda las respuestas seleccionadas
    function saveSelectedAnswers(formId, selectedAnswers) {
        selectedAnswersByForm[formId] = selectedAnswers;
    }

    // Función principal para mostrar los resultados
    function showResults() {
        const selectedAnswersContainer = document.getElementById('selectedAnswersContentDisplay');
        const correctAnswersContainers = {
            'examForm1': document.getElementById('answerMando'),
            'examForm2': document.getElementById('answerSituacion'),
            'examForm3': document.getElementById('answerDecision'),
            'examForm4': document.getElementById('answerComunicacion')
        };

        // Limpiar contenedores antes de agregar nuevos elementos
        selectedAnswersContainer.innerHTML = '';
        Object.values(correctAnswersContainers).forEach(container => {
            container.innerHTML = '';
        });

        // Iterar a través de las formas y agregar las respuestas correspondientes
        Object.keys(selectedAnswersByForm).forEach(formId => {
            const sectionName = formSectionNames[formId]; // Obtener el nombre de la sección
            const selectedAnswers = selectedAnswersByForm[formId];
            const correctAnswers = correctAnswersMap[formId];

            // Añadir el nombre de la sección como título en la columna de respuestas seleccionadas
            const selectedSectionTitle = document.createElement('h5');
            selectedSectionTitle.textContent = sectionName;
            selectedSectionTitle.style.color = 'black';  // Asegurar que el título sea visible
            selectedAnswersContainer.appendChild(selectedSectionTitle);

            // Mostrar las respuestas seleccionadas en color negro
            selectedAnswers.forEach(answer => {
                const answerItem = document.createElement('p');
                answerItem.textContent = answer;
                answerItem.style.color = 'black';  // Forzar color negro
                selectedAnswersContainer.appendChild(answerItem);
            });

            // Mostrar las respuestas correctas en color verde, sin agregar otro título
            correctAnswers.forEach(answer => {
                const correctItem = document.createElement('ul');
                correctItem.textContent = answer;
                correctItem.className = 'text-success';  // Aplicar clase de éxito para el color verde
                correctAnswersContainers[formId].appendChild(correctItem);
            });
        });

        // Remover cualquier restricción de altura para asegurar que todo se muestra
        selectedAnswersContainer.style.maxHeight = 'none';
        selectedAnswersContainer.style.overflow = 'visible';

        // Añadir la clase 'show' para mostrar las respuestas con la transición
        selectedAnswersContainer.classList.add('show');

        // Calcular y mostrar el porcentaje de idoneidad
        const totalCorrect = Object.keys(correctAnswersMap).reduce((sum, formId) => {
            const selected = selectedAnswersByForm[formId] || [];
            const correct = correctAnswersMap[formId];
            return sum + selected.filter(answer => correct.includes(answer)).length;
        }, 0);
        const totalPossible = Object.values(correctAnswersMap).reduce((sum, answers) => sum + answers.length, 0);
        const percentage = ((totalCorrect / totalPossible) * 100).toFixed(2);
        document.getElementById('averagePercentage').textContent = `${percentage}%`;

        // Mostrar la sección de resultados
        document.getElementById('resultsSection').style.display = 'block';
    }

    // Manejar el envío de los formularios y guardar las respuestas seleccionadas
    document.querySelectorAll("form[id^='examForm']").forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const formId = event.target.id;
            const selectedAnswers = Array.from(event.target.querySelectorAll('input:checked')).map(input => input.value);
            saveSelectedAnswers(formId, selectedAnswers);
        });
    });

    // Función para validar la contraseña y mostrar los resultados
    function validatePassword() {
        const password = prompt("Ingrese la contraseña para ver los resultados:");
        if (password === "cugc") {
            showResults();  // Mostrar respuestas seleccionadas y correctas
        } else {
            alert("Contraseña incorrecta. Inténtalo de nuevo.");
        }
    }

    // Asignar la función validatePassword al botón de corrección
    document.getElementById('consolidateButton').addEventListener('click', validatePassword);
});
