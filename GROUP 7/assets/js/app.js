/* ============================================================
   Starlight Primary School — shared helpers
   Icons, formatting, lesson-content renderer, toasts, dialogs
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- Inline icon set (stroke, currentColor) ---------------- */
  var I = {
    grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>',
    book: '<path d="M12 6.5C10.6 5 8.6 4.2 6.3 4.2c-1 0-2 .15-2.8.45V18.4c.8-.3 1.8-.45 2.8-.45 2.3 0 4.3.8 5.7 2.3 1.4-1.5 3.4-2.3 5.7-2.3 1 0 2 .15 2.8.45V4.65c-.8-.3-1.8-.45-2.8-.45-2.3 0-4.3.8-5.7 2.3Z"/><path d="M12 6.5v13.8"/>',
    clipboard: '<rect x="5" y="4.5" width="14" height="16.5" rx="2.5"/><path d="M9 4.5V3.6A1.6 1.6 0 0 1 10.6 2h2.8A1.6 1.6 0 0 1 15 3.6v.9"/><path d="m9 13.5 2.2 2.2 4.3-4.7"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M8 3.5v4M16 3.5v4M4 10.5h16"/>',
    inbox: '<path d="M5.4 5.5h13.2L21 13.5V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4.5Z"/><path d="M3 13.5h4.6l1.3 2.6h6.2l1.3-2.6H21"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    logout: '<path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3"/><path d="m14 8 4 4-4 4M18 12H9"/>',
    'arrow-right': '<path d="M4 12h15M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H5M11 18l-6-6 6-6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5"/><path d="M15.5 5.6a3.5 3.5 0 0 1 0 5.8M17.5 14.9c1.6.7 2.7 2 3.2 4.1"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.8 13.5-1.6 7 4.8-2.6 4.8 2.6-1.6-7"/>',
    edit: '<path d="M14.5 5.5 18.5 9.5 8 20H4v-4Z"/><path d="m12.5 7.5 4 4"/>',
    trash: '<path d="M5 7h14M10 7V5a1.5 1.5 0 0 1 1.5-1.5h1A1.5 1.5 0 0 1 14 5v2M6.5 7l.8 12.2A2 2 0 0 0 9.3 21h5.4a2 2 0 0 0 2-1.8L17.5 7"/><path d="M10 11v6M14 11v6"/>',
    'chevron-down': '<path d="m6 9.5 6 6 6-6"/>',
    'star-solid': '<path fill="currentColor" stroke="none" d="M12 3.2 14.7 9 21 9.8 16.4 14.1 17.6 20.4 12 17.3 6.4 20.4 7.6 14.1 3 9.8 9.3 9Z"/>',
    alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 8v4.5M12 15.8v.2"/>',
    bulb: '<path d="M9.5 18h5M10 21h4"/><path d="M12 3.5a6 6 0 0 0-3.4 10.9c.8.6 1.4 1.6 1.4 2.6h4c0-1 .6-2 1.4-2.6A6 6 0 0 0 12 3.5Z"/>',
    calculator: '<rect x="5" y="3.5" width="14" height="17" rx="2.5"/><path d="M8.5 7.5h7"/><path d="M9 12h.01M12 12h.01M15 12h.01M9 15.5h.01M12 15.5h.01M15 15.5h.01"/>',
    flask: '<path d="M9.5 3.5h5M10.5 3.5v5.2L4.8 18.3A2 2 0 0 0 6.6 21h10.8a2 2 0 0 0 1.8-2.7L13.5 8.7V3.5"/><path d="M7.5 14.5h9"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.3 3.9 5.1 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.1-3.9-8.5S9.4 5.8 12 3.5Z"/>',
    palette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.3 0 2-.7 2-1.7 0-.9-.6-1.4-.6-2.3 0-1 .8-1.7 2-1.7h1.8c2 0 3.3-1.4 3.3-3.6C20.5 6.8 16.7 3.5 12 3.5Z"/><circle cx="8" cy="9" r="1.1"/><circle cx="12" cy="7.2" r="1.1"/><circle cx="15.8" cy="9" r="1.1"/>',
    heart: '<path d="M12 20s-7-4.6-9-9a4.8 4.8 0 0 1 9-2.2A4.8 4.8 0 0 1 21 11c-2 4.4-9 9-9 9Z"/>'
  };

  function icon(name, cls) {
    return '<svg class="' + (cls || 'icon') + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true">' + (I[name] || I.grid) + '</svg>';
  }

  /* ---------------- Subjects ---------------- */
  var SUBJECTS = {
    'Mathematics': 'calculator',
    'English': 'book',
    'Science': 'flask',
    'Social Studies': 'globe',
    'Creative Arts': 'palette',
    'Physical & Health Education': 'heart'
  };

  function subjectSlug(subject) {
    return subject.toLowerCase().replace(/[^a-z]+/g, '-');
  }
  function subjectIcon(subject) { return SUBJECTS[subject] || 'book'; }

  /* ---------------- Dates ---------------- */
  var dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  var timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });
  var dueFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  function fmtDate(iso) { return dateFmt.format(new Date(iso)); }
  function fmtTime(iso) { return timeFmt.format(new Date(iso)); }
  function fmtDue(isoDate) { return dueFmt.format(new Date(isoDate + 'T12:00:00')); }

  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

  function fmtStamp(iso) {
    var d = new Date(iso);
    var today = startOfDay(new Date());
    var that = startOfDay(d);
    var diff = Math.round((today - that) / 86400000);
    if (diff <= 0) return 'Today ' + fmtTime(iso);
    if (diff === 1) return 'Yesterday ' + fmtTime(iso);
    return fmtDate(iso);
  }

  function todayLine() {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(new Date());
  }

  function dueBadge(isoDate) {
    var today = startOfDay(new Date());
    var due = startOfDay(new Date(isoDate + 'T12:00:00'));
    var diff = Math.round((due - today) / 86400000);
    if (diff < 0) return '<span class="badge badge-late">Overdue</span>';
    if (diff === 0) return '<span class="badge badge-progress">Due today</span>';
    if (diff === 1) return '<span class="badge badge-progress">Due tomorrow</span>';
    return '<span class="badge badge-todo">Due in ' + diff + ' days</span>';
  }

  /* ---------------- Misc ---------------- */
  function param(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  function avatarClass(name) {
    var tints = ['', 'avatar-t1', 'avatar-t2', 'avatar-t3', 'avatar-t4'];
    var n = 0;
    for (var i = 0; i < name.length; i++) n = (n + name.charCodeAt(i)) % 997;
    return tints[n % tints.length];
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  /* ---------------- Lesson figure templates ---------------- */
  function figFractionBars() {
    var rows = [
      { label: 'One half \u00B7 1/2', cells: [1, 0] },
      { label: 'One third \u00B7 1/3', cells: [1, 0, 0] },
      { label: 'Three quarters \u00B7 3/4', cells: [1, 1, 1, 0] }
    ];
    var out = '<svg viewBox="0 0 520 190" role="img" aria-label="Shaded fraction bars">';
    rows.forEach(function (row, r) {
      var y = 16 + r * 56;
      out += '<text x="0" y="' + (y + 24) + '" font-size="14" font-weight="600" fill="#33415E">' + row.label + '</text>';
      row.cells.forEach(function (filled, c) {
        out += '<rect x="170" y="' + y + '" width="82" height="38" rx="5" fill="' +
          (filled ? '#E9A63B' : '#FFFFFF') + '" stroke="#1E2A4E" stroke-width="1.6"/>';
      });
    });
    out += '</svg>';
    return out;
  }

  function figClock() {
    var out = '<svg viewBox="0 0 240 240" role="img" aria-label="Clock showing half past four">';
    out += '<circle cx="120" cy="120" r="96" fill="#FFFFFF" stroke="#1E2A4E" stroke-width="10"/>';
    for (var i = 0; i < 12; i++) {
      var major = i % 3 === 0;
      out += '<line x1="120" y1="34" x2="120" y2="' + (major ? 50 : 44) + '" stroke="#1E2A4E" stroke-width="' +
        (major ? 6 : 3.5) + '" stroke-linecap="round" transform="rotate(' + (i * 30) + ' 120 120)"/>';
    }
    out += '<text x="120" y="82" text-anchor="middle" font-size="17" font-weight="700" fill="#33415E">12</text>';
    out += '<text x="172" y="127" text-anchor="middle" font-size="17" font-weight="700" fill="#33415E">3</text>';
    out += '<text x="120" y="182" text-anchor="middle" font-size="17" font-weight="700" fill="#33415E">6</text>';
    out += '<text x="68" y="127" text-anchor="middle" font-size="17" font-weight="700" fill="#33415E">9</text>';
    out += '<line x1="120" y1="120" x2="157" y2="157" stroke="#E9A63B" stroke-width="8" stroke-linecap="round"/>';
    out += '<line x1="120" y1="120" x2="120" y2="196" stroke="#1E2A4E" stroke-width="7" stroke-linecap="round"/>';
    out += '<circle cx="120" cy="120" r="8" fill="#1E2A4E"/>';
    out += '<circle cx="120" cy="120" r="3" fill="#E9A63B"/>';
    out += '</svg>';
    return out;
  }

  function figWaterCycle() {
    var out = '<svg viewBox="0 0 560 300" role="img" aria-label="Diagram of the water cycle">';
    out += '<defs>' +
      '<marker id="arrBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#5C8BC4"/></marker>' +
      '<marker id="arrGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 Z" fill="#2E7D5B"/></marker>' +
      '</defs>';
    out += '<rect x="0" y="0" width="560" height="300" rx="18" fill="#EDF4FB"/>';

    // sun
    out += '<circle cx="70" cy="62" r="24" fill="#F0B03F"/>';
    out += '<g stroke="#F0B03F" stroke-width="5" stroke-linecap="round">' +
      '<line x1="70" y1="22" x2="70" y2="32"/><line x1="70" y1="92" x2="70" y2="102"/>' +
      '<line x1="30" y1="62" x2="40" y2="62"/><line x1="100" y1="62" x2="110" y2="62"/>' +
      '<line x1="42" y1="34" x2="49" y2="41"/><line x1="91" y1="83" x2="98" y2="90"/>' +
      '<line x1="98" y1="34" x2="91" y2="41"/><line x1="49" y1="83" x2="42" y2="90"/></g>';

    // sea
    out += '<path d="M0 214 Q35 206 70 214 T140 214 T210 214 T280 214 L280 300 L0 300 Z" fill="#7FA8D9"/>';
    out += '<rect x="0" y="258" width="280" height="42" fill="#6E97CC"/>';

    // land + mountain
    out += '<rect x="280" y="240" width="280" height="60" fill="#CBE3CE"/>';
    out += '<polygon points="372,240 456,136 540,240" fill="#6FA873"/>';
    out += '<polygon points="434,162 456,136 478,162 466,172 446,172" fill="#FFFFFF"/>';

    // cloud A (condensing)
    out += '<g fill="#FFFFFF" stroke="#B9C6D8" stroke-width="2.5">' +
      '<ellipse cx="170" cy="108" rx="52" ry="22"/>' +
      '<ellipse cx="132" cy="116" rx="30" ry="16"/>' +
      '<ellipse cx="208" cy="116" rx="30" ry="16"/></g>';

    // cloud B (raining)
    out += '<g fill="#FFFFFF" stroke="#B9C6D8" stroke-width="2.5">' +
      '<ellipse cx="428" cy="78" rx="48" ry="20"/>' +
      '<ellipse cx="394" cy="86" rx="28" ry="14"/>' +
      '<ellipse cx="462" cy="86" rx="28" ry="14"/></g>';
    out += '<g stroke="#5C8BC4" stroke-width="3" stroke-linecap="round">' +
      '<line x1="404" y1="104" x2="399" y2="122"/><line x1="428" y1="106" x2="423" y2="126"/>' +
      '<line x1="452" y1="104" x2="447" y2="122"/></g>';

    // evaporation arrows
    out += '<g fill="none" stroke="#5C8BC4" stroke-width="3" marker-end="url(#arrBlue)">' +
      '<path d="M96 200 C92 172 116 150 128 132"/>' +
      '<path d="M150 202 C150 174 160 152 164 134"/>' +
      '<path d="M204 200 C208 174 204 154 198 136"/></g>';

    // collection arrow
    out += '<path d="M340 268 C306 268 292 262 284 252" fill="none" stroke="#2E7D5B" stroke-width="3.5" marker-end="url(#arrGreen)"/>';

    // labels
    var label = function (x, y, text) {
      return '<text x="' + x + '" y="' + y + '" font-size="13.5" font-weight="600" fill="#33415E" ' +
        'stroke="#EDF4FB" stroke-width="4" paint-order="stroke">' + text + '</text>';
    };
    out += label(38, 188, 'Evaporation');
    out += label(126, 70, 'Condensation');
    out += label(392, 148, 'Precipitation');
    out += label(330, 292, 'Collection');
    out += '</svg>';
    return out;
  }

  var FIGURES = {
    'fraction-bars': figFractionBars,
    'clock': figClock,
    'water-cycle': figWaterCycle
  };

  /* ---------------- Lesson content renderer ---------------- */
  function renderBlocks(blocks) {
    var html = '';
    blocks.forEach(function (b) {
      if (b.t === 'p') {
        html += '<p>' + esc(b.x) + '</p>';
      } else if (b.t === 'h2') {
        html += '<h2>' + esc(b.x) + '</h2>';
      } else if (b.t === 'ul') {
        html += '<ul>' + b.items.map(function (li) { return '<li>' + esc(li) + '</li>'; }).join('') + '</ul>';
      } else if (b.t === 'note') {
        html += '<div class="note">' + icon('bulb') + '<span>' + esc(b.x) + '</span></div>';
      } else if (b.t === 'fig' && FIGURES[b.src]) {
        html += '<figure>' + FIGURES[b.src]() + '<figcaption>' + esc(b.cap) + '</figcaption></figure>';
      }
    });
    return html;
  }

  /* Parse teacher-authored plain text into blocks.
     Blank line = new block. "## " = heading. "- " lines = bullet list. */
  function parseContent(text) {
    var blocks = [];
    var chunks = String(text).replace(/\r/g, '').split(/\n\s*\n/).filter(function (c) {
      return c.trim().length > 0;
    });
    chunks.forEach(function (chunk) {
      var lines = chunk.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
      if (lines.every(function (l) { return l.indexOf('- ') === 0 || l === '-'; })) {
        blocks.push({ t: 'ul', items: lines.map(function (l) { return l.replace(/^-\s*/, ''); }) });
      } else if (lines.length === 1 && lines[0].indexOf('## ') === 0) {
        blocks.push({ t: 'h2', x: lines[0].slice(3) });
      } else {
        blocks.push({ t: 'p', x: lines.join(' ') });
      }
    });
    return blocks;
  }

  /* ---------------- Toasts ---------------- */
  var toastRegion = null;
  function toast(message, type) {
    if (!toastRegion) {
      toastRegion = document.createElement('div');
      toastRegion.className = 'toast-region';
      toastRegion.setAttribute('role', 'status');
      document.body.appendChild(toastRegion);
    }
    var el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' is-error' : '');
    el.innerHTML = icon(type === 'error' ? 'alert' : 'check') + '<span>' + esc(message) + '</span>';
    toastRegion.appendChild(el);
    window.setTimeout(function () {
      el.classList.add('is-out');
      window.setTimeout(function () { el.remove(); }, 300);
    }, 3400);
  }

  /* ---------------- Dialog ---------------- */
  function confirmDialog(opts) {
    return new Promise(function (resolve) {
      var overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.innerHTML =
        '<div class="modal" role="alertdialog" aria-modal="true" aria-labelledby="modal-title">' +
          '<h3 id="modal-title">' + esc(opts.title) + '</h3>' +
          '<p>' + esc(opts.message) + '</p>' +
          '<div class="modal-actions">' +
            '<button type="button" class="btn btn-ghost" data-act="no">' + esc(opts.cancelText || 'Cancel') + '</button>' +
            '<button type="button" class="btn ' + (opts.danger ? 'btn-danger' : 'btn-primary') + '" data-act="yes">' +
              esc(opts.confirmText || 'Confirm') + '</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);

      function done(yes) {
        overlay.remove();
        resolve(yes);
      }
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) done(false);
      });
      overlay.querySelector('[data-act="no"]').addEventListener('click', function () { done(false); });
      overlay.querySelector('[data-act="yes"]').addEventListener('click', function () { done(true); });
      overlay.querySelector('[data-act="yes"]').focus();
    });
  }

  /* ---------------- Sidebar drawer (mobile) ---------------- */
  function initShell() {
    var toggle = document.querySelector('.nav-toggle');
    var sidebar = document.getElementById('sidebar');
    var scrim = document.querySelector('.scrim');
    if (!toggle || !sidebar || !scrim) return;

    function set(open) {
      sidebar.classList.toggle('is-open', open);
      scrim.classList.toggle('is-visible', open);
      toggle.setAttribute('aria-expanded', String(open));
    }
    toggle.addEventListener('click', function () {
      set(!sidebar.classList.contains('is-open'));
    });
    scrim.addEventListener('click', function () { set(false); });
    sidebar.addEventListener('click', function (e) {
      if (e.target.closest('a')) set(false);
    });

    var dateEl = document.querySelector('[data-today]');
    if (dateEl) dateEl.textContent = todayLine();
  }

  window.SLS = {
    icon: icon,
    esc: esc,
    param: param,
    initials: initials,
    avatarClass: avatarClass,
    greeting: greeting,
    fmtDate: fmtDate,
    fmtStamp: fmtStamp,
    fmtDue: fmtDue,
    dueBadge: dueBadge,
    todayLine: todayLine,
    subjectSlug: subjectSlug,
    subjectIcon: subjectIcon,
    renderBlocks: renderBlocks,
    parseContent: parseContent,
    toast: toast,
    confirmDialog: confirmDialog,
    initShell: initShell
  };
})();
