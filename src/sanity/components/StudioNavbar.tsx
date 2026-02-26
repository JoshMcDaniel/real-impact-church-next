'use client'

import { Button } from '@sanity/ui'
import { type NavbarProps } from 'sanity'

export function StudioNavbar(props: NavbarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <div style={{ padding: '0 0.5rem', flexShrink: 0 }}>
        <Button
          as="a"
          href="/"
          mode="ghost"
          text="← Website"
          title="Back to website"
        />
      </div>
      {props.renderDefault(props)}
    </div>
  )
}
