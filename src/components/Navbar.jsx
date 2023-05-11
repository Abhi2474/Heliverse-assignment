import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
	<div className='py-5 shadow-lg shadow-slate-200 bg-orange-200 text-xl font-bold mb-10'>
		<ul className='flex justify-center items-center'>
			<li className='mr-10'><Link to={'/'}>Home</Link></li>
			<li><Link to={'/team'}>Team</Link></li>
		</ul>
	</div>
  )
}

export default Navbar