import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import admissionRouter from "./admission";
import chatRouter from "./chat";
import ttsRouter from "./tts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(admissionRouter);
router.use(chatRouter);
router.use(ttsRouter);

export default router;
