using Dapper;
using MySql.Data.MySqlClient;
using System.Data;
using vocabQuizAPI.Models;

namespace vocabQuizAPI.Repositories
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public HistoryRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public async Task LogAttemptAsync(int userId, int wordId, bool isCorrect, string mode)
        {
            using (IDbConnection db = new MySqlConnection(_connectionString))
            {
                string query = @"
                    INSERT INTO quiz_history (user_id, word_id, is_correct, quiz_mode)
                    VALUES (@UserId, @WordId, @IsCorrect, @Mode)";

                await db.ExecuteAsync(query, new { UserId = userId, WordId = wordId, IsCorrect = isCorrect, Mode = mode });
            }
        }

        public async Task<IEnumerable<QuizHistory>> GetRecentHistoryAsync(int userId)
        {
            using (IDbConnection db = new MySqlConnection(_connectionString))
            {
                string query = @"
                    SELECT history_id AS HistoryId, word_id AS WordId, is_correct AS IsCorrect, 
                           quiz_mode AS QuizMode, attempt_at AS AttemptAt
                    FROM quiz_history 
                    WHERE user_id = @UserId 
                    ORDER BY attempt_at DESC LIMIT 10"; 

                return await db.QueryAsync<QuizHistory>(query, new { UserId = userId });
            }
        }
    }
}
