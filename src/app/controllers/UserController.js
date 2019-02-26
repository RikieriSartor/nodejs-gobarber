const {
  User
} = require('../models')

class UserController {
  create(req, res) {
    return res.render('auth/signup')
  }

  async store(req, res) {
    if (!req.file) {
      req.flash('error', 'Please fill your photo!')
      return res.redirect('/signup')
    }

    if (!req.body.name || req.body.name.trim() == '') {
      req.flash('error', 'Please fill your name!')
      return res.redirect('/signup')
    }

    if (!req.body.email || req.body.email.trim() == '') {
      req.flash('error', 'Please fill your e-mail!')
      return res.redirect('/signup')
    }

    if (!req.body.password || req.body.password.trim() == '') {
      req.flash('error', 'Please fill your password!')
      return res.redirect('/signup')
    }

    const {
      filename
    } = req.file

    await User.create({
      ...req.body,
      avatar: filename
    }).catch((error) => {
      req.flash('error', error.message)
    })

    return res.redirect('/')
  }
}

module.exports = new UserController()
