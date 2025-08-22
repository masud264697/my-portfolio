import React from 'react'
export function Textarea(props){
  return <textarea {...props} className={(props.className||'') + ' rounded-md border px-3 py-2 bg-transparent'} />
}
export default Textarea
