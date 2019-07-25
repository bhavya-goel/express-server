
export default function diamond(num: number): void {
    'use strict';
    if ( num < 2 || num > 10 || num === undefined) {
        console.log('Please enter integer between 2 to 10 to print a diamond');
    }
    else {
        // for top half pyramid
        for ( let i: number = 1; i <= num; i++) {
            // to print spaces
            for ( let j: number = i; j < num; j++) {
                process.stdout.write(' ');
            }
            // to print pattern
            for ( let k: number = 1; k <= i; k++) {
                process.stdout.write('* ');
            }
            process.stdout.write('\n');
        }
        // for bottom half pyramid
        for ( let i: number = 1; i <= num; i++) {
            // to print spaces
            for ( let j: number = i; j > 1; j--) {
                process.stdout.write(' ');
            }
            // to print pattern
            for ( let k: number = i; k <= num; k++) {
                process.stdout.write('* ');
            }
            process.stdout.write('\n');
        }
    }
}
