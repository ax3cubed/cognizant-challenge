import constant from "./constant.json";
const apiHost = constant.apiHost;

export const apiServices = {
  Task: {
    getAllTask: `${apiHost}/task`, // GET
    getTaskById: `${apiHost}/task/:id`, // GET
    postTask: `${apiHost}/task`, // POST
    updateTask: `${apiHost}/task/:id`, // PUT
    deleteTask: `${apiHost}/task/:id`, // DELETE
  },
  UserTask: {
    getAllUserTask: `${apiHost}/userTask/:email`, // GET
    getTop3UserTask: `${apiHost}/userTask/top3`, // GET
    postUserTask: `${apiHost}/userTask`, // POST
  },
};
