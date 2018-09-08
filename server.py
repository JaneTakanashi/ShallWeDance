import os.path

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web as web

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')

class PoemPageHandler(tornado.web.RequestHandler):
    def post(self):
        noun1 = self.get_argument('noun1')
        noun2 = self.get_argument('noun2')
        verb = self.get_argument('verb')
        noun3 = self.get_argument('noun3')
        self.render('poem.html', roads=noun1, wood=noun2, made=verb,
                difference=noun3)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=[
            (r'/', IndexHandler),
            (r'/poem', PoemPageHandler),
            (r'/js/(.*)', web.StaticFileHandler, {'path': './static/js'}),
            (r'/css/(.*)', web.StaticFileHandler, {'path': './static/css'}),
            (r'/img/(.*)', web.StaticFileHandler, {'path': './static/img'}),
            (r'/json/(.*)', web.StaticFileHandler, {'path': './static/json'}),
            (r'/video/(.*)', web.StaticFileHandler, {'path': './static/video'}),
            (r'/fonts/(.*)', web.StaticFileHandler, {'path': './static/fonts'})
        ],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static")
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
