import {useState, useEffect, useContext} from "react";

import styles from "./Home.module.css";
import SpaceTravelApi from "../../services/SpaceTravelApi.js";

function Home ()
{
	const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs when the component is mounted
    const fetchedLogs = SpaceTravelApi.getLogsFromLocalStorage();
    setLogs(fetchedLogs);
  }, []);

	return (
		<div className={styles["home"]}>
			 
		</div>
	);
}

export default Home;
