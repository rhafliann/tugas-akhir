/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ProsesPresensisController = () => import('#controllers/proses_presensis_controller')

router.get('/', async ({ view }) => {
  return view.render('home')
})

router.get('/proses-presensi', [ProsesPresensisController, 'getData'])
router.get('/dashboard', 'DashboardController.index')

