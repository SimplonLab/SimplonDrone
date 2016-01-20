var five = require("johnny-five");
var board = new five.Board();
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

board.on("ready", function() {

  // BUTTON TAKEOFF
  var buttonTakeOff = new five.Button(2);
  buttonTakeOff.on("down", function() {
    console.log('Take Off !');
    client.takeoff();
  });

  // BUTTON LAND
  var buttonLand = new five.Button(3);
  buttonLand.on("down", function() {
    console.log('Land !');
    client.land();
  });

  //JOYSTICK ALTITUDE
  var joystickAltitude = new five.Joystick({
  //   [ x, y ]
    pins: ["A0", "A1"]
  });
  joystickAltitude.on("change", function() {
    console.log("JoystickAltitude");
    console.log("  y : ", this.y);
    console.log("--------------------------------------");
    if (this.y>0){
      client.up(this.y);
    }else{
      client.down(Math.abs(this.y));
    }
  });

  //JOYSTICK DIRECTION
  var joystickDirection = new five.Joystick({
    //   [ x, y ]
    pins: ["A4", "A5"],
  });
  joystickDirection.on("change", function() {
    console.log("JoystickDirection");
    console.log("  x : ", this.x);
    console.log("  y : ", this.y);
    console.log("--------------------------------------");
    if (this.y>0){
      client.front(this.y);
    }else{
      client.back(Math.abs(this.y));
    }
    if (this.x>0){
      client.right(this.x);
    }else{
      client.left(Math.abs(this.x));
    }
  });

});
