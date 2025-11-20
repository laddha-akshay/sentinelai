async function upload(){
  const f = document.getElementById('file').files[0];
  if(!f){ alert('select a file'); return; }
  const fd = new FormData();
  fd.append('file', f);
  document.getElementById('uploadStatus').innerText = 'Uploading...';
  const res = await fetch('/upload-logs', { method: 'POST', body: fd });
  const j = await res.json();
  document.getElementById('uploadStatus').innerText = 'Done. ' + JSON.stringify(j);
}

async function ask(){
  const q = document.getElementById('q').value;
  if(!q){ alert('enter a query'); return; }
  document.getElementById('results').innerText = 'Thinking...';
  const res = await fetch('/query?q=' + encodeURIComponent(q));
  const j = await res.json();
  document.getElementById('results').innerText = JSON.stringify(j.results, null, 2);
  document.getElementById('explain').innerText = j.explanation;
}
