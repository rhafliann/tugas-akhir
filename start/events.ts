import emitter from '@adonisjs/core/services/emitter'

import LogPresensiCreated from '#events/log_presensi_created'

import ListenerLogPresensiCreated from '#listeners/log_presensi_created'; import('#listeners/log_presensi_created')

emitter.on(LogPresensiCreated, [ListenerLogPresensiCreated, 'handle']);