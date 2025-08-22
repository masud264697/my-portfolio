import React from 'react'
export function Badge({ children, className = '', variant }){
  const base = 'inline-flex items-center rounded-full px-2 py-1 text-xs bg-white/5'
  return <span className={`${base} ${className}`.trim()}>{children}</span>
}
export default Badge
