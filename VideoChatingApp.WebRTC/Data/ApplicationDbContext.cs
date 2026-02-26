using Microsoft.EntityFrameworkCore;
using VideoChatingApp.WebRTC.Core.Models;

namespace VideoChatingApp.WebRTC.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Friendship> Friendships { get; set; } = null!;
    public DbSet<FriendshipRequest> FriendshipRequests { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure User entity
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);

            entity.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(u => u.PasswordHash)
                .IsRequired()
                .HasMaxLength(500);

            entity.Property(u => u.DisplayName)
                .HasMaxLength(100);

            entity.Property(u => u.ProfilePictureUrl)
                .HasMaxLength(500);

            entity.Property(u => u.CreatedAt)
                .IsRequired();

            // Add unique constraints
            entity.HasIndex(u => u.Username)
                .IsUnique();

            entity.HasIndex(u => u.Email)
                .IsUnique();

            // Add indexes for better query performance
            entity.HasIndex(u => u.IsOnline);
        });

        // Configure Friendship entity
        modelBuilder.Entity<Friendship>(entity =>
        {
            entity.HasKey(f => f.Id);

            entity.Property(f => f.CreatedAt)
                .IsRequired();

            // Configure User1 relationship
            entity.HasOne(f => f.User1)
                .WithMany(u => u.FriendshipsAsUser1)
                .HasForeignKey(f => f.User1Id)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure User2 relationship
            entity.HasOne(f => f.User2)
                .WithMany(u => u.FriendshipsAsUser2)
                .HasForeignKey(f => f.User2Id)
                .OnDelete(DeleteBehavior.Restrict);

            // Add unique constraint to prevent duplicate friendships
            entity.HasIndex(f => new { f.User1Id, f.User2Id })
                .IsUnique();

            // Add index for better query performance
            entity.HasIndex(f => f.User1Id);
            entity.HasIndex(f => f.User2Id);
        });

        // Configure FriendshipRequest entity
        modelBuilder.Entity<FriendshipRequest>(entity =>
        {
            entity.HasKey(fr => fr.Id);

            entity.Property(fr => fr.Status)
                .IsRequired()
                .HasConversion<string>();

            entity.Property(fr => fr.CreatedAt)
                .IsRequired();

            entity.Property(fr => fr.Message)
                .HasMaxLength(500);

            // Configure Sender relationship
            entity.HasOne(fr => fr.Sender)
                .WithMany(u => u.SentRequests)
                .HasForeignKey(fr => fr.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Receiver relationship
            entity.HasOne(fr => fr.Receiver)
                .WithMany(u => u.ReceivedRequests)
                .HasForeignKey(fr => fr.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            // Add indexes for better query performance
            entity.HasIndex(fr => fr.SenderId);
            entity.HasIndex(fr => fr.ReceiverId);
            entity.HasIndex(fr => fr.Status);
            entity.HasIndex(fr => new { fr.SenderId, fr.ReceiverId, fr.Status });
        });
    }
}
