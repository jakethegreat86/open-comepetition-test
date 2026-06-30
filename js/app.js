/* ============================================================
   Open Competition — Novo Nordisk Foundation (concept design)
   Open calls: data, filtering, sorting, search & view routing.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Reference data ---------- */
  var AREAS = {
    biomed: 'Biomedicine & health science', biotech: 'Biotechnology', clinical: 'Clinical science',
    natsci: 'Natural & technical sciences', interdisc: 'Interdisciplinary', social: 'Social sciences',
    infect: 'Infectious diseases', innov: 'Innovation & commercialisation', edu: 'Education & outreach',
    humanitarian: 'Social & humanitarian', art: 'Art research'
  };
  var LEVELS = {
    phd: 'PhD', postdoc: 'Postdoc', junior: 'Research leader · junior', mid: 'Research leader · mid-career',
    established: 'Research leader · established', clinician: 'Clinicians', nurse: 'Nurses'
  };
  var GEOS = { dk: 'Denmark', nordic: 'Nordic', europe: 'Europe', intl: 'International', toFromDk: 'To / from Denmark' };

  var STATUS_META = {
    open:     { label: 'Open',     cls: 'status-open' },
    upcoming: { label: 'Upcoming', cls: 'status-upcoming' },
    closed:   { label: 'Closed',   cls: 'status-closed' }
  };

  var CALLS = [
    { id:'challenge', name:'Challenge Programme 2027', group:'Challenge', desc:'Large interdisciplinary teams tackling defined global challenges with substantial, long-term funding.', areas:['interdisc','biomed','natsci'], levels:['established'], geo:'intl', constellation:'multi', amount:'Up to DKK 75M', amountVal:75, duration:'6 years', deadline:'10 Sep 2026', deadlineVal:20260910, status:'open', openedVal:20260601 },
    { id:'recruit', name:'RECRUIT Grants', group:'RECRUIT', desc:'Recruit leading international researchers to Danish universities at assistant, associate or full professor level.', areas:['interdisc'], levels:['junior','mid','established'], geo:'toFromDk', constellation:'single', amount:'DKK 22–55M', amountVal:55, duration:'7 years', deadline:'28 Aug 2026', deadlineVal:20260828, status:'open', openedVal:20260520 },
    { id:'recruit-sab', name:'RECRUIT Sabbatical Grants', group:'RECRUIT', desc:'Temporary embedding of university staff in an international environment — to and from Denmark.', areas:['interdisc'], levels:['mid','established'], geo:'toFromDk', constellation:'single', amount:'Up to DKK 1M', amountVal:1, duration:'1 year', deadline:'Rolling', deadlineVal:20261231, status:'open', openedVal:20260415 },
    { id:'recruit-ext', name:'RECRUIT Extension Grants', group:'RECRUIT', desc:'Extension funding for previously recruited researchers to consolidate their groups.', areas:['interdisc'], levels:['established'], geo:'dk', constellation:'single', amount:'Up to DKK 10M', amountVal:10, duration:'5 years', deadline:'Opens Nov 2026', deadlineVal:20261101, status:'upcoming', openedVal:20261101 },
    { id:'nat-tech', name:'Project Grants in Natural & Technical Sciences', group:'Project grant', desc:'Curiosity-driven research in the natural and technical sciences with potential applications in life science, health or sustainability.', areas:['natsci'], levels:['mid','established'], geo:'dk', constellation:'single', amount:'Up to DKK 10M', amountVal:10, duration:'Up to 5 years', deadline:'02 Oct 2026', deadlineVal:20261002, status:'open', openedVal:20260610 },
    { id:'biomed', name:'Project Grants in Bioscience & Basic Biomedicine', group:'Project grant', desc:'Support for basic and translational research within bioscience and biomedicine.', areas:['biomed'], levels:['mid','established'], geo:'dk', constellation:'single', amount:'Up to DKK 5M', amountVal:5, duration:'Up to 4 years', deadline:'18 Sep 2026', deadlineVal:20260918, status:'open', openedVal:20260605 },
    { id:'datasci', name:'Data Science Collaborative Research Programme', group:'Collaborative', desc:'Collaborative projects applying data science to health and life science questions.', areas:['biomed','natsci','interdisc'], levels:['established'], geo:'intl', constellation:'multi', amount:'Up to DKK 15M', amountVal:15, duration:'Up to 5 years', deadline:'Opens Jan 2027', deadlineVal:20270101, status:'upcoming', openedVal:20270101 },
    { id:'clinical', name:'Clinical & Translational Medicine Grants', group:'Project grant', desc:'For clinically active researchers bridging laboratory findings and patient care.', areas:['clinical','biomed'], levels:['clinician','mid'], geo:'dk', constellation:'single', amount:'Up to DKK 5M', amountVal:5, duration:'Up to 4 years', deadline:'25 Sep 2026', deadlineVal:20260925, status:'open', openedVal:20260601 },
    { id:'endo', name:'Endocrinology & Metabolism Research Grants', group:'Project grant', desc:'Research advancing understanding of endocrine and metabolic disease.', areas:['biomed','clinical'], levels:['postdoc','mid'], geo:'intl', constellation:'single', amount:'Up to DKK 7M', amountVal:7, duration:'Up to 4 years', deadline:'Closed 15 May 2026', deadlineVal:20260515, status:'closed', openedVal:20260201 },
    { id:'biotech', name:'Biotechnology-based Synthesis & Production', group:'Project grant', desc:'Advancing biotechnological synthesis and production methods.', areas:['biotech','natsci'], levels:['mid','established'], geo:'intl', constellation:'single', amount:'Up to DKK 10M', amountVal:10, duration:'Up to 5 years', deadline:'05 Oct 2026', deadlineVal:20261005, status:'open', openedVal:20260612 },
    { id:'envbio', name:'Industrial & Environmental Biotechnology', group:'Project grant', desc:'Sustainable industrial and environmental biotechnology research.', areas:['biotech','natsci'], levels:['established'], geo:'europe', constellation:'multi', amount:'Up to DKK 12M', amountVal:12, duration:'Up to 5 years', deadline:'Opens Dec 2026', deadlineVal:20261201, status:'upcoming', openedVal:20261201 },
    { id:'nursing', name:'Nursing Research Grants', group:'Project grant', desc:'Strengthening research carried out by and for the nursing profession.', areas:['clinical'], levels:['nurse'], geo:'dk', constellation:'single', amount:'Up to DKK 3M', amountVal:3, duration:'Up to 3 years', deadline:'30 Sep 2026', deadlineVal:20260930, status:'open', openedVal:20260608 },
    { id:'edu', name:'Education & Outreach Grants', group:'Education', desc:'Projects that strengthen science education and public engagement.', areas:['edu'], levels:['mid','established'], geo:'dk', constellation:'single', amount:'Up to DKK 2M', amountVal:2, duration:'Up to 3 years', deadline:'12 Oct 2026', deadlineVal:20261012, status:'open', openedVal:20260615 },
    { id:'human', name:'Social & Humanitarian Initiatives', group:'Initiative', desc:'Support for social and humanitarian initiatives within the Foundation’s focus.', areas:['humanitarian'], levels:['mid','established'], geo:'intl', constellation:'multi', amount:'Varies', amountVal:0, duration:'Varies', deadline:'Closed 01 Apr 2026', deadlineVal:20260401, status:'closed', openedVal:20260101 },
    { id:'art', name:'Art Research Grants', group:'Project grant', desc:'Research into art and its history, conservation and societal role.', areas:['art'], levels:['postdoc','mid'], geo:'dk', constellation:'single', amount:'Up to DKK 4M', amountVal:4, duration:'Up to 4 years', deadline:'Opens Feb 2027', deadlineVal:20270201, status:'upcoming', openedVal:20270201 },
    { id:'infect', name:'Infectious Disease Research Grants', group:'Project grant', desc:'Research on prevention, diagnosis and treatment of infectious disease.', areas:['infect','biomed'], levels:['postdoc','mid','established'], geo:'intl', constellation:'single', amount:'Up to DKK 8M', amountVal:8, duration:'Up to 5 years', deadline:'22 Sep 2026', deadlineVal:20260922, status:'open', openedVal:20260603 },
    { id:'fellow', name:'International PhD & Postdoctoral Fellowships', group:'Fellowship', desc:'Fellowships supporting early-career researchers in health and life sciences.', areas:['biomed'], levels:['phd','postdoc'], geo:'toFromDk', constellation:'single', amount:'Up to DKK 4M', amountVal:4, duration:'Up to 4 years', deadline:'08 Oct 2026', deadlineVal:20261008, status:'open', openedVal:20260614 },
    { id:'innov', name:'Innovation & Early Commercialisation Grants', group:'Innovation', desc:'Bridging research and application through early-stage commercialisation support.', areas:['innov'], levels:['mid','established'], geo:'dk', constellation:'single', amount:'Up to DKK 15M', amountVal:15, duration:'Up to 3 years', deadline:'Opens Mar 2027', deadlineVal:20270301, status:'upcoming', openedVal:20270301 }
  ];

  var STATUS_ORDER = [
    { value: 'all', label: 'All' },
    { value: 'open', label: 'Open' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'closed', label: 'Closed' }
  ];

  /* ---------- State ---------- */
  var state = { page: 'home', q: '', status: 'all', area: 'all', level: 'all', geo: 'all', sort: 'deadline' };

  /* ---------- Helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Filtering & sorting ---------- */
  function filtered() {
    var s = state;
    var q = s.q.trim().toLowerCase();
    var list = CALLS.filter(function (c) {
      if (s.status !== 'all' && c.status !== s.status) return false;
      if (s.area !== 'all' && c.areas.indexOf(s.area) === -1) return false;
      if (s.level !== 'all' && c.levels.indexOf(s.level) === -1) return false;
      if (s.geo !== 'all' && c.geo !== s.geo) return false;
      if (q && !(c.name.toLowerCase().indexOf(q) !== -1 ||
                 c.desc.toLowerCase().indexOf(q) !== -1 ||
                 c.group.toLowerCase().indexOf(q) !== -1)) return false;
      return true;
    });
    var rank = { open: 0, upcoming: 1, closed: 2 };
    if (s.sort === 'deadline') list.sort(function (a, b) { return (rank[a.status] - rank[b.status]) || (a.deadlineVal - b.deadlineVal); });
    else if (s.sort === 'amount') list.sort(function (a, b) { return b.amountVal - a.amountVal; });
    else if (s.sort === 'newly') list.sort(function (a, b) { return b.openedVal - a.openedVal; });
    return list;
  }

  /* ---------- Rendering: filter chips ---------- */
  function chipOptions(map) {
    var opts = [{ value: 'all', label: 'All' }];
    Object.keys(map).forEach(function (k) { opts.push({ value: k, label: map[k] }); });
    return opts;
  }

  function renderChips() {
    var groups = {
      status: STATUS_ORDER,
      area: chipOptions(AREAS),
      level: chipOptions(LEVELS),
      geo: chipOptions(GEOS)
    };
    Object.keys(groups).forEach(function (key) {
      var container = $('[data-filter="' + key + '"]');
      if (!container) return;
      container.innerHTML = groups[key].map(function (o) {
        var active = state[key] === o.value ? ' is-active' : '';
        return '<button class="chip' + active + '" data-key="' + key + '" data-value="' + esc(o.value) + '">' + esc(o.label) + '</button>';
      }).join('');
    });
  }

  /* ---------- Rendering: result cards ---------- */
  function cardHTML(c) {
    var meta = STATUS_META[c.status];
    var tags = [AREAS[c.areas[0]], LEVELS[c.levels[0]], GEOS[c.geo]];
    if (c.constellation === 'multi') tags.push('Multiple PIs');
    var tagHTML = tags.map(function (t) { return '<span class="call-tag">' + esc(t) + '</span>'; }).join('');

    return '' +
      '<article class="call-card">' +
        '<div class="call-top">' +
          '<span class="call-group">' + esc(c.group) + '</span>' +
          '<span class="status-badge ' + meta.cls + '"><span class="dot"></span>' + esc(meta.label) + '</span>' +
        '</div>' +
        '<h3>' + esc(c.name) + '</h3>' +
        '<p class="call-desc">' + esc(c.desc) + '</p>' +
        '<div class="call-tags">' + tagHTML + '</div>' +
        '<div class="call-meta">' +
          '<div><div class="k">Amount</div><div class="v">' + esc(c.amount) + '</div></div>' +
          '<div><div class="k">Duration</div><div class="v">' + esc(c.duration) + '</div></div>' +
          '<div><div class="k">Deadline</div><div class="v">' + esc(c.deadlineLabel || c.deadline) + '</div></div>' +
        '</div>' +
      '</article>';
  }

  function renderResults() {
    var list = filtered();
    var openCount = CALLS.filter(function (c) { return c.status === 'open'; }).length;

    var countEl = $('#results-count');
    if (countEl) {
      countEl.innerHTML = '<strong>' + list.length + '</strong> of ' + CALLS.length +
        ' calls · <span class="open">' + openCount + ' open now</span>';
    }

    var resultsEl = $('#results');
    if (!resultsEl) return;
    if (list.length === 0) {
      resultsEl.innerHTML =
        '<div class="no-results">' +
          '<div class="big">No calls match your filters</div>' +
          '<p>Try removing a filter to see more results.</p>' +
          '<button class="btn btn-primary" id="clear-empty" style="font-size:14.5px;padding:11px 22px;">Clear all filters</button>' +
        '</div>';
      var btn = $('#clear-empty');
      if (btn) btn.addEventListener('click', clearFilters);
    } else {
      resultsEl.innerHTML = '<div class="cards-grid">' + list.map(cardHTML).join('') + '</div>';
    }
  }

  function clearFilters() {
    state.q = ''; state.status = 'all'; state.area = 'all';
    state.level = 'all'; state.geo = 'all'; state.sort = 'deadline';
    var search = $('#search'); if (search) search.value = '';
    var sort = $('#sort'); if (sort) sort.value = 'deadline';
    renderChips();
    renderResults();
  }

  /* ---------- View routing ---------- */
  function setPage(page, opts) {
    state.page = page;
    document.body.setAttribute('data-page', page);
    $all('[data-nav-link]').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-nav-link') === page);
    });
    var hash = page === 'calls' ? '#/calls' : '#/';
    if (location.hash !== hash) {
      if (opts && opts.replace) history.replaceState(null, '', hash);
      else location.hash = hash;
    }
    if (!opts || !opts.keepScroll) { try { window.scrollTo(0, 0); } catch (e) {} }
  }

  function syncFromHash() {
    var page = location.hash.indexOf('calls') !== -1 ? 'calls' : 'home';
    setPage(page, { replace: true, keepScroll: true });
  }

  /* ---------- Wire up ---------- */
  function init() {
    renderChips();
    renderResults();

    // Navigation (header, hero, footer, CTA buttons)
    $all('[data-nav]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        setPage(el.getAttribute('data-nav'));
      });
    });

    // Filter chips (event delegation)
    $all('.chip-row').forEach(function (row) {
      row.addEventListener('click', function (e) {
        var btn = e.target.closest ? e.target.closest('.chip') : null;
        if (!btn) return;
        state[btn.getAttribute('data-key')] = btn.getAttribute('data-value');
        renderChips();
        renderResults();
      });
    });

    // Search
    var search = $('#search');
    if (search) {
      search.addEventListener('input', function () {
        state.q = search.value;
        renderResults();
      });
    }

    // Sort
    var sort = $('#sort');
    if (sort) {
      sort.addEventListener('change', function () {
        state.sort = sort.value;
        renderResults();
      });
    }

    // Clear filters
    var clearBtn = $('#clear-filters');
    if (clearBtn) clearBtn.addEventListener('click', clearFilters);

    // Hash routing
    window.addEventListener('hashchange', syncFromHash);
    syncFromHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
