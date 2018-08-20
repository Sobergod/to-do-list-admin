const TodoList = require('../models/td')
// 插入
const insert = function (obj) {
    return new Promise((resolve, reject) => {
        // 必须新建实例处理
        const todoList = new TodoList(obj)
        todoList.save(obj, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res);
            }
        })
    })
}
// 查找一个
const findOne = function (conditions, options) {
    return new Promise((resolve, reject) => {
        TodoList.findOne(conditions, options, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
// 查找所有
const findAll = function (conditions, options) {
    return new Promise((resolve, reject) => {
        TodoList.find(conditions, options, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}
// 更新
const updated = function (conditions, doc, options) {
    return new Promise((resolve, reject) => {
        TodoList.update(conditions, doc, options, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })

}
// 聚合
const aggregateList = function (array) {
    return new Promise((resolve, reject) => {
        TodoList.aggregate(array, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}
// 删除
const removeOne = function (conditions, options) {
    return new Promise((resolve, reject) => {
        TodoList.findByIdAndRemove(conditions, options, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}
module.exports = {
    insert,
    findOne,
    findAll,
    updated,
    removeOne,
    aggregateList
}