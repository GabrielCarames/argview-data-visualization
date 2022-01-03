import React from 'react'
import logo from '../images/logo.png'

export default function Sidebar() {
    return (
        <div className="sidebar-container">
            <nav className="sidebar">
                <div className="logo-container">
                    <img className="logo-container__logo" src={logo} alt="" />
                </div>
                <div className="menu-container">
                    <h3 className="menu-container__title">Menú</h3>
                    <ul className="list">
                        <li className="list__item">
                            <i className="fas fa-home"></i>
                            <a className="list__title" href="/">Inicio</a>
                        </li>
                        <li className="list__item">
                            <i className="fas fa-cloud"></i>
                            <a className="list__title" href="/">Clima</a>
                        </li>
                        <li className="list__item">
                            <i className="fas fa-fire"></i>
                            <a className="list__title" href="/">Incendios</a>
                        </li>
                    </ul>
                </div>
                <div className="support-container">
                    <h3 className="support-container__title">Soporte</h3>
                    <ul className="list">
                        <li className="list__item">
                            <i className="fas fa-copyright"></i>
                            <a className="list__title" href="/">Acerca de</a>
                        </li>
                        <li className="list__item">
                            <i className="fab fa-github"></i>
                            <a className="list__title" href="/">Creditos</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
