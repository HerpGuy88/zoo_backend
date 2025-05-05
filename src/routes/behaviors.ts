const express = require("express");
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";

const router = new express.Router();

//=================================================
//                    Create
// ================================================

//=================================================
//                    Read
// ================================================
router.get("/", async function (req, res) {
  try {
    const behaviors = await prisma.behavior.findMany({});
    res.send(behaviors);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});

//=================================================
//                    Update
// ================================================

//=================================================
//                    Destroy
// ================================================

export default router;
