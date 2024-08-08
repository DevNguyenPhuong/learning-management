import { message } from "antd";

/* eslint-disable */
user;

// Đăng nhập
//Front-end
request: GET(`${URL}/users/${userId}`, {
  username: string,
  password: string,
});

//Back-end
respond = {
  statusCode: "statusCode",
  message: "message",
  data: {
    username,
    fulllname,
    age,
    gender,
    description,
    major,
    objective,
    experience,
    jwt,
  },
};

// Đăng ký
//Front-end
request: POST(`${URL}/users/${userId}`, {
  username,
  fulllname,
  password,
  age,
  gender,
  description,
  major,
  objective,
  experience,
});
//Back-end
respond = {
  status,
  data: {
    username,
    fulllname,
    age,
    gender,
    description,
    major,
    objective,
    experience,
    jwt,
  },
};

// Cập cập thông tin
