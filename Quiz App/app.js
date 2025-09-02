const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean"
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
            answer: "Vatican City"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
            answer: "Harper Lee"
        },
        {
            question: "Who was the first odia women to climb Mount Everest ?",
            options:["Malavath purna","Kalpana Dash","Bachendri Pal","Arunima Sinha"],
            answer:"Kalpana Dash"
        }
    ];
let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    const questionCountElem = document.getElementById('question-count');
    const progressFillElem = document.getElementById('progress-fill');
    const questionTextElem = document.getElementById('question-text');
    const optionsGridElem = document.getElementById('options-grid');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    const quizContainer = document.getElementById('quiz-container');

    function displayQuestion() {
        answered = false;
        const currentQuestion = questions[currentQuestionIndex];
        questionCountElem.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionTextElem.textContent = currentQuestion.question;
        
        progressFillElem.style.width = `${((currentQuestionIndex) / questions.length) * 100}%`;
        
        optionsGridElem.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-button');
            button.addEventListener('click', () => handleAnswer(option, currentQuestion.answer));
            optionsGridElem.appendChild(button);
        });
        
        nextButton.classList.add('hidden');
    }

    function handleAnswer(selectedOption, correctAnswer) {
        if (answered) return;
        answered = true;
        
        const optionButtons = optionsGridElem.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
        });
        
        if (selectedOption === correctAnswer) {
            score++;
        }
        
        nextButton.classList.remove('hidden');
    }
    
    function displayResults() {
        const percentage = (score / questions.length) * 100;
        quizContainer.innerHTML = `
            <div class="result-screen">
                <h2 class="result-title">Quiz Complete!</h2>
                <p class="text-gray-500">You scored:</p>
                <p class="result-score">${score} / ${questions.length}</p>
                <p class="text-gray-500 text-lg">Your score is <span class="font-bold text-indigo-500">${percentage.toFixed(0)}%</span></p>
                <button id="restart-quiz-button" class="nav-button primary-button">Restart Quiz</button>
            </div>
        `;
        document.getElementById('restart-quiz-button').addEventListener('click', restartQuiz);
    }
    
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        answered = false;
        
        // Reset the container content
        quizContainer.innerHTML = `
            <div id="quiz-content">
                <div class="flex justify-between items-center text-sm font-medium text-gray-500 mb-4">
                    <span id="question-count"></span>
                </div>
                <div class="progress-bar">
                    <div id="progress-fill" class="progress-fill"></div>
                </div>
                <p class="question-text mt-6" id="question-text"></p>
                <div class="options-grid mt-6" id="options-grid"></div>
                <div class="navigation-buttons">
                    <button id="next-button" class="nav-button primary-button hidden">Next</button>
                </div>
            </div>
        `;
        
        // Re-assign DOM elements after recreation
        const newNextButton = document.getElementById('next-button');
        newNextButton.addEventListener('click', () => {
             if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            } else {
                displayResults();
            }
        });
        
        // Re-run the initial display
        displayQuestion();
        
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        nextButton.addEventListener('click', () => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            } else {
                displayResults();
            }
        });
        displayQuestion();
    });