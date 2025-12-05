const API_BASE_URL = "https://localhost:7149/api"; 

const ApiService = {
    
    async getNewWord(userId){  // apiden quiz kelimelerimizi çekiyoruz
        try{
            
            const response = await fetch(`${API_BASE_URL}/word/quiz/${userId}`);

            if (!response.ok) {
                throw new Error(`API error, status: ${response.status}`);
            }
            return await response.json();
        
        } catch (error) {
            
            console.error("Failed to fetch new word:", error);
            return null;

        }
    },

    async getReviewWords(userId){  // apiden review kelimelerimizi çekiyoruz
        
        try{
            const response = await fetch(`${API_BASE_URL}/word/review/${userId}`);

            if (!response.ok) {
                throw new Error(`API error, status: ${response.status}`);
            }
            return await response.json();
        
        } catch (error) {
            
            console.error("Failed to fetch review words:", error);
            return null;

        }
    },

    async submitAnswer(userId, wordId, isCorrect){  // apiye cevaplarımızı gönderiyoruz
        
        try{
            const response = await fetch(`${API_BASE_URL}/word/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    wordId: wordId,
                    isCorrect: isCorrect })
            });    
        
            if (!response.ok) {
                throw new Error(`Submit error, status: ${response.status}`);
            }

            return await response.json();
        
        } catch (error) {
            console.error("Failed to submit answer:", error);
            return false;
        }
    },

    async getStats(userId){
        try{
            const response = await fetch(`${API_BASE_URL}/word/stats/${userId}`);
        
            if (!response.ok) {
                throw new Error(`Stats error, status: ${response.status}`);
            }

            return await response.json();
        
        } catch (error) {

            console.error("Failed to fetch stats:", error);
            return null;

        }
    }

};