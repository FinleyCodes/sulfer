import log from './src/lib/log';
import prompt from 'prompt-sync';
import run from './src/index';
import chalk from 'chalk';

(async function() {

    await log('Sulfer starting up...', 'init');
    const readln = await prompt();
    await log('Sulfer running', 'success');
    while(true) {
        const input = await readln(`${chalk.cyan('Sulfer')} >> `);
        if(input === 'exit' || input === '^C') {
            await log('Ending Sulfer process - bye bye ;(', 'exit');
            break;
        };

        const output = await run(input, 'stdin');
        console.log(output);
    }

})()