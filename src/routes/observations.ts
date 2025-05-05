const express = require("express");
import { User, Behavior, Observation } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import { getUserFromRequest } from "../middleware";

const router = new express.Router();

//Get all (add pagination later)
router.get("/", async function (req, res) {
  try {
    const observations = await prisma.observation.findMany({
      include: { behavior: true, observer: true },
      orderBy: { observed_at: "desc" },
    });
    res.send(observations);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

router.post("/", getUserFromRequest, async function (req, res) {
  try {
    const { behavior_id, observed_at, animal_name } = req.body;
    if (!(behavior_id && animal_name)) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send("Required parameters not found.");
    }
    const newObservation = await prisma.observation.create({
      data: {
        behavior_id: Number(behavior_id),
        animal_name,
        observer_id: 1,
        observed_at: observed_at || new Date(),
      },
      include: { behavior: true, observer: true },
    });
    res.status(200).send(newObservation);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

export default router;
