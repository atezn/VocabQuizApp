using vocabQuizAPI.Models;

namespace vocabQuizAPI.Repositories
{
    public interface IHistoryRepository
    {
        Task LogAttemptAsync(int userId, int wordId, bool isCorrect, string mode);
        Task<IEnumerable<QuizHistory>> GetRecentHistoryAsync(int userId);
    }
    
}
