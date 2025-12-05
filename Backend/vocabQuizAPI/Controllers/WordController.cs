using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vocabQuizAPI.Models;
using vocabQuizAPI.Repositories;

namespace vocabQuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WordController : ControllerBase
    {
        private readonly IWordRepository _wordRepository;
        private readonly IScorecardRepository _scorecardRepository;

        public WordController(IWordRepository wordRepository, IScorecardRepository scorecardRepository)
        {
            _wordRepository = wordRepository;
            _scorecardRepository = scorecardRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWords()
        {
            try
            {
                var words = await _wordRepository.GetAllWordsAsync();

                return Ok(words);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("quiz/{userID}")]
        public async Task<IActionResult> GetQuizWord(int userID)
        {
            try
            {
                var word = await _wordRepository.GetNextQuizWordAsync(userID);

                if (word == null)
                {
                    return Ok(new { message = "All words are mastered", finished = true });
                }

                return Ok(word);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet("review/{userID}")]
        public async Task<IActionResult> GetReviewWord(int userID)
        {
            try
            {
                var word = await _wordRepository.GetNextReviewWordAsync(userID);

                if (word == null)
                {
                    return Ok(new { message = "No words to review", finished = true });
                }
                return Ok(word);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("answer")]
        public async Task<IActionResult> SubmitAnswer([FromBody] AnswerRequest request)
        {
            try
            {
                await _wordRepository.UpdateProgressAsync(request.UserId, request.WordId, request.IsCorrect);
                
                await _scorecardRepository.UpdateScoreAsync(request.UserId, request.IsCorrect);

                return Ok(new { message = "Progress updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("stats/{userId}")]
        public async Task<IActionResult> GetDailyStats(int userId)
        {
            try
            {
                var stats = await _scorecardRepository.GetTodayScorecardAsync(userId);

                if (stats == null)
                {
                    return Ok(new { totalSeen = 0, totalCorrect = 0, totalWrong = 0 });
                }
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



    }
}
