using System.ComponentModel.DataAnnotations;

namespace ReleaseManagement.API.DTOs
{
    public class CreateReleaseDto
    {
        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? Description { get; set; }

        [Required]
        public int ProjectId { get; set; }

        [Required]
        public int TeamId { get; set; }

        [Required]
        public int StatusId { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public int CreatedBy { get; set; }
    }
}
