import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <h3>About</h3>
    </div>
  )
}
