import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Footer.scss";
export default function Footer() {
    const { timerId } = useSelector((state: State) => state.time);
    return (
        <div className={`bottom-area ${timerId ? "hidden" : ""}`}>
            <span className="hint">
                <kbd>Tab</kbd> zeby zresetowac 
            </span>
            <footer>
            </footer>
        </div>
    );
}
