import React from 'react'
import { Link } from 'react-router-dom'
import kafaLogo from '../images/kafa_logo_dark.svg'

const Header = () => {
    return (
    <div className='flex flex-row items-start justify-center w-screen'>
        <nav className="flex items-center justify-center bg-transparent p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-10">
            <Link to={'/'} relative="path">
                <img src={kafaLogo} alt='Kafa Tech Logo' className='w-30 h-20' />
                </Link>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <div className='block mt-4 lg:inline-block lg:mt-0 text-gray-700 font-bold hover:text-white mr-4'>
                        <Link to={'/teachers'} relative="path">Öğretmenler</Link>
                    </div>
                </div>
                <div className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 font-bold border-black hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0">
                    <Link to={'/teachers'} >Github</Link>
                </div>
            </div>
        </nav>
    </div>
    )
}

export default Header