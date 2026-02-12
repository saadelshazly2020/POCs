# Release Management System API Documentation

## Overview

The Release Management System API is a RESTful service built with .NET Core 8 and Entity Framework Core. It provides endpoints for managing software releases, projects, teams, and users.

## Base URL

`http://localhost:5159/api`

## Authentication

The API uses JWT (JSON Web Token) for authentication. To access protected endpoints, you must include the token in the `Authorization` header:

`Authorization: Bearer <your_token>`

## Endpoints

### Authentication

#### Login

- **URL**: `/Auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```
- **Response**: Returns a JWT token and user details.

### Releases

#### Get All Releases

- **URL**: `/Releases`
- **Method**: `GET`
- **Query Parameters**:
  - `projectId`: Filter by project ID
  - `teamId`: Filter by team ID
  - `statusId`: Filter by status ID
  - `startDate`: Filter by start date
  - `endDate`: Filter by end date
- **Response**: List of releases.

#### Get Release by ID

- **URL**: `/Releases/{id}`
- **Method**: `GET`
- **Response**: Release details.

#### Create Release

- **URL**: `/Releases`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Release 1.0",
    "description": "Initial release",
    "projectId": 1,
    "teamId": 1,
    "statusId": 1,
    "releaseDate": "2025-12-31T00:00:00",
    "createdBy": 1
  }
  ```
- **Response**: Created release details.

#### Update Release

- **URL**: `/Releases/{id}`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "name": "Release 1.0 Updated",
    "description": "Updated description",
    "projectId": 1,
    "teamId": 1,
    "statusId": 2,
    "releaseDate": "2025-12-31T00:00:00",
    "modifiedBy": 1
  }
  ```
- **Response**: 204 No Content.

#### Delete Release

- **URL**: `/Releases/{id}`
- **Method**: `DELETE`
- **Response**: 204 No Content.

### Projects

#### Get All Projects

- **URL**: `/Projects`
- **Method**: `GET`
- **Response**: List of projects.

### Teams

#### Get All Teams

- **URL**: `/Teams`
- **Method**: `GET`
- **Response**: List of teams.

### Reports

#### Get Release Summary

- **URL**: `/Reports/ReleaseSummary`
- **Method**: `GET`
- **Response**: Summary of releases by status.

#### Get Team Performance

- **URL**: `/Reports/TeamPerformance`
- **Method**: `GET`
- **Response**: Performance metrics for each team.

#### Get Project Status

- **URL**: `/Reports/ProjectStatus`
- **Method**: `GET`
- **Response**: Status of each project.

## Database Schema

The database consists of the following tables:
- **Releases**: Stores release information.
- **Projects**: Stores project information.
- **Teams**: Stores team information.
- **Users**: Stores user information.
- **Statuses**: Stores release statuses.

## Setup Instructions

1. **Prerequisites**:
   - .NET Core 8 SDK
   - SQL Server

2. **Configuration**:
   - Update the connection string in `appsettings.json`.

3. **Database Migration**:
   - Run `dotnet ef database update` to apply migrations and seed data.

4. **Run the API**:
   - Run `dotnet run` to start the API.
