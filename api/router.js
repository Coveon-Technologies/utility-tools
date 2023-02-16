const Router = require("koa-router");
const router = new Router();
const { getEvents, addEvent, pdfToText } = require("./controllers/events.controllers");

router.get("/", (ctx) => (ctx.body = "API up and running!"));
router.get("/events_list", getEvents);
router.post("/add_event", addEvent);
router.post('/pdf-to-text', pdfToText)

module.exports = router;