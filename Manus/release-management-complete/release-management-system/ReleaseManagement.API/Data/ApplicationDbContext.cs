using Microsoft.EntityFrameworkCore;
using ReleaseManagement.API.Models;

namespace ReleaseManagement.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Release> Releases { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Release entity
            modelBuilder.Entity<Release>()
                .HasOne(r => r.Project)
                .WithMany(p => p.Releases)
                .HasForeignKey(r => r.ProjectId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Release>()
                .HasOne(r => r.Team)
                .WithMany(t => t.Releases)
                .HasForeignKey(r => r.TeamId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Release>()
                .HasOne(r => r.Status)
                .WithMany(s => s.Releases)
                .HasForeignKey(r => r.StatusId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Release>()
                .HasOne(r => r.CreatedByUser)
                .WithMany(u => u.CreatedReleases)
                .HasForeignKey(r => r.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Release>()
                .HasOne(r => r.ModifiedByUser)
                .WithMany(u => u.ModifiedReleases)
                .HasForeignKey(r => r.ModifiedBy)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure User entity
            modelBuilder.Entity<User>()
                .HasOne(u => u.Team)
                .WithMany(t => t.Users)
                .HasForeignKey(u => u.TeamId)
                .OnDelete(DeleteBehavior.SetNull);

            // Add unique constraints
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Add indexes for better query performance
            modelBuilder.Entity<Release>()
                .HasIndex(r => r.ReleaseDate);

            modelBuilder.Entity<Release>()
                .HasIndex(r => r.CreatedDate);

            modelBuilder.Entity<Release>()
                .HasIndex(r => r.StatusId);
        }
    }
}
