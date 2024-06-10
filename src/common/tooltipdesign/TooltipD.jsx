import React from 'react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "../../components/ui/tooltip"
const TooltipD = ({componentHover,title}) => {
    return (
        <TooltipProvider  >
            <Tooltip>
                <TooltipTrigger>{componentHover}</TooltipTrigger>
                <TooltipContent>
                    <p>{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipD;
