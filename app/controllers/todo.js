const todoHelper = require('../dbhelper/td-helper')
// 保存
let saveTodoList = async (ctx, next) => {
    let todoTitle = ctx.request.body.title,
        todoContent = ctx.request.body.content,
        time = ctx.request.body.time,
        list = {
            title: todoTitle,
            content: todoContent,
            isFinish: false
        },
        dbListItem = await todoHelper.findOne({ relTime: time }, { "_id": false, "__v": false }),
        listItem = dbListItem ? dbListItem : { listItems: [] };
    listItem.listItems.push(list);
    await todoHelper.updated({ relTime: time }, { listItems: listItem.listItems }, { upsert: true });
    ctx.body = {
        message: '成功'
    }
}
// 查出所有
let getTodoList = async (ctx, next) => {
    let dbResult = await todoHelper.findAll({}, { "_id": 0, "__v": 0 }),
        ctx_query = ctx.query,
        isFinish = ctx_query.isFinish;
    // let dbResult = await todoHelper.aggregateList([{ "$unwind": "$listItems" }, { "$match": { "listItems.isFinish": true } }]);
    ctx.body = {
        lists: filterIsFinish(dbResult, isFinish)
    }


}
// 删除
let removeListItem = async (ctx, next) => {
    let ctx_query = ctx.query,
        id = ctx_query.id,
        time = ctx_query.time;
    // 这个是删除
    let a = await todoHelper.updated({ relTime: time }, { $pull: { listItems: { _id: id } } });
    console.log(a);
    if (a) {
        ctx.body = {
            message: '删除成功'
        }
    } else {
        ctx.body = {
            message: '删除失败'
        }
    }
}
// 完成
let finish = async (ctx, next) => {
    let ctx_query = ctx.query,
        time = ctx_query.time,
        id = ctx_query.id,
        isFinish = ctx_query.isFinish;
    let a = await todoHelper.updated({ relTime: time, "listItems._id": id }, { $set: { 'listItems.$.isFinish': true } })
    if (a) {
        ctx.body = {
            message: '完成'
        }
    }
}

// 筛选出是否完成的项
filterIsFinish = (array, boolean1) => {
    let dbResult = array,
        boolean = boolean1 === "false" ? true : false;
    for (let i = 0; i < dbResult.length; i++) {
        for (let j = dbResult[i].listItems.length - 1; j >= 0; j--) {
            if (dbResult[i].listItems[j].isFinish === boolean) {
                dbResult[i].listItems.splice(j, 1);
            }
        }
    }
    for (let i = dbResult.length - 1; i >= 0; i--) {
        if (dbResult[i].listItems.length === 0) {
            dbResult.splice(i, 1);
        }
    }
    return dbResult;
}

module.exports = {
    saveTodoList,
    getTodoList,
    removeListItem,
    finish
}