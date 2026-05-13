const srcset = (base, nativeW) => {
  const ext = base.match(/(\.[^.]+)$/)[1];
  const stem = base.replace(/\.[^.]+$/, '');
  const variants = [400, 800].filter(w => w < nativeW).map(w => `${stem}@${w}w${ext} ${w}w`);
  variants.push(`${base} ${nativeW}w`);
  return variants.join(', ');
};

const img = ({ src, alt, w, h, sizes, priority = false, style = '' }) => {
  const native = w;
  return `<img
    src="${src}"
    srcset="${srcset(src, native)}"
    sizes="${sizes}"
    alt="${alt}"
    width="${w}" height="${h}"
    ${priority ? 'fetchpriority="high"' : 'loading="lazy"'}
    ${style ? `style="${style}"` : ''}
  />`;
};

const printCard = p => `
  <article class="print-section" aria-label="${p.title}">
    <div class="shop-images">
      ${img({ src: p.printImage, alt: p.printImageAlt, w: 900, h: 1119, sizes: '(max-width:760px) 100vw, (max-width:900px) 50vw, 450px' })}
      ${img({ src: p.scaleImage, alt: p.scaleImageAlt, w: 900, h: 674, sizes: '(max-width:760px) 100vw, (max-width:900px) 50vw, 450px', style: 'aspect-ratio:unset' })}
    </div>
    <p class="scale-note">${p.scaleNote}</p>
    <div class="shop-details single-print">
      <div class="print-card">
        <p class="s-title">${p.fullTitle}</p>
        <p class="s-ed">${p.edition}</p>
        <div class="purchase-option">
          <p class="s-price">${p.framedPrice}</p>
          <dl><div class="mrow"><dt>Format</dt><dd>${p.framedFormat}</dd></div></dl>
          <button class="s-add">Buy framed print</button>
        </div>
        <div class="purchase-option">
          <p class="s-price">${p.unframedPrice}</p>
          <dl><div class="mrow"><dt>Format</dt><dd>${p.unframedFormat}</dd></div></dl>
          <button class="s-add">Buy unframed print</button>
        </div>
        <hr class="thin"/>
        <dl>
          <div class="mrow"><dt>Size</dt><dd>${p.size}</dd></div>
          <div class="mrow"><dt>Paper</dt><dd>${p.paper}</dd></div>
          <div class="mrow"><dt>Print</dt><dd>${p.print}</dd></div>
          <div class="mrow"><dt>Certificate</dt><dd>${p.certificate}</dd></div>
          <div class="mrow"><dt>Dispatch</dt><dd>${p.dispatch}</dd></div>
          <div class="mrow"><dt>Shipping</dt><dd>${p.shipping}</dd></div>
        </dl>
        <p class="s-note">${p.note}</p>
      </div>
    </div>
  </article>`;

const render = c => `
  <!-- HERO -->
  <section class="hero" aria-label="Hero">
    ${img({ src: c.hero.image, alt: c.hero.alt, w: 1600, h: 1066, sizes: '100vw', priority: true })}
  </section>

  <!-- INTRO -->
  <div class="intro"><p>${c.intro.text}</p></div>

  <!-- THE COLLECTOR -->
  <section id="collector" aria-labelledby="collector-heading">
    <div class="rule"><span id="collector-heading">The collector</span></div>
    <div class="collector">
      <div>
        ${img({ src: c.collector.paintingsImage, alt: c.collector.paintingsAlt, w: 900, h: 1200, sizes: '(max-width:760px) 100vw, (max-width:1200px) 60vw, 720px', style: 'width:100%;aspect-ratio:3/4;object-fit:cover;object-position:center top' })}
        <p class="small-cap">${c.collector.paintingsCaption}</p>
        <div style="height:2rem"></div>
        ${img({ src: c.collector.portraitImage, alt: c.collector.portraitAlt, w: 900, h: 1200, sizes: '(max-width:760px) 100vw, (max-width:1200px) 60vw, 720px', style: 'width:100%;aspect-ratio:3/4;object-fit:cover;object-position:center 15%' })}
        <p class="small-cap">${c.collector.portraitCaption}</p>
      </div>
      <div>
        <p class="c-tag">In conversation</p>
        <p class="c-name">${c.collector.name}</p>
        ${c.collector.qa.map(q => `
        <div class="qa">
          <p class="q">${q.question}</p>
          <p class="a">${q.answer}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- THE ARTIST -->
  <section id="artist" aria-labelledby="artist-heading">
    <div class="rule"><span id="artist-heading">The artist</span></div>
    <div class="artist">
      <div>
        ${img({ src: c.artist.image, alt: c.artist.imageAlt, w: 800, h: 1044, sizes: '(max-width:760px) 100vw, (max-width:1200px) 43vw, 515px', style: 'width:100%;aspect-ratio:3/4;object-fit:cover;object-position:top' })}
        <p class="small-cap" style="margin-top:.75rem">${c.artist.imageCaption}</p>
      </div>
      <div class="artist-text">
        <h3>${c.artist.name}</h3>
        <p>${c.artist.shortBio}</p>
      </div>
    </div>
    <div class="exh">
      ${c.artist.bodyParagraphs.map(p => `<p>${p}</p>`).join('\n      ')}
      <blockquote>${c.artist.quote}<cite>${c.artist.quoteAttrib}</cite></blockquote>
    </div>
  </section>

  <!-- THE EXHIBITION -->
  <section id="exhibition" aria-labelledby="exhibition-heading">
    <div class="rule"><span id="exhibition-heading">The exhibition</span></div>
    <div class="full-bleed">
      ${img({ src: c.exhibition.galleryWindowImage, alt: c.exhibition.galleryWindowAlt, w: 1000, h: 562, sizes: '100vw' })}
    </div>
    <div style="height:2px"></div>
    <div class="two-col exhibition-pair">
      ${img({ src: c.exhibition.openingNightImage, alt: c.exhibition.openingNightAlt, w: 900, h: 1200, sizes: '(max-width:700px) 100vw, 50vw', style: 'aspect-ratio:4/5;object-fit:cover' })}
      ${img({ src: c.exhibition.installationImage, alt: c.exhibition.installationAlt, w: 1010, h: 670, sizes: '(max-width:700px) 100vw, 50vw' })}
    </div>
    <div class="exh" style="padding-top:4rem">
      <div style="border-bottom:.5px solid var(--rule);padding-bottom:3rem;margin-bottom:3rem">
        <p style="font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:1.25rem">About the gallerist</p>
        <p>${c.exhibition.galleristText}</p>
        <p style="margin-top:.75rem"><a href="${c.exhibition.galleristUrl}" style="color:var(--muted)">${c.exhibition.galleristUrl.replace(/^https?:\/\//, '')}</a></p>
      </div>
      <address style="font-style:normal;font-size:10px;line-height:2.2;color:var(--muted)">
        ${c.exhibition.venueName} · ${c.exhibition.venueAddress}<br/>
        Curated by ${c.exhibition.venuecurator} · ${c.exhibition.venueDates}<br/>
        <a href="mailto:${c.exhibition.venueEmail}" style="color:var(--muted)">${c.exhibition.venueEmail}</a>
      </address>
    </div>
  </section>

  <!-- STUDIO -->
  <section id="studio" aria-labelledby="studio-heading">
    <div class="rule"><span id="studio-heading">Studio</span></div>
    <div class="full-bleed">
      ${img({ src: c.studio.paintingsImage, alt: c.studio.paintingsAlt, w: 900, h: 506, sizes: '100vw' })}
    </div>
    <div style="height:2px"></div>
    ${img({ src: c.studio.wipImage, alt: c.studio.wipAlt, w: 900, h: 506, sizes: '100vw', style: 'width:100%;height:60vh;object-fit:cover' })}
    <div class="rule"><span>Sketchbook &amp; studies</span></div>
    <div style="padding-bottom:5rem">
      <div class="sketch-grid">
        ${c.studio.sketches.map(s => img({ src: s.image, alt: s.alt, w: 700, h: 1000, sizes: '(max-width:760px) 100vw, 33vw' })).join('\n        ')}
      </div>
    </div>
  </section>

  <!-- ACQUIRE A PRINT -->
  <section id="prints" aria-labelledby="prints-heading">
    <div class="rule"><span id="prints-heading">Acquire a print</span></div>
    <div class="shop">
      <div class="shop-inner">
        <div class="series-intro">
          <h2>Limited edition print series</h2>
          <p>Two fine art giclée editions from <em>Risk it all for Joy</em>, available framed and unframed. Each edition is printed at a bespoke size, distinct from the original artwork shown in the collector's home.</p>
        </div>
        ${c.prints.map(printCard).join('')}
      </div>
    </div>
  </section>`;

fetch('./content.json')
  .then(r => r.json())
  .then(c => {
    document.getElementById('site-main').innerHTML = render(c);
  });
