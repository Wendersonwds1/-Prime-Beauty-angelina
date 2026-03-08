/* ============================================================
   PRIME BEAUTY — script.js  (Mobile-First)
   ============================================================ */

/* =================== EMAILJS CONFIG ===================
   1. Acesse https://www.emailjs.com e crie conta grátis
   2. "Email Services" → conecte Gmail
   3. "Email Templates" → Subject: Novo Pedido / Body: {{{order_html}}}
   4. Troque os 4 valores abaixo
======================================================= */
const EMAILJS_PUBLIC_KEY  = 'SUA_PUBLIC_KEY_AQUI';
const EMAILJS_SERVICE_ID  = 'SEU_SERVICE_ID_AQUI';
const EMAILJS_TEMPLATE_ID = 'SEU_TEMPLATE_ID_AQUI';
const OWNER_EMAIL         = 'SEU_EMAIL_AQUI@gmail.com';

emailjs.init(EMAILJS_PUBLIC_KEY);


/* =================== UTILS =================== */
function fmt(n) {
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


/* =================== CATÁLOGO =================== */
/* Ícones: unicode escape sequences (U+XXXXX) — sem emoji raw no fonte */
const CATALOG = {
  cestas: [
    { id:'c1', name:'Caixa Cora\u00E7\u00E3o', detail:'Caixa preta com la\u00E7o vinho', icon:'\u{1F5A4}', price:35, single:true },
    { id:'c2', name:'Caixa Redonda',            detail:'Cil\u00EDndrica premium',          icon:'\u{1F3A9}', price:30, single:true },
    { id:'c3', name:'Caixinha Mini',            detail:'Vers\u00E3o compacta e delicada',  icon:'\u{1F4E6}', price:20, single:true },
    { id:'c4', name:'Cesta de Vime',            detail:'Estilo rom\u00E2ntico cl\u00E1ssico', icon:'\u{1F9FA}', price:40, single:true },
    { id:'c5', name:'Caixa Luxe',               detail:'Caixa de madeira especial',        icon:'\u{1F381}', price:55, single:true },
    { id:'c6', name:'Sacola Premium',           detail:'Sacola kraft com la\u00E7o',        icon:'\u{1F6CD}\uFE0F', price:18, single:true },
  ],
  ursos: [
    { id:'u0', name:'Sem ursinho',       detail:'S\u00F3 os outros itens',       icon:'\u2715',                              price:0,  single:true },
    { id:'u1', name:'Ursinho Cl\u00E1ssico', detail:'Bege, tamanho m\u00E9dio', icon:'\u{1F9F8}',                            price:30, single:true },
    { id:'u2', name:'Ursinho Gigante',   detail:'Fofo, tamanho grande',          icon:'\u{1F43B}',                            price:60, single:true },
    { id:'u3', name:'Ursinho Cora\u00E7\u00E3o', detail:'Com cora\u00E7\u00E3o bordado', icon:'\u{1F43B}\u200D\u2744\uFE0F', price:38, single:true },
    { id:'u4', name:'Coelho Pel\u00FAcia', detail:'Super fofinho',               icon:'\u{1F430}',                            price:35, single:true },
    { id:'u5', name:'Panda Pel\u00FAcia', detail:'Preto e branco delicado',      icon:'\u{1F43C}',                            price:35, single:true },
  ],
  chocolates: [
    { id:'ch1',  name:'Ferrero Rocher',    detail:'Caixa com 8 un.',    icon:'\u{1F36C}', price:28, cat:'ferrero' },
    { id:'ch2',  name:'Ferrero Box 16',    detail:'Caixa com 16 un.',   icon:'\u{1F36C}', price:48, cat:'ferrero' },
    { id:'ch3',  name:'Kinder Bueno',      detail:'2 barrinhas',        icon:'\u{1F36B}', price:12, cat:'kinder'  },
    { id:'ch4',  name:'Kinder Delice',     detail:'4 bolinhos',         icon:'\u{1F36B}', price:18, cat:'kinder'  },
    { id:'ch5',  name:'Kinder Surpresa',   detail:'2 ovos',             icon:'\u{1F95A}', price:14, cat:'kinder'  },
    { id:'ch6',  name:'KitKat Chunky',     detail:'2 unidades',         icon:'\u{1F36B}', price:10, cat:'kitkat'  },
    { id:'ch7',  name:'KitKat Mini Pack',  detail:'Pacote com 6',       icon:'\u{1F36B}', price:18, cat:'kitkat'  },
    { id:'ch8',  name:'Trufas Artesanais', detail:'6 trufas sortidas',  icon:'\u{1F369}', price:22, cat:'outros'  },
    { id:'ch9',  name:'Bombom Garoto',     detail:'Caixa 250g',         icon:'\u{1F36D}', price:16, cat:'outros'  },
    { id:'ch10', name:'Lindt Bolinhas',    detail:'3 bolinhas Lindt',   icon:'\u{1F7E4}', price:20, cat:'outros'  },
  ],
  bebidas: [
    { id:'b1', name:'Coca-Cola',      detail:'2 latinhas',          icon:'\u{1F964}', price:10 },
    { id:'b2', name:'Coca Zero',      detail:'2 latinhas zero',     icon:'\u{1F964}', price:10 },
    { id:'b3', name:'Champanhe Mini', detail:'Mini garrafa ros\u00E9', icon:'\u{1F37E}', price:22 },
    { id:'b4', name:'Vinho Mini',     detail:'Miniatura tinto',     icon:'\u{1F377}', price:25 },
    { id:'b5', name:'Suco Natural',   detail:'Garrafinha 300ml',    icon:'\u{1F9C3}', price:12 },
    { id:'b6', name:'\u00C1gua de Coco', detail:'Refrescante',     icon:'\u{1F965}', price:10 },
  ],
  extras: [
    { id:'e1',  name:'Bal\u00E3o Cora\u00E7\u00E3o', detail:'Vermelho inflado',       icon:'\u{1F388}', price:12 },
    { id:'e2',  name:'Bal\u00E3o Duplo',              detail:'2 bal\u00F5es cora\u00E7\u00E3o', icon:'\u{1F388}', price:20 },
    { id:'e3',  name:'Buqu\u00EA de Rosas',           detail:'6 rosas vermelhas',      icon:'\u{1F339}', price:45 },
    { id:'e4',  name:'Bombons Mix',                   detail:'Sortido',                icon:'\u{1F36C}', price:14 },
    { id:'e5',  name:'Confete Cora\u00E7\u00E3o',     detail:'Decora\u00E7\u00E3o especial', icon:'\u{1F495}', price:8  },
    { id:'e6',  name:'Vela Arom\u00E1tica',           detail:'Aroma de rosas',         icon:'\u{1F56F}\uFE0F', price:28 },
    { id:'e7',  name:'Cart\u00E3o Especial',          detail:'Escrito \u00E0 m\u00E3o', icon:'\u{1F48C}', price:10 },
    { id:'e8',  name:'La\u00E7o Cetim',               detail:'La\u00E7o premium',      icon:'\u{1F380}', price:8  },
    { id:'e9',  name:'Glitter Surpresa',              detail:'Surpresa ao abrir',      icon:'\u2728',    price:6  },
    { id:'e10', name:'Polaroid do Casal',             detail:'Impress\u00E3o de foto', icon:'\u{1F4F8}', price:15 },
    { id:'e11', name:'Perfume Mini',                  detail:'Frasco 15ml',            icon:'\u{1F338}', price:35 },
    { id:'e12', name:'Pel\u00FAcia Extra',            detail:'Pel\u00FAcia adicional', icon:'\u{1F423}', price:20 },
  ]
};

const STEP_NAMES = [
  'Escolha a cesta',
  'Ursinho',
  'Chocolates',
  'Bebidas',
  'Extras especiais',
  'Mensagem'
];

/* =================== STATE =================== */
const state = { currentStep: 0, selected: {} };

/* =================== RENDER =================== */
function renderGrid(containerId, items, singleSelect) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';
  items.forEach(item => {
    const sel = !!state.selected[item.id];
    const qty = state.selected[item.id]?.qty || 1;
    const d = document.createElement('div');
    d.className = 'item-card' + (sel ? ' selected' : '');
    d.id = 'card_' + item.id;
    d.innerHTML =
      '<div class="item-icon">' + item.icon + '</div>' +
      '<div class="item-name">'   + item.name   + '</div>' +
      '<div class="item-detail">' + item.detail + '</div>' +
      '<div class="item-price">'  + (item.price > 0 ? 'R$ ' + fmt(item.price) : 'Grátis') + '</div>' +
      (!singleSelect
        ? '<div class="qty-ctrl">' +
          '<button class="qty-btn" onclick="changeQty(event,\'' + item.id + '\',-1)">−</button>' +
          '<span class="qty-num" id="qty_' + item.id + '">' + qty + '</span>' +
          '<button class="qty-btn" onclick="changeQty(event,\'' + item.id + '\',1)">+</button>' +
          '</div>'
        : '');
    d.addEventListener('click', () => toggleItem(item, singleSelect, items));
    el.appendChild(d);
  });
}

function filterItems(type, cat, btn) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const items = cat === 'todos' ? CATALOG.chocolates : CATALOG.chocolates.filter(c => c.cat === cat);
  renderGrid('gridChoc', items, false);
}

function initGrids() {
  renderGrid('gridCesta',  CATALOG.cestas,     true);
  renderGrid('gridUrso',   CATALOG.ursos,      true);
  renderGrid('gridChoc',   CATALOG.chocolates, false);
  renderGrid('gridBeb',    CATALOG.bebidas,    false);
  renderGrid('gridExtras', CATALOG.extras,     false);
}

/* =================== TOGGLE / QTY =================== */
function toggleItem(item, singleSelect, group) {
  if (singleSelect) {
    group.forEach(g => {
      delete state.selected[g.id];
      document.getElementById('card_' + g.id)?.classList.remove('selected');
    });
    if (item.price > 0) state.selected[item.id] = { item, qty: 1 };
    document.getElementById('card_' + item.id)?.classList.add('selected');
  } else {
    if (state.selected[item.id]) {
      delete state.selected[item.id];
      document.getElementById('card_' + item.id)?.classList.remove('selected');
    } else {
      state.selected[item.id] = { item, qty: 1 };
      document.getElementById('card_' + item.id)?.classList.add('selected');
    }
  }
  updateSidebar();
}

function changeQty(e, id, delta) {
  e.stopPropagation();
  if (!state.selected[id]) return;
  const isBebida = id.startsWith('b');
  const max = isBebida ? 5 : 99;
  state.selected[id].qty = Math.min(max, Math.max(1, state.selected[id].qty + delta));
  const el = document.getElementById('qty_' + id);
  if (el) el.textContent = state.selected[id].qty;
  // Visual feedback when at max
  const btnPlus = el?.nextElementSibling;
  if (btnPlus) btnPlus.disabled = (state.selected[id].qty >= max);
  updateSidebar();
}

/* =================== SIDEBAR + CART PILL =================== */
function updateSidebar() {
  const items = Object.values(state.selected);
  let total   = 0;
  let count   = 0;

  items.forEach(({ item, qty }) => {
    if (item.price > 0) { total += item.price * qty; count += qty; }
  });

  // Desktop sidebar
  const container = document.getElementById('orderItems');
  const totalEl   = document.getElementById('totalValue');
  const btnDesk   = document.getElementById('whatsappBtnDesktop');
  if (container) {
    if (items.length === 0) {
      container.innerHTML = '<p class="sidebar-empty">Vazia por enquanto...<br>adicione itens ao lado \u{1F339}</p>';
    } else {
      container.innerHTML = '';
      items.forEach(({ item, qty }) => {
        if (item.price === 0) return;
        const d = document.createElement('div');
        d.className = 'order-item';
        d.innerHTML =
          '<span class="order-item-icon">'  + item.icon + '</span>' +
          '<div class="order-item-info">'   +
            '<div class="order-item-name">' + item.name + '</div>' +
            (qty > 1 ? '<div class="order-item-qty">x' + qty + '</div>' : '') +
          '</div>' +
          '<span class="order-item-price">R$ ' + fmt(item.price * qty) + '</span>';
        container.appendChild(d);
      });
    }
    if (totalEl) totalEl.textContent = 'R$ ' + fmt(total);
    if (btnDesk) btnDesk.disabled = (count === 0);
  }

  // Mobile cart pill
  const pillCount  = document.getElementById('cartPillCount');
  const pillTotal  = document.getElementById('cartPillTotal');
  if (pillCount) pillCount.textContent = count + (count === 1 ? ' item' : ' itens');
  if (pillTotal) pillTotal.textContent = 'R$ ' + fmt(total);

  // Drawer
  const drawerItems = document.getElementById('drawerItems');
  const drawerTotal = document.getElementById('drawerTotal');
  const btnMobile   = document.getElementById('whatsappBtn');
  if (drawerItems) {
    if (items.length === 0) {
      drawerItems.innerHTML = '<p class="sidebar-empty">Adicione itens para ver aqui \u{1F339}</p>';
    } else {
      drawerItems.innerHTML = '';
      items.forEach(({ item, qty }) => {
        if (item.price === 0) return;
        const d = document.createElement('div');
        d.className = 'order-item';
        d.innerHTML =
          '<span class="order-item-icon">'  + item.icon + '</span>' +
          '<div class="order-item-info">'   +
            '<div class="order-item-name">' + item.name + '</div>' +
            (qty > 1 ? '<div class="order-item-qty">x' + qty + '</div>' : '') +
          '</div>' +
          '<span class="order-item-price">R$ ' + fmt(item.price * qty) + '</span>';
        drawerItems.appendChild(d);
      });
    }
    if (drawerTotal) drawerTotal.textContent = 'R$ ' + fmt(total);
    if (btnMobile)   btnMobile.disabled = (count === 0);
  }

  // Badges
  const count2 = prefix => items.filter(i => i.item.id.startsWith(prefix)).length;
  setBadge('badgeUrso', count2('u'));
  setBadge('badgeChoc', count2('ch'));
  setBadge('badgeBeb',  count2('b'));
  setBadge('badgeExtra',count2('e'));
}

function setBadge(id, n) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = n;
  el.classList.toggle('show', n > 0);
}

/* =================== STEPS =================== */
function goStep(n) {
  state.currentStep = n;
  document.querySelectorAll('.step-panel').forEach((p, i) => p.classList.toggle('active', i === n));
  document.querySelectorAll('.step-tab').forEach((t, i)   => t.classList.toggle('active', i === n));

  const pct = ((n + 1) / 6) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('successScreen').classList.remove('show');

  // Info text
  const info = document.getElementById('modalStepInfo');
  if (info) info.textContent = 'Passo ' + (n + 1) + ' de 6 — ' + STEP_NAMES[n];

  // Footer buttons
  const btnBack = document.getElementById('btnBack');
  const btnNext = document.getElementById('btnNext');
  if (btnBack) btnBack.style.display = n > 0 ? 'block' : 'none';
  if (btnNext) {
    if (n === 5) {
      btnNext.textContent = 'Finalizar pelo WhatsApp 💬';
      btnNext.classList.add('finalizar');
    } else {
      btnNext.textContent = 'Avançar →';
      btnNext.classList.remove('finalizar');
    }
  }

  // Scroll aba ativa para o centro
  const tab = document.querySelectorAll('.step-tab')[n];
  if (tab) tab.scrollIntoView({ block:'nearest', inline:'center', behavior:'smooth' });

  // Scroll conteúdo ao topo
  const bl = document.querySelector('.builder-left');
  if (bl) bl.scrollTop = 0;
}

function stepNext() {
  if (state.currentStep < 5) goStep(state.currentStep + 1);
  else finalizarPedido();
}

function stepBack() {
  if (state.currentStep > 0) goStep(state.currentStep - 1);
}

/* =================== CART DRAWER =================== */
function toggleCartDrawer() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartDrawerOverlay');
  if (!drawer) return;
  const open = drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open', open);
}

/* =================== EMAIL HTML =================== */
function buildEmailHTML(sender, receiver, msg, items, total, orderId) {
  const now = new Date().toLocaleString('pt-BR', { day:'2-digit', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' });

  const rows = items.filter(x => x.item.price > 0).map(({ item, qty }) =>
    '<tr>' +
    '<td style="padding:10px 14px;border-bottom:1px solid #f0e8ea;font-size:20px;">'         + item.icon + '</td>' +
    '<td style="padding:10px 14px;border-bottom:1px solid #f0e8ea;color:#4a0e1f;font-size:14px;">' + item.name + '</td>' +
    '<td style="padding:10px 14px;border-bottom:1px solid #f0e8ea;color:#9a6070;text-align:center;font-size:13px;">' + (qty > 1 ? 'x' + qty : '—') + '</td>' +
    '<td style="padding:10px 14px;border-bottom:1px solid #f0e8ea;color:#c4526a;font-weight:bold;text-align:right;font-size:16px;">R$ ' + fmt(item.price * qty) + '</td>' +
    '</tr>'
  ).join('');

  const msgBlock = (msg && msg !== '—')
    ? '<div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c4526a;margin-bottom:10px;">Mensagem do Cartão</div>' +
      '<div style="background:#fff;border-left:4px solid #c4526a;border:1px solid #f0dde2;border-radius:8px;padding:20px 24px;margin-bottom:28px;">' +
      '<div style="font-size:17px;font-style:italic;color:#4a0e1f;line-height:1.7;">"' + msg + '"</div></div>'
    : '';

  return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
    '<body style="margin:0;padding:0;background:#1a060e;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#1a060e;padding:32px 16px;"><tr><td>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">' +

    '<tr><td style="background:linear-gradient(135deg,#4a0e1f,#7a2040);padding:44px 32px;text-align:center;border-radius:12px 12px 0 0;">' +
    '<div style="font-size:44px;margin-bottom:6px;">PB 🦋</div>' +
    '<div style="font-size:10px;letter-spacing:8px;color:rgba(255,255,255,0.55);text-transform:uppercase;">PRIME BEAUTY</div>' +
    '<div style="width:36px;height:1px;background:#c9a84c;margin:14px auto;"></div>' +
    '<div style="font-size:12px;color:rgba(255,255,255,0.45);letter-spacing:2px;text-transform:uppercase;">Novo Pedido</div>' +
    '</td></tr>' +

    '<tr><td style="background:#c9a84c;padding:10px 32px;text-align:center;">' +
    '<span style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#4a0e1f;font-weight:700;">Pedido #' + orderId + ' · ' + now + '</span></td></tr>' +

    '<tr><td style="background:#fdf6f0;padding:32px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr>' +
    '<td width="48%" style="background:#fff;padding:18px 20px;border:1px solid #f0dde2;border-radius:8px;vertical-align:top;">' +
    '<div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c4526a;margin-bottom:6px;">De</div>' +
    '<div style="font-size:18px;color:#4a0e1f;">' + sender + '</div></td>' +
    '<td width="4%"></td>' +
    '<td width="48%" style="background:#fff;padding:18px 20px;border:1px solid #f0dde2;border-radius:8px;vertical-align:top;">' +
    '<div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c4526a;margin-bottom:6px;">Para</div>' +
    '<div style="font-size:18px;color:#4a0e1f;">' + receiver + '</div></td>' +
    '</tr></table>' +

    '<div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#c4526a;margin-bottom:12px;">Itens da Caixinha</div>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #f0dde2;border-radius:8px;overflow:hidden;margin-bottom:20px;">' +
    '<thead><tr style="background:#4a0e1f;">' +
    '<th style="padding:10px 14px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.5);font-weight:400;text-align:left;" colspan="2">Item</th>' +
    '<th style="padding:10px 14px;font-size:9px;text-transform:uppercase;color:rgba(255,255,255,0.5);font-weight:400;text-align:center;">Qtd</th>' +
    '<th style="padding:10px 14px;font-size:9px;text-transform:uppercase;color:rgba(255,255,255,0.5);font-weight:400;text-align:right;">Valor</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table>' +

    '<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;"><tr>' +
    '<td style="background:#4a0e1f;padding:18px 20px;border-radius:8px;">' +
    '<table width="100%" cellpadding="0" cellspacing="0"><tr>' +
    '<td style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.5);">Total Estimado</td>' +
    '<td style="text-align:right;font-size:30px;color:#c9a84c;font-weight:bold;">R$ ' + total + '</td>' +
    '</tr></table></td></tr></table>' +

    msgBlock +

    '<div style="text-align:center;padding:16px 0 4px;">' +
    '<a href="https://wa.me/5562985910317" style="display:inline-block;background:#25D366;color:#fff;padding:14px 36px;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;border-radius:4px;">💬 Responder no WhatsApp</a>' +
    '</div></td></tr>' +

    '<tr><td style="background:#260710;padding:28px 32px;text-align:center;border-radius:0 0 12px 12px;">' +
    '<div style="font-size:24px;color:rgba(255,255,255,0.35);letter-spacing:-2px;margin-bottom:6px;">PB 🦋</div>' +
    '<div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.2);">Prime Beauty · (62) 98591-0317</div>' +
    '</td></tr></table></td></tr></table></body></html>';
}

/* =================== FINALIZAR =================== */
let _lastWaUrl = '';

async function finalizarPedido() {
  const items = Object.values(state.selected).filter(x => x.item.price > 0);
  if (items.length === 0) { alert('Adicione pelo menos um item \u00E0 sua caixinha! \u{1F339}'); return; }

  const sender   = document.getElementById('senderName').value.trim()   || '—';
  const receiver = document.getElementById('receiverName').value.trim() || '—';
  const msg      = document.getElementById('messageText').value.trim()  || '';

  let total = 0;
  items.forEach(({ item, qty }) => { total += item.price * qty; });

  const orderId = Math.random().toString(36).substr(2, 6).toUpperCase();

  // ---- Monta mensagem WhatsApp organizada ----
  /* U+1F380=🎀 U+1F516=🔖 U+1F464=👤 U+1F495=💕 U+1F6D2=🛒 U+1F4B0=💰 U+1F48C=💌 U+1F339=🌹 */
  const itemsLines = items.map(({ item, qty }) =>
    item.icon + ' ' + item.name + (qty > 1 ? ' (x' + qty + ')' : '') + '  \u2014  R$ ' + fmt(item.price * qty)
  ).join('\n');

  const waRaw =
    '\u{1F380} *PEDIDO PRIME BEAUTY*\n' +
    '\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\n' +
    '\u{1F516} N\u00BA ' + orderId + '\n\n' +
    '\u{1F464} *De:* ' + sender + '\n' +
    '\u{1F495} *Para:* ' + receiver + '\n\n' +
    '\u{1F6D2} *Itens:*\n' + itemsLines + '\n\n' +
    '\u{1F4B0} *Total estimado:* R$ ' + total +
    (msg ? '\n\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\n\u{1F48C} *Mensagem:*\n_' + msg + '_' : '') +
    '\n\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\u2504\n' +
    '_Pedido feito pelo site Prime Beauty_ \u{1F339}';

  _lastWaUrl = 'https://wa.me/5562985910317?text=' + encodeURIComponent(waRaw);

  // ---- Popula painel de sucesso ----
  document.getElementById('ssOrderId').textContent  = 'Pedido #' + orderId;
  document.getElementById('ssSender').textContent   = sender;
  document.getElementById('ssReceiver').textContent = receiver;
  document.getElementById('ssTotal').textContent    = 'R$ ' + fmt(total);

  const ssItems = document.getElementById('ssItems');
  ssItems.innerHTML = '';
  items.forEach(({ item, qty }) => {
    const d = document.createElement('div');
    d.className = 'ss-item';
    d.innerHTML =
      '<span class="ss-item-icon">'  + item.icon + '</span>' +
      '<span class="ss-item-name">'  + item.name + '</span>' +
      (qty > 1 ? '<span class="ss-item-qty">x' + qty + '</span>' : '') +
      '<span class="ss-item-price">R$ ' + fmt(item.price * qty) + '</span>';
    ssItems.appendChild(d);
  });

  const ssMsgWrap = document.getElementById('ssMsgWrap');
  if (msg) {
    document.getElementById('ssMsgText').textContent = '\u201C' + msg + '\u201D';
    ssMsgWrap.style.display = 'block';
  } else {
    ssMsgWrap.style.display = 'none';
  }

  // Prévia WhatsApp formatada
  const preview = waRaw
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*(.*?)\*/g, '<span class="wa-bold">$1</span>')
    .replace(/_(.*?)_/g,   '<span class="wa-italic">$1</span>')
    .replace(/\n/g, '<br>');
  document.getElementById('ssWaPreview').innerHTML = preview;

  // Exibe sucesso
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('successScreen').classList.add('show');
  document.getElementById('progressFill').style.width = '100%';

  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartDrawerOverlay')?.classList.remove('open');

  // Rola pro topo do painel
  document.querySelector('.builder-left')?.scrollTo({ top: 0, behavior: 'smooth' });

  // Abre WhatsApp
  setTimeout(() => window.open(_lastWaUrl, '_blank'), 800);

  // Email
  try {
    const htmlEmail = buildEmailHTML(sender, receiver, msg || '—', items, total, orderId);
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: OWNER_EMAIL, sender_name: sender, receiver_name: receiver,
      order_id: orderId, total: 'R$ ' + fmt(total), order_html: htmlEmail
    });
  } catch (err) {
    console.warn('Configure o EmailJS:', err);
  }
}

function reabrirWhatsapp() {
  if (_lastWaUrl) window.open(_lastWaUrl, '_blank');
}

/* =================== RESET =================== */
function resetBuilder() {
  Object.keys(state.selected).forEach(k => delete state.selected[k]);
  document.getElementById('successScreen').classList.remove('show');
  updateSidebar();
  initGrids();
  goStep(0);
  document.getElementById('senderName').value   = '';
  document.getElementById('receiverName').value = '';
  document.getElementById('messageText').value  = '';
}

/* =================== MODAL =================== */
function openBuilder() {
  document.getElementById('builderModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  initGrids();
  updateSidebar();
  goStep(0);
}

function closeBuilder() {
  document.getElementById('builderModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('builderModal').addEventListener('click', function(e) {
  if (e.target === this) closeBuilder();
});

/* =================== TECLADO =================== */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('builderModal');
    if (modal && modal.classList.contains('open')) closeBuilder();
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('open')) toggleMenu();
  }
});

/* =================== MENU MOBILE =================== */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const ham  = document.getElementById('hamburger');
  if (!menu) return;
  const open = menu.classList.toggle('open');
  if (ham) ham.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

/* =================== PÉTALAS =================== */
/* U+1F338=🌸 U+1F339=🌹 U+1F495=💕 U+1F33A=🌺 U+2728=✨ U+1F337=🌷 U+1F496=💖 */
const petalsEl = document.getElementById('global-petals');
const PETALS   = ['\u{1F338}','\u{1F339}','\u{1F495}','\u{1F33A}','\u2728','\u{1F337}','\u{1F496}'];
for (let i = 0; i < 24; i++) {
  const p = document.createElement('span');
  p.className = 'petal';
  p.textContent = PETALS[i % PETALS.length];
  p.style.left              = (Math.random() * 100) + '%';
  p.style.animationDuration = (8 + Math.random() * 10) + 's';
  p.style.animationDelay    = (Math.random() * 14) + 's';
  p.style.fontSize          = (12 + Math.random() * 10) + 'px';
  p.style.opacity           = (0.4 + Math.random() * 0.4).toString();
  petalsEl.appendChild(p);
}

/* =================== NAV SCROLL =================== */
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => navEl.classList.toggle('scrolled', scrollY > 60), { passive: true });

/* =================== REVEAL =================== */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.10 });
document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
