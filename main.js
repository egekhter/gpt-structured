require('dotenv').config();

let gptService = require('./services/gpt');

async function main() {
    let prompt = "What are the 10 best movies from 1990 to 2000? Include actors and plot.";
    let functionName = "getMovies";

    let organized_output = await gptService.organize(prompt, functionName, 0);

    console.log(organized_output);
}

main()