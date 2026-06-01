// media-picker.js — Sélecteur de médias Supabase Storage
// Dépendances : _supabase (supabase-client.js)

const MediaPicker = (() => {
  let _modal = null;
  let _targetInput = null;
  let _onSelect = null;
  let _cfg = {};
  let _allFiles = [];

  // ── Public API ──────────────────────────────────────────────
  function open({ inputId, bucket = 'submissions', prefix = '', accept = 'image', onSelect = null }) {
    if (_modal) close();
    _targetInput = inputId ? document.getElementById(inputId) : null;
    _onSelect = onSelect;
    _cfg = { bucket, prefix, accept };
    _render();
    _load();
  }

  function close() {
    _modal?.remove();
    _modal = null;
    document.body.style.overflow = '';
  }

  // ── Modal ────────────────────────────────────────────────────
  function _render() {
    const isImg = _cfg.accept === 'image';
    const accepts = isImg ? 'image/*' : '.pdf';
    const icon   = isImg ? 'image'       : 'picture_as_pdf';

    _modal = document.createElement('div');
    _modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(61,31,45,0.55);display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(2px);';
    _modal.innerHTML = `
<div style="background:white;border-radius:20px;width:100%;max-width:700px;max-height:88vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 24px 60px rgba(61,31,45,0.18);">

  <!-- Header -->
  <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 24px 14px;border-bottom:1px solid #E8D5DC;flex-shrink:0;">
    <div>
      <h3 style="margin:0;font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:#3D1F2D;">Bibliothèque de médias</h3>
      <p id="mp-count" style="margin:2px 0 0;font-family:'DM Sans',sans-serif;font-size:12px;color:#8A6A7A;"></p>
    </div>
    <button onclick="MediaPicker._close()" aria-label="Fermer" style="border:none;background:#F5E8F0;cursor:pointer;color:#C96B8A;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;">
      <span style="font-family:'Material Symbols Outlined';font-size:18px;line-height:1;">close</span>
    </button>
  </div>

  <!-- Upload + Recherche -->
  <div style="padding:14px 24px;border-bottom:1px solid #E8D5DC;display:flex;gap:10px;align-items:center;flex-shrink:0;">
    <label id="mp-upload-zone" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border:1.5px dashed #C96B8A;border-radius:10px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#C96B8A;background:#FFF5F7;flex-shrink:0;transition:background 0.15s;">
      <span style="font-family:'Material Symbols Outlined';font-size:17px;line-height:1;">upload</span>
      <span id="mp-upload-label">Uploader…</span>
      <input type="file" id="mp-file-input" accept="${accepts}" style="display:none;" onchange="MediaPicker._upload(this)">
    </label>
    <input id="mp-search" type="text" placeholder="Filtrer par nom…" oninput="MediaPicker._filter(this.value)"
      style="flex:1;padding:8px 12px;border:1.5px solid #E8D5DC;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;color:#3D1F2D;outline:none;min-width:0;"
      onfocus="this.style.borderColor='#C96B8A'" onblur="this.style.borderColor='#E8D5DC'">
  </div>

  <!-- Grille -->
  <div id="mp-grid" style="flex:1;overflow-y:auto;padding:16px 24px;">
    <div id="mp-loading" style="display:flex;align-items:center;justify-content:center;padding:48px;gap:10px;color:#8A6A7A;font-family:'DM Sans',sans-serif;font-size:13px;">
      <span style="font-family:'Material Symbols Outlined';font-size:20px;animation:mp-spin 1s linear infinite;">autorenew</span>
      Chargement…
    </div>
  </div>

</div>
<style>
@keyframes mp-spin { to { transform:rotate(360deg); } }
#mp-grid::-webkit-scrollbar { width:6px; }
#mp-grid::-webkit-scrollbar-track { background:transparent; }
#mp-grid::-webkit-scrollbar-thumb { background:#E8D5DC; border-radius:3px; }
</style>`;

    _modal.addEventListener('click', (e) => { if (e.target === _modal) close(); });
    document.body.appendChild(_modal);
    document.body.style.overflow = 'hidden';
  }

  // ── Chargement fichiers ──────────────────────────────────────
  async function _load() {
    const { data, error } = await _supabase.storage
      .from(_cfg.bucket)
      .list(_cfg.prefix || '', { limit: 300, sortBy: { column: 'created_at', order: 'desc' } });

    const grid = document.getElementById('mp-grid');
    if (!grid) return;

    if (error || !data) {
      grid.innerHTML = `<p style="text-align:center;padding:40px;color:#C96B8A;font-family:'DM Sans',sans-serif;font-size:13px;">Erreur de chargement : ${error?.message || 'bucket inaccessible'}</p>`;
      return;
    }

    _allFiles = data.filter(f => f.id && f.name); // exclure dossiers
    if (_cfg.accept === 'image') {
      _allFiles = _allFiles.filter(f => /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(f.name));
    } else {
      _allFiles = _allFiles.filter(f => /\.pdf$/i.test(f.name));
    }

    _renderGrid(_allFiles);
  }

  function _filter(q) {
    const lower = q.toLowerCase();
    _renderGrid(lower ? _allFiles.filter(f => f.name.toLowerCase().includes(lower)) : _allFiles);
  }

  function _renderGrid(files) {
    const grid = document.getElementById('mp-grid');
    const count = document.getElementById('mp-count');
    if (!grid) return;

    if (count) count.textContent = `${files.length} fichier${files.length !== 1 ? 's' : ''}`;

    if (files.length === 0) {
      grid.innerHTML = `
        <div style="text-align:center;padding:48px;font-family:'DM Sans',sans-serif;">
          <span style="font-family:'Material Symbols Outlined';font-size:36px;color:#E8D5DC;display:block;margin-bottom:8px;">image_not_supported</span>
          <p style="color:#8A6A7A;font-size:13px;margin:0;">Aucun fichier trouvé.<br>Uploadez votre premier fichier ci-dessus.</p>
        </div>`;
      return;
    }

    const isImg = _cfg.accept === 'image';

    grid.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(${isImg ? '110px' : '130px'},1fr));gap:10px;">
      ${files.map(f => {
        const path = _cfg.prefix ? `${_cfg.prefix}${f.name}` : f.name;
        const { data: { publicUrl } } = _supabase.storage.from(_cfg.bucket).getPublicUrl(path);
        const safeUrl = publicUrl.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        const shortName = f.name.length > 22 ? f.name.slice(0, 20) + '…' : f.name;

        if (isImg) {
          return `
            <div onclick="MediaPicker._select('${safeUrl}')"
              style="cursor:pointer;border:2px solid #E8D5DC;border-radius:12px;overflow:hidden;aspect-ratio:3/4;position:relative;transition:all 0.15s;"
              onmouseover="this.style.borderColor='#C96B8A';this.querySelector('.mp-overlay').style.opacity='1'"
              onmouseout="this.style.borderColor='#E8D5DC';this.querySelector('.mp-overlay').style.opacity='0'">
              <img src="${publicUrl}" alt="${f.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
              <div class="mp-overlay" style="opacity:0;transition:opacity 0.15s;position:absolute;inset:0;background:rgba(201,107,138,0.18);display:flex;align-items:center;justify-content:center;">
                <span style="font-family:'Material Symbols Outlined';font-size:28px;color:white;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.4));">check_circle</span>
              </div>
              <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(61,31,45,0.65));padding:8px 6px 5px;font-size:9px;color:white;font-family:'DM Sans',sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${shortName}</div>
            </div>`;
        } else {
          return `
            <div onclick="MediaPicker._select('${safeUrl}')"
              style="cursor:pointer;border:2px solid #E8D5DC;border-radius:12px;padding:14px 8px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px;transition:all 0.15s;background:white;"
              onmouseover="this.style.borderColor='#C96B8A';this.style.background='#FFF5F7'"
              onmouseout="this.style.borderColor='#E8D5DC';this.style.background='white'">
              <span style="font-family:'Material Symbols Outlined';font-size:30px;color:#C96B8A;">picture_as_pdf</span>
              <span style="font-size:10px;color:#3D1F2D;font-family:'DM Sans',sans-serif;word-break:break-all;line-height:1.3;">${shortName}</span>
            </div>`;
        }
      }).join('')}
    </div>`;
  }

  // ── Upload ───────────────────────────────────────────────────
  async function _upload(input) {
    const file = input.files[0];
    if (!file) return;

    const label = document.getElementById('mp-upload-label');
    if (label) label.textContent = 'Envoi…';

    const ts = Date.now();
    const safeName = file.name.replace(/[^a-z0-9.\-_]/gi, '-').toLowerCase();
    const path = _cfg.prefix ? `${_cfg.prefix}${ts}-${safeName}` : `${ts}-${safeName}`;

    const { error } = await _supabase.storage.from(_cfg.bucket).upload(path, file, { upsert: false });

    if (label) label.textContent = 'Uploader…';
    input.value = '';

    if (error) {
      if (typeof showToast === 'function') showToast('Erreur upload : ' + error.message, 'error');
      return;
    }

    const { data: { publicUrl } } = _supabase.storage.from(_cfg.bucket).getPublicUrl(path);
    _select(publicUrl);
    // Recharger la grille pour voir le nouveau fichier
    await _load();
  }

  // ── Sélection ────────────────────────────────────────────────
  function _select(url) {
    if (_targetInput) {
      _targetInput.value = url;
      _targetInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (_onSelect) _onSelect(url);
    if (typeof showToast === 'function') showToast('Image sélectionnée ✓', 'success');
    close();
  }

  return { open, _close: close, _upload, _filter, _select, _renderGrid };
})();
