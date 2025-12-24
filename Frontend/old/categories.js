// dom
const catList = document.getElementById('category-list');
const catTitle = document.getElementById('cat-title');
const wordList = document.getElementById('word-list');

// initialize
document.addEventListener('DOMContentLoaded', ()=>{
    loadCategories();
});

async function loadCategories(){
    const categories = await ApiService.getCategories();
    catList.innerHTML = "";

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = "win-btn cat-btn";
        btn.textContent = cat.categoryName;

        btn.addEventListener('click', ()=> {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            loadWords(cat.categoryId, cat.CategoryName);
        });
        
        catList.appendChild(btn);
    });
}

async function loadWords(catId, catName) {
    catTitle.textContent = catName;
    wordList.innerHTML = "<p>Loading...</p>";

    const words = await ApiService.getWordsByCategory(catId);
    
    wordList.innerHTML = "";
    if (words.length === 0) {
        wordList.innerHTML = "<p>No words in this category.</p>";
        return;
    }

    words.forEach(word => {
        const div = document.createElement('div');
        div.className = "item-row";
        div.innerHTML = `
            <span><strong>${word.englishWord}</strong></span>
            <span>${word.turkishMeaning}</span>
        `;
        wordList.appendChild(div);
    });
}
