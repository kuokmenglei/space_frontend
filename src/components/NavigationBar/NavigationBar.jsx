import {NavLink} from "react-router-dom";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  return (
    <nav className={styles["navigation-bar"]}>
      <ul className={styles["navigation-list"]}>
        <li className={styles["navigation-item"]}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles["active-link"] : undefined}>
		  Home
          </NavLink>
        </li>
        <li className={styles["navigation-item"]}>
          <NavLink to="/spacecrafts" className={({ isActive }) => isActive ? styles["active-link"] : undefined}>
		  Spacecrafts
          </NavLink>
        </li>
        <li className={styles["navigation-item"]}>
          <NavLink to="/planets" className={({ isActive }) => isActive ? styles["active-link"] : undefined}>
		  Planets
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
