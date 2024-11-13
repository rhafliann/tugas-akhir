import LogPresensi from '#models/log_presensi'
import { BaseEvent } from '@adonisjs/core/events'

export default class LogPresensiCreated extends BaseEvent {
  /**
   * Accept event data as constructor parameters
   */
  constructor(public logPresensi: LogPresensi) {
    super(logPresensi)
  }
}