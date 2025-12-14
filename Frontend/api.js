const API_BASE_URL = "https://localhost:7149/api"; 

const ApiService = {
    
    async register(username, email, password){  // apiye kayıt bilgilerini gönderiyoruz
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        return handleResponse(response);
    },
    
    async login(email, password){  // apiye giriş bilgilerini gönderiyoruz
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        return handleResponse(response);
    },
    
    async getNewWord(userId){  // apiden quiz kelimelerimizi çekiyoruz
        
        return get(`${API_BASE_URL}/word/quiz/${userId}`);
    },

    async getReviewWord(userId){  // apiden review kelimelerimizi çekiyoruz
        
        return get(`${API_BASE_URL}/word/review/${userId}`);
    },

    async submitAnswer(userId, wordId, isCorrect){  // apiye cevaplarımızı gönderiyoruz
        
        return post(`${API_BASE_URL}/word/answer`, {
            userId, wordId, isCorrect
        });
    },

    async getStats(userId){
        
        return get(`${API_BASE_URL}/word/stats/${userId}`);
    },

    async getCategories(){
        return get(`${API_BASE_URL}/category`);
    },

    async getWordsByCategory(categoryId){
        return get(`${API_BASE_URL}/category/${categoryId}/words`)
    },

    async getHistory(userId){
        return get(`${API_BASE_URL}/word/history/${userId}`);
    },
        
    
    
    
    //  CRUD



    async createWord(wordData) {
        
        return post(`${API_BASE_URL}/word/create`, wordData);
    },

    async getMyWords(userId) {

        return get(`${API_BASE_URL}/word/my-words/${userId}`);
    },

    async updateWord(wordId, updateData){
    const response = await fetch(`${API_BASE_URL}/word/update/${wordId}`, {
        method : "PUT",
        headers : { "Content-Type" : "application/json"},
        body: JSON.stringify(updateData)
    });

    return handleResponse(response);
    },

    async deleteWord(wordId, userId) {

        const response = await fetch(`${API_BASE_URL}/word/delete/${wordId}?requestingUserId=${userId}`, {
            method: "DELETE"
        });
        return handleResponse(response);
    },

  
    async sendContact(name, message, contactInfo) { // 1nf ihmal eden
        return post(`${API_BASE_URL}/contact`, {
            userName: name, message, contactInfoCombined: contactInfo
        });
    },

    async unsafeSearch(term) {
        return get(`${API_BASE_URL}/word/unsafe-search?term=${term}`);
    }
};


// denk geldigim mantikli bir hamle, kod tekrarnindan kacmak icin bu sekilde
async function get(url) {
    try {
        const response = await fetch(url);
        return handleResponse(response);
    } catch (err) {
        console.error("GET Error:", err);
        return null;
    }
}

async function post(url, data) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    } catch (err) {
        console.error("POST Error:", err);
        return null;
    }
}

async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `API Error: ${response.status}`);
    }
    return await response.json();
};

