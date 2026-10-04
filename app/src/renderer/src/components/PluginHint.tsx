// Shown on Needs you while the plugin is silent: an empty list there must never read as
// "nothing needs you" when Bat-Signal simply cannot hear permission prompts or waits.
export function PluginHint() {
  return (
    <aside className="plugin-hint" role="note">
      <p className="plugin-hint__title">No word from the Bat-Signal plugin.</p>
      <p className="plugin-hint__text">
        Permission prompts and waits only show with it. Install it once, then restart your Claude Code
        sessions:
      </p>
      <code className="plugin-hint__command">claude plugin install bat-signal@bat-signal</code>
    </aside>
  )
}
