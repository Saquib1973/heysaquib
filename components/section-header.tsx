import React from 'react'
import { StaggerItem } from './stagger-section'

const SectionHeader = ({ text}:{text: string}) => {
    return (
        <StaggerItem className="mb-14 flex items-center gap-4 w-full">
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                // {text}
            </h2>
            <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1" />
        </StaggerItem>
    )
}

export default SectionHeader