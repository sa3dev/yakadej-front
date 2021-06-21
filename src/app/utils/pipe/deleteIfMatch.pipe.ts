import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'deleteIfMatch' })
export class DeleteIfMatch implements PipeTransform {
    transform(value: string): string {

        const word1 = 'Formule ';
        const word2 = 'Comprenant :';

        if (value.startsWith(word1)) {
            const newVal = value.replace(word1, '');
            return newVal;
        }
        if (value.startsWith(word2)) {
            const newVal = value.replace(word2, '');
            return newVal;
        }

    }
}
