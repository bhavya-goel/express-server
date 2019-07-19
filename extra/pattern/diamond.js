var num = process.argv[2]
if ( num < 2 || num > 10){
    console.log("Please enter integer between 2 to 10")
}
else{
    // for top half pyramid
for( var i = 1; i <= num; i++){
    //to print spaces

    for ( var j = i; j < num; j++){
        process.stdout.write(" ")
    }
    // to print pattern

    for( var k = 1; k <= i; k++){
        process.stdout.write("* ")
    }
    process.stdout.write("\n")
}

// for bottom half pyramid

for( var i = 1; i <= num; i++){
    // to print spaces

    for ( var j = i; j > 1; j--){
        process.stdout.write(" ")
    }

    // to print pattern

    for( var k = i; k <= num; k++){
        process.stdout.write("* ")
    }
    process.stdout.write("\n")
}

}
