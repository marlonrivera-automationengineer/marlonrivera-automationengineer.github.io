(function () {
  'use strict';

  const config = window.PORTFOLIO_ANALYTICS || {};
  const measurementId = String(config.measurementId || '').trim();
  const validMeasurementId = /^G-[A-Z0-9]+$/i.test(measurementId) && measurementId !== 'G-XXXXXXXXXX';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  const log = (...args) => {
    if (config.debug && window.console) console.log('[Portfolio Analytics]', ...args);
  };

  const sendEvent = (name, params) => {
    if (!validMeasurementId || typeof window.gtag !== 'function') return;
    window.gtag('event', name, Object.assign({
      page_title: document.title,
      page_location: window.location.href
    }, params || {}));
    log(name, params || {});
  };

  window.portfolioAnalytics = { sendEvent, enabled: validMeasurementId };

  if (!validMeasurementId) {
    log('Disabled. Add a valid GA4 Measurement ID in analytics-config.js.');
    return;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true
  });

  const text = element => (element.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120);
  const fileName = url => {
    try {
      const parsed = new URL(url, window.location.href);
      return decodeURIComponent(parsed.pathname.split('/').pop() || '');
    } catch (_) {
      return '';
    }
  };

  document.addEventListener('click', event => {
    const target = event.target.closest('a, button');
    if (!target) return;

    if (target.matches('[data-theme-toggle]')) {
      sendEvent('theme_toggle', {
        event_category: 'engagement',
        selected_theme: document.body.dataset.theme || 'unknown'
      });
      return;
    }

    if (target.tagName !== 'A') return;

    const href = target.getAttribute('href') || '';
    const label = text(target);
    const absoluteHref = target.href || href;

    if (/\.pdf(?:$|[?#])/i.test(href)) {
      sendEvent(target.hasAttribute('download') ? 'file_download' : 'pdf_open', {
        event_category: 'document',
        link_text: label,
        file_name: fileName(absoluteHref),
        link_url: absoluteHref
      });
      return;
    }

    if (/linkedin\.com/i.test(absoluteHref)) {
      sendEvent('linkedin_click', {
        event_category: 'contact',
        link_text: label,
        link_url: absoluteHref
      });
      return;
    }

    if (/^mailto:/i.test(href)) {
      sendEvent('email_click', {
        event_category: 'contact',
        link_text: label
      });
      return;
    }

    if (/^tel:/i.test(href)) {
      sendEvent('phone_click', {
        event_category: 'contact',
        link_text: label,
        phone_region: /855/.test(href) ? 'Cambodia' : (/63/.test(href) ? 'Philippines' : 'Other')
      });
      return;
    }

    if (/projects\//i.test(href) || /\/projects\//i.test(absoluteHref)) {
      sendEvent('project_open', {
        event_category: 'project',
        project_name: label || document.title,
        link_url: absoluteHref
      });
      return;
    }

    if (href.startsWith('#')) {
      sendEvent('navigation_click', {
        event_category: 'navigation',
        section_name: href.slice(1) || 'top',
        link_text: label
      });
    }
  });

  document.querySelectorAll('video').forEach(video => {
    let sent25 = false;
    let sent75 = false;
    const videoName = fileName(video.currentSrc || (video.querySelector('source') || {}).src || 'portfolio-video');

    video.addEventListener('play', () => sendEvent('video_play', {
      event_category: 'video',
      video_name: videoName
    }), { once: true });

    video.addEventListener('timeupdate', () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const percent = (video.currentTime / video.duration) * 100;
      if (!sent25 && percent >= 25) {
        sent25 = true;
        sendEvent('video_progress', { event_category: 'video', video_name: videoName, video_percent: 25 });
      }
      if (!sent75 && percent >= 75) {
        sent75 = true;
        sendEvent('video_progress', { event_category: 'video', video_name: videoName, video_percent: 75 });
      }
    });
  });
})();
