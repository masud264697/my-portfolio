import React from 'react'

export function Switch({ checked, onCheckedChange }){
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e)=> onCheckedChange && onCheckedChange(e.target.checked)}
      className="h-5 w-9 rounded-full"
      aria-checked={checked}
    />
  )
}

export default Switch
