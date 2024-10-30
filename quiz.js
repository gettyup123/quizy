// Initialize variables
let vragen = [];
let currentQuestionIndex = 0;
let attempts = 0;

// Load questions from the .txt file
async function loadQuestions() {
    try {
        const response = await fetch('questions.txt');
        const data = await response.text();
        vragen = data.split('\n').map(line => {
            const [question, answers] = line.split('|').map(part => part.trim());
            return { question, answers: answers.split(',').map(ans => ans.trim()) };
        });
        displayQuestion();
    } catch (error) {
        console.error("Error loading questions:", error);
    }
}

// Display the first question
function displayQuestion() {
    const questionContainer = document.getElementById('quiz-container');
    const currentQuestion = vragen[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <input type="text" id="answer-input" placeholder="Type your answer here">
        <button onclick="checkAnswer()">Submit Answer</button>
    `;
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const correctAnswers = vragen[currentQuestionIndex].answers;
    const feedback = document.getElementById('feedback');
    const retry = document.getElementById('retry');
    const attemptsLeft = document.getElementById('attempts-left');
    attempts++;

    if (correctAnswers.includes(userAnswer)) {
        feedback.textContent = 'Goed gedaan!';
        retry.textContent = '';
        attemptsLeft.textContent = '';
        nextQuestion();
    } else {
        if (attempts >= 3) {
            retry.textContent = "Jammer, we gaan door naar de volgende vraag.";
            attemptsLeft.textContent = '';
            nextQuestion();
        } else {
            retry.textContent = "Helaas... dat was fout.";
            attemptsLeft.textContent = `Je hebt nog: ${3 - attempts} pogingen.`;
        }
    }
}

// Move to the next question
function nextQuestion() {
    attempts = 0;
    currentQuestionIndex++;
    if (currentQuestionIndex < vragen.length) {
        displayQuestion();
    } else {
        document.getElementById('quiz-container').innerHTML = "<p>Je hebt alle vragen beantwoord!</p>";
        document.getElementById('feedback').textContent = '';
        document.getElementById('retry').textContent = '';
        document.getElementById('attempts-left').textContent = '';
    }
}

// Start the quiz by loading questions
loadQuestions();
