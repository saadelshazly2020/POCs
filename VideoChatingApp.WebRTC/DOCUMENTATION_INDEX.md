# ?? Video Chat Application - Documentation Index

Welcome to the Video Chat Application documentation! This index will help you find what you need.

## ?? Quick Navigation

### ?? New to the Project?
Start here ? **[GETTING_STARTED.md](GETTING_STARTED.md)**

### ?? Want to Understand the Structure?
Go here ? **[NEW_STRUCTURE_README.md](NEW_STRUCTURE_README.md)**

### ?? Working on Frontend?
Read this ? **[client-app/README.md](client-app/README.md)**

### ?? Having Issues?
Check here ? **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

---

## ?? Complete Documentation

### ?? Getting Started
| Document | Description | For |
|----------|-------------|-----|
| **[GETTING_STARTED.md](GETTING_STARTED.md)** | Complete beginner guide with step-by-step instructions | Everyone |
| **[RESTRUCTURE_COMPLETE.md](RESTRUCTURE_COMPLETE.md)** | What changed in the new structure | Existing users |

### ??? Architecture & Structure
| Document | Description | For |
|----------|-------------|-----|
| **[NEW_STRUCTURE_README.md](NEW_STRUCTURE_README.md)** | Detailed explanation of project structure | Developers |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System architecture and design patterns | Architects |
| **[DIAGRAMS.md](DIAGRAMS.md)** | Visual diagrams of the system | Visual learners |

### ?? Development
| Document | Description | For |
|----------|-------------|-----|
| **[client-app/README.md](client-app/README.md)** | Vue 3 frontend documentation | Frontend devs |
| **[BUILD_GUIDE.md](BUILD_GUIDE.md)** | Build and deployment instructions | DevOps |
| **[TYPESCRIPT_FIXES.md](TYPESCRIPT_FIXES.md)** | TypeScript error fixes | Frontend devs |

### ?? API & Integration
| Document | Description | For |
|----------|-------------|-----|
| **[API.md](API.md)** | SignalR Hub API documentation | API consumers |
| **[QUICKSTART.md](QUICKSTART.md)** | Quick start for integrations | Integrators |

### ?? Troubleshooting
| Document | Description | For |
|----------|-------------|-----|
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Common issues and solutions | Everyone |
| **[STATUS.md](STATUS.md)** | Current project status | Project managers |

### ?? Deployment
| Document | Description | For |
|----------|-------------|-----|
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Deployment guide | DevOps |
| **Dockerfile** | Docker configuration | Container deployments |

---

## ?? By Role

### ????? Developers
1. Start: [GETTING_STARTED.md](GETTING_STARTED.md)
2. Structure: [NEW_STRUCTURE_README.md](NEW_STRUCTURE_README.md)
3. Frontend: [client-app/README.md](client-app/README.md)
4. API: [API.md](API.md)
5. Issues: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### ????? Frontend Developers
1. Start: [GETTING_STARTED.md](GETTING_STARTED.md)
2. Client: [client-app/README.md](client-app/README.md)
3. TypeScript: [TYPESCRIPT_FIXES.md](TYPESCRIPT_FIXES.md)
4. Build: [BUILD_GUIDE.md](BUILD_GUIDE.md)

### ????? Backend Developers
1. Start: [GETTING_STARTED.md](GETTING_STARTED.md)
2. Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
3. API: [API.md](API.md)
4. Structure: [NEW_STRUCTURE_README.md](NEW_STRUCTURE_README.md)

### ????? Team Leads / Architects
1. Overview: [RESTRUCTURE_COMPLETE.md](RESTRUCTURE_COMPLETE.md)
2. Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
3. Diagrams: [DIAGRAMS.md](DIAGRAMS.md)
4. Status: [STATUS.md](STATUS.md)

### ?? DevOps Engineers
1. Build: [BUILD_GUIDE.md](BUILD_GUIDE.md)
2. Deploy: [DEPLOYMENT.md](DEPLOYMENT.md)
3. Docker: Check `Dockerfile`
4. Structure: [NEW_STRUCTURE_README.md](NEW_STRUCTURE_README.md)

---

## ?? By Topic

### Installation & Setup
- [GETTING_STARTED.md](GETTING_STARTED.md) - Complete setup guide
- `install-deps.ps1` - Automated dependency installation
- `start-dev.ps1` - Start development environment

### Project Structure
- [NEW_STRUCTURE_README.md](NEW_STRUCTURE_README.md) - Detailed structure
- [RESTRUCTURE_COMPLETE.md](RESTRUCTURE_COMPLETE.md) - What changed
- [client-app/README.md](client-app/README.md) - Frontend structure

### Development
- [GETTING_STARTED.md](GETTING_STARTED.md) - Dev environment setup
- [client-app/README.md](client-app/README.md) - Frontend development
- `start-dev.ps1` - Start dev servers

### Building
- [BUILD_GUIDE.md](BUILD_GUIDE.md) - Build instructions
- `build-prod.ps1` - Automated production build
- [client-app/README.md](client-app/README.md) - Frontend build

### Deployment
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [BUILD_GUIDE.md](BUILD_GUIDE.md) - Build for production
- `Dockerfile` - Container deployment

### Troubleshooting
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [GETTING_STARTED.md](GETTING_STARTED.md) - Setup problems
- [BUILD_GUIDE.md](BUILD_GUIDE.md) - Build errors

### API & Integration
- [API.md](API.md) - SignalR API docs
- [QUICKSTART.md](QUICKSTART.md) - Quick integration
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design

---

## ?? Documentation Standards

All documentation follows these conventions:

### Emoji Usage
- ?? Quick start / Getting started
- ?? File structure / Folders
- ?? Configuration / Setup
- ?? Frontend / UI
- ?? Backend / API
- ?? Dependencies / Packages
- ?? Bugs / Issues
- ? Completed / Success
- ? Error / Failed
- ?? Tips / Ideas
- ?? Warning / Important

### Code Blocks
- PowerShell: ```powershell
- Bash: ```bash
- C#: ```csharp
- TypeScript: ```typescript
- JSON: ```json

### File Paths
- Root: `Program.cs`
- Client: `client-app/src/main.ts`
- Relative: `./build-prod.ps1`

---

## ?? Quick Reference

### Commands
```powershell
# Install dependencies
.\install-deps.ps1

# Start development
.\start-dev.ps1
# or
start-dev.bat

# Build production
.\build-prod.ps1

# Run production
dotnet run -c Release
```

### URLs
- Frontend Dev: http://localhost:3000
- Backend Dev: http://localhost:5000
- Backend HTTPS: https://localhost:5001
- SignalR Hub: /videocallhub

### Folders
- Client: `client-app/`
- Backend: `Core/`, `Hubs/`, `Managers/`
- Build Output: `wwwroot/dist/`
- Scripts: Root folder (`*.ps1`, `*.bat`)

---

## ?? Documentation Updates

This documentation is current as of the latest restructuring.

### Version History
- **Latest**: Complete project restructure with client-app folder
- **Previous**: Flat structure with wwwroot/src

### Contributing
When updating documentation:
1. Keep this index updated
2. Use consistent emoji and formatting
3. Update RESTRUCTURE_COMPLETE.md for major changes
4. Cross-reference related documents

---

## ?? Getting Help

### Quick Questions
1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Search this documentation
3. Check GitHub issues

### Learning
1. Read [GETTING_STARTED.md](GETTING_STARTED.md)
2. Follow tutorials in [QUICKSTART.md](QUICKSTART.md)
3. Explore code examples

### Problems
1. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Check [BUILD_GUIDE.md](BUILD_GUIDE.md)
3. Review console logs
4. Open an issue on GitHub

---

## ?? Ready to Start?

**Absolute beginner?**
? Double-click `start-dev.bat`

**Want to understand the project?**
? Read [GETTING_STARTED.md](GETTING_STARTED.md)

**Already familiar?**
? Run `.\start-dev.ps1`

**Need API docs?**
? Check [API.md](API.md)

**Having issues?**
? See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## ?? Project Overview

### Technology Stack
- **Frontend**: Vue 3, TypeScript, Tailwind CSS, Vite
- **Backend**: .NET 9, C#, SignalR
- **Real-time**: WebRTC, SignalR
- **Build**: Vite (frontend), dotnet (backend)

### Features
- ? Real-time video/audio chat
- ? 1-to-1 calls
- ? Multi-user rooms
- ? User presence
- ? Responsive UI
- ? Audio/video controls

### Folder Count
- ?? Core: Business logic
- ?? Hubs: SignalR hub
- ?? Managers: State management
- ?? client-app: Complete Vue SPA

---

**Documentation last updated**: ${new Date().toLocaleDateString()}

**Need something not listed here?**
Open an issue or check existing documentation files in the root folder.

---

*Built with ?? using Vue 3, TypeScript, Tailwind CSS, and .NET 9*
