import Mail from '../../lib/Mail'

class CancellationMail {
  get key () {
    return 'SubscriptionMail'
  }

  async handle ({ data }) {
    const { meetup, user } = data
    Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: `[${meetup.title}] Nova inscrição`,
      template: 'subscription',
      context: {
        organizer: meetup.organizer.name,
        meetup: meetup.title,
        user: user.name,
        email: user.email
      }
    })
  }
}

export default new CancellationMail()
