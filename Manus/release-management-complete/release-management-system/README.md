# Release Management System

A comprehensive .NET Core 8 release management system with Entity Framework Core (Code First) and SQL Server database for operations teams to register, track, and manage software releases.

## Features

- **Release Management**: Create, update, and track software releases.
- **Project & Team Management**: Organize releases by project and team.
- **Status Tracking**: Monitor the status of releases (Planning, In Progress, Testing, Released, etc.).
- **Historical Tracking**: Keep a history of release changes and activities.
- **Reporting**: Generate reports on release summaries, team performance, and project status.
- **Authentication**: Secure API access using JWT authentication.
- **Web Interface**: Modern React-based frontend for easy management.

## Technology Stack

- **Backend**: .NET Core 8 Web API
- **Database**: SQL Server (Entity Framework Core Code First)
- **Frontend**: React 19 + Tailwind CSS 4 (Static)
- **Authentication**: JWT (JSON Web Token)
- **Documentation**: Swagger UI

## Getting Started

### Backend Setup

1. Navigate to the API directory:
   ```bash
   cd ReleaseManagement.API
   ```

2. Update the database connection string in `appsettings.json`.

3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```

4. Run the API:
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5159`.
   Swagger UI documentation will be available at `http://localhost:5159/swagger`.

### Frontend Setup

1. Navigate to the web directory:
   ```bash
   cd ../release-management-web
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

   The web interface will be available at `http://localhost:3000`.

## Default Users

The system comes seeded with the following users (password is not enforced in this demo):
- **admin**: Administrator
- **john.dev**: Developer
- **jane.qa**: QA Engineer
- **bob.devops**: DevOps Engineer

## License

This project is licensed under the MIT License.
