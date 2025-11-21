function el(id){ return document.getElementById(id); }

function renderResults(results){
  const container = el('results');
  container.innerHTML = '';
  if(!results || results.length === 0){
    const d = document.createElement('div');
    d.className = 'status';
    d.textContent = 'No matching entries';
    container.appendChild(d);
    return;
  }
  results.forEach(r => {
    const card = document.createElement('div');
    card.className = 'card';
    const meta = document.createElement('div');
    meta.className = 'meta';
    const ts = document.createElement('span'); ts.textContent = r.timestamp;
    const lvl = document.createElement('span'); lvl.textContent = r.level;
    const src = document.createElement('span'); src.textContent = r.src;
    meta.appendChild(ts); meta.appendChild(lvl); meta.appendChild(src);
    const msg = document.createElement('div');
    msg.className = 'message';
    msg.textContent = r.message;
    card.appendChild(meta);
    card.appendChild(msg);
    container.appendChild(card);
  });
}

async function upload(){
  const f = el('file').files[0];
  if(!f){ el('uploadStatus').textContent = 'Select a file'; return; }
  const fd = new FormData();
  fd.append('file', f);
  el('uploadBtn').disabled = true;
  el('uploadStatus').textContent = 'Uploading...';
  try{
    const res = await fetch('/upload-logs', { method: 'POST', body: fd });
    const j = await res.json();
    el('uploadStatus').textContent = `Uploaded ${j.count} entries`;
  }catch(e){
    el('uploadStatus').textContent = 'Upload failed';
  }finally{
    el('uploadBtn').disabled = false;
  }
}

async function ask(){
  const q = el('q').value;
  if(!q){ el('queryStatus').textContent = 'Enter a query'; return; }
  el('askBtn').disabled = true;
  el('queryStatus').textContent = 'Searching...';
  el('explain').textContent = '';
  renderResults([]);
  try{
    const res = await fetch('/query?q=' + encodeURIComponent(q));
    const j = await res.json();
    renderResults(j.results);
    el('explain').textContent = j.explanation || '';
    el('queryStatus').textContent = 'Done';
  }catch(e){
    el('queryStatus').textContent = 'Query failed';
  }finally{
    el('askBtn').disabled = false;
  }
}

function initDragDrop(){
  const dz = el('drop');
  if(!dz) return;
  dz.addEventListener('dragover', e => { e.preventDefault(); });
  dz.addEventListener('drop', e => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if(files && files[0]){ el('file').files = files; }
  });
}

window.addEventListener('DOMContentLoaded', initDragDrop);
