import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class LogPresensi extends BaseModel {
  
  static get table(){
    return 'log_presensi'
  }

  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare cloud_id: string

  @column()
  declare nik: string

  @column()
  declare type: string

  @column.dateTime()
  declare scan_time: DateTime

  @column()
  declare original_data: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime;
}