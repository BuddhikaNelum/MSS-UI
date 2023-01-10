type TDepartmentSample = {
  _id: string;
  department: string;
};

type TDepartment = {
  id: 1;
  name: string;
};

type TDepartmentCreateRequest = {
  name: string;
};

export type { TDepartmentSample, TDepartment, TDepartmentCreateRequest };
