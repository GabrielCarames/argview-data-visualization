import React from 'react'
import logo from '../images/logo.png'
import shortLogo from '../images/shortLogo.PNG'
import { Link } from 'react-router-dom'
import useSidebar from "../hooks/useSidebar"

export default function Sidebar() {
    const {showSidebar, switchSidebar} = useSidebar()

    return (
        <>
            <div className={showSidebar ? "sidebar-container" : "sidebar-container disabled"}>
                <nav className="sidebar">
                    <div className="logo-container">
                        {
                            showSidebar 
                            ? <img className="logo-container__logo" src={logo} alt="" />
                            : <img className="logo-container__logo" src={shortLogo} alt="" />
                        }
                    </div>
                    <div className="menu-container">
                        <h3 className="menu-container__title">Menú</h3>
                        <ul className="list">
                            <Link className="list__href" to="/">
                                <li className="list__item">
                                    <i className="fas fa-home"></i>
                                    <p className="list__title">Inicio</p>
                                </li>
                            </Link>
                            <Link className="list__href" to="/weather">
                                <li className="list__item">
                                    <i className="fas fa-cloud"></i>
                                    <p className="list__title" href="/weather">Clima</p>
                                </li>
                            </Link>
                            <Link className="list__href" to="/">
                                <li className="list__item">
                                    <i className="fas fa-fire"></i>
                                    <p className="list__title" href="/">Incendios</p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="support-container">
                        <h3 className="support-container__title">Soporte</h3>
                        <ul className="list">
                            <Link className="list__href" to="/">
                                <li className="list__item">
                                    <i className="fas fa-copyright"></i>
                                    <p className="list__title" href="/">Acerca de</p>
                                </li>
                            </Link>
                            <Link className="list__href" to="/">
                                <li className="list__item">
                                    <i className="fab fa-github"></i>
                                    <p className="list__title" href="/">Creditos</p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className={showSidebar ? "burger-menu" : "burger-menu disabled"} onClick={() => switchSidebar()}>
                <i className="fas fa-bars"></i>
            </div>
        </>
    )
}
