/* ─────────────────────────────────────────────────────────────
   refs.js  –  Reference system for Reveal.js presentations
   Add entries to REFS to register new papers.
   Usage in slides:  <cite data-ref="clavie2023"></cite>
   ───────────────────────────────────────────────────────────── */

const REFS = {
  clavie2023: {
    authors: "Clavié, B. & Souliè, G.",
    year: 2023,
    title: "Large Language Models as Batteries-Included Zero-Shot ESCO Skills Matchers",
    venue: "arXiv:2307.03539",
    url: "https://arxiv.org/abs/2307.03539"
  },
  decorte2023: {
    authors: "Decorte, J.-J. et al.",
    year: 2023,
    title: "Extreme Multi-Label Skill Extraction Training using Large Language Models",
    venue: "arXiv:2307.10778",
    url: "https://arxiv.org/abs/2307.10778"
  },
  kavargyris2025: {
    authors: "Kavargyris, D.C. et al.",
    year: 2025,
    title: "ESCOX: A Tool for Skill and Occupation Extraction Using LLMs from Unstructured Text",
    venue: "Software Impacts, 25, 100772",
    url: "https://www.sciencedirect.com/science/article/pii/S2665963825000326"
  },
  magron2024: {
    authors: "Magron, A. et al.",
    year: 2024,
    title: "JobSkape: A Framework for Generating Synthetic Job Postings to Enhance Skill Matching",
    venue: "NLP4HR 2024, pp. 43–58",
    url: "https://arxiv.org/abs/2402.03242"
  },
  lee2024: {
    authors: "Lee, C. et al.",
    year: 2024,
    title: "NV-Embed: Improved Techniques for Training LLMs as Generalist Embedding Models",
    venue: "arXiv:2405.17428",
    url: "https://arxiv.org/abs/2405.17428"
  },
  morgan2025: {
    authors: "Morgan, D. & Hansen, S.",
    year: 2025,
    title: "DeBERTNER-ESCO: Using Natural Language Processing to Analyse AI and Skill Trends in the UK Labour Market",
    venue: "SSRN 5613630",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5613630"
  },
  decorte2025: {
    authors: "Decorte, J.-J. et al.",
    year: 2025,
    title: "Efficient text encoders for labor market analysis",
    venue: "IEEE Access",
    url: "https://ieeexplore.ieee.org/abstract/document/11079977"
  },
  bielinski2025: {
    authors: "Bielinski, A. & Brazier, D.",
    year: 2025,
    title: "From Retrieval to Ranking: A Two-Stage Neural Framework for Automated Skill Extraction",
    venue: "RecSys in HR'25 Workshop",
    url: "https://ceur-ws.org/Vol-4046/RecSysHR2025-paper_5.pdf"
  },
  iltuzer2026: {
    authors: "İltüzer, E.A. et al.",
    year: 2026,
    title: "Leveraging LLMs For Turkish Skill Extraction",
    venue: "arXiv:2601.22885",
    url: "https://arxiv.org/abs/2601.22885"
  },
  zhang2023: {
    authors: "Zhang, M. et al.",
    year: 2023,
    title: "ESCOXLM-R: Multilingual Taxonomy-Driven Pre-training for the Job Market Domain",
    venue: "ACL 2023",
    url: "https://arxiv.org/abs/2305.12092"
  },
  zhao2025: {
    authors: "Zhao, X. et al.",
    year: 2025,
    title: "KaLM-Embedding-V2: Superior Training Techniques and Data Inspire A Versatile Embedding Model",
    venue: "arXiv:2506.20923",
    url: "https://arxiv.org/abs/2506.20923"
  }
};

/* Build APA-style short label: [Authors, Year] */
function refLabel(key) {
  const r = REFS[key];
  if (!r) return `[${key}]`;
  return `[${r.authors}, ${r.year}]`;
}

/* Build full citation HTML (for tooltip and reference slide) */
function refFull(key) {
  const r = REFS[key];
  if (!r) return key;
  const venueHtml = r.url
    ? `<a href="${r.url}" target="_blank" rel="noopener" style="color:#58a6ff">${r.venue}</a>`
    : r.venue;
  return `<strong>${r.authors} (${r.year}).</strong> ${r.title}. <em>${venueHtml}</em>`;
}

/* ── Inject citations and build reference slide ── */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Replace all <cite data-ref="key"> with inline label + tooltip + link */
  document.querySelectorAll('cite[data-ref]').forEach(el => {
    const key = el.dataset.ref;
    const r = REFS[key];
    const label = refLabel(key);

    el.setAttribute('title', '');
    el.classList.add('ref-cite');
    el.setAttribute('tabindex', '0');

    /* Wrap label in a link if URL is available */
    const labelHtml = r?.url
      ? `<a href="${r.url}" target="_blank" rel="noopener" class="ref-cite-link">${label}</a>`
      : label;

    /* Tooltip */
    const tip = document.createElement('div');
    tip.className = 'ref-tooltip';
    tip.innerHTML = refFull(key);

    el.innerHTML = labelHtml;
    el.appendChild(tip);
  });

  /* 2. Auto-generate References slide content — sorted alphabetically by author */
  const keys = Object.keys(REFS).sort((a, b) => {
    const authorA = (REFS[a].authors || '').toLowerCase();
    const authorB = (REFS[b].authors || '').toLowerCase();
    return authorA.localeCompare(authorB);
  });

  const list1 = document.getElementById('ref-slide-list-1');
  const list2 = document.getElementById('ref-slide-list-2');
  const listSingle = document.getElementById('ref-slide-list');

  if (list1 && list2) {
    const half = Math.ceil(keys.length / 2);
    keys.slice(0, half).forEach(k => {
      const li = document.createElement('li'); li.innerHTML = refFull(k); list1.appendChild(li);
    });
    keys.slice(half).forEach(k => {
      const li = document.createElement('li'); li.innerHTML = refFull(k); list2.appendChild(li);
    });
  } else if (listSingle) {
    keys.forEach(k => {
      const li = document.createElement('li'); li.innerHTML = refFull(k); listSingle.appendChild(li);
    });
  }
});
