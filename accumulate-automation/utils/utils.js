import {execSync, spawn, exec } from 'child_process';

export function execute(command, options) {
    console.log("\n Command ::\n", command , "\n");
    let out ;
    try{
        out = execSync(command, options);
    }catch(error){
        out = error.stdout.toString();
        // console.log("Execute stdout ", error.stdout.toString());
        //  console.log("Execute stderr ", error.stderr.toString());
    }
    return out;
};

export function execute_accumulate(command, options) {
    let output = execSync(command, options);
    extract(output.toString());

    return output;
}

export function exec_cmd(cmd, args) {
    return new Promise((resolve, reject) => {
        console.log("------------------>");
        const child = spawn(cmd, args);
        
        console.log("child.stdio >>>> ", child.stdio);
        // console.log("child.stderr >>>> ", child.stderr);
        child.stdout.on('data', (data) => resolve("REsolve ::", data.toString()));
        child.stderr.on('data', (data) => reject("Reject ", data.toString()));

        child.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Command ${cmd} exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}


export function jyothi_exec(command) {
    let output = exec(command, { 'shell': 'powershell.exe' },
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log(error + 'stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

    console.log(output.toString());
    return output.toString();
}


export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
