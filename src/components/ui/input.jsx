import React from 'react'
export function Input(props){
  return <input {...props} className={(props.className||'') + ' rounded-md border px-3 py-2 bg-transparent'} />
}
export default Input
