import React from 'react'

const Header: React.FC = () => {
    return (
        <div className={'w-screen h-16 bg-slate-800 flex items-center'}>
            <div>
                <h1 className={'text-white text-2xl font-bold ml-5'}>Latent Diffusion Model</h1>
            </div>
        </div>
    )
}

export default Header