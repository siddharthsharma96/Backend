const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sid:123456789_@cluster0.ebltab1.mongodb.net/");

const db = mongoose.connection;
db.on("error", () => {
  console.error("Error in connecting the database");
});
db.once("open", () => {
  console.log("Connected to db");
});

const app = express();
app.use(bodyparser.json());
app.use(cors());

const Exp = mongoose.model("Expense", {
  date: String,
  title: String,
  desc: String,
  type: Number,
  currency: Number,
});
const details = [
  {
    id: 0,
    date: "2024-01-20",
    title: "Fee",
    desc: "Paid the fee",
    type: 2,
    currency: 200,
  },
  {
    id: 1,
    date: "2024-04-20",
    title: "Travell",
    desc: "Travel Expenses ",
    type: 1,
    currency: 50000,
  },
  {
    id: 2,
    date: "2024-01-20",
    title: "Salary",
    desc: "Salary of SDE ONLY ",
    type: 2,
    currency: 200000,
  },
];

//   CRUD: C:create (Post) R:Read(get) U:Update(put,patch) D:Delete

app.get("/Expense", async (req, res) => {
  try {
    const expense = await Exp.find();
    res.status(200).json(expense);
    // res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message: "No data found" });
  }
});
app.get("/Expense/:id", async (req, res) => {
  try {
    const expense = await Exp.findById(req.params.id);
    if (!expense) {
      res.status(404).json({ message: "No data found" });
    }
    res.status(200).json(expense);
    // const { id } = req.params;
    // console.log(id);
    // const data = details.find((e) => e.id === parseInt(id, 10));
    // console.log(data);
    // res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "No data found" });
  }
});
app.post("/Expense", async (req, res) => {
  try {
    const newExpense = new Exp(req.body);
    await newExpense.save();
    res.status(201).json({ message: "data Added" });
    // let { date, type, desc, currency, title } = req.body;
    // console.log(date, type, desc, currency, title);
    // // const maxid = details[details.length - 1];
    // const maxId = Math.max(...details.map((expense) => expense.id), 0);
    // // console.log(maxid.id);
    // const newExpense = {
    //   id: maxId + 1,
    //   date,
    //   type,
    //   desc,
    //   currency,
    //   title,
    // };
    // details.push(newExpense);
    res.json("message:Data Added");
  } catch (err) {
    res.status(500).json({ message: "No data found" });
  }
});
app.put("/Expense/:id", async (req, res) => {
  try {
    await Exp.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Data updated" });
    // const { id } = req.params;
    // console.log(id);
    // let { date, type, desc, currency, title } = req.body;
    // const expenseIndex = details.findIndex(
    //   (detail) => detail.id === parseInt(id, 10)
    // );

    // if (expenseIndex === -1) {
    //   return res.status(404).json({ message: "Expense not found" });
    // }
    // console.log(expenseIndex);
    // details[expenseIndex] = {
    //   id: parseInt(id, 10),
    //   date,
    //   title,
    //   desc,
    //   type,
    //   currency,
    // };
    // res.json("message:Success");
  } catch (err) {
    res.status(500).json({ message: "No data found" });
  }
});
app.delete("/Expense/:id", async (req, res) => {
  try {
    await Exp.findByIdAndDelete(req.params.id);
    res.json({ message: "Data deleted" });
    // const { id } = req.params;
    // console.log(id);
    // let { date, type, desc, currency, title } = req.body;
    // const deleteIndex = details.findIndex(
    //   (detail) => detail.id === parseInt(id, 10)
    // );

    // if (deleteIndex === -1) {
    //   return res.status(404).json({ message: "Expense not found" });
    // }
    // console.log(deleteIndex);
    // const deleteExpense = details.splice(deleteIndex, 1);

    // res.json("message:Deleted the expense");
  } catch (err) {
    res.status(500).json({ message: "No data found" });
  }
});

app.listen(3000, () => {
  console.log("server started");
});
