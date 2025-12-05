using vocabQuizAPI.Models;

namespace vocabQuizAPI.Repositories
{
    public interface IScorecardRepository
    {
        Task<DailyScorecard?> GetTodayScorecardAsync(int userId);
        Task UpdateScoreAsync(int userId, bool isCorrect);
    }
}
