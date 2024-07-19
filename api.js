const client = require("./connection.js");
const express = require("express");
const bodyPaser = require("body-parser");

const app = express();
app.use(bodyPaser.json());

app.listen(3300, () => {
  console.log(`Sever is now listening at port 3300`);
});

client.connect();

app.get(`/users`, (req, res) => {
  client.query(`Select * from users`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

app.get("/users/:id", (req, res) => {
  client.query(
    `Select * from users where id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});

app.post("/users", (req, res) => {
  const user = req.body;
  const insertQuery = `insert into users(id,firstname,lastname,location)
                                    values('${user.id}', '${user.firstname}', '${user.lastname}', '${user.location}')`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insert was successful");
    } else {
      return `Error ${res.status(404).statusCode}${err.message}`;
    }
  });
});

app.put("/users/:id", (req, res) => {
  const user = req.body;
  const updateQuery = `update users set firstname = '${user.firstname}',
                                        lastname = '${user.lastname}',
                                        location = '${user.location}'
                                        where id=${req.params.id}`;
  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was seccessful");
    } else {
      return `Error ${res.status(404).statusCode}${err.message}`;
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const insertQuery = `delete from users where id=${req.params.id}`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send(`Delete ${req.params.id} successful`);
    } else {
      return `Error ${res.status(404).statusCode}${err.message}`;
    }
  });
});
