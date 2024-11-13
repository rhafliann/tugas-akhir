import EventLogPresensiCreated from "#events/log_presensi_created";
import Presensi from "#models/presensi";

import { DateTime } from "luxon";

export default class LogPresensiCreated {

    async handle(event: EventLogPresensiCreated) {
        // insert into presensi
        console.log('presensi-onlistener', event.logPresensi.nik);
        console.log(event.logPresensi.scan_time);

        const now = DateTime.local()
        const hariIni = now.toFormat('yyyy-MM-dd');

        const jam10pagi = DateTime.local().set({hour: 10, minute: 1, second: 0});

        let jam_masuk = this.setTime(8) // set jam masuk ke jam 8 pagi
        let jam_pulang = this.setTime(17) // set jam pulang ke jam 5 sore

        if(now.weekday == 5){
            // waktu khusus untuk hari jumat
            jam_masuk = this.setTime(7, 30);
            jam_pulang = this.setTime(17, 30);
        }

        let scanTime = DateTime.fromFormat(`${event.logPresensi.scan_time}`, 'yyyy-MM-dd HH:mm:ss');

        let presensiPayload: Partial<Presensi> = {
            jam_masuk: jam_masuk.toFormat('HH:mm:ss'),
            jam_pulang: jam_pulang.toFormat('HH:mm:ss'),
            tanggal: hariIni,
            nik: event.logPresensi.nik,
        }

        let presensi = await Presensi.query().where(presensiPayload).first()
        if(!presensi){
            presensi = await Presensi.create(presensiPayload);
        }

        if(scanTime > jam10pagi){
            // kondisi ketika scan diatass jam 10 pagi maka dianggap jam pulang
            presensi.scan_pulang = scanTime.toFormat('HH:mm:ss')

            if(scanTime < jam_pulang){
                let pulang_cepat = jam_pulang.diff(scanTime, ['hours', 'minutes', 'seconds'])
                presensi.pulang_cepat = this.setTime(pulang_cepat.hours, pulang_cepat.minutes, pulang_cepat.seconds).toFormat('HH:mm:ss') 
            }

            let kehadiran = scanTime.diff(jam_masuk, ['hours', 'minutes', 'seconds']);
            presensi.kehadiran = this.setTime(kehadiran.hours, kehadiran.minutes, kehadiran.seconds).toFormat('HH:mm:ss') 
        } else {
            // apabila kurang dari jam 10 pagi maka diaggap masuk
            presensi.scan_masuk = scanTime.toFormat('HH:mm:ss')

            if(scanTime > jam_masuk){
                let terlambat = scanTime.diff(jam_masuk, ['hours', 'minutes', 'seconds']);
                presensi.terlambat = this.setTime(terlambat.hours, terlambat.minutes, terlambat.seconds).toFormat('HH:mm:ss') 
            }
        }

        presensi.scan_time =  scanTime.toFormat('HH:mm:ss');
        presensi.save();
    }

    setTime(hour: number, minute: number = 0, seconds: number = 0){
        return DateTime.local().set({hour: hour, minute: minute, second: seconds})
    }
}