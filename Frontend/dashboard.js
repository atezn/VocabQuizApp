// auth
const storedUser = localStorage.getItem('vocab_user');
if (!storedUser) {
    window.location.href = "login.html";
}
const currentUser = JSON.parse(storedUser);

// dom
const tableBody = document.getElementById('word-list-body');
const modal = document.getElementById('word-modal');
const modalTitle = document.getElementById('modal-title');


const inpId = document.getElementById('edit-word-id');
const inpEng = document.getElementById('input-english');
const inpTr = document.getElementById('input-turkish');
const inpCefr = document.getElementById('input-cefr');

// initialize
document.addEventListener('DOMContentLoaded', () => {
    loadMyWords();
});


// fonksiyonlar


// read
async function loadMyWords() {
    tableBody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
    
    try {
        const words = await ApiService.getMyWords(currentUser.userId);
        renderTable(words);
    } catch (error) {
        tableBody.innerHTML = '<tr><td colspan="4" style="color:red">Error loading words</td></tr>';
    }
}

// render
function renderTable(words) {
    globalWordList = words;
    
    tableBody.innerHTML = ""; 
    
    if (words.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No custom words found. Add one!</td></tr>';
        return;
    }

    words.forEach(word => {

        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td><strong>${word.englishWord}</strong></td>
            <td>${word.turkishMeaning}</td>
            <td><span class="badge">${word.cefrLevel}</span></td>
            <td>
                <button class="win-btn action-btn" onclick="openEditMode(${word.wordId})">Edit</button>
                <button class="win-btn action-btn btn-delete" onclick="handleDelete(${word.wordId})">X</button>
            </td>
        `;
        

        row.dataset.wordInfo = JSON.stringify(word); // burayi yeniden arastir
        
        tableBody.appendChild(row);
    });
}

// create
function openModal() {

    inpId.value = ""; 
    inpEng.value = "";
    inpTr.value = "";
    inpCefr.value = "A1";
    
    modalTitle.textContent = "Add New Word";
    modal.style.display = "flex"; 
}

function closeModal() {
    modal.style.display = "none";
}


let globalWordList = []; 



// edit
function openEditMode(wordId) {
    const word = globalWordList.find(w => w.wordId === wordId);
    if (!word) return;


    inpId.value = word.wordId;
    inpEng.value = word.englishWord;
    inpTr.value = word.turkishMeaning;
    inpCefr.value = word.cefrLevel;

    modalTitle.textContent = "Edit Word";
    modal.style.display = "flex";
}


// save
async function saveWord() {
    const wordId = inpId.value; 
    
    const wordData = {
        userId: currentUser.userId, 
        categoryId: 1, // simdilik hardcoded
        englishWord: inpEng.value,
        turkishMeaning: inpTr.value,
        cefrLevel: inpCefr.value
    };

    try {
        if (wordId) {
            // update
            const updateData = {
                requestingUserId: currentUser.userId,
                categoryId: 1,
                englishWord: inpEng.value,
                turkishMeaning: inpTr.value,
                cefrLevel: inpCefr.value
            };
            
            await ApiService.updateWord(wordId, updateData);
        }
        else{
            await ApiService.createWord(wordData);
        }
        
        closeModal();
        loadMyWords();
    } catch (err) {
        alert("Failed to save: " + err.message);
    }
}


async function handleDelete(wordId) {
    if(!confirm("Are you sure you want to delete this word?")) return;

    try {
        await ApiService.deleteWord(wordId, currentUser.userId);
        loadMyWords();
    } catch (err) {
        alert("Delete failed");
    }
}