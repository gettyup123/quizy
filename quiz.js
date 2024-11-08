let questions = [];
let currentQuestionIndex = 0;
let attempts = 0;
const maxAttempts = 3;
let score = 0;  // Track the correct answers

// Log a message to ensure JavaScript is loading
console.log("JavaScript loaded successfully!");

// Load questions from the text file
fetch('questions.txt')
    .then(response => response.text())
    .then(data => {
        questions = data.trim().split('\n').map(line => {
            const [question, answers] = line.split('|');
            return { 
                question: question.trim(), 
                answers: answers.split(',').map(answer => answer.trim().toLowerCase()) 
            };
        });
        displayQuestion();
    })
    .catch(error => console.error('Error loading questions:', error));

// Display the current question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        document.getElementById('question-text').innerText = questions[currentQuestionIndex].question;
        document.getElementById('answer-input').value = '';
        document.getElementById('feedback').innerText = '';
    } else {
        displayFinalScore();  // Show the final score when all questions are completed
    }
}

// Handle answer submission
function submitAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answers.includes(userAnswer)) {
        score++;  // Increment score for a correct answer
        document.getElementById('feedback').innerText = 'Good job! Moving to the next question.';
        currentQuestionIndex++;
        attempts = 0;
        setTimeout(displayQuestion, 1000);
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            document.getElementById('feedback').innerText = 'Out of attempts! Moving to the next question.';
            currentQuestionIndex++;
            attempts = 0;
            setTimeout(displayQuestion, 1000);
        } else {
            document.getElementById('feedback').innerText = `Incorrect. You have ${maxAttempts - attempts} attempts left.`;
        }
    }
}

// Display the final score
function displayFinalScore() {
    document.getElementById('quiz-container').innerHTML = `<h1>Quiz Completed!</h1><p>Your score: ${score} out of ${questions.length}</p>`;
}

// Listen for "Enter" key press in the input field
document.getElementById('answer-input').addEventListener('keyup', function(event) {
    console.log("Key pressed:", event.key);  // Log key presses for troubleshooting
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent any default behavior
        submitAnswer();
    }
});
