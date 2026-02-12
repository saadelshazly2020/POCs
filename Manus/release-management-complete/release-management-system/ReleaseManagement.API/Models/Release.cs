using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReleaseManagement.API.Models
{
    public class Release
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(2000)]
        public string? Description { get; set; }

        [ForeignKey("Project")]
        public int ProjectId { get; set; }

        [ForeignKey("Team")]
        public int TeamId { get; set; }

        [ForeignKey("Status")]
        public int StatusId { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

        [Required]
        public DateTime ModifiedDate { get; set; }

        [ForeignKey("CreatedByUser")]
        public int CreatedBy { get; set; }

        [ForeignKey("ModifiedByUser")]
        public int ModifiedBy { get; set; }

        // Navigation properties
        public Project Project { get; set; } = null!;
        public Team Team { get; set; } = null!;
        public Status Status { get; set; } = null!;
        public User CreatedByUser { get; set; } = null!;
        public User ModifiedByUser { get; set; } = null!;
    }
}
