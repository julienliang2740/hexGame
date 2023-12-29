var map = {
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
    75: 0, // Vim up
    76: 1, // Vim right
    74: 2, // Vim down
    72: 3, // Vim left
    87: 0, // w
    68: 1, // d
    83: 2, // s
    65: 3,  // a
    82: 9 // r
  };
  
  document.addEventListener('keydown', function(event) {
    var mappedValue = map[event.keyCode];
    if (mappedValue !== undefined) {
      // Perform the action based on the mapped value
      handleKeyPress(mappedValue);
    }
  });
  
  function handleKeyPress(value) {
    console.log("Key pressed with mapped value:", value);
    if (value == 0) alert("0");
    if (value == 1) rotateClockwise();
    if (value == 2) alert("2");
    if (value == 3) rotateCounterclockwise();
    if (value == 9) resetAll();
  }
  