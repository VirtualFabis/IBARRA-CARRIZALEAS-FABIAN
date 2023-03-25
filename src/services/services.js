import axios from "axios";

const Apis = {
  GetProducts: () => axios.get(`https://localhost:44304/api/test`),
  Insert: (product) => {
    axios.post("https://localhost:44304/api/Create", product);
  },
  Delete: (id) => {
    axios.get(`https://localhost:44304/api/delete?id=${id}`);
  },
  Update: (product) => {
    axios.post(`https://localhost:44304/api/Update`, product);
  },
};
export default Apis;
