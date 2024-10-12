import * as React from 'react'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import "../index.css"

import { Button } from '@/components/ui/button'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen">
      <div className="px-8 py-4 bg-neutral-800 fixed w-full bg-neutral-950 text-white flex items-center justify-between gap-2 text-lg">
        <Link to="/" className="font-bold text-2xl">flow<span className="text-red-400 font-normal">w.</span></Link>
        <div className="flex items-center gap-6 justify-between">
          <Link to="/" className="hover:text-neutral-200 transition text-neutral-400">manage</Link>
          <Button asChild variant={"secondary"} size={"sm"}>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div >
  )
}
