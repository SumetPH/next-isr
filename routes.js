const routes = require('next-routes')

module.exports = routes()
   .add('/', '/index')

   .add('/admin', '/admin/index')
   .add('/admin/images', '/admin/images')
   .add('/admin/instructor', '/admin/instructor')
   .add('/admin/login', '/admin/login')
   .add('/admin/setting', '/admin/setting')
   .add('/admin/user', '/admin/user')

   .add('/branch/is', '/branch/is')
   .add('/branch/instructor', '/branch/instructor')
   .add('/branch/images', '/branch/images')
   .add('/branch/lesson', '/branch/lesson')

   .add('/questions', '/questions/questionList')
   .add('/question/:questionId', '/questions/questionById')

   .add('/user/login', '/user/login')
   .add('/user/register', '/user/register')
