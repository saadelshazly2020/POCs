using ReleaseManagement.API.Models;

namespace ReleaseManagement.API.Data
{
    public static class DbSeeder
    {
        public static void SeedData(ApplicationDbContext context)
        {
            // Check if data already exists
            if (context.Statuses.Any())
            {
                return; // Database has been seeded
            }

            // Seed Statuses
            var statuses = new List<Status>
            {
                new Status { Name = "Planning" },
                new Status { Name = "In Progress" },
                new Status { Name = "Testing" },
                new Status { Name = "Ready for Release" },
                new Status { Name = "Released" },
                new Status { Name = "Cancelled" },
                new Status { Name = "On Hold" }
            };
            context.Statuses.AddRange(statuses);
            context.SaveChanges();

            // Seed Teams
            var teams = new List<Team>
            {
                new Team { Name = "Development Team", Description = "Core development team responsible for building features" },
                new Team { Name = "QA Team", Description = "Quality assurance team responsible for testing" },
                new Team { Name = "DevOps Team", Description = "DevOps team responsible for deployment and infrastructure" },
                new Team { Name = "Operations Team", Description = "Operations team responsible for monitoring and maintenance" }
            };
            context.Teams.AddRange(teams);
            context.SaveChanges();

            // Seed Projects
            var projects = new List<Project>
            {
                new Project { Name = "Project Alpha", Description = "Main customer-facing application" },
                new Project { Name = "Project Beta", Description = "Internal tools and utilities" },
                new Project { Name = "Project Gamma", Description = "Mobile application" },
                new Project { Name = "Project Delta", Description = "API and backend services" }
            };
            context.Projects.AddRange(projects);
            context.SaveChanges();

            // Seed Users
            var users = new List<User>
            {
                new User { Username = "admin", Email = "admin@company.com", TeamId = teams[3].Id },
                new User { Username = "john.dev", Email = "john.dev@company.com", TeamId = teams[0].Id },
                new User { Username = "jane.qa", Email = "jane.qa@company.com", TeamId = teams[1].Id },
                new User { Username = "bob.devops", Email = "bob.devops@company.com", TeamId = teams[2].Id }
            };
            context.Users.AddRange(users);
            context.SaveChanges();

            // Seed Sample Releases
            var releases = new List<Release>
            {
                new Release
                {
                    Name = "Release 1.0.0",
                    Description = "Initial release with core features",
                    ProjectId = projects[0].Id,
                    TeamId = teams[0].Id,
                    StatusId = statuses[4].Id, // Released
                    ReleaseDate = DateTime.Now.AddMonths(-3),
                    CreatedDate = DateTime.Now.AddMonths(-4),
                    ModifiedDate = DateTime.Now.AddMonths(-3),
                    CreatedBy = users[0].Id,
                    ModifiedBy = users[0].Id
                },
                new Release
                {
                    Name = "Release 1.1.0",
                    Description = "Feature enhancements and bug fixes",
                    ProjectId = projects[0].Id,
                    TeamId = teams[0].Id,
                    StatusId = statuses[4].Id, // Released
                    ReleaseDate = DateTime.Now.AddMonths(-2),
                    CreatedDate = DateTime.Now.AddMonths(-3),
                    ModifiedDate = DateTime.Now.AddMonths(-2),
                    CreatedBy = users[1].Id,
                    ModifiedBy = users[1].Id
                },
                new Release
                {
                    Name = "Release 2.0.0",
                    Description = "Major version upgrade with new architecture",
                    ProjectId = projects[0].Id,
                    TeamId = teams[0].Id,
                    StatusId = statuses[2].Id, // Testing
                    ReleaseDate = DateTime.Now.AddDays(14),
                    CreatedDate = DateTime.Now.AddMonths(-1),
                    ModifiedDate = DateTime.Now,
                    CreatedBy = users[1].Id,
                    ModifiedBy = users[0].Id
                },
                new Release
                {
                    Name = "Mobile App v1.0",
                    Description = "First mobile application release",
                    ProjectId = projects[2].Id,
                    TeamId = teams[0].Id,
                    StatusId = statuses[1].Id, // In Progress
                    ReleaseDate = DateTime.Now.AddMonths(1),
                    CreatedDate = DateTime.Now.AddDays(-20),
                    ModifiedDate = DateTime.Now.AddDays(-1),
                    CreatedBy = users[0].Id,
                    ModifiedBy = users[1].Id
                }
            };
            context.Releases.AddRange(releases);
            context.SaveChanges();
        }
    }
}
