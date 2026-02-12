using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReleaseManagmentSystem.Models;

namespace ReleaseManagmentSystem.Controllers
{
    public class ReleasesController : Controller
    {
        private readonly ReleaseDbContext _context;

        public ReleasesController(ReleaseDbContext context)
        {
            _context = context;
        }

        // GET: Releases
        public async Task<IActionResult> Index()
        {
              return _context.Releases != null ? 
                          View(await _context.Releases.ToListAsync()) :
                          Problem("Entity set 'ReleaseDbContext.Releases'  is null.");
        }

        // GET: Releases/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Releases == null)
            {
                return NotFound();
            }

            var release = await _context.Releases
                .FirstOrDefaultAsync(m => m.Id == id);
            if (release == null)
            {
                return NotFound();
            }

            return View(release);
        }

        // GET: Releases/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Releases/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Status,Note,CreatedDate,CreatedBy,UpdatedDate,AssignedTeam,Project")] Release release)
        {
            if (ModelState.IsValid)
            {
                _context.Add(release);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(release);
        }

        // GET: Releases/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Releases == null)
            {
                return NotFound();
            }

            var release = await _context.Releases.FindAsync(id);
            if (release == null)
            {
                return NotFound();
            }
            return View(release);
        }

        // POST: Releases/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Status,Note,CreatedDate,CreatedBy,UpdatedDate,AssignedTeam,Project")] Release release)
        {
            if (id != release.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(release);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ReleaseExists(release.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(release);
        }

        // GET: Releases/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Releases == null)
            {
                return NotFound();
            }

            var release = await _context.Releases
                .FirstOrDefaultAsync(m => m.Id == id);
            if (release == null)
            {
                return NotFound();
            }

            return View(release);
        }

        // POST: Releases/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Releases == null)
            {
                return Problem("Entity set 'ReleaseDbContext.Releases'  is null.");
            }
            var release = await _context.Releases.FindAsync(id);
            if (release != null)
            {
                _context.Releases.Remove(release);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ReleaseExists(int id)
        {
          return (_context.Releases?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
