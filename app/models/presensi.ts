import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Presensi extends BaseModel {
  
  static get table(){
    return 'presensi'
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nik: string
  
  @column()
  declare tanggal: string

  @column()
  declare jam_masuk?: string

  @column()
  declare jam_pulang?: string

  @column()
  declare scan_time?: string

  @column()
  declare scan_masuk?: string

  @column()
  declare scan_pulang?: string

  @column()
  declare terlambat?: string

  @column()
  declare pulang_cepat?: string

  @column()
  declare kehadiran?: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime;

}