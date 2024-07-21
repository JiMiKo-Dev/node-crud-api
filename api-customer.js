const client = require("./connection.js");
const express = require("express");
const bodyPaser = require("body-parser");
cors = require("cors");

const app = express();
app.use(bodyPaser.json());
app.use(cors());

const port = process.env.DB_PORT || 3300;

app.listen(port, () => {
  console.log(`Sever is now listening at port ${port}`);
});

client.connect();

app.get(`/api/customers`, (req, res) => {
  client.query(`Select * from customers order by customers.id ASC`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

app.get("/api/customers/:id", (req, res) => {
  client.query(
    `Select * from customers where id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});

app.post("/api/create-customers", (req, res) => {
  const customer = req.body;
  const insertQuery = `insert into customers(fname, age, location)
                                    values('${customer.fname}', '${customer.age}', '${customer.location}')`;
  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("Insert was successful");
    } else {
      console.log(err);
      return `Error ${res.status(404).statusCode}${err}`;
    }
  });
});

app.put("/api/update-customers/:id", (req, res) => {
  const customer = req.body;
  const updateQuery = `update customers set fname = '${customer.fname}',
                                        age = '${customer.age}',
                                        location = '${customer.location}'
                                        where id=${req.params.id}`;
  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was seccessful");
    } else {
      console.log(err);
      return `Error ${res.status(404).statusCode}${err.message}`;
    }
  });
});

app.delete("/api/delete-customers/:id", (req, res) => {
  const insertQuery = `delete from customers where id=${req.params.id}`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send(`Delete ${req.params.id} successful`);
    } else {
      return `Error ${res.status(404).statusCode}${err.message}`;
    }
  });
});
