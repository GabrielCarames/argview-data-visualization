import { useParams } from "react-router"

export default function Error() {
    const { error } = useParams()
    
    return (
        <div className="error">
            <div className="text">
                <p className="text__error">
                    Se produjo un error inesperado, intente nuevamente más tarde.
                </p>
            </div>
            <div className="message">
                <p className="message__error">
                    {error}
                </p>
            </div>
        </div>
    )
}
