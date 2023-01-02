import { Box } from "@mui/material";
import { AppScreen } from "enums/screen";
import { setCurrScreen } from "features/app-slice";
import { useAppDispatch } from "hooks/hooks";
import { useEffect } from "react";
import JobCreate from "./job-create";
import JobDetails from "./job-details";
import JobList from "./job-list";

const ManageJobs = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrScreen(AppScreen.TRAVEL_AGENCIES));
  }, []);

  return (
    <Box flexGrow={1} height="100%">
      <JobList />
      <JobCreate />
      <JobDetails />
    </Box>
  );
}

export default ManageJobs;