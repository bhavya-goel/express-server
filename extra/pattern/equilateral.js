
export default function equilateral(num){
    if ( num < 2 || num > 10 || !num){
        console.log("Please enter integer between 2 to 10 to print equilateral triangle")
    }
    else{
        // to count rows
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
    
    }
}


