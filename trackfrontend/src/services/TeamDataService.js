import http from "../http-common";

class TeamDataService {
  getAll() {
    return http.get("/teams");
  }

  get(id) {
    return http.get(`/teams/${id}`);
  }

  create(data) {
    return http.post("/teams", data);
  }
  createEmp(data) {
    return http.post("/employees", data);
  }
  getEmp(id) {
    return http.get(`/employees/${id}`);
  }
  getTask(id) {
    return http.get(`/employees/task/${id}`);
  }
  update(id, data) {
    return http.put(`/teams/${id}`, data);
  }

  delete(id) {
    return http.delete(`/teams/${id}`);
  }

  deleteAll() {
    return http.delete(`/teams`);
  }

  findByTitle(title) {
    return http.get(`/teams?name=${title}`);
  }
}

export default new TeamDataService();
