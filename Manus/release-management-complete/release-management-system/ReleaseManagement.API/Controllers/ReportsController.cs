using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReleaseManagement.API.Data;
using ReleaseManagement.API.DTOs;

namespace ReleaseManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reports/ReleaseSummary
        [HttpGet("ReleaseSummary")]
        public async Task<ActionResult<IEnumerable<object>>> GetReleaseSummary()
        {
            var summary = await _context.Releases
                .GroupBy(r => r.Status.Name)
                .Select(g => new
                {
                    Status = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();

            return Ok(summary);
        }

        // GET: api/Reports/TeamPerformance
        [HttpGet("TeamPerformance")]
        public async Task<ActionResult<IEnumerable<object>>> GetTeamPerformance()
        {
            var performance = await _context.Teams
                .Select(t => new
                {
                    TeamName = t.Name,
                    TotalReleases = t.Releases.Count,
                    CompletedReleases = t.Releases.Count(r => r.Status.Name == "Released"),
                    PendingReleases = t.Releases.Count(r => r.Status.Name != "Released" && r.Status.Name != "Cancelled")
                })
                .ToListAsync();

            return Ok(performance);
        }

        // GET: api/Reports/ProjectStatus
        [HttpGet("ProjectStatus")]
        public async Task<ActionResult<IEnumerable<object>>> GetProjectStatus()
        {
            var status = await _context.Projects
                .Select(p => new
                {
                    ProjectName = p.Name,
                    LastReleaseDate = p.Releases
                        .Where(r => r.Status.Name == "Released")
                        .OrderByDescending(r => r.ReleaseDate)
                        .Select(r => r.ReleaseDate)
                        .FirstOrDefault(),
                    UpcomingReleases = p.Releases.Count(r => r.ReleaseDate > DateTime.Now)
                })
                .ToListAsync();

            return Ok(status);
        }
    }
}
