import { exec, execSync, spawn } from 'child_process';

export function execute(command){
// let out = execSync(command, options);
// extract(out.toString());
let output= exec(command,{'shell':'powershell.exe'},
   function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log(error+'stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
    console.log(output.toString());
    return output;
}

export function jyothi_exec(command){
    let output= exec(command,{'shell':'powershell.exe'},

    function (error, stdout, stderr) {
 
         console.log('stdout: ' + stdout);
 
         console.log(error+'stderr: ' + stderr);
 
         if (error !== null) {
 
              console.log('exec error: ' + error);
 
         }
 
     });
 
     console.log(output.toString());
     return output.toString();
}

export function exec_cmd(cmd, args) {

    return new Promise((resolve, reject) => {
    
    const child = spawn(cmd, args);
    
    child.stdout.on('data', (data)=>resolve(data.toString()));
    
    child.stderr.on('data', (data)=>reject(data.toString()));
    
    child.on('exit', (code) => {
    
    if (code !== 0) {
    
    reject(new Error(`Command ${cmd} exited with code ${code}`));
    
    } else {
    
    resolve();
    
    }
    
    });
    
    });
    
    }



var extract = function(string) {
    var o = {};
    console.log(">>>>>>>> string ::", string);
    string.replace(/(.*?)=(.*?)(?:\|\||$)/g, function(all, key, value) {
        o[key] = value;
    });

    return o;
};

