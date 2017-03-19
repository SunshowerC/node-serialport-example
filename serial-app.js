/**
 * Date : 2017/3/3
 * Time : 21:36
 */
　



/*serialPort.list(function (err, ports) {
 ports.forEach(function(port) {
 console.log('1. ', port.comName);
 console.log('2. ', port.pnpId);
 console.log('3. ', port.manufacturer);
 console.log(port);
 });

});*/

var portName = 'COM3';

var SerialPort = require("serialport")
var serialPort = new SerialPort( portName, {
    baudrate: 4800,
    autoOpen: false
}); // this is the openImmediately flag [default is true]


serialPort.open(function (error) {
    if ( error ) {
        console.log('failed to open: '+error);
    } else {
        console.log('open');

        var printStr = throttle(function (data) {

            console.log( new Buffer(data).toString('hex') )
        },2000,true)

        serialPort.on('data', function(data) {
            printStr(data);
        });
/*        serialPort.write("文", function(err, results) {
            console.log('err ' + err);
            console.log('results ' + results);
        });*/
    }
});


function throttle (func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
        var last = new Date() - timestamp;

        //小于wait时间，继续延迟wait-last执行later，知道last >= wait才执行func
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);

                if (!timeout) context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = new Date();
        //是否立即执行
        var callNow = immediate && !timeout;

        if (!timeout) timeout = setTimeout(later, wait);

        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};



