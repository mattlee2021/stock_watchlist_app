import * as express from "express";
import controller from "./controller";

export default express.Router().get("/", controller.getStockData);

// const express = require("express");
// const router = express.Router();
// const controller = require("./controller");

// router.get("/", controller.getStockData);
