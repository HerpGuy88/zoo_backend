const express = require("express");
import { User, Behavior, Observation } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import { getUserFromRequest } from "../middleware";

const router = new express.Router();

//Get all
router.get("/", async function (req, res) {
  try {
    const behaviors = await prisma.behavior.findMany({});
    res.send(behaviors);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

export default router;
