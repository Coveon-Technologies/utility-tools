const events_db = [];

const getEvents = (ctx) => {
  ctx.body = events_db;
  ctx.status = 200;
};

const addEvent = (ctx) => {
  events_db.push(ctx.request.body);
  ctx.body = "Event Created!";
  ctx.status = 201;
};

const pdfToText = (cts) => {
  console.log('/pdfToText API: TODO')
  ctx.status = 200;
}

module.exports = {
  getEvents,
  addEvent,
  pdfToText
};