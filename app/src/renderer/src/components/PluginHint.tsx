// Shown on Needs you while the plugin is not reaching some sessions: an empty list there must never
// read as "nothing needs you" when Bat-Signal simply cannot hear their permission prompts or waits.
export function PluginHint({ sessions }: { sessions: number }) {
  return (
    <aside className="plugin-hint" role="note">
      <p className="plugin-hint__title">
        No word from the Bat-Signal plugin for {sessions === 1 ? 'one session' : `${sessions} sessions`}.
      </p>
      <p className="plugin-hint__text">
        Their permission prompts and waits won&rsquo;t show. Install the plugin once, then restart those
        sessions:
      </p>
      <code className="plugin-hint__command">claude plugin install bat-signal@bat-signal</code>
    </aside>
  )
}
