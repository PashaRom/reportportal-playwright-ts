export interface CreateDashboardRequest {
  name: string;
  description?: string;
}

export interface CreateDashboardResponse {
  id: number;
}

export interface DashboardResource {
  id: number;
  name: string;
  description?: string;
  owner?: string;
  widgets?: unknown[];
}

export interface DashboardListResponse {
  content: DashboardResource[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
