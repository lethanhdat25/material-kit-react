import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
    return number.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
    });
}

export function fPercent(number) {
    return numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
    return numeral(number).format();
}

export function fShortenNumber(number) {
    return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number) {
    return numeral(number).format('0.0 b');
}
