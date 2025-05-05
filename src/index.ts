import express from "express";
import morgan from "artsy-morgan";
import "./config";
import { BehaviorRoutes, ObservationRoutes, UserRoutes } from "./routes";
const cors = require("cors");

const app = express();

//applying morgan middleware to facilitate debugging through more verbose logs
app.use(morgan);

//adding express.json middleware to parse incoming payloads
app.use(express.json());

//adding cors middleware since the frontend and backend have different origins
app.use(cors());

//=================================================
//                ADD ROUTES
// ================================================

app.use("/behaviors", BehaviorRoutes);
app.use("/observations", ObservationRoutes);
app.use("/users", UserRoutes);

//=================================================
//                START SERVICE
// ================================================

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
