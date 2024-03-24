import { useState } from 'react';
const NavBar = () => {
    return (
        <div className="navbar bg-blue-800">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href='https://www.koii.network/node'>NODES</a></li>
                        <li>
                            <a href='https://docs.koii.network/'>DOCS</a>
                            <ul className="p-2">
                            <li><a>Become a Webs Developer</a></li>
                                <li><a>Earn Passive Income </a></li>
                            </ul>
                        </li>
                        <li><a href='https://www.koii.network/'>JOIN</a></li>
                    </ul>
                </div>
                <a href='/' className="btn btn-ghost text-xl text-white">KOII</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white">
                    <li><a href='https://www.koii.network/node'>NODES</a></li>
                    <li>
                        <details>
                            <summary>DOCS</summary>
                            <ul className="p-2 text-black w-52">
                                <li><a href='https://docs.koii.network/'>summary</a></li>
                                <li><a href='https://docs.koii.network/quickstart/hello-world/introduction'>Become a Developer</a></li>
                                <li><a href='https://koii.network/node'>Earn Passive Income </a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a href='https://blog.koii.network/'>BLOG</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a href='https://www.koii.network/' className="btn">Join the Network</a>
            </div>
        </div>

 
    )

}

export default NavBar

