let questions = [];
let currentQuestionIndex = 0;
let attempts = 0;
const maxAttempts = 3;
let score = 0; // Variable to track the number of correct answers

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
        // Display final score when quiz is complete
        document.getElementById('quiz-container').innerHTML = `<p>Quiz complete! You got ${score} out of ${questions.length} questions right.</p>`;
    }
}

// Handle answer submission
function submitAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answers.includes(userAnswer)) {
        document.getElementById('feedback').innerText = 'Good job! Moving to the next question.';
        score++; // Increase score for a correct answer
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

// Listen for "Enter" key press in the input field
document.getElementById('answer-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        submitAnswer();
    }
    function submitAnswer() {
    const userAnswer = document.getElementById('answer-input').value.trim().toLowerCase();
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answers.includes(userAnswer)) {
        document.getElementById('feedback').innerText = 'Good job! Moving to the next question.';
        score++; // Increase score for a correct answer
        currentQuestionIndex++;
        attempts = 0;
        setTimeout(displayQuestion, 1000);
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            document.getElementById('feedback').innerText = `Out of attempts! The correct answer(s) was: ${currentQuestion.answers.join(', ')}. Moving to the next question.`;
            currentQuestionIndex++;
            attempts = 0;
            setTimeout(displayQuestion, 7000); // Allow 7 seconds to read the correct answer
        } else {
            document.getElementById('feedback').innerText = `Incorrect. You have ${maxAttempts - attempts} attempts left.`;
        }
    }
}

});

