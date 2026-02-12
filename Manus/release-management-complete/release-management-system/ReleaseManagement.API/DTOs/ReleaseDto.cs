namespace ReleaseManagement.API.DTOs
{
    public class ReleaseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public int TeamId { get; set; }
        public string TeamName { get; set; } = string.Empty;
        public int StatusId { get; set; }
        public string StatusName { get; set; } = string.Empty;
        public DateTime ReleaseDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedByUsername { get; set; } = string.Empty;
        public int ModifiedBy { get; set; }
        public string ModifiedByUsername { get; set; } = string.Empty;
    }
}
