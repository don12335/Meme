const canvas = document.getElementById("meme-canvas");
const ctx = canvas.getContext("2d");
let memeList = [];

function fetchMemes() {
  fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => {
      memeList = data.data.memes;
      generateMeme();
    });
}

function generateMeme() {
  const topText = document.getElementById("topText").value;
  const bottomText = document.getElementById("bottomText").value;

  if (memeList.length === 0) {
    alert("還沒抓到資料，請稍後再試");
    return;
  }

  const meme = memeList[Math.floor(Math.random() * memeList.length)];
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = meme.url;
  img.onload = function () {
    drawMeme(img, topText, bottomText);
  };
}

function drawMeme(img, topText, bottomText) {
  canvas.width = img.width > 500 ? 500 : img.width;
  canvas.height = img.height * (canvas.width / img.width);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.font = "bold 30px sans-serif";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.textAlign = "center";

  ctx.fillText(topText, canvas.width / 2, 40);
  ctx.strokeText(topText, canvas.width / 2, 40);
  ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
  ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
}

function downloadMeme() {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

fetchMemes();
