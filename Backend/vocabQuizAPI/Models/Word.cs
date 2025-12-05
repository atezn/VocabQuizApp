namespace vocabQuizAPI.Models
{
    public class Word
    {
        public int WordId { get; set; }
        public string EnglishWord { get; set; } = string.Empty;
        public string TurkishMeaning { get; set; } = string.Empty;
        public string CefrLevel { get; set; } = string.Empty;

    }
}
