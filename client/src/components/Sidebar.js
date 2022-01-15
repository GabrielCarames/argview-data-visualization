
import useSidebar from "../hooks/useSidebar"
import BarContent from "./BarContent"
import shortLogo from '../images/shortLogo.PNG'
import logo from '../images/logo.png'

export default function Sidebar() {
    const {showSidebar, switchSidebar} = useSidebar()

    return (
        <>
            <div className={showSidebar ? "sidebar-container" : "sidebar-container disabled"}>
                <nav className="sidebar">
                    <div className="logo-container">
                        {
                            showSidebar 
                            ? <img className="logo-container__logo" src={logo} alt="logo" />
                            : <img className="logo-container__logo" src={shortLogo} alt="shortLogo" />
                        }
                    </div>
                    <BarContent />
                </nav>
            </div>
            <div className={showSidebar ? "burger-menu" : "burger-menu disabled"} onClick={() => switchSidebar()}>
                <i className="fas fa-bars"></i>
            </div>
        </>
    )
}
