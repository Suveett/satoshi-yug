import { twiml } from "twilio";
import { urlencoded, Router, Response } from "express";
import express from "express";
import { MessagingRequest } from "../types/request";
import { getReply } from "../src/gpt3";

const { MessagingResponse } = twiml;
const router = Router();
router.use(urlencoded({ extended: false }));
router.use(express.json());

router.post("/", async (req: MessagingRequest, res: Response<string>) => {
  console.log(req.body)
  const userMessage = req.body.Body;
  const response = new MessagingResponse();
  try {
    const reply = await getReply(userMessage, req.body.From);
    // console.log("msg", req.body.From, req.body.To, req.body.Body)
    response.message(reply.text);
    res.json(reply.text);
  } catch (error) {
    console.error(error);
    response.message(`Failed to reply for ${userMessage}.`);
  }
  // res.contentType("application/xml");
  
  // res.send(reply);
});

export default router;
