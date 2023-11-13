import React from 'react'

interface LdmCellPromptProps {
    promptType: 'Positive' | 'Negative'
    value: string
    setValue: (value: string) => void
}

const LdmCellPrompt: React.FC<LdmCellPromptProps> = ({ promptType, value, setValue }) => {
    return (
        <div className={'flex-1 mx-4'}>
            <textarea
                className={'w-full h-full bg-slate-300 text-slate-700 text-md p-2 rounded-lg'}
                placeholder={`${promptType} Prompt`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default LdmCellPrompt