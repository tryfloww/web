import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="bg-neutral-950 min-h-screen pt-20 p-8 text-white h-full p-2">
      <h3>Welcome Home!</h3>
    </div>
  )
}
