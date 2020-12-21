
function recognize(file, lang, logger) {
  return Tesseract.recognize(file, lang, { logger }).
  then(({ data: { text } }) => {
    return text;
  });
}
const log = document.getElementById('log');


function updateProgress(data) {
  log.innerHTML = '';
  const statusText = document.createTextNode(data.status);
  const progress = document.createElement('progress');
  progress.max = 1;
  progress.value = data.progress;
  log.appendChild(statusText);
  log.appendChild(progress);
}


function setResult(text) {
  log.innerHTML = '';
  text = text.replace(/\n\s*\n/g, '\n');
  const pre = document.createElement('pre');
  pre.innerHTML = text;
  log.appendChild(pre);
}

document.getElementById('start').addEventListener('click', () => {
  const file = document.getElementById('file').files[0];
  if (!file) return;

  const lang = document.getElementById('langs').value;

  recognize(file, lang, updateProgress).
  then(setResult);
});
