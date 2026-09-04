/* ==========================================================================
   Vera - guided help widget for StockLedger
   --------------------------------------------------------------------------
   A menu, not a live chat. There is no backend here: every reply below is
   written into this file, nothing is sent anywhere, and nothing is stored in
   the browser. That last part matters - privacy.html tells visitors this site
   sets no cookies, and this widget must not make that untrue.

   The widget is injected by script, so the site is completely usable without
   it. To edit the wording, change SCRIPT below - no other file is involved.
   ========================================================================== */
(function () {
  'use strict';

  var AGENT = 'Vera';

  // --- the conversation. Each node: what Vera says, and what you can tap next.
  // opt: {label, to}          -> moves to another node
  //      {label, href}        -> leaves for a real page
  //      primary: true        -> bronze button
  var SCRIPT = {
    start: {
      say: '<p>Hi, I&rsquo;m ' + AGENT + '. I can answer a few things straight away, ' +
           'or point you to a person.</p><p>What&rsquo;s on your mind?</p>',
      opts: [
        { label: 'What does this cost?', to: 'pricing' },
        { label: 'My stock doesn&rsquo;t match my books', to: 'variance' },
        { label: 'My books are months behind', to: 'behind' },
        { label: 'Which countries do you cover?', to: 'countries' },
        { label: 'Talk to a person', to: 'human', primary: true }
      ]
    },

    pricing: {
      me: 'What does this cost?',
      say: '<p>Flat monthly fees. No hourly billing.</p>' +
           '<p><b>Inventory Control</b> &mdash; $649/mo, up to 1,500 SKUs<br>' +
           '<b>Bookkeeping</b> &mdash; $749/mo<br>' +
           '<b>Full Stack</b> (both, reconciled against each other) &mdash; $1,299/mo<br>' +
           '<b>Data Entry</b> &mdash; $349/mo</p>' +
           '<p>Costing projects from $895. Warehouse consultancy from $2,500.</p>' +
           '<p>Setup is $499 one-time, waived if you pay annually. Retainers are ' +
           'month-to-month with 30 days&rsquo; notice.</p>',
      opts: [
        { label: 'See the full table', href: 'index.html#pricing' },
        { label: 'Book a free review', href: 'contact.html', primary: true },
        { label: 'Something else', to: 'start', back: true }
      ]
    },

    variance: {
      me: 'My stock doesn&rsquo;t match my books',
      say: '<p>That gap is the reason this practice exists.</p>' +
           '<p>It is usually one of three things: goods received but never counted in, ' +
           'transfers between sites that were never recorded, or write-offs batched at ' +
           'year end so nobody can see when the gap actually opened.</p>' +
           '<p>The free health check finds which one it is &mdash; 30 minutes, then a ' +
           'written note listing what&rsquo;s wrong and what it&rsquo;s likely costing ' +
           'you. Yours to keep whether you hire us or not.</p>',
      opts: [
        { label: 'Book the health check', href: 'contact.html', primary: true },
        { label: 'Read a case study', href: 'case-studies.html' },
        { label: 'Something else', to: 'start', back: true }
      ]
    },

    behind: {
      me: 'My books are months behind',
      say: '<p>Common, and not a problem &mdash; it&rsquo;s a large part of what we do.</p>' +
           '<p>Cleanup and catch-up is quoted separately from the monthly retainer, based ' +
           'on how many months and transactions are involved. The health check tells you ' +
           'the scope before you commit to anything.</p>',
      opts: [
        { label: 'Book the health check', href: 'contact.html', primary: true },
        { label: 'What does this cost?', to: 'pricing' },
        { label: 'Something else', to: 'start', back: true }
      ]
    },

    countries: {
      me: 'Which countries do you cover?',
      say: '<p>The United States, United Kingdom, Canada, and the Gulf &mdash; UAE, ' +
           'Saudi Arabia and Qatar.</p>' +
           '<p>We overlap with US Eastern and Central, the full UK working day, and Gulf ' +
           'business hours. Typical reply is under 12 hours, Monday to Saturday.</p>',
      opts: [
        { label: 'Book a free review', href: 'contact.html', primary: true },
        { label: 'Something else', to: 'start', back: true }
      ]
    },

    human: {
      me: 'Talk to a person',
      say: '<p>The form is the fastest route &mdash; it goes straight to the two of us, ' +
           'not to a queue.</p>' +
           '<p>We reply within 12 hours, Monday to Saturday.</p>',
      opts: [
        { label: 'Open the form', href: 'contact.html', primary: true },
        { label: 'Email us instead', href: 'mailto:Contact@factorialstudio.com' },
        { label: 'Something else', to: 'start', back: true }
      ]
    }
  };

  // ------------------------------------------------------------------ build
  var wrap = document.createElement('div');
  wrap.innerHTML =
    '<button class="vera-launch" id="veraLaunch" aria-expanded="false" aria-controls="veraPanel">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
      '</svg>Ask ' + AGENT + '</button>' +
    '<div class="vera-panel" id="veraPanel" role="dialog" aria-label="' + AGENT +
        ' - quick help" hidden>' +
      '<div class="vera-head">' +
        '<span class="vera-avatar" aria-hidden="true">V</span>' +
        '<span class="vera-who"><b>' + AGENT + '</b><span>StockLedger &middot; quick help</span></span>' +
        '<button class="vera-x" id="veraClose" aria-label="Close ' + AGENT + '">&times;</button>' +
      '</div>' +
      '<div class="vera-body" id="veraBody" aria-live="polite"></div>' +
      '<div class="vera-opts" id="veraOpts"></div>' +
      '<p class="vera-foot">' + AGENT + ' is an automated guide, not a live agent.</p>' +
    '</div>';
  document.body.appendChild(wrap);

  var launch = document.getElementById('veraLaunch');
  var panel  = document.getElementById('veraPanel');
  var close  = document.getElementById('veraClose');
  var body   = document.getElementById('veraBody');
  var opts   = document.getElementById('veraOpts');

  function bubble(cls, html) {
    var d = document.createElement('div');
    d.className = 'vera-msg ' + cls;
    d.innerHTML = html;
    body.appendChild(d);
    body.scrollTop = body.scrollHeight;
    return d;
  }

  function render(key) {
    var node = SCRIPT[key];
    if (!node) return;
    if (node.me) bubble('me', node.me);
    var said = bubble('bot', node.say);

    opts.innerHTML = '';
    node.opts.forEach(function (o) {
      var el;
      if (o.href) {
        el = document.createElement('a');
        el.href = o.href;
      } else {
        el = document.createElement('button');
        el.type = 'button';
        el.addEventListener('click', function () { render(o.to); });
      }
      el.className = 'vera-opt' + (o.primary ? ' primary' : '') + (o.back ? ' back' : '');
      el.innerHTML = o.label;
      opts.appendChild(el);
    });

    // keep the newest reply in view rather than the bottom of the scroller
    said.scrollIntoView({ block: 'nearest' });
  }

  function open() {
    panel.hidden = false;
    launch.hidden = true;
    launch.setAttribute('aria-expanded', 'true');
    if (!body.childNodes.length) render('start');
    close.focus();
  }

  function shut() {
    panel.hidden = true;
    launch.hidden = false;
    launch.setAttribute('aria-expanded', 'false');
    launch.focus();
  }

  launch.addEventListener('click', open);
  close.addEventListener('click', shut);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) shut();
  });
})();
