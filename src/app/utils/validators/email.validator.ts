import { FormControl } from '@angular/forms';

export function isEmailValid(c: FormControl): any {
    const emailValue: string = c.value;
    if (emailValue.indexOf('@') === -1) {
        return {
            emailFormat: {
                valid: false
            }
        };
    } else {
        const emailSecondPart = emailValue.split('@')[1];
        if (emailSecondPart.indexOf('.') === -1) {
            return {
                emailFormat: {
                    valid: false
                }
            };
        }
    }

    const wrongMails = [
        'gmial.com',
        'gail.com',
        'gamil.com',
        'gmal.com',
        'hotmial.com',
        'hotamil.com',
        'hotmal.com',
        'hotmial.fr',
        'hotamil.fr',
        'hotmal.fr'];
    let hasWrongEmail = false;
    for (let i = 0; i < wrongMails.length; i++) {
        const extension = emailValue.split('.', 2)[1];
        if (emailValue.endsWith(wrongMails[i]) || extension === 'frr' || extension === 'co') {
            hasWrongEmail = true;
            break;
        }

    }
    return hasWrongEmail ? {
        emailFormat: {
            valid: false
        }
    } : null;
}
