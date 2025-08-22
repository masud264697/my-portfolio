import React from 'react'

export function Card({ children, className = '' }){
  return <div className={`bg-white/5 rounded-lg p-0 ${className}`.trim()}>{children}</div>
}
export function CardHeader({ children, className = '' }){
  return <div className={`px-4 py-3 border-b ${className}`.trim()}>{children}</div>
}
export function CardContent({ children, className = '' }){
  return <div className={`p-4 ${className}`.trim()}>{children}</div>
}
export function CardTitle({ children, className = '' }){
  return <div className={`text-lg font-semibold ${className}`.trim()}>{children}</div>
}

export default Card
