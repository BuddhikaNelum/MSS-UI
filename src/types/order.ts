type TOrderSample = {
  _id: string;
  status: string;
  createdAt: string;
  completedAt: string;
};

type TOrder = {
  id: number;
  orderdAt: string;
  orderCompletedAt: string;
  orderCompleted: boolean;
  jobId: number;
  job: {
    id: number;
    name: string;
    description: string;
    departmentId: number;
    department: any;
    workMaterials: any;
    jobStatus: number;
    createdAt: string;
    completedAt: string;
    notes: any;
    createdBy: number;
    applicationUser: any;
  };
};

export type { TOrder, TOrderSample };
