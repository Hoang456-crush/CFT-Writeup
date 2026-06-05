import React from 'react';

export default function TryhackmeLFI({ onClose, darkMode }) {
  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-[#0f0f0f] text-gray-200' : 'bg-white text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <button onClick={onClose} className="mb-6 px-3 py-1 rounded bg-gray-200 text-gray-900">Back</button>

        <h1 className="text-3xl font-bold mb-4">TryHackMe — LFI</h1>
        <p className="text-sm text-gray-400 mb-6">This is a simple page for the TryHackMe LFI link. Add content here describing Local File Inclusion concepts, examples, or walkthroughs.</p>

        <section className="prose prose-invert">
          <h2>Overview</h2>
          <p>Local File Inclusion (LFI) is a web vulnerability that allows an attacker to include files on a server through the web browser. Typical impacts include information disclosure and remote code execution when combined with other flaws.</p>

          <h3>Example</h3>
          <pre className="rounded bg-[#111] p-3 text-sm overflow-auto">/vulnerable.php?page=../../../../etc/passwd</pre>

          <h3>Notes</h3>
          <ul>
            <li>Sanitize and validate file input on the server.</li>
            <li>Use allowlists instead of blacklists.</li>
            <li>Disable unnecessary file includes where possible.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
