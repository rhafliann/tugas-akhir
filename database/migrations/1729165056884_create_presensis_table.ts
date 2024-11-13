import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'presensi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nik')
      table.date('tanggal')
      table.time('jam_masuk').nullable()
      table.time('jam_pulang').nullable()
      table.time('scan_time').nullable()
      table.time('scan_masuk').nullable()
      table.time('scan_pulang').nullable()
      table.time('terlambat').nullable()
      table.time('pulang_cepat').nullable()
      table.time('kehadiran').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}