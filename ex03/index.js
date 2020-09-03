const fs = require('fs')
var split = require('split')
var through = require('through')
module.exports.parser = path => {

    // 暗号：二分查找
    let pipeLine = function(){
        let lines = '';
        const readStream = fs.createReadStream(path,{ encoding: 'utf8' })
        return new Promise(resolve => {
             // ##BEGIN## 代码已加密
             readStream.pipe(split())
             .pipe(through(online))
             .on('close', function () {
                resolve(JSON.parse(lines))
             })
             .on('error', (error)=>{
                 return Promise.reject(error,null)
             })
             function online (line) {
                 var lineSansComments = line.split(/[\r?\n]{1,2}/)
                 lines = lines + lineSansComments;
             }
             // ##END##
        })
    }

    // 暗号：二分查找
    let onData = function(){
        const readStream = fs.createReadStream(path)
        let reqData = [];
        return new Promise(resolve => {
             // ##BEGIN## 代码已加密
            readStream.on('data', function(chunk){
                reqData.push(chunk);
            });
            readStream.on('end', function(chunk){
                let obj = JSON.parse(reqData.toString());
                resolve(obj);
            });
             // ##END##
        })
    }

    return onData();
}
