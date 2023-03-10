type TJobSample = {
  _id: string;
  status: string;
  name: string;
  department: string;
  createdAt: string;
  completedAt: string;
  createdBy: string;
};

type TJob = {
  id: number;
  name: string;
  description: string;
  department: {
    id: number;
    name: string;
  };
  workMaterials: {
    id: number;
    inventoryId: number;
    inventory: {
      id: number;
      name: string;
      quantity: number;
    };
    jobId: number;
    quantity: number;
  }[];
  jobStatus: number;
  createdAt: string;
  completedAt: string;
  notes: string;
  createdBy: number;
  applicationUser: {
    userType: 2;
    userName: "kendallj";
    email: "kendallj@nightorb.com";
  };
};

type TJobCreateRequest = {
  name: string;
  description: string;
  departmentId: number;
  workMaterials: {
    inventoryId: number;
    quantity: number;
  }[];
  userId: number;
};

type TJobListResponse = TJob[];

type TJobAcceptRequest = {
  orderdAt: string;
  jobId: number;
};

type TJobReportRequest = {
  start: string;
  end: string;
};

type TJobRowReport = {
  id: string;
  name: string;
  description: string;
  departmentId: string;
  department: any;
  workMaterials: any;
  jobStatus: string;
  createdAt: string;
  completedAt: string;
  notes: any;
  createdBy: string;
  applicationUser: any;
};

export type {
  TJobSample,
  TJobCreateRequest,
  TJobListResponse,
  TJob,
  TJobAcceptRequest,
  TJobReportRequest,
  TJobRowReport,
};
