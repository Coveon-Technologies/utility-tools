const Koa = require('koa')
const app = new Koa({ proxy: true })
const router = require('koa-router')

const _ =  router()
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3001, ()=>{
   console.log('Server running on http://localhost:3001');
});