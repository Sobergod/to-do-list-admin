# 重点感谢!百度和各种文档各种书对本项目的大力支持!!!!
## 技术栈

这个小项目大致用了4天左右吧,基本上利用的都是闲暇时间

主框架加数据库react+mongodb+koa2

插件:koa2-cors(解决跨域) mongoose(数据库连接)

## node后端项目

写出很多问题的同时也解决了很多问题搭配前台使用即可

使用前需开启数据库

npm start

https://github.com/Sobergod/to-do-list

## 解决的问题有

mongodb的增删改查,不是专业后台出身还是遇到了很多莫名奇妙的问题,尤其是处理内嵌文档的时候,

数据结构是这个样子的,数据库的文档结构也是这样的,里面的数据是不对的,需要自己生成,我只是举例

```
 [
    {
      "time": "2018-08-20T09:16:21.865Z",
      "relTime": "2018-08-20",
      "listItems": [
        {
          "_id": "5b7a86da5b9f0f4a1c958345",
          "title": "123",
          "content": "213",
          "isFinish": false
        },
        {
          "_id": "5b7a86da5b9f0f4a1c958312",
          "title": "123",
          "content": "213",
          "isFinish": true
        },
        {
          "_id": "5b7a86dd5b9f0f4a1c958348",
          "title": "123123",
          "content": "123213",
          "isFinish": false
        },
        {
          "_id": "5b7a86e25b9f0f4a1c95834c",
          "title": "123231",
          "content": "213213",
          "isFinish": false
        }
      ]
    }
  ]
```

1. 第一个问题就是mongo自动生成的时间是有时差的尽量自己生成
2. mongo的内嵌文档不是特别好操作,本来此例里想查出所有isFinish=false的项,我找了好多办法,最后还是全查出来又写了方法处理的.在数据库操作上没找到解决方案,要是有好的解决方案可以联系我.说一下我之前想到的方法,使用mongo的聚合,把所有内嵌元素全都拆分成文档,但是不会合并(笑),然后发现还不如写个函数省事儿.操作我没删在注释里
3. 剩下的就是一些细碎的东西了,一些细碎的查询,删除内嵌文档的某一项也卡了我好久
4. 再没有什么了剩下的就是koa2的一些用法了 路由之类的并不是很难.

## 环境要求

开发环境是win10 + node 10.1.0 + mongodb 3.4