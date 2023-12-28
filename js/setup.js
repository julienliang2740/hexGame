function illicitResponse() {
    alert("I acknowledge ur existence");
}

function positionHexagrams() {
  const newGameButton = document.querySelector('.restart-button');
  const firstHex = document.getElementById('hex1');
  const hexagrams = document.querySelectorAll('.hexagram:not(#hex1)'); // All hexagrams except the first
  const numHexagrams = hexagrams.length; // It's 7

  const offsetFromButton = 20; // Vertical offset from the New Game button
  const radius = 100; // Adjust radius as needed
  
  // Position the first hexagram
  const buttonRect = newGameButton.getBoundingClientRect();
  firstHex.style.position = 'absolute';
  firstHex.style.left = `${buttonRect.left + buttonRect.width / 2 - firstHex.offsetWidth / 2}px`; // Center align
  firstHex.style.top = `${buttonRect.bottom + offsetFromButton}px`; // Position below the button

  // Find center for other hexagrams
  const center = {
      x: firstHex.offsetLeft + firstHex.offsetWidth / 2,
      y: firstHex.offsetTop + firstHex.offsetHeight + radius // Adjust this value as needed
  };


  // Position other hexagrams
  hexagrams.forEach((hex, index) => {
    alert(hex.id);
      // Indexes go from 0-6 (for 7 hex)
      const angle = (2 * Math.PI / (numHexagrams + 1)) * (index - 1); // Angle for each hexagram
      //var thedegree = (360*angle)/(2 * Math.PI)
      //alert(thedegree);
      const x = center.x + radius * Math.cos(angle) - hex.offsetWidth / 2;
      const y = center.y + radius * Math.sin(angle) - hex.offsetHeight / 2;

      hex.style.position = 'absolute';
      hex.style.left = `${x}px`;
      hex.style.top = `${y}px`;
  });
}


// Position on load
window.addEventListener('load', positionHexagrams);

// Reposition on resize
window.addEventListener('resize', positionHexagrams);
