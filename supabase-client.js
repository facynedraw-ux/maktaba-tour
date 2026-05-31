const SUPABASE_URL = 'https://qsvozaxqeamrdkmujoze.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_MknX65gfRMb8Ncxoe9rRyA_sfCcH_u2';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getSession() {
  const { data: { session } } = await _supabase.auth.getSession();
  return session;
}

async function isAdmin() {
  const session = await getSession();
  if (!session) return false;
  const { data } = await _supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();
  return data?.role === 'admin';
}

function showToast(message, type = 'info') {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const colors = {
    info:    { bg: '#F5F0FA', border: '#9B7FA6', text: '#3D1F2D' },
    success: { bg: '#E8F0E8', border: '#5B8A5F', text: '#3D1F2D' },
    error:   { bg: '#FDE8EE', border: '#C96B8A', text: '#3D1F2D' },
  };
  const c = colors[type] || colors.info;

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: max(90px, calc(70px + env(safe-area-inset-bottom)));
    left: 50%; transform: translateX(-50%);
    background: ${c.bg}; border: 1px solid ${c.border}; color: ${c.text};
    padding: 12px 20px; border-radius: 12px;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
    z-index: 9999; max-width: 320px; text-align: center;
    animation: toastIn 0.2s ease;
  `;
  toast.textContent = message;

  const style = document.createElement('style');
  style.textContent = `@keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(10px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

const SYNONYMS = {
  'salat': 'prière', 'prayer': 'prière',
  'eid': 'aïd', 'aid': 'aïd',
  'quran': 'coran', "qu'ran": 'coran',
  'nabi': 'prophète', 'rasoul': 'prophète',
  'aleph': 'arabe', 'alphabet arabe': 'arabe',
  'wudu': 'woudou', 'ablution': 'woudou',
  'ramadhan': 'ramadan',
  'hadith': 'coran',
  'dua': 'prière',
  'sans visage': 'pudique', 'sans visages': 'pudique',
  'histore': 'conte', 'histoire': 'conte',
  'maternelle': 'petits',
  'tout petit': 'bébé', 'tout-petit': 'bébé',
  'eveil': 'éveil',
  'apprentissage': 'pédagogique',
  'colorie': 'coloriage', 'colorier': 'coloriage',
  'activite': 'activité',
  'fiche': 'pédagogique',
};

function normalizeQuery(q) {
  let normalized = q.toLowerCase().trim();
  Object.entries(SYNONYMS).forEach(([k, v]) => {
    normalized = normalized.replace(new RegExp(k, 'gi'), v);
  });
  return normalized;
}

async function searchBooks(query) {
  const normalized = normalizeQuery(query);
  const { data, error } = await _supabase
    .from('books')
    .select('*, authors(name, slug)')
    .eq('status', 'approved')
    .textSearch('search_vector', normalized, { type: 'websearch', config: 'french' })
    .limit(50);
  if (error) console.error('searchBooks error:', error);
  return data || [];
}
