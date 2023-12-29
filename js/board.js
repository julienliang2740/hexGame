let hexArray = ['hex1', 'hex2', 'hex3', 'hex4', 'hex5', 'hex6', 'hex7', 'hex8'];

function illicitResponse() {
    alert("I acknowledge your existence");
}

function positionHexagrams() {
  const newGameButton = document.querySelector('.restart-button');

  // Establish hexagrams
  const HexOne = document.getElementById(hexArray[0]);
  const HexTwo = document.getElementById(hexArray[1]);
  const HexThree = document.getElementById(hexArray[2]);
  const HexFour = document.getElementById(hexArray[3]);
  const HexFive = document.getElementById(hexArray[4]);
  const HexSix = document.getElementById(hexArray[5]);
  const HexSeven = document.getElementById(hexArray[6]);
  const HexEight = document.getElementById(hexArray[7]);

  const offsetFromButton = 20; // Vertical offset from the New Game button
  const radius = 100; // Adjust radius as needed

  // Position the first hexagram
  const buttonRect = newGameButton.getBoundingClientRect();
  HexOne.style.position = 'absolute';
  HexOne.style.left = `${buttonRect.left + buttonRect.width / 2 - HexOne.offsetWidth / 2}px`; // Center align
  HexOne.style.top = `${buttonRect.bottom + offsetFromButton}px`; // Position below the button

  // Find center for other hexagrams
  const center = {
    x: HexOne.offsetLeft + HexOne.offsetWidth / 2,
    y: HexOne.offsetTop + HexOne.offsetHeight + radius // Adjust this value as needed
  };

  // Position  other hexagrams
  const hexagrams = [HexTwo, HexThree, HexFour, HexFive, HexSix, HexSeven, HexEight];

  hexagrams.forEach((hex, index) => {
    // alert(hex.id);
    // Indexes go from 0-6 (for 7 hex)
    const angle = (2 * Math.PI / 8) * (index - 1); // Angle for each hexagram
    //var thedegree = (360*angle)/(2 * Math.PI)
    //alert(thedegree);
    const x = center.x + radius * Math.cos(angle) - hex.offsetWidth / 2;
    const y = center.y + radius * Math.sin(angle) - hex.offsetHeight / 2;

    hex.style.position = 'absolute';
    hex.style.left = `${x}px`;
    hex.style.top = `${y}px`;
  });
}

function rotateClockwise() {
  const last = hexArray[hexArray.length - 1];
  for (var i = hexArray.length - 1; i > 0; --i) {
      hexArray[i] = hexArray[i - 1];
  }
  hexArray[0] = last;

  const rotationEvent = new CustomEvent('hexArrayRotated', { detail: hexArray });
  document.dispatchEvent(rotationEvent);
}

function rotateCounterclockwise() {
  const first = hexArray[0];
  for (var i = 0; i < hexArray.length - 1; ++i) {
      hexArray[i] = hexArray[i + 1];
  }
  hexArray[hexArray.length - 1] = first;

  const rotationEvent = new CustomEvent('hexArrayRotated', { detail: hexArray });
  document.dispatchEvent(rotationEvent);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('hexArrayRotated', function(e) {
  console.log('Hex array rotated. New order:', e.detail);
  positionHexagrams();
});

// Position on load
window.addEventListener('load', positionHexagrams);

// Reposition on resize
window.addEventListener('resize', positionHexagrams);

