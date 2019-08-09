import * as Yup from 'yup'
import fs from 'fs'
import { resolve } from 'path'
import { isBefore, startOfDay, endOfDay, parseISO } from 'date-fns'
import { Op } from 'sequelize'
import File from '../models/File'
import Meetup from '../models/Meetup'
import User from '../models/User'

const removerArquivo = (filename) => {
  const destination = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')
  fs.unlink(`${destination}/${filename}`, function (err) {
    if (err) console.log(err)
  })
}

class MeetupController {
  async index (req, res) {
    const where = {}
    const page = req.query.page || 1

    if (req.params.id) {
      const meetup = await Meetup.findByPk(req.params.id, {
        where: { organizer_id: req.userId },
        include: [{
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url']
        }]
      })

      return res.json(meetup)
    }

    if (req.query.date) {
      const searchDate = parseISO(req.query.date)

      where.date = {
        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
      }
    }

    const meetups = await Meetup.findAll({
      where,
      order: ['date'],
      include: [{
        model: User,
        as: 'organizer'
      },
      {
        model: File,
        as: 'banner',
        attributes: ['id', 'path', 'url']
      }],
      limit: 10,
      offset: 10 * page - 10
    })

    return res.json(meetups)
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      banner_id: Yup.number().required(),
      title: Yup.string().required(),
      description: Yup.string().required(),
      localization: Yup.string().required(),
      date: Yup.date().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const parseDate = parseISO(req.body.date)
    if (isBefore(parseDate, new Date())) {
      return res.status(400).json({ error: 'This date has passed' })
    }

    const meetup = await Meetup.create({ ...req.body, organizer_id: req.userId })

    return res.json(meetup)
  }

  async update (req, res) {
    const schema = Yup.object().shape({
      banner_id: Yup.number(),
      title: Yup.string(),
      description: Yup.string(),
      localization: Yup.string(),
      date: Yup.date()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }
    const parseDate = parseISO(req.body.date)
    if (isBefore(parseDate, new Date())) {
      return res.status(400).json({ error: 'This date has passed' })
    }

    const meetup = await Meetup.findByPk(req.params.id)
    if (meetup && meetup.organizer_id !== req.userId) {
      return res.status(400).json({ error: "You're not the organizer of this meetup." })
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'This meetup has passed and you can not edit it' })
    }

    const updated = await meetup.update(req.body)

    return res.json(updated)
  }

  async delete (req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [{
        model: File,
        as: 'banner',
        attributes: ['id', 'path', 'url']
      }]
    })
    if (meetup.organizer_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to cancel this meetup" })
    }

    if (!meetup.cancelable) {
      return res
        .status(400)
        .json({ error: 'You can not remove meetups that have passed' })
    }
    const path = meetup.banner.path
    if (await meetup.destroy()) {
      removerArquivo(path)
    }
    return res.json({ msg: 'This meetup has been removed with success' })
  }
}

export default new MeetupController()
