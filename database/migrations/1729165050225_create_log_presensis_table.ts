import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'log_presensi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cloud_id')
      table.string('nik')
      table.string('type')
      table.string('scan_time')
      table.text('original_data')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
