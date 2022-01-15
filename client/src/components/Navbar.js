import useNavbar from "../hooks/useNavbar"
import logo from '../images/logo.png'
import BarContent from "./BarContent"

export default function Navbar() {
    const {showNavbar, switchNavbar} = useNavbar()

    return (
        <div className={showNavbar ? "navbar enabled" : "navbar"} id="navbar">
            <header className="header">
                <div className="burger-menu" onClick={() => switchNavbar()}>
                    <i className="fas fa-bars"></i>
                </div>
                <div className="logo-container">
                    <img className="logo-container__logo" src={logo} alt="logo" />
                </div>
            </header>
            <div className="content">
                {showNavbar && <BarContent />}
            </div>
        </div>
    )
}
