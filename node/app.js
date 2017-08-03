const Koa = require('koa');
const app = new Koa();
var views = require('co-views');
var koa_static = require('koa-static-server');
var controller = require('koa-route');
var service = require('./service.js');

var render = views('./public', {
    map: {html: 'ejs'}
});

app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}));

app.use(controller.get('/', function*() {
    this.set('Cache-Control', 'no-cache');
    var list = yield service.select_all_api();

    
    function generateRouteFn(){
            let rowData = list[i];
            return function*() {
              this.set('Cache-Control', 'no-cache');
              this.body = rowData;
            }
    }
    for(var i = 0;i < list.length; i++){

          console.log(list[0]);
          app.use(controller.get(list[i].address, generateRouteFn()));
          console.log("这里有执行到");

    }


    this.body = yield service.select_all_api();
}));

app.use(controller.get('/index.html', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index');
}));

console.log("服务已经开启～");

app.listen(3000);