usageExample =  'node myLights.js IP_Address Percentage(1-100)\n\n' +
                'Example for 2 tone lights:\n'+
                '  node myLights.js 192.168.1.1 10\n\n'+
                'Example for RGB lights:(RED)\n'+
                '  node myLights.js 192.168.1.1 100 0 0\n\n'+
                'Example for RGB lights:(Green)\n'+
                '  node myLights.js 192.168.1.1 0 100 0\n\n'+
                'Example for RGB lights:(Blue)\n'+
                '  node myLights.js 192.168.1.1 0 0 100\n\n';

//console.log(usageExample);

// discovery
const { Discovery } = require('magic-home');
let discovery = new Discovery();
discovery.scan(500).then(devices => {
    console.log("\n***************\nDiscovered: ");
    console.log(devices);
    console.log("\n***************\n")

const myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

var IPAddress = '';
// Red (warm for 2 color bulb)
var r_percent = '';
    r_percent = myArgs[1];
    if (myArgs[1] > 100){ myArgs[1] = 100;}
var redPercent = parseInt(( r_percent * .01) * 255); //convert percent to hex(1-255)
// GREEN (cool for 2 color bulb)
var g_percent = '';
    g_percent = myArgs[2];
    if (myArgs[2] > 100){ myArgs[2] = 100;}
var greenPercent = parseInt(( g_percent * .01) * 255); //convert percent to hex(1-255)
// BLUE
var b_percent = '';
    b_percent = myArgs[3];
    if (myArgs[3] > 100){ myArgs[3] = 100;}
var bluePercent = parseInt(( b_percent * .01) * 255); //convert percent to hex(1-255)

var lightStatus = [];
var lightStatusRed = '';
var lightStatusGreen = '';

const { Control } = require('magic-home');
    if (myArgs.length > 0 ) {
        IPAddress = myArgs[0];
        console.log( "\nSending command to bulb at IP: " + IPAddress);
        let light = new Control(IPAddress);
            light.queryState().then(success => {
                lightStatus = success;
                lightStatusRed = lightStatus.color.red;
                lightStatusGreen = lightStatus.color.green;
                lightOn = lightStatus.on

                if ( toString(redPercent).length > 0 ) {
                    light.setColor(redPercent, greenPercent, bluePercent).then(success => {
                    }).catch( e => { console.log('Set to: ' + myArgs[1] + ' ' + myArgs[2] + ' ' + myArgs[3]); });
                }
            }).catch( e => { });

    } else {
         //fs read
         var fs = require('fs');
         const path = './myLights.ini';

         try {
             if (fs.existsSync(path)) {
                //file exists
                fs.readFile('myLights.ini', 'utf8', function(err, data) {
                    if (err) throw err;
                    var test = JSON.parse(data);
                    //console.log(test[0]["IP"]);
                    IPAddress = test[0]["IP"];
                    var level = test[1]["LEVEL"];
                    console.log(level);

                    //console.log(IPAddress);


                    //Just Toggle the light
                    let light = new Control( IPAddress );
                    light.queryState().then(success => {
                        lightStatus = success;
                        console.log(lightStatus);
                        lightOn = lightStatus.on;
                        if (lightOn == true){
                                light.setPower(false).then(success => {
                                    console.log('light at '+IPAddress+' set to: OFF');
                                }).catch( e => { });
                            }else if (lightOn == false){
                                light.setPower(true).then(success => {
                                    console.log('light at '+IPAddress+' set to: ON');
                                }).catch( e => { });
                            }
                        }).catch( e => { });
                });

             }
         } catch(err) {
             console.error(err);
         }

    }
});
