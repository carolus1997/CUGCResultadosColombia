document.addEventListener("DOMContentLoaded", function () {
    const formSections = document.querySelectorAll('.form-section');
    const cards = document.querySelectorAll('.card');
    const formIndicators = document.querySelectorAll('.form-indicator');
    const progressBar = document.getElementById('progressBar');
    const printAnswersButton = document.getElementById('printAnswersButton');
    const consolidateButton = document.getElementById('consolidateButton');
    let progressValue = 0; // Valor inicial de la barra de progreso

    let selectedAnswersByForm = {}; // Objeto para almacenar las respuestas seleccionadas por cada formulario

    // Mapa de respuestas correctas (puede ser dinámico o estático, dependiendo del caso)
    const correctAnswersMap = {
        'examForm1': ['Centro de Inteligencia criminal CI3 24/7 de la Policía Nacional de Colombia en Bogotá'],
        'examForm2': ['Cámaras de Videovigilancia en ciudades', 'Medios de comunicación y redes sociales', 'Información de servicios de emergencia'],
        'examForm3': ['Activación de unidades de investigación DIJIN en Bogotá, Cali y Medellín.', 'Activación de Plan de Seguridad ante atentados terroristas', 'Cierre y controles en las principales vías de comunicación de las ciudades'],
        'examForm4': ['Portavoz de PNC interviene en TV, llama a la calma y la colaboración ciudadana','Portavoz de PNC da información de punto de contacto único para posibles víctimas', 'Portavoz de PNC informa sobre reinvicación de ELN pero por confirmar']
    };

    // Función para mostrar el formulario correspondiente
    function showFormSection(targetId) {
        formSections.forEach(section => {
            section.style.display = 'none'; // Ocultar todos los formularios
        });
        document.getElementById(targetId).style.display = 'block'; // Mostrar el formulario correspondiente

        // Actualizar indicadores
        formIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        document.querySelector(`.form-indicator[data-target="${targetId}"]`).classList.add('active');
    }

    // Manejar clics en las tarjetas para cambiar de formulario
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.getAttribute('data-target');
            showFormSection(target);
        });
    });

    // Manejar clics en los indicadores para cambiar de formulario
    formIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const target = indicator.getAttribute('data-target');
            showFormSection(target);
        });
    });

    // Mostrar el primer formulario al cargar la página
    showFormSection('mando-control');

    // Manejar el envío de formularios y pasar al siguiente formulario
    document.querySelectorAll("form[id^='examForm']").forEach((form, index) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const formId = event.target.id;
            const selectedAnswers = Array.from(event.target.querySelectorAll('input:checked')).map(input => input.value);

            // Guardar las respuestas seleccionadas
            selectedAnswersByForm[formId] = selectedAnswers;

            // Bloquear el botón de envío para que no se pueda pulsar de nuevo
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            // Avanzar la barra de progreso un 25%
            progressValue = Math.min(progressValue + 25, 100);
            progressBar.style.width = progressValue + '%';
            progressBar.setAttribute('aria-valuenow', progressValue);
            progressBar.textContent = progressValue + '%';

            // Mostrar el siguiente formulario automáticamente después del envío, si hay otro formulario disponible
            if (index < formSections.length - 1) {
                const nextFormId = formSections[index + 1].id;
                showFormSection(nextFormId);
            }

            // Si la barra de progreso alcanza el 100%, mostrar los botones
            if (progressValue === 100) {
                printAnswersButton.style.display = 'inline-block';
                consolidateButton.style.display = 'inline-block';
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const formSections = document.querySelectorAll(".form-section");

    const options = [
        ["Drones de las fuerzas aéreas colombianas", "Cámaras de Videovigilancia en ciudades", "Medios de comunicación y redes sociales", "Patrullas de fuerzas armadas que llegan a la zona de los atentados", "Sistema de satélites de la PNC", "Interrogatorios a miembros ELN en prisión", "Interrogatorio a miembros ex-FARC en prisión", "Información de servicios de emergencia", "Cierre de la frontera entre Colombia y Venezuela"],
        ["Reforzamiento de la seguridad en prisiones de Colombia", "Activación de unidades de investigación DIJIN en Bogotá, Cali y Medellín.", "Declaración por la PNC de Conflicto Armado interno", "Cierre de los aeropuertos de las ciudades afectadas", "Activación de Plan de Seguridad ante atentados terroristas", "Cierre del espacio aéreo colombiano", "Cierre y controles en las principales vías de comunicación de las ciudades ", "Despliegue de los comandos jungla en las ciudades.", "Evacuación de todas las víctimas al mismo hospital en Bogotá"],
        ["No se proporciona ninguna información institucional", "Portavoz de PNC interviene en TV, llama a la calma y la colaboración ciudadana", "Portavoz de Fuerzas Armadas informa de activación de conflicto armado interno", "Portavoz de PNC da información de punto de contacto único para posibles víctimas", "Portavoz de PNC da información detallada de las víctimas y punto de información", "Portavoz de PNC informa sobre reinvicación de ELN pero por confirmar", "Portavoz Fiscalia informa sobre autoría de ELN", "Portavoz de Fuerzas Armadas informa intervención del ejército", "Informan portavoces de PNC de Bogotá, Cali y Medellín"]
    ];

    // Inicialmente oculta todas las secciones del formulario
    formSections.forEach(section => section.classList.add('hidden'));

    // Maneja el clic en las tarjetas para mostrar el formulario correspondiente
    cards.forEach(card => {
        card.addEventListener("click", function (event) {
            event.preventDefault();
            const targetForm = document.getElementById(card.dataset.target);

            formSections.forEach(section => {
                section.classList.add('hidden');
                section.classList.remove("active");
            });

            targetForm.classList.remove('hidden');
            setTimeout(() => {
                targetForm.classList.add("active");
                targetForm.scrollIntoView({ behavior: 'smooth' });
            }, 10);
        });
    });

    // Genera las opciones para las preguntas
    function generateOptions(questionIndex, optionsList) {
        const questionDiv = document.getElementById(`options${questionIndex + 2}`);
        optionsList.forEach(option => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "form-check-input";
            checkbox.name = `question${questionIndex + 2}`;
            checkbox.value = option;

            const label = document.createElement("label");
            label.className = "form-check-label";
            label.textContent = option;

            const div = document.createElement("div");
            div.className = "form-check";
            div.appendChild(checkbox);
            div.appendChild(label);
            questionDiv.appendChild(div);

            // Limita la selección a 3 opciones
            checkbox.addEventListener("change", function () {
                const checkedCheckboxes = questionDiv.querySelectorAll('input[type="checkbox"]:checked');
                questionDiv.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                    cb.disabled = checkedCheckboxes.length >= 3 && !cb.checked;
                    cb.parentNode.classList.toggle("disabled-checkbox", cb.disabled);
                });
            });
        });
    }

    // Genera opciones para cada pregunta basada en el índice
    options.forEach((optionsList, index) => generateOptions(index, optionsList));

    // Maneja el envío del formulario
    document.querySelectorAll("form[id^='examForm']").forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const currentFormSection = form.parentElement;
            const formData = new FormData(form);
            const selectedAnswers = [];

            formData.forEach((value) => {
                selectedAnswers.push(value);
            });

            updateChart(form.id, selectedAnswers);

            currentFormSection.classList.add('fade-out');
            setTimeout(() => {
                currentFormSection.classList.remove('active');
                currentFormSection.classList.add('hidden');
                currentFormSection.classList.remove('fade-out');
            }, 500);

            // Muestra el modal de confirmación
            $('#confirmationModal').modal('show');

            let countdown = 5;
            const countdownElement = document.getElementById('countdown');

            const timer = setInterval(() => {
                countdownElement.textContent = countdown--;
                if (countdown < 0) {
                    clearInterval(timer);
                    $('#confirmationModal').modal('hide');
                }
            }, 1000);
        });
    });
});


