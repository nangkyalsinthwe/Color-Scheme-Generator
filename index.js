const btn = document.getElementById('get-btn');
const colorDisplay = document.getElementById('color-display')


btn.addEventListener("click", () => {
  const seedColor = document.getElementById('seed-color').value.slice(1);
  const schemeMode = document.getElementById('scheme-mode').value;
  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${schemeMode}&count=5`)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(data => renderColors(data.colors))
})

function renderColors(colors) {
  const colorPieces = colors.map(color => {
    return `
            <div class='color-item'>
              <div class="color-bar" style="background-color: ${color.hex.value}"></div>
              <div class="hex-text" onclick="copyToClipboard('${color.hex.value}')">
                ${color.hex.value}
              </div>
            </div>
         `
  }).join('');

  colorDisplay.innerHTML = colorPieces
}

window.copyToClipboard = function (text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log("Copied: " + text);
    alert("Copied to clipboard: " + text);
  });
}