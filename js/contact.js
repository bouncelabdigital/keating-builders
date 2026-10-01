/* Keating Builders: contact form validation + Web3Forms submit (vanilla) */
'use strict';

(function initContactForm() {
  const form = document.querySelector('.js-contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');
  const PHONE_RE = /^[0-9+().\-\s]{7,30}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name:    (v) => v ? '' : 'Please enter your name.',
    phone:   (v) => !v ? 'Please enter a phone number.' : (PHONE_RE.test(v) && v.replace(/\D/g, '').length >= 10 ? '' : 'Please enter a valid phone number.'),
    email:   (v) => !v || EMAIL_RE.test(v) ? '' : 'Please enter a valid email address.',
    service: (v) => v ? '' : 'Please choose a project type.',
  };

  const setError = (field, message) => {
    const el = form.elements[field];
    const err = document.getElementById(field + '-error');
    el.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (err) err.textContent = message;
  };

  const validate = () => {
    let firstInvalid = null;
    Object.keys(rules).forEach((field) => {
      const message = rules[field](form.elements[field].value.trim());
      setError(field, message);
      if (message && !firstInvalid) firstInvalid = form.elements[field];
    });
    return firstInvalid;
  };

  Object.keys(rules).forEach((field) => {
    form.elements[field].addEventListener('blur', () => {
      if (form.elements[field].getAttribute('aria-invalid') === 'true') {
        setError(field, rules[field](form.elements[field].value.trim()));
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';

    const invalid = validate();
    if (invalid) { invalid.focus(); return; }

    const data = Object.fromEntries(new FormData(form));
    data.botcheck = form.elements.botcheck.checked;

    button.disabled = true;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Submission failed');
      const first = data.name.split(' ')[0];
      form.reset();
      status.textContent = `Thanks, ${first}. We received your message and will be in touch soon.`;
    } catch (err) {
      status.textContent = 'Sorry, your message could not be sent. Please call us at (413) 555-0100.';
    } finally {
      button.disabled = false;
    }
  });
})();
