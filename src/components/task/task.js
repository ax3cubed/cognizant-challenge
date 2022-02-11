import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import TaskModal from "./modal";
import { apiServices } from "../../apiService/apiConfig";
import axios from "axios";
import { GET, POST } from "../../apiService/apiCall";

const Task = (props) => {
  const [user, setUser] = React.useState({});
  const [task, setTask] = React.useState([]);
  const [userTasks, setUserTasks] = React.useState([]);
  const programmingLanguages = [
    "java",
    "php",
    "c++",
    "csharp",
    "js",
    "ruby",
    "python",
  ];
  useEffect(() => {
    var user_data = JSON.parse(localStorage.getItem("user_data"));
    if (user_data !== null) {
      setUser(user_data);
      const getTasks = async () => {
        const tasks = await GET(apiServices.Task.getAllTask);
        setUserTasks(tasks);
      };
      getTasks();
    } else {
      setUser({});
    }
  }, []);
  const handleFormSubmit = (values) => {
    var data = {
      name: user.name,
      email: user.email,
      taskId: values.taskId,
      language: values.language,
      userResponse: values.userResponse,
    };

    console.log(data);
    const postUserTask = async () => {
      const response = await POST(apiServices.UserTask.postUserTask, data);
      if (response) {
        console.log(response);
      }
    };
    postUserTask();

    // window.location.reload();
  };
  const validationSchema = yup.object({
    userResponse: yup
      .string("you must submit a response")
      .required("your code is required"),
    taskId: yup
      .string("you must select a task")
      .required("your task is required"),
  });
  const formik = useFormik({
    initialValues: {
      language: "",
      taskId: "",
      userResponse: ``,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

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
          <Paper
            sx={{
              "& > :not(style)": {
                maxHeight: "1000px",
                minHeight: "550px",
                m: 2,
                width: "90ch",
                height: "5ch",
              },
            }}
            raised={"true"}
            style={{ maxHeight: 600, overflow: "auto" }}
          >
            <List
              sx={{
                "& > :not(style)": { m: 2 },
              }}
              style={{ maxHeight: "100%", overflow: "auto" }}
            >
              {/* <Card
                sx={{
                  "& > :not(style)": {
                    maxHeight: "1000px",
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
                > */}
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
                    id="taskId"
                    name="taskId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.taskId}
                    error={
                      formik.touched.taskId && Boolean(formik.errors.taskId)
                    }
                    helperText={formik.touched.taskId && formik.errors.taskId}
                    label="Task"
                  >
                    {Boolean(userTasks.length) &&
                      userTasks.map((task) => {
                        return (
                          <MenuItem key={task.id} value={task.id}>
                            {task.taskName}
                          </MenuItem>
                        );
                      })}
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
                    id="language"
                    name="language"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.language}
                    error={
                      formik.touched.language && Boolean(formik.errors.language)
                    }
                    helperText={
                      formik.touched.language && formik.errors.language
                    }
                  >
                    {programmingLanguages.map((language, index) => {
                      return (
                        <MenuItem key={index} value={language}>
                          {language}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sx={12}>
                <label>Task Desctiption</label>
                <label>
                  {" "}
                  {Boolean(formik.values.taskId) &&
                    userTasks.find((task) => task.id === formik.values.taskId)
                      .taskDescription}
                  )
                </label>
                <hr></hr>
                <br></br>
                <label>Sample Input:</label>
                <label>
                  {Boolean(formik.values.taskId) &&
                    userTasks.find((task) => task.id === formik.values.taskId)
                      .taskInputParameter}
                  )
                </label>
              </Grid>
              <Grid item sx={12}>
                <CodeEditor
                  id="userResponse"
                  name="userResponse"
                  language={formik.values.language}
                  placeholder={"Enter a " + formik.values.language + " code"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userResponse}
                  padding={15}
                  style={{
                    fontSize: 12,
                    backgroundColor: "#f5f5f5",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                />
              </Grid>
              <Divider></Divider>
              <Grid>
                <Button
                  onClick={formik.handleSubmit}
                  variant="outlined"
                  color="success"
                >
                  Submit
                </Button>
              </Grid>
              {/* </CardContent>
              </Card> */}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Task;
