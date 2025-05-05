import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  config();
}

const { DATABASE_URL, NODE_ENV } = process.env;

const IS_DEVELOPMENT = NODE_ENV === "development";

export { DATABASE_URL, IS_DEVELOPMENT, NODE_ENV };
