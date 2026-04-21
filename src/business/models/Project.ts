export interface ProjectConfiguration {
  externalSystem: unknown[];
  projectAttributes: { value: string; attribute: string }[];
  statisticCalculationStrategy: string;
  interruptJobTime: string;
  keepLogs: string;
  keepScreenshots: string;
  isAutoAnalyzerEnabled: boolean;
}

export interface ProjectUser {
  login: string;
  projectRole: string;
  proposedRole: string;
}

export interface Project {
  projectId: number;
  projectName: string;
  configuration: ProjectConfiguration;
  users: Record<string, ProjectUser>;
  creationDate: string;
  entryType: string;
}
