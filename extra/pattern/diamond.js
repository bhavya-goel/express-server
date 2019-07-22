'use strict';
const num = process.argv[2]
if ( num < 2 || num > 10){
    console.log("Please enter integer between 2 to 10")
}
else{
    // for top half pyramid

for( let i = 1; i <= num; i++){
    //to print spaces

    for ( let j = i; j < num; j++){
        process.stdout.write(" ")
    }
    // to print pattern

    for( let k = 1; k <= i; k++){
        process.stdout.write("* ")
    }
    process.stdout.write("\n")
}

// for bottom half pyramid

for( let i = 1; i <= num; i++){
    // to print spaces

    for ( let j = i; j > 1; j--){
        process.stdout.write(" ")
    }

    // to print pattern

    for( let k = i; k <= num; k++){
        process.stdout.write("* ")
    }
    process.stdout.write("\n")
}

}
