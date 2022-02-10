import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Task = (props) => {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [task, setTask] = React.useState({});

  const handleChangeTask = (event) => {
    setTask(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    var user_data = JSON.parse(localStorage.getItem("user_data"));
    if (user_data !== null) {
      setUser(user_data);
    } else {
      console.log("no data");
      handleOpen();
      setUser({});
    }
  }, []);
  const handleFormSubmit = () => {
    var data = {
      name: formik.values.name,
      email: formik.values.email,
    };
    localStorage.setItem("user_data", JSON.stringify(data));
    handleClose();
  };
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            Enter Name and Email
          </Typography>
          <br></br>
          <Box
            sx={{
              "& > :not(style)": { m: 2, height: "5ch" },
            }}
            id="modal-modal-description"
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Email"
                id="email"
                name="email"
                type="email"
                inputProps={{ style: { textTransform: "lowercase" } }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Name"
                id="name"
                name="name"
                type="text"
                inputProps={{ style: { textTransform: "lowercase" } }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Box>
          <Divider style={{ marginBottom: "5px" }} />

          <Button
            onClick={formik.handleSubmit}
            style={{ float: "right" }}
            variant="contained"
          >
            Continue
          </Button>
        </Box>
      </Modal>

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
                minHeight: "500px",
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
