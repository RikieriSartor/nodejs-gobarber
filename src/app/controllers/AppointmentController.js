const {
  User,
  Appointment
} = require('../models')

class AppointmentController {
  async create(req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', {
      provider
    })
  }

  async store(req, res) {
    if (!req.body.date) {
      req.flash('error', 'Please fill the date!')
      return res.redirect(`/app/appointments/new/${ req.params.provider }`)
    }

    const {
      id
    } = req.session.user

    const {
      provider
    } = req.params

    const {
      date
    } = req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
