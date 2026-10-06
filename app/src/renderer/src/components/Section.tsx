// A ruled heading over a group of rows.
import type { ReactNode } from 'react'
import './Section.css'

export function Section({ title, aside, children }: { title: string; aside?: string; children: ReactNode }) {
  return (
    <section className="section">
      <h3 className="section__title">
        <span>{title}</span>
        {aside && <span className="section__aside">{aside}</span>}
      </h3>
      {children}
    </section>
  )
}
