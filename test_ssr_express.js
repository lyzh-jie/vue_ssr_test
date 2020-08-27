const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
    const app = new Vue({
        data() {
            return {
                url: req.url
            }
        },
        template: `<div>访问的url是：{{url}}</div>`
    })
    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('internal Server Errer!')
            return
        }
        res.writeHead(200, {
            "content-Type": "text/html;charset=utf-8"
        })
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
                <head><title>hello express vue ssr</title></head>
                <body>${html}</body>
            </html>
        `)
    })

})
server.listen(8080, err => {
    if (!err) console.log('服务器启动成功')
    else console.log(err)
})