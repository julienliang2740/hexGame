function gua(name, shaoYao, zhongYao, zhangYao,  shao, zhong, zhang) { // str, str, str, str, int, int, int
  // Yao is either "yin" or "yang"
  this.name = name;

  this.shaoYao = shaoYao;
  this.zhongYao = zhongYao;
  this.zhangYao = zhangYao;
  
  this.shao = shao;
  this.zhong = zhong;
  this.zhang = zhang;
}

let hexArray = ['hexQIAN', 'hexXUN', 'hexKAN', 'hexGEN', 'hexKUN', 'hexZHEN', 'hexLI', 'hexDUI'];

function rotateElement(element, degrees) {
  element.style.transform = 'rotate(' + degrees + 'deg)';
}

function resetRotation(element) {
  element.style.transform = 'rotate(0deg)';
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

  // Reset rotations
  resetRotation(HexOne);
  resetRotation(HexTwo);
  resetRotation(HexThree);
  resetRotation(HexFour);
  resetRotation(HexFive);
  resetRotation(HexSix);
  resetRotation(HexSeven);
  resetRotation(HexEight);

  const offsetFromButton = 20; // Vertical offset from the New Game button
  const radius = 200; // Adjust radius as needed

  // Position the first hexagram
  const buttonRect = newGameButton.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  HexOne.style.position = 'absolute';
  HexOne.style.left = `${buttonRect.left + buttonRect.width / 2 - HexOne.offsetWidth / 2}px`; // Center align
  HexOne.style.top = `${buttonRect.bottom + scrollTop + offsetFromButton}px`; // Position below the button

  // Find center for other hexagrams
  const center = {
    x: HexOne.offsetLeft + HexOne.offsetWidth / 2,
    y: HexOne.offsetTop + HexOne.offsetHeight / 2 + radius // Adjust this value as needed
  };

  // Position  other hexagrams
  const hexagrams = [HexTwo, HexThree, HexFour, HexFive, HexSix, HexSeven, HexEight];

  hexagrams.forEach((hex, index) => {
    // alert(hex.id);
    // Indexes go from 0-6 (for 7 hex)
    const angle = (2 * Math.PI / 8) * (index - 1); // Angle for each hexagram
    var angle_degree = (360*angle)/(2 * Math.PI)
    const x = center.x + radius * Math.cos(angle) - hex.offsetWidth / 2;
    const y = center.y + radius * Math.sin(angle) - hex.offsetHeight / 2;

    hex.style.position = 'absolute';
    hex.style.left = `${x}px`;
    hex.style.top = `${y}px`;
    rotateElement(hex, angle_degree+90);
  });

  // Position score ball at the vertical center
  const scoreBall = document.getElementById('score-ball');

  const hexOneBottom = HexOne.offsetTop + HexOne.offsetHeight;
  const hexFiveTop = HexFive.offsetTop;
  const middlePoint = (hexOneBottom + hexFiveTop) / 2;

  // Assuming scoreBall height is less than the distance between HexOne and HexFive
  scoreBall.style.position = 'absolute';
  scoreBall.style.top = `${middlePoint - (scoreBall.offsetHeight / 2)}px`; // Center between HexOne and HexFive
  scoreBall.style.left = '50%'; // Center horizontally
  scoreBall.style.transform = 'translateX(-50%)'; // Adjust for its own width  
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

function resetAll() {
  console.log("Reset everything")
  hexArray = ['hexQIAN', 'hexXUN', 'hexKAN', 'hexGEN', 'hexKUN', 'hexZHEN', 'hexLI', 'hexDUI'];
  positionHexagrams();
}

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

// For some reason the Hexagrams start off horizontally off-center, so run resetAll() before anything is done
resetAll();

document.addEventListener('hexArrayRotated', function(e) {
  console.log('Hex array rotated. New order:', e.detail);
  positionHexagrams();
});

// Position on load
window.addEventListener('load', positionHexagrams);

// Reposition on resize
window.addEventListener('resize', positionHexagrams);

