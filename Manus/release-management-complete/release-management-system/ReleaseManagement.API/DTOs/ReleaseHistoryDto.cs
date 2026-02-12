namespace ReleaseManagement.API.DTOs
{
    public class ReleaseHistoryDto
    {
        public int ReleaseId { get; set; }
        public string ReleaseName { get; set; } = string.Empty;
        public string ProjectName { get; set; } = string.Empty;
        public string TeamName { get; set; } = string.Empty;
        public string StatusName { get; set; } = string.Empty;
        public DateTime ModifiedDate { get; set; }
        public string ModifiedByUsername { get; set; } = string.Empty;
        public string Action { get; set; } = string.Empty; // Created, Updated, Status Changed
    }
}
