import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import TaskModal from "./modal";
import { GET } from "../../apiService/apiCall";
import { apiServices } from "../../apiService/apiConfig";

const Task = (props) => {
  const [user, setUser] = React.useState({});
  const [task, setTask] = React.useState({});
  const [userTasks, setUserTasks] = React.useState([]);

  const useTask = userTasks.map((task) => {
    return (
      <MenuItem key={task.id} value={task.id}>
        {task.taskName}
      </MenuItem>
    );
  });

  useEffect(() => {
    var user_data = JSON.parse(localStorage.getItem("user_data"));
    if (user_data !== null) {
      setUser(user_data);
      const getTasks = async () => {
        let userTask = await GET(apiServices.Task.getAllTask);
        console.log(userTask);
      };
      getTasks();
    } else {
      setUser({});
    }
  }, []);
  const handleChangeTask = (event) => {
    setTask(event.target.value);
  };

  // Similar to componentDidMount and componentDidUpdate:

  return (
    <div>
      <TaskModal />
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
                minHeight: "550px",
                m: 2,
                width: "90ch",
                height: "5ch",
              },
            }}
            raised={true}
          >
            <CardContent
              sx={{
                "& > :not(style)": { m: 2, height: "7ch" },
              }}
            >
              <Grid item sx={12}>
                <label>Name</label>
                <TextField
                  fullWidth
                  id="demo-helper-text-aligned"
                  disabled
                  value={user.name}
                />
              </Grid>
              <br />
              <Grid sx={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Choose Task
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={task}
                    label="Task"
                    onChange={handleChangeTask}
                  >
                    {Boolean(userTasks.length) && useTask}
                  </Select>
                </FormControl>
              </Grid>
              <Grid sx={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Choose Language
                  </InputLabel>
                  <Select
                    labelId="select-label-language"
                    id="select-language"
                    label="Task"
                    onChange={handleChangeTask}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={12}>
                <label>Task Desctiption</label>
                <label></label>
              </Grid>
              <Grid item sx={12}>
                <TextField
                  fullWidth
                  id="outlined-multiline-static"
                  label="Solution Code"
                  multiline
                  rows={4}
                  defaultValue="Solution Code"
                />
              </Grid>
              <Divider></Divider>
              <Grid>
                <Button variant="outlined" color="success">
                  Submit
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Task;
