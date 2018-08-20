const router = require('koa-router')()
const { saveTodoList, getTodoList, removeListItem, finish } = require('../app/controllers/todo')

router.post('/', saveTodoList);

router.get('/getlist', getTodoList);

router.get('/remove', removeListItem)
router.get('/finish', finish)

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
