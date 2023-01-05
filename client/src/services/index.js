import axios from "axios";

const baseUrl = "http://127.0.0.1:3000";

export async function login(data) {
  const res = await axios({
    url: `${baseUrl}/auth/login`,
    method: "post",
    data,
  });

  return res.data;
}

export async function getProfile() {
  const token = localStorage.getItem("access_token");
  const res = await axios({
    url: `${baseUrl}/auth/profile`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
}

export async function getAllJobs(params) {
  const token = localStorage.getItem("access_token");
  const res = await axios({
    url: `${baseUrl}/jobs`,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function getJobById(id) {
  const token = localStorage.getItem("access_token");
  const res = await axios({
    url: `${baseUrl}/jobs/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}
