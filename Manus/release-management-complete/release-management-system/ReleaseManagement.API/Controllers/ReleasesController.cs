using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReleaseManagement.API.Data;
using ReleaseManagement.API.DTOs;
using ReleaseManagement.API.Models;

namespace ReleaseManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReleasesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReleasesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Releases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReleaseDto>>> GetReleases(
            [FromQuery] int? projectId = null,
            [FromQuery] int? teamId = null,
            [FromQuery] int? statusId = null,
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            var query = _context.Releases
                .Include(r => r.Project)
                .Include(r => r.Team)
                .Include(r => r.Status)
                .Include(r => r.CreatedByUser)
                .Include(r => r.ModifiedByUser)
                .AsQueryable();

            // Apply filters
            if (projectId.HasValue)
                query = query.Where(r => r.ProjectId == projectId.Value);

            if (teamId.HasValue)
                query = query.Where(r => r.TeamId == teamId.Value);

            if (statusId.HasValue)
                query = query.Where(r => r.StatusId == statusId.Value);

            if (startDate.HasValue)
                query = query.Where(r => r.ReleaseDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(r => r.ReleaseDate <= endDate.Value);

            var releases = await query
                .OrderByDescending(r => r.ReleaseDate)
                .Select(r => new ReleaseDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    ProjectId = r.ProjectId,
                    ProjectName = r.Project.Name,
                    TeamId = r.TeamId,
                    TeamName = r.Team.Name,
                    StatusId = r.StatusId,
                    StatusName = r.Status.Name,
                    ReleaseDate = r.ReleaseDate,
                    CreatedDate = r.CreatedDate,
                    ModifiedDate = r.ModifiedDate,
                    CreatedBy = r.CreatedBy,
                    CreatedByUsername = r.CreatedByUser.Username,
                    ModifiedBy = r.ModifiedBy,
                    ModifiedByUsername = r.ModifiedByUser.Username
                })
                .ToListAsync();

            return Ok(releases);
        }

        // GET: api/Releases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReleaseDto>> GetRelease(int id)
        {
            var release = await _context.Releases
                .Include(r => r.Project)
                .Include(r => r.Team)
                .Include(r => r.Status)
                .Include(r => r.CreatedByUser)
                .Include(r => r.ModifiedByUser)
                .Where(r => r.Id == id)
                .Select(r => new ReleaseDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    ProjectId = r.ProjectId,
                    ProjectName = r.Project.Name,
                    TeamId = r.TeamId,
                    TeamName = r.Team.Name,
                    StatusId = r.StatusId,
                    StatusName = r.Status.Name,
                    ReleaseDate = r.ReleaseDate,
                    CreatedDate = r.CreatedDate,
                    ModifiedDate = r.ModifiedDate,
                    CreatedBy = r.CreatedBy,
                    CreatedByUsername = r.CreatedByUser.Username,
                    ModifiedBy = r.ModifiedBy,
                    ModifiedByUsername = r.ModifiedByUser.Username
                })
                .FirstOrDefaultAsync();

            if (release == null)
            {
                return NotFound();
            }

            return Ok(release);
        }

        // POST: api/Releases
        [HttpPost]
        public async Task<ActionResult<ReleaseDto>> CreateRelease(CreateReleaseDto createDto)
        {
            var release = new Release
            {
                Name = createDto.Name,
                Description = createDto.Description,
                ProjectId = createDto.ProjectId,
                TeamId = createDto.TeamId,
                StatusId = createDto.StatusId,
                ReleaseDate = createDto.ReleaseDate,
                CreatedDate = DateTime.Now,
                ModifiedDate = DateTime.Now,
                CreatedBy = createDto.CreatedBy,
                ModifiedBy = createDto.CreatedBy
            };

            _context.Releases.Add(release);
            await _context.SaveChangesAsync();

            var releaseDto = await _context.Releases
                .Include(r => r.Project)
                .Include(r => r.Team)
                .Include(r => r.Status)
                .Include(r => r.CreatedByUser)
                .Include(r => r.ModifiedByUser)
                .Where(r => r.Id == release.Id)
                .Select(r => new ReleaseDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    ProjectId = r.ProjectId,
                    ProjectName = r.Project.Name,
                    TeamId = r.TeamId,
                    TeamName = r.Team.Name,
                    StatusId = r.StatusId,
                    StatusName = r.Status.Name,
                    ReleaseDate = r.ReleaseDate,
                    CreatedDate = r.CreatedDate,
                    ModifiedDate = r.ModifiedDate,
                    CreatedBy = r.CreatedBy,
                    CreatedByUsername = r.CreatedByUser.Username,
                    ModifiedBy = r.ModifiedBy,
                    ModifiedByUsername = r.ModifiedByUser.Username
                })
                .FirstAsync();

            return CreatedAtAction(nameof(GetRelease), new { id = releaseDto.Id }, releaseDto);
        }

        // PUT: api/Releases/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRelease(int id, UpdateReleaseDto updateDto)
        {
            var release = await _context.Releases.FindAsync(id);

            if (release == null)
            {
                return NotFound();
            }

            release.Name = updateDto.Name;
            release.Description = updateDto.Description;
            release.ProjectId = updateDto.ProjectId;
            release.TeamId = updateDto.TeamId;
            release.StatusId = updateDto.StatusId;
            release.ReleaseDate = updateDto.ReleaseDate;
            release.ModifiedDate = DateTime.Now;
            release.ModifiedBy = updateDto.ModifiedBy;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReleaseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Releases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRelease(int id)
        {
            var release = await _context.Releases.FindAsync(id);
            if (release == null)
            {
                return NotFound();
            }

            _context.Releases.Remove(release);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReleaseExists(int id)
        {
            return _context.Releases.Any(e => e.Id == id);
        }
    }
}
