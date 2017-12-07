let fs=require('fs')
let shell=require('shelljs')
let async=require('async')
let usedModules=[]
/*shell.exec('find . -name "*.js"', (err, out, code) => {
    //log(out)
		let files=out.split('\n')
    async.eachLimit(files, 1,function(i, callback) {
        getModule(i, usedModules, (respFunc) => {
            //log(i)
            callback()
        })
    }, function() {

        log("all jsfiles proccessed")

    })
})
*/
getModule('./editEpisode.js', usedModules, (res) => {
    console.log("donne")
})

function getModule(fileName, usedModules, cb) {
    console.log(fileName, "file under proccessing")
    fs.readFile('./' + fileName, 'utf-8', (err, resp) => {

        if (resp != undefined) {
				let tp=resp.split('\n')
				let index;
            async.eachLimit(tp,1, function(i, callback) {
                if (i.indexOf("require") != -1) {
                    name = i.split("=")
                    name = name[0]
					name=name.split(' ')
					index=name.indexOf('var')
				   name=name[index+1]	
                    if (resp.indexOf(name+".") != -1) {
							console.log("used modules in file "+fileName+" are: ",name)
                        callback()
                    } else {
                             if(name=="loki" || name=="json2csv" || name=="waterfall" || name=="ffprobe" || name=="moment")
									 {
									 callback()
									 }
									 else{
							console.log("module required but not used in file "+fileName+"are :",name)
					shell.exec("sed -i '/\b\('"+name+"'\)\b/d' './'" + fileName, (err, out, code) => {
                      // shell.exec("sed -i '/'" + name + "'/d' './'" + fileName, (err, out, code) => {
                            callback()
					   
                        })
									 }

                    }
                } else {
                    callback()
                }
            }, function() {
                cb("abc")
            })
        } else {
            cb("abc")
        }
    })
}

function log(message) {
    console.log(message)
}
