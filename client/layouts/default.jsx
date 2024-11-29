import { Suspense } from 'react'

export default function Default ({ children }) {
  return (
    <Suspense>
      <div>default layout</div>
      {children}
    </Suspense>
  )
}
