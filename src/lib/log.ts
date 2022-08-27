import chalk from 'chalk';

type LogType = 'success' | 'init' | 'exit' | 'code' | 'none';
export default async function log(message: any, type?: LogType) {
    if(typeof message !== 'string') message = await message.toString();
    if(!type) type = await 'none';
    var msg;
    if(type === 'success') msg = await `${await chalk.bold.green("[Success]")} ${message}`;
    if(type === 'init') msg = await `${await chalk.bold.blue("[Initialisation]")} ${message}`;
    if(type === 'exit') msg = await `${await chalk.bold.red("[Exit]")} ${message}`;
    if(type === 'none') msg = await message;
    if(!type) msg = await message;
    msg = await `${chalk.bold.cyan("[Sulfer]")} ${msg}`;
    await console.log(msg);
    return msg;
}