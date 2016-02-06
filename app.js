var five = require("johnny-five");
var board = new five.Board();
var arDrone = require('ar-drone');
var client  = arDrone.createClient();

board.on("ready", function() {

  // BUTTON Decollage/Atterrissage
  var button = new five.Button(3);
  button.on("down", function() {
    console.log('Take Off !');
    client.takeoff();
  });
  button.on("up", function() {
    console.log('Land !');
    client.land();
  });

  //JOYSTICK Altitude
  var joystickAltitude = new five.Joystick({
  //   [ x, y ]
    pins: ["A1", "A2"],
  });
  joystickAltitude.on("change", function() {
    // console.log("JoystickAltitude");
    // console.log("  x : ", this.x);
    // console.log("  y : ", this.y);
    // console.log("--------------------------------------");
    if (this.y>0){
      client.up(this.y);
    }else{
      client.down(Math.abs(this.y));
    }
  });

  //JOYSTICK Direction
  var joystickDirection = new five.Joystick({
    //   [ x, y ]
    pins: ["A5", "A6"],
  });
  joystickDirection.on("change", function() {
    // console.log("JoystickDirection");
    // console.log("  x : ", this.x);
    // console.log("  y : ", this.y);
    // console.log("--------------------------------------");
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
