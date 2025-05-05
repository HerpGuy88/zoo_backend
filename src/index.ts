import express from "express";
import morgan from "artsy-morgan";
import "./config";
import { BehaviorRoutes, ObservationRoutes, UserRoutes } from "./routes";
const cors = require("cors");

const app = express();

app.use(morgan);
app.use(express.json());
app.use(cors());

//=================================================
//                   ROUTES
// ================================================

app.use("/behaviors", BehaviorRoutes);
app.use("/observations", ObservationRoutes);
app.use("/users", UserRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
