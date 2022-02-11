import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Divider, Grid, TextField } from "@mui/material";

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

const TaskModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (localStorage.getItem("user_data") !== null) {
      setOpen(false);
    } else {
      setOpen(true);
      alert("Please enter name and email");
    }
  };

  useEffect(() => {
    var user_data = JSON.parse(localStorage.getItem("user_data"));
    if (user_data !== null) {
      handleClose();
    } else {
      console.log("no data");
      handleOpen();
    }
  }, []);

  const handleFormSubmit = () => {
    var data = {
      name: formik.values.name,
      email: formik.values.email,
    };
    localStorage.setItem("user_data", JSON.stringify(data));
    handleClose();
    window.location.reload();
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
    <Modal
      disableEnforceFocus
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
  );
};
export default TaskModal;
