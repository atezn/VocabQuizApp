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
const historyPanel = document.getElementById('history-panel');
const historyListSlidebar = document.getElementById('history-list-slidebar');
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

        if (currentMode === 'review') {
        historyPanel.style.visibility = 'hidden'; // kopya onlemek icin gizleme
        }else{
            historyPanel.style.visibility = 'visible'; 
            loadSidebarHistory(); 
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

    if(currentMode === 'new'){
        historyPanel.style.visibility = 'visible';
    }
}

async function showStatsView() {
    quizContent.style.display = 'none';
    statsContent.style.display = 'block';

    historyPanel.style.visibility = 'hidden';
    
    // statlar
    const monthlyStats = await ApiService.getMonthlyStats(currentUser.userId);
    renderAdvancedChart(monthlyStats);

    // history
    const history = await ApiService.getHistory(currentUser.userId);
    renderHistory(history);
}



function renderAdvancedChart(statList){
    const ctx = document.getElementById('myChart');

    if(myChart){
        myChart.destroy(); // reset 
    }

    // Map data
    const labels = statList.map(s => new Date(s.dateRecorded).toLocaleDateString());
    const dataSeen = statList.map(s => s.totalSeen);
    const dataCorrect = statList.map(s => s.totalCorrect);

    // --- FIX 2: CHANGE 's.totalseen' TO 's.totalSeen' (Capital S) ---
    const dataAccuracy = statList.map(s => {
        return s.totalSeen > 0 ? ((s.totalCorrect / s.totalSeen) * 100).toFixed(2) : 0;
    });

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Accuracy (%)',
                    data: dataAccuracy,
                    type: 'line', // This makes the Yellow Line
                    borderColor: '#FFD700',
                    backgroundColor: '#FFD700',
                    borderWidth: 3,
                    yAxisID: 'y1', // Binds to Right Axis
                    tension: 0.4
                },
                {
                    label: 'Correct Words',
                    data: dataCorrect,
                    backgroundColor: '#4CAF50',
                    yAxisID: 'y', // Binds to Left Axis
                },
                {
                    label: 'Wrong Words',
                    // Note: You had 'statsList' here, but the argument is named 'statList'
                    data: statList.map(s => s.totalWrong), 
                    backgroundColor: '#F44336',
                    yAxisID: 'y',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Fits the container better
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Words Count' },
                    beginAtZero: true
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 0,
                    max: 100,
                    grid: { drawOnChartArea: false }, 
                    title: { display: true, text: 'Accuracy %' }
                }
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
        
        // Display the English Word instead of ID
li.innerHTML = `<strong>${item.englishWord}</strong>
                ${status} 
                <small>(${new Date(item.attemptAt).toLocaleTimeString()})</small>
                `;
        li.style.borderBottom = "1px solid #eee";
        li.style.padding = "5px";
        
        historyList.appendChild(li);
    });
}

async function loadSidebarHistory() {
    const history = await ApiService.getHistory(currentUser.userId);
    historyListSlidebar.innerHTML = "";

    if(!history || history.length === 0){
        historyListSlidebar.innerHTML = "<li>No recent history.</li>";
        return;
    }

    history.forEach(item => {
        const li = document.createElement('li');
        const cssClass = item.isCorrect ? 'correct-history' : 'wrong-history';
        li.className = `history-item ${cssClass}`;

        li.innerHTML = `
            <strong>${item.englishWord}</strong><br/>
            <small>${item.turkishMeaning}</small><br/>`;

        historyListSlidebar.appendChild(li);
    })
}