import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// Set FRONTEND_URL in production to your Vercel frontend URL.
// e.g. https://your-app.vercel.app
// Leave unset in development to allow all origins.
const frontendUrl = process.env["FRONTEND_URL"];
app.use(cors(frontendUrl ? { origin: frontendUrl } : {}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
