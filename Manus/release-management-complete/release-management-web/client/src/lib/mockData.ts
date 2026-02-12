export interface Release {
  id: number;
  name: string;
  description: string;
  projectId: number;
  projectName: string;
  teamId: number;
  teamName: string;
  statusId: number;
  statusName: string;
  releaseDate: string;
  createdDate: string;
  modifiedDate: string;
  createdBy: number;
  createdByUsername: string;
  modifiedBy: number;
  modifiedByUsername: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
}

export interface Status {
  id: number;
  name: string;
}

export const mockStatuses: Status[] = [
  { id: 1, name: "Planning" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Testing" },
  { id: 4, name: "Ready for Release" },
  { id: 5, name: "Released" },
  { id: 6, name: "Cancelled" },
  { id: 7, name: "On Hold" },
];

export const mockProjects: Project[] = [
  { id: 1, name: "Project Alpha", description: "Main customer-facing application" },
  { id: 2, name: "Project Beta", description: "Internal tools and utilities" },
  { id: 3, name: "Project Gamma", description: "Mobile application" },
  { id: 4, name: "Project Delta", description: "API and backend services" },
];

export const mockTeams: Team[] = [
  { id: 1, name: "Development Team", description: "Core development team" },
  { id: 2, name: "QA Team", description: "Quality assurance team" },
  { id: 3, name: "DevOps Team", description: "DevOps and infrastructure" },
  { id: 4, name: "Operations Team", description: "Operations and monitoring" },
];

export const mockReleases: Release[] = [
  {
    id: 1,
    name: "Release 1.0.0",
    description: "Initial release with core features",
    projectId: 1,
    projectName: "Project Alpha",
    teamId: 1,
    teamName: "Development Team",
    statusId: 5,
    statusName: "Released",
    releaseDate: "2025-09-15T10:00:00",
    createdDate: "2025-08-15T09:00:00",
    modifiedDate: "2025-09-15T10:00:00",
    createdBy: 1,
    createdByUsername: "admin",
    modifiedBy: 1,
    modifiedByUsername: "admin",
  },
  {
    id: 2,
    name: "Release 1.1.0",
    description: "Feature enhancements and bug fixes",
    projectId: 1,
    projectName: "Project Alpha",
    teamId: 1,
    teamName: "Development Team",
    statusId: 5,
    statusName: "Released",
    releaseDate: "2025-10-15T10:00:00",
    createdDate: "2025-09-20T09:00:00",
    modifiedDate: "2025-10-15T10:00:00",
    createdBy: 2,
    createdByUsername: "john.dev",
    modifiedBy: 2,
    modifiedByUsername: "john.dev",
  },
  {
    id: 3,
    name: "Release 2.0.0",
    description: "Major version upgrade with new architecture",
    projectId: 1,
    projectName: "Project Alpha",
    teamId: 1,
    teamName: "Development Team",
    statusId: 3,
    statusName: "Testing",
    releaseDate: "2025-12-15T10:00:00",
    createdDate: "2025-11-01T09:00:00",
    modifiedDate: "2025-12-02T10:00:00",
    createdBy: 2,
    createdByUsername: "john.dev",
    modifiedBy: 1,
    modifiedByUsername: "admin",
  },
  {
    id: 4,
    name: "Mobile App v1.0",
    description: "First mobile application release",
    projectId: 3,
    projectName: "Project Gamma",
    teamId: 1,
    teamName: "Development Team",
    statusId: 2,
    statusName: "In Progress",
    releaseDate: "2026-01-10T10:00:00",
    createdDate: "2025-11-15T09:00:00",
    modifiedDate: "2025-12-01T10:00:00",
    createdBy: 1,
    createdByUsername: "admin",
    modifiedBy: 2,
    modifiedByUsername: "john.dev",
  },
  {
    id: 5,
    name: "API Gateway Update",
    description: "Security patches and performance improvements",
    projectId: 4,
    projectName: "Project Delta",
    teamId: 3,
    teamName: "DevOps Team",
    statusId: 1,
    statusName: "Planning",
    releaseDate: "2026-02-01T10:00:00",
    createdDate: "2025-12-01T09:00:00",
    modifiedDate: "2025-12-01T09:00:00",
    createdBy: 4,
    createdByUsername: "bob.devops",
    modifiedBy: 4,
    modifiedByUsername: "bob.devops",
  },
];
