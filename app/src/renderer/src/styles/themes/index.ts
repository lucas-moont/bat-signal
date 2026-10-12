// Every Theme's stylesheet, found by name (<id>.css), so a new Theme can't be left unregistered.
// Each is scoped to its own [data-theme] (the page, or a box previewing it), so only the worn one applies.
import.meta.glob('./*.css', { eager: true })
