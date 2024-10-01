import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCKIDtUvTnqLhKTyNQjJeSLwI4wNR9GwQc",
    authDomain: "novocentro-7b1b0.firebaseapp.com",
    projectId: "novocentro-7b1b0",
    storageBucket: "novocentro-7b1b0.appspot.com",
    messagingSenderId: "408239853405",
    appId: "1:408239853405:web:8a0a42a1b668bf1499e2b4",
    measurementId: "G-9BEEMLPBQ2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
    const formSections = document.querySelectorAll('.form-section');
    let currentSection = 0;

    function showSection(index) {
        formSections.forEach((section, i) => {
            section.style.display = (i === index) ? 'block' : 'none';
        });
    }

    function validateSection(index) {
        const inputs = formSections[index].querySelectorAll('input, textarea, select');
        let valid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                valid = false;
            }
        });

        // Validação do email
        const emailInput = formSections[1].querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim() !== '' && !/\S+@\S+\.\S+/.test(emailInput.value)) { // Funciona validando se tem @ e . 
            valid = false;
        }

        return valid;
    }

    showSection(currentSection);

    document.querySelectorAll('.nextButton').forEach(button => {
        button.addEventListener('click', function () {
            if (validateSection(currentSection)) {
                if (currentSection < formSections.length - 1) {
                    currentSection++;
                    showSection(currentSection);
                }
            } else {
                alert('Por favor, responda todas as perguntas corretamente antes de continuar.');
            }
        });
    });

    document.querySelectorAll('.prevButton').forEach(button => {
        button.addEventListener('click', function () {
            if (currentSection > 0) {
                currentSection--;
                showSection(currentSection);
            }
        });
    });

    document.getElementById('meuFormulario').addEventListener('submit', async function (event) {
        event.preventDefault();

        const respostas = {};
        formSections.forEach((section) => {
            const inputs = section.querySelectorAll('input, textarea, select');
            inputs.forEach((input) => {
                respostas[input.name] = input.value;
            });
        });

        try {
            await addDoc(collection(db, 'respostas-consulta-site'), respostas);
            const mensagemDiv = document.getElementById('mensagem');
            mensagemDiv.innerText = 'Resposta enviada com sucesso!';
            mensagemDiv.style.color = 'green';
            document.getElementById('meuFormulario').reset();
        } catch (error) {
            const mensagemDiv = document.getElementById('mensagem');
            mensagemDiv.innerText = 'Erro ao enviar resposta: ' + error.message;
            mensagemDiv.style.color = 'red';
        }
    });
});