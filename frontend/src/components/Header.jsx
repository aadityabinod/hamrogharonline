import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../pages/Home'

function Header() {
  return (
    <header className='p-2 bg-slate-700  justify-between items-center flex px-3'>
        <span>
            <a href="/about" className='text-white text-2xl font-extrabold font-sans'> HamroGhar  </a>
            <a  href="/about" className='text-red-500 text-2xl font-extrabold font-sans'>Online</a>
        </span>

        <input type="search" placeholder='Search nearest rentals' />

     <ul className='flex-rol inline-flex text-white items-center text-base gap-x-5'>
        <Link to='/home'>
        <li className='hidden sm:inline-flex'>Home</li>
        </Link>

        <Link to='/about'>
        <li className='hidden sm:inline-flex'>About</li>
        </Link>

        <Link to='/signin'>
        <li>Sign in</li>
        </Link>

     </ul>
        </header>
  )
}

export default Header