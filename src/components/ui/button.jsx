import React from 'react'

export function Button({ asChild, children, className = '', ...props }){
  if(asChild && React.isValidElement(children)){
    return React.cloneElement(children, { className: `${className} ${children.props.className || ''}`.trim(), ...props })
  }
  return (
    <button className={className} {...props}>{children}</button>
  )
}

export default Button
