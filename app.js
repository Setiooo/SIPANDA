// ==================== SIPANDA — App Logic ====================

// State
let currentRole = 'admin';
let currentUser = null;

// ===================== PAGE NAVIGATION =====================
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageName).classList.add('active');
  window.scrollTo(0, 0);
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ===================== LOGIN =====================
function switchRole(role) {
  currentRole = role;
  document.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-role="${role}"]`).classList.add('active');

  const labels = {
    admin: { icon: '🏛️', name: 'Login Admin Pemerintah', idLabel: 'Username / NIP' },
    sekolah: { icon: '🏫', name: 'Login Operator Sekolah', idLabel: 'Username / NUPTK' },
    penerima: { icon: '👨‍👩‍👧', name: 'Login Penerima Bantuan', idLabel: 'NIK / NISN' },
  };
  const l = labels[role];
  document.getElementById('role-icon').textContent = l.icon;
  document.getElementById('role-name').textContent = l.name;
  document.getElementById('login-id-label').textContent = l.idLabel;
}

function showLoginRole(role) {
  showPage('login');
  switchRole(role);
}

function fillDemo(id, pass, role) {
  document.getElementById('login-id').value = id;
  document.getElementById('login-pass').value = pass;
  switchRole(role);
}

function togglePass() {
  const inp = document.getElementById('login-pass');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

function doLogin() {
  const id = document.getElementById('login-id').value.trim();
  const pass = document.getElementById('login-pass').value.trim();

  if (!id || !pass) {
    alert('⚠️ Harap isi username dan password terlebih dahulu.');
    return;
  }

  // Simulate login
  const users = {
    admin:    { name: 'Admin Pusat', role: 'admin',    display: 'Admin Pemerintah', avatar: 'A', subRole: 'Administrator' },
    sekolah:  { name: 'Op. SDN Merdeka', role: 'sekolah', display: 'Operator Sekolah', avatar: 'S', subRole: 'Operator' },
    penerima: { name: 'Budi Santoso', role: 'penerima', display: 'Penerima Bantuan', avatar: 'B', subRole: 'Penerima' },
    nik123:   { name: 'Budi Santoso', role: 'penerima', display: 'Penerima Bantuan', avatar: 'B', subRole: 'Penerima' },
  };

  const user = users[id];
  if (!user || pass !== '1234') {
    alert('❌ Username atau password salah.\n\nGunakan akun demo:\n• admin / 1234\n• sekolah / 1234\n• nik123 / 1234');
    return;
  }

  currentUser = user;
  loadDashboard(user);
  showPage('dashboard');
  showTab('overview');
}

function loadDashboard(user) {
  document.getElementById('sb-role').textContent = user.display;
  document.getElementById('user-name').textContent = user.name;
  document.getElementById('user-role').textContent = user.subRole;
  document.getElementById('user-avatar').textContent = user.avatar;
  document.getElementById('header-user').textContent = user.name;

  const adminNav = document.getElementById('admin-nav');
  const adminStats = document.getElementById('admin-stats');
  const penerimaStats = document.getElementById('penerima-stats');

  if (user.role === 'penerima') {
    adminNav.style.display = 'none';
    adminStats.style.display = 'none';
    penerimaStats.style.display = 'block';
    document.getElementById('p-nama').textContent = user.name;
    document.getElementById('p-nisn').textContent = '1234567890';
  } else {
    adminNav.style.display = 'block';
    adminStats.style.display = 'grid';
    penerimaStats.style.display = 'none';
  }

  // Set date
  const now = new Date();
  document.getElementById('current-date').textContent = now.toLocaleDateString('id-ID', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
  });
}

function doLogout() {
  if (confirm('Yakin ingin keluar dari sistem?')) {
    currentUser = null;
    showPage('landing');
  }
}

// ===================== TABS =====================
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const tab = document.getElementById('tab-' + tabName);
  if (tab) tab.classList.add('active');

  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes(tabName)) {
      n.classList.add('active');
    }
  });

  const titles = {
    overview: ['Dashboard Utama', 'Ringkasan data dan statistik sistem'],
    status:   ['Status Bantuan', 'Status verifikasi seluruh penerima bantuan'],
    riwayat:  ['Riwayat Pencairan', 'Rekam jejak pencairan dana bantuan'],
    timeline: ['Timeline Proses', 'Alur dan tahapan proses bantuan'],
    audit:    ['Audit Trail', 'Rekam jejak aktivitas sistem (Fitur Premium)'],
    export:   ['Export & Laporan', 'Unduh data dan laporan resmi'],
  };
  if (titles[tabName]) {
    document.getElementById('page-title').textContent = titles[tabName][0];
    document.getElementById('page-sub').innerHTML = titles[tabName][1];
  }
}

// ===================== CEK STATUS =====================
function doCekStatus() {
  const nik = document.getElementById('cek-nik').value.trim();
  const nama = document.getElementById('cek-nama').value.trim();

  if (!nik || !nama) {
    alert('⚠️ Harap isi NIK/NISN dan Nama Lengkap.');
    return;
  }

  // Simulate result
  const resultEl = document.getElementById('cek-result');
  resultEl.style.display = 'block';
  resultEl.scrollIntoView({ behavior: 'smooth' });
}

// ===================== NOTIFICATIONS =====================
function toggleNotif() {
  const panel = document.getElementById('notif-panel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// ===================== EXPORT SIMULATION =====================
function simulateExport(type) {
  const msgs = {
    PDF: '📄 File PDF berhasil dibuat! Laporan Bantuan 2025 — 23 halaman. (Simulasi)',
    Excel: '📊 File Excel berhasil dibuat! Data_Penerima_2025.xlsx — 12.847 baris data. (Simulasi)',
    Sync: '🔄 Sinkronisasi berhasil! Semua data tersinkron dengan sistem pusat. (Simulasi)',
  };
  const notif = document.getElementById('export-notif');
  notif.style.display = 'block';
  document.getElementById('export-msg').textContent = '✅ ' + (msgs[type] || 'Operasi berhasil!');
  setTimeout(() => { notif.style.display = 'none'; }, 4000);
}

// ===================== COUNTER ANIMATION =====================
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1500;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });
}

// Observe statistik section for counter animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); observer.disconnect(); }});
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  const statSection = document.getElementById('statistik');
  if (statSection) observer.observe(statSection);

  // Set tanggal beranda jika ada
  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('id-ID', {
      weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
    });
  }
});

// ===================== MOBILE SIDEBAR TOGGLE =====================
// (optional enhancement)
