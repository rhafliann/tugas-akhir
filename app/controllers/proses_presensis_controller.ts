import LogPresensi from '#models/log_presensi'
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import { DateTime } from 'luxon'

import EventLogPresensiCreated from '#events/log_presensi_created'


export default class ProsesPresensisController {

    async getData({ request }: HttpContext){
        const hariIni = DateTime.local().toFormat('yyyy-MM-dd')

        // Mengambil start_date dari request atau menggunakan hariIni
        const startDate = request.input('start_date', hariIni)

        const cloudId = 'C2630450C3051F24'

        const dataPresensi = await this.getPresensi(cloudId, startDate)
        if(dataPresensi.error){
          return {
             error: dataPresensi.error,
             message: dataPresensi.error,
           } 
         }

        for (const item of dataPresensi.data) {
            try {
                const logFingerprint = {
                    cloud_id: cloudId,
                    nik: item.pin, // Sesuaikan dengan struktur data dari item
                    type: item.verify,
                    scan_time: item.scan_date,
                    original_data: JSON.stringify(item),
                }

                // Simpan data ke database
               let logPresensi = await LogPresensi.create(logFingerprint)

               EventLogPresensiCreated.dispatch(logPresensi);

            } catch (error) {
                console.error('Error saving fingerprint log:', error)
                continue
            }
        }

        return {
          message: "Processing presensi",
          data: {
            process_count: dataPresensi.data.length
          }
        }

    }

    private async getPresensi(cloudId: string, startDate: DateTime){
        try {
            // Melakukan request HTTP menggunakan axios
            const response = await axios({
              method: 'post',
              url: 'https://developer.fingerspot.io/api/get_attlog',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer NOLQ4U14G2EWG5W3',
              },
              data: {
                trans_id: 1,
                cloud_id: cloudId,
                start_date: startDate,
                end_date: startDate,
              },
            })
            return response.data
          } catch (error) {
            console.error('Error:', error)
            return { error: 'Request failed' }
          }
    }
}