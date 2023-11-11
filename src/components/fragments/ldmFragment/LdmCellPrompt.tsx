import React from 'react'

interface LdmCellPromptProps {
    promptType: 'Positive' | 'Negative'
}

const LdmCellPrompt: React.FC<LdmCellPromptProps> = ({ promptType }) => {
    return (
        <div className={'mx-4 my-2'}>
            <textarea
                className={'w-full h-20 bg-slate-300 text-slate-700 text-md p-2 rounded-lg'}
                placeholder={`${promptType} Prompt`}
            />
        </div>
    )
}

export default LdmCellPrompt