// auth baslangici
const storedUser = localStorage.getItem('vocab_user');
if(!storedUser){
    window.location.href = "login.html"; // daha onceden loginli kullanici yoksa logine
}
const currentUser = JSON.parse(storedUser);

// mode yuklemesi
let currentMode = 'new'; // veya review
let isProcessing = false; // multi-click engelleme
let currentWordData = null;

// domlar
const questionElement = document.querySelector('.question-word');
const optionsGrid = document.querySelector('.option-grid');
const idkBtn = document.querySelector('.idk-btn');

const quizContent = document.querySelector('.quiz-content');
const statsContent = document.querySelector('.stats-content');
const historyList = document.getElementById('history-list');
let myChart = null;

const navButtons = document.querySelectorAll('.main-nav .win-btn');
const themeButtons = document.querySelectorAll('.theme-switch-wrapper .win-btn')

// dom initialize
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    setupThemeLogic();
    setupNavLogic();

    idkBtn.addEventListener('click', () => handleAnswer(null,null, currentWordData));
});

// logic kismi
async function loadQuestion(){
    isProcessing = false;
    optionsGrid.innerHTML = '<p style="padding:20px;">Loading...</p>' // loading texti, eger sira gelirse tabi
    questionElement.textContent = "...";
    idkBtn.disabled = false;

    try{
        let data;
        if(currentMode === 'new'){
            data = await ApiService.getNewWord(currentUser.userId);
        }else{
            data = await ApiService.getReviewWord(currentUser.userId);
        }

        if(!data || data.finished || data.empty){
            showFinishedState(data);
            return;
        }

        currentWordData = data;
        renderQuiz(data);
    }catch(error){
        console.error("Error loading question:", error);
        optionsGrid.innerHTML = "<p>Error loading data. Is the server running?</p>";
    }
}

function renderQuiz(data){
    questionElement.textContent = data.englishWord;
    optionsGrid.innerHTML = "";
    
    data.options.forEach(optionText =>{
        const btn = document.createElement('button');
        btn.className = "win-btn option-btn"; //css bozulmasin
        btn.textContent = optionText;

        btn.addEventListener('click', () => handleAnswer(optionText, btn, data));
        optionsGrid.appendChild(btn);
    });
}

async function handleAnswer(selectedOption, btnElement, data){
    console.log("Button clicked!");
    
    if(isProcessing){  // multi-click 
        console.log("Blocked: Processing is already true.");
        return;
    }; 
    isProcessing = true;
    idkBtn.disabled = true;

    const userAnswer = selectedOption ? selectedOption.trim() : null;
    const correctAnswer = data.correctMeaning ? data.correctMeaning.trim() : null;

    const isCorrect = Boolean(userAnswer && (userAnswer === correctAnswer));

    console.log(`User: "${userAnswer}", Correct: "${correctAnswer}", Result: ${isCorrect}`);

    if (btnElement) {
        if (isCorrect) {
            btnElement.style.backgroundColor = "#4CAF50";
            btnElement.style.color = "white";
        } else {
            btnElement.style.backgroundColor = "#F44336";
            btnElement.style.color = "white";
            highlightCorrectAnswer(data.correctMeaning);
        }
    } else {
        highlightCorrectAnswer(data.correctMeaning);
    }
    
    try {
        await ApiService.submitAnswer(currentUser.userId, data.wordId, isCorrect);
        console.log("API Success");
    } catch (err) {
        console.error("API Failed:", err);
    }
    
    setTimeout(() => {
        loadQuestion(); 
    }, 1500);
}

function highlightCorrectAnswer(correctText){
    const buttons = optionsGrid.querySelectorAll('button');
    buttons.forEach(btn => {
        if(btn.textContent === correctText){
            btn.style.backgroundColor = "#4CAF50";
            btn.style.color = "white" ;
        }
    });
}

function showFinishedState(data){
    questionElement.textContent = "Great Job!";
    optionsGrid.innerHTML = "";

    if(currentMode === 'new'){
        optionsGrid.innerHTML = "<p>You have seen all available words!</p>";
    } else {
        optionsGrid.innerHTML = "<p>No words pending review. Go learn new ones!</p>";
    }
    idkBtn.disabled = true;
}


// kod yardimcilari
function setupNavLogic() {
    // buton 0: vocab quiz 
    navButtons[0].addEventListener('click', () => {
        updateNavActiveState(0);
        currentMode = 'new';
        showQuizView();
        loadQuestion();
    });

    // button 1: review Words
    navButtons[1].addEventListener('click', () => {
        updateNavActiveState(1);
        currentMode = 'review';
        showQuizView();
        loadQuestion();
    });

    // button 2: statistics 
    navButtons[2].addEventListener('click', () => {
        updateNavActiveState(2);
        showStatsView();
    });
}

function updateNavActiveState(activeIndex) {
    navButtons.forEach((btn, index) => {
        if (index === activeIndex) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function setupThemeLogic() {
    // 98' tema
    themeButtons[0].addEventListener('click', () => {
        document.body.classList.remove('modern');
        themeButtons[0].classList.add('active');
        themeButtons[1].classList.remove('active');
    });

    // Modern tema
    themeButtons[1].addEventListener('click', () => {
        document.body.classList.add('modern');
        themeButtons[1].classList.add('active');
        themeButtons[0].classList.remove('active');
    });
}


function showQuizView() {
    statsContent.style.display = 'none';
    quizContent.style.display = 'flex'; 
}

async function showStatsView() {
    quizContent.style.display = 'none';
    statsContent.style.display = 'block';

    // statlar
    const stats = await ApiService.getStats(currentUser.userId);
    renderChart(stats);

    // history
    const history = await ApiService.getHistory(currentUser.userId);
    renderHistory(history);
}



function renderChart(stats) {
    const ctx = document.getElementById('myChart');

    // onceden varsa reset
    if (myChart) {
        myChart.destroy();
    }

    // onceden veri yoksa default ekleme, varsa zaten kendisi
    const seen = stats ? stats.totalSeen : 0;
    const correct = stats ? stats.totalCorrect : 0;
    const wrong = stats ? stats.totalWrong : 0;

    myChart = new Chart(ctx, {
        type: 'bar', 
        data: {
            labels: ['Total Seen', 'Correct', 'Wrong'],
            datasets: [{
                label: 'Today\'s Activity',
                data: [seen, correct, wrong],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Blue
                    'rgba(75, 192, 192, 0.6)', // Green
                    'rgba(255, 99, 132, 0.6)'  // Red
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } }
            }
        }
    });
}

function renderHistory(history) {
    historyList.innerHTML = "";

    if (!history || history.length === 0) {
        historyList.innerHTML = "<li>No recent history.</li>";
        return;
    }

    history.forEach(item => {
        const li = document.createElement('li');
        
        const status = item.isCorrect ? '<span style="color:green">✔ Correct</span>' : '<span style="color:red">✘ Wrong</span>';
        
        li.innerHTML = `Word ID: ${item.wordId} | ${status} <small>(${new Date(item.attemptAt).toLocaleTimeString()})</small>`;
        li.style.borderBottom = "1px solid #eee";
        li.style.padding = "5px";
        
        historyList.appendChild(li);
    });
}