import React from 'react'

interface LdmCellPromptProps {
    promptType: 'Positive' | 'Negative'
    value: string
    setValue: (value: string) => void
}

const LdmCellPrompt: React.FC<LdmCellPromptProps> = ({ promptType, value, setValue }) => {
    return (
        <div className={'mx-4 my-2'}>
            <textarea
                className={'w-full h-20 bg-slate-300 text-slate-700 text-md p-2 rounded-lg'}
                placeholder={`${promptType} Prompt`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default LdmCellPrompt