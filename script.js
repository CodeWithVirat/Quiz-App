const questions = {
    english: [
        { 
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: 0,
            hint: "It's known as the City of Love."
        },
        { 
            question: "Who wrote 'To Kill a Mockingbird'?",
            options: ["J.K. Rowling", "Harper Lee", "Stephen King", "Ernest Hemingway"],
            answer: 1,
            hint: "The author's first name is Harper."
        },
        { 
            question: "What is the plural form of 'child'?",
            options: ["Children", "Childs", "Childes", "Childs'"],
            answer: 0,
            hint: "The plural form ends with 'ren'."
        },
        { 
            question: "What is the past tense of 'eat'?",
            options: ["Eaten", "Eat", "Eating", "Ate"],
            answer: 3,
            hint: "It's a one-syllable word."
        },
        { 
            question: "Which Shakespeare play features the character Hamlet?",
            options: ["Macbeth", "Hamlet", "Romeo and Juliet", "Othello"],
            answer: 2,
            hint: "The title is also the name of the main character."
        }
    ],
    general: [
        { 
            question: "What is the chemical symbol for water?",
            options: ["CO2", "O2", "NaCl", "H2O" ],
            answer: 3,
            hint: "It consists of two hydrogen atoms and one oxygen atom."
        },
        { 
            question: "Who painted the Mona Lisa?",
            options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
            answer: 0,
            hint: "The artist's first name is Leonardo."
        },
        { 
            question: "What is the largest planet in our solar system?",
            options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
            answer: 2,
            hint: "It's named after the king of the Roman gods."
        },
        { 
            question: "How many continents are there?",
            options: ["5", "7", "6", "8"],
            answer: 1,
            hint: "The answer is a prime number."
        },
        { 
            question: "What year did the Titanic sink?",
            options: ["1912", "1914", "1908", "1920"],
            answer: 0,
            hint: "The year starts with '19'."
        }
    ],
    maths: [
        { 
            question: "What is 2 + 2?",
            options: ["5", "6", "4", "3"],
            answer: 2,
            hint: "It's a simple addition."
        },
        { 
            question: "What is 8 multiplied by 3?",
            options: ["24", "30", "16", "20"],
            answer: 0,
            hint: "It's the multiplication of two single-digit numbers."
        },
        { 
            question: "What is the square root of 25?",
            options: ["5", "4", "6", "7"],
            answer: 0,
            hint: "It's a whole number."
        },
        { 
            question: "What is 10 divided by 2?",
            options: ["4", "5", "6", "3"],
            answer: 1,
            hint: "It's a simple division."
        },
        { 
            question: "What is 3 to the power of 2?",
            options: ["6", "12", "4", "9"],
            answer: 3,
            hint: "It's the result of multiplying 3 by itself."
        }
    ]
};

let currentCategory;
let currentQuestion = 0;
let score = 0;
let timer;

function startQuiz(category) {
    currentCategory = category;
    currentQuestion = 0;
    score = 0;
    document.getElementById('category-selection').classList.add('hide');
    document.getElementById('quiz').classList.remove('hide');
    showQuestion();
    startTimer();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const hintContainer = document.getElementById('hint-container'); // Add this line
    hintContainer.classList.add('hide'); // Hide hint-container
    const question = questions[currentCategory][currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    // Shuffle the options array
    const shuffledOptions = shuffleArray(question.options);

    shuffledOptions.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = () => {
            selectAnswer(index);
        };
        optionsElement.appendChild(li);
    });
}

function shuffleArray(array) {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function selectAnswer(index) {
    clearTimeout(timer);
    const question = questions[currentCategory][currentQuestion];
    if (index === question.answer) {
        score++;
    }
    document.getElementById('score').textContent = score;
    document.querySelectorAll('#options li').forEach(li => {
        li.onclick = null;
    });
    document.getElementById('hint-btn').disabled = true;
    document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions[currentCategory].length) {
        showQuestion();
        startTimer();
        document.getElementById('hint-btn').disabled = false;
        document.getElementById('next-btn').disabled = true;
    } else {
        endQuiz();
    }
}

function startTimer() {
    let timeLeft = 20;
    document.getElementById('time').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft === 0) {
            clearTimeout(timer);
            selectAnswer(-1); // Auto select wrong answer when time runs out
        }
    }, 1000);
}

function displayHint() {
    const question = questions[currentCategory][currentQuestion];
    alert(question.hint);
}

function endQuiz() {
    document.getElementById('quiz').classList.add('hide');
    document.getElementById('result').classList.remove('hide');
    document.getElementById('score').textContent = score;
}

function resetQuiz() {
    document.getElementById('category-selection').classList.remove('hide');
    document.getElementById('result').classList.add('hide');
}
function selectAnswer(index) {
    clearTimeout(timer);
    const question = questions[currentCategory][currentQuestion];
    const options = document.querySelectorAll('#options li');
    
    options.forEach((li, i) => {
        li.style.backgroundColor = 'transparent';
        if (i === question.answer) {
            li.classList.add('correct-answer');
        } else if (i === index) {
            li.classList.add('wrong-answer');
        }
    });

    if (index === question.answer) {
        score++;
    }
    document.getElementById('score').textContent = score;
    options.forEach(li => {
        li.onclick = null;
    });
    document.getElementById('hint-btn').disabled = true;
    document.getElementById('next-btn').disabled = false;
}

function displayHint() {
    const question = questions[currentCategory][currentQuestion];
    alert(question.hint);}

function displayHint() {
        const hintContainer = document.getElementById('hint-container');
        const question = questions[currentCategory][currentQuestion];
        hintContainer.textContent = question.hint;
        hintContainer.classList.remove('hide');
        
        // Hide the hint after 10 seconds
        setTimeout(() => {
            hintContainer.classList.add('hide');
        }, 10000);
    }
    
document.addEventListener("DOMContentLoaded", function() {
    const logos = document.querySelectorAll('.logo-container .logo');
    let currentIndex = 0;

    setInterval(() => {
        // Hide all logos
        logos.forEach(logo => {
            logo.classList.remove('active');
        });

        // Show next logo
        logos[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % logos.length;
    }, 3000); // Change logo every 3 seconds (adjust as needed)
});
function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const hintContainer = document.getElementById('hint-container'); // Add this line
    hintContainer.classList.add('hide'); // Hide hint-container
    const question = questions[currentCategory][currentQuestion];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = () => {
            selectAnswer(index);
        };
        optionsElement.appendChild(li);
    });
}
