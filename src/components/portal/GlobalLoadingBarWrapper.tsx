'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { GlobalLoadingBar as DSGlobalLoadingBar } from '@system/design-ui';

export const GlobalLoadingBarWrapper = ({ isPending, className }: { isPending?: boolean; className?: string }) => {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isPending) {
      setTimeout(() => setLoading(true), 0)
    } else {
      const timeout = setTimeout(() => setLoading(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [isPending, pathname])

  return <DSGlobalLoadingBar isPending={isPending} loading={loading} className={className} />
}
