using vocabQuizAPI.Models;

namespace vocabQuizAPI.Repositories
{
    public interface IWordRepository
    {
        Task<IEnumerable<Word>> GetAllWordsAsync();

        Task<QuizResponse>? GetNextQuizWordAsync(int userID);
        Task<QuizResponse>? GetNextReviewWordAsync(int userID);
        Task UpdateProgressAsync(int userId, int wordId, bool isCorrect);
    }
}
