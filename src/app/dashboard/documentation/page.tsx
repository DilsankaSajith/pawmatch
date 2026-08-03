'use client';

import { DashboardPage } from '@/components/dashboard-page';
import { Copy, Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

// ── Code snippets ───────────────────────────────────────────────────────
const snippets = [
  {
    title: 'Structured Data Extraction',
    method: 'POST',
    endpoint: '/api/struct-data',
    description:
      'Extract structured fields from unstructured text. Provide the text and a format object mapping field names to types (string, number, boolean, date, enum).',
    code: `fetch("https://your-domain.com/api/struct-data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify({
    text: "Luna is a 3 year old female Golden Retriever...",
    format: {
      name: "string",
      age: "number",
      breed: "string",
      gender: "enum",
      animalType: "enum"
    }
  })
})`,
  },
  {
    title: 'Hotspot Data',
    method: 'GET',
    endpoint: '/api/hotspot-data',
    description:
      'Retrieve all reported animal sighting hotspots with location coordinates, urgency, and visible issues.',
    code: `fetch("https://your-domain.com/api/hotspot-data", {
  method: "GET",
  headers: {
    "x-api-key": "YOUR_API_KEY"
  }
})`,
  },
  {
    title: 'Similarity Check',
    method: 'POST',
    endpoint: '/api/similarity-check',
    description:
      'Compare two text strings and get a similarity score (0–1) with a label: similar, maybe, or not_relevant.',
    code: `fetch("https://your-domain.com/api/similarity-check", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY"
  },
  body: JSON.stringify({
    text1: "Golden Retriever found near Central Park",
    text2: "Lost dog spotted at the park entrance"
  })
})`,
  },
];

// ── Syntax colouring (simple token map) ─────────────────────────────────
function tokenise(code: string) {
  // Order matters – check longer / more specific patterns first
  const tokenRules: { regex: RegExp; className: string }[] = [
    // strings (double‑quoted)
    { regex: /"(?:[^"\\]|\\.)*"/g, className: 'text-emerald-400' },
    // keywords
    {
      regex: /\b(fetch|method|headers|body|JSON)\b/g,
      className: 'text-purple-400',
    },
    // built‑in methods
    {
      regex: /\b(stringify)\b/g,
      className: 'text-sky-400',
    },
    // property keys (word followed by colon)
    { regex: /\b(\w+)(?=\s*:)/g, className: 'text-orange-300' },
  ];

  type Token = { start: number; end: number; text: string; className: string };
  const tokens: Token[] = [];

  for (const { regex, className } of tokenRules) {
    let m: RegExpExecArray | null;
    regex.lastIndex = 0;
    while ((m = regex.exec(code)) !== null) {
      // Only add if not overlapping with an existing token
      const start = m.index;
      const end = m.index + m[0].length;
      const overlaps = tokens.some((t) => start < t.end && end > t.start);
      if (!overlaps) {
        tokens.push({ start, end, text: m[0], className });
      }
    }
  }

  tokens.sort((a, b) => a.start - b.start);

  // Build JSX fragments
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  tokens.forEach((t, i) => {
    if (t.start > cursor) {
      parts.push(
        <span key={`plain-${i}`} className="text-gray-300">
          {code.slice(cursor, t.start)}
        </span>,
      );
    }
    parts.push(
      <span key={`tok-${i}`} className={t.className}>
        {t.text}
      </span>,
    );
    cursor = t.end;
  });
  if (cursor < code.length) {
    parts.push(
      <span key="tail" className="text-gray-300">
        {code.slice(cursor)}
      </span>,
    );
  }
  return parts;
}

// ── Badge colour per HTTP method ────────────────────────────────────────
const methodBadge: Record<string, string> = {
  GET: 'bg-emerald-100 text-emerald-700',
  POST: 'bg-sky-100 text-sky-700',
};

// ── Main page ───────────────────────────────────────────────────────────
const DocumentationPage = () => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = useCallback(async (code: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIdx(idx);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  }, []);

  return (
    <DashboardPage
      title="Documentation"
      subtitle="Integrate with PawMatch API by using your API keys and endpoints."
    >
      <div className="w-full max-w-3xl space-y-6">
        {/* Auth note */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm px-5 py-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Authentication
          </h3>
          <p className="text-sm text-gray-600">
            Every request must include your API key via the{' '}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono text-brand-700">
              x-api-key
            </code>{' '}
            header, or as a Bearer token in the{' '}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 text-xs font-mono text-brand-700">
              Authorization
            </code>{' '}
            header.
          </p>
        </div>

        {/* Endpoint cards */}
        {snippets.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
              <span
                className={`text-[11px] font-bold tracking-wide px-2 py-0.5 rounded ${methodBadge[s.method] ?? 'bg-gray-100 text-gray-700'}`}
              >
                {s.method}
              </span>
              <h3 className="text-sm font-semibold text-gray-900">{s.title}</h3>
            </div>

            {/* Description */}
            <div className="px-5 pt-3 pb-2">
              <p className="text-sm text-gray-600">{s.description}</p>
            </div>

            {/* Code block */}
            <div className="mx-5 mt-4 mb-4 rounded-lg bg-[#1e1e2e] relative group">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                <span className="text-[11px] text-gray-500 font-mono">
                  javascript
                </span>
                <button
                  onClick={() => copy(s.code, i)}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copiedIdx === i ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-[13px] leading-relaxed font-mono overflow-x-auto">
                <code>{tokenise(s.code)}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </DashboardPage>
  );
};

export default DocumentationPage;
