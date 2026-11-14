// Valais Traductions — home page behaviour. The scroll engine (scrollcraft.js) is left untouched.
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  var cross = document.querySelector('.vt-cross');
  var hero = cross, crest = cross;

  // Without motion the two pinned scenes are still pictures: do not make the reader scroll through empty travel.
  if (reduce) {
    cross.setAttribute('data-sc-span', '2.4');
  }

  ScrollCraft.mount(document.body);

  // ---- Signature move: the paragraph becomes French, one segment at a time, as the page crosses the crest.
  // The markup ships in French (no script, no motion: the translation is simply there).
  var segs = Array.prototype.slice.call(crest.querySelectorAll('.vt-seg'));
  var at = [0.55, 0.65, 0.75, 0.85];          // act progress at which each segment turns
  if (!reduce) {
    var queued = false;
    var translate = function () {
      queued = false;
      var p = parseFloat(crest.style.getPropertyValue('--sc-p')) || 0;
      segs.forEach(function (seg, i) { seg.classList.toggle('is-fr', p >= at[i]); });
    };
    var ask = function () { if (!queued) { queued = true; requestAnimationFrame(translate); } };
    addEventListener('scroll', ask, { passive: true });
    addEventListener('resize', ask);
    requestAnimationFrame(function () { requestAnimationFrame(translate); });
  }

  // ---- The hero leans a little with the pointer: near planes move more than far ones.
  if (!reduce && fine) {
    var stage = hero.querySelector('[data-sc-stage]');
    var target = 0, current = 0, running = false;
    var lean = function () {
      current += (target - current) * 0.08;
      stage.style.setProperty('--mx', current.toFixed(4));
      if (Math.abs(target - current) > 0.001) requestAnimationFrame(lean); else running = false;
    };
    hero.addEventListener('pointermove', function (e) {
      target = e.clientX / innerWidth - 0.5;
      if (!running) { running = true; requestAnimationFrame(lean); }
    });
  }

  // ---- Swiss or French: one choice, shown in the examples and carried into the enquiry form.
  var list = document.querySelector('.vt-loc');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.vt-switch button'));
  var select = document.getElementById('variant');
  var choose = function (v) {
    list.setAttribute('data-variant', v);
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-variant') === v)); });
    if (select) select.value = v;
  };
  buttons.forEach(function (b) { b.addEventListener('click', function () { choose(b.getAttribute('data-variant')); }); });
  if (select) select.addEventListener('change', function () { choose(select.value); });

  // ---- Contact form: send in the background, answer in place.
  // Without JavaScript the form still works: contact.php then shows a plain confirmation page.
  var form = document.querySelector('[data-contact-form]');
  if (form && window.fetch) {
    var status = form.querySelector('.vt-status');
    var button = form.querySelector('button[type="submit"]');
    var say = function (state, text) { status.dataset.state = state; status.textContent = text; };
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      button.disabled = true;
      say('sending', form.dataset.sending);
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (!result.ok) throw new Error('not sent');
          form.reset();
          say('ok', form.dataset.ok);
        })
        .catch(function () { say('error', form.dataset.error); })
        .then(function () { button.disabled = false; });
    });
  }
})();
