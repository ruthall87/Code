const bodyparser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();

let PORT = process.env.port || 3000;

// Body-parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

let numRequests= 0;
let cars = [
  { id: 1, name: "Prius", color: "blue" },
  { id: 2, name: "Corvette", color: "red" },
  { id: 3, name: "Altima", color: "blue" },
];


app.use(function numRequestsMiddleware(req, res, next) {numRequests++
    next();
  });
  

  app.get("/", function (req, res) {
    res.send(`You visited the API ${req.numRequests} times`);
  });
  
  app.get("/cars", function (req, res) {
    if (req.query.color) {
      res.send(cars.filter((x) => x.color === req.query.color));
    }
    res.send(cars);
  });
  
  app.get("/cars/:id", function (req, res) {
    const findCar = cars.find((x) => x.id == req.params.id);
    if (findCar) {
      res.send(findCar);
    }
    res.status(404);
  });
  
  app.post("/cars", (req, res) => {
    let arrayCount = cars.length + 1;
    if (req.body.name == "" || req.body.color === "") {
      res.status(401).send("missing color or name");
    }
    cars.push({
      id: arrayCount,
      name: req.body.name,
      color: req.body.color,
    });
    res.status(201).send("ok");
  });
  
  app.listen(PORT, function (error) {
    if (error) throw error;
    console.log("Server created Successfully on PORT", PORT);
  });
  


