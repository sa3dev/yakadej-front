import { FormControl } from '@angular/forms';
import * as moment from 'moment';

export function isValidDate(c: FormControl) {
    const date: string = c.value;
    if (date.length === 0) {
        return null;
    }

    if (date.length <= 10) {

        if (RegExp(/^\d{2}\/\d{2}\/\d{4}$/).test(date)) {
            const parsedDate = moment(date, 'DD/MM/YYYY', true);
            if (parsedDate.isValid()
                && parsedDate.isAfter(moment('01/01/1920', 'DD/MM/YYYY'))
                && parsedDate.isBefore(moment())
            ) {
                return null;
            }
        }

        return {
            dateFormat: {
                valid: false
            }
        };
    } else {
        c.setValue(date.substr(0, 10));
        c.updateValueAndValidity();
    }
}
