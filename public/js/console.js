var exec = require('child_process').exec;
var cmdStr = 'dir';
exec(cmdStr, function (err, stdout, srderr) {
    if (err) {
        // return srderr
        console.log(srderr);
    } else {
        // return stdout
        console.log(stdout);
    }
});

module.exports.exec = exec