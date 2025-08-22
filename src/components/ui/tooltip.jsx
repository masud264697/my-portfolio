import React from 'react'
export const TooltipProvider = ({ children }) => <div>{children}</div>
export const Tooltip = ({ children }) => <div>{children}</div>
export const TooltipTrigger = ({ children }) => <span>{children}</span>
export const TooltipContent = ({ children }) => <div className="bg-black text-white p-2 rounded">{children}</div>

export default Tooltip
