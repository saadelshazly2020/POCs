using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReleaseManagement.API.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [ForeignKey("Team")]
        public int? TeamId { get; set; }

        // Navigation property
        public Team? Team { get; set; }

        // Navigation properties for releases created and modified by this user
        public ICollection<Release> CreatedReleases { get; set; } = new List<Release>();
        public ICollection<Release> ModifiedReleases { get; set; } = new List<Release>();
    }
}
