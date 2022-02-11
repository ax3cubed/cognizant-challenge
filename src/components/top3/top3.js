import { Card, CardContent, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { GET } from "../../apiService/apiCall";
import { apiServices } from "../../apiService/apiConfig";

const Top3 = (props) => {
  const [userTasks, setUserTasks] = React.useState([]);

  useEffect(() => {
    let top3 = GET(apiServices.UserTask.getTop3UserTask);

    setUserTasks([
      { name: "John", totalSuccess: 10, totalTasks: 20, id: 1 },
      { name: "Danny", totalSuccess: 9, totalTasks: 20, id: 2 },
      { name: "John", totalSuccess: 5, totalTasks: 20, id: 3 },
    ]);
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "NAME",
      width: 150,
      editable: false,
    },
    {
      field: "totalSuccess",
      headerName: "SUCCESS\n SOLUTIONS",
      width: 200,
      editable: false,
    },
    {
      field: "totalTasks",
      headerName: "TASKS",
      width: 150,
      editable: false,
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item sx={3}>
          <Card
            sx={{
              "& > :not(style)": {
                minHeight: "300px",
                m: 2,
                width: "90ch",
                height: "3ch",
              },
            }}
            raised={true}
          >
            <CardContent
            //   sx={{
            //     "& > :not(style)": { m: 2, height: "7ch" },
            //   }}
            >
              <DataGrid
                rows={userTasks}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[3]}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Top3;
