import {useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import styles from "./Spacecrafts.module.css";
import {LoadingContext} from "../../context/LoadingProvider.jsx";
import SpaceTravelApi from "../../services/SpaceTravelApi.js";

function Spacecrafts ()
{
  const [spacecrafts, setSpacecrafts] = useState([]);
  const {enableLoading, disableLoading} = useContext(LoadingContext);

  async function getSpacecrafts ()
  {
    // todo get spacecrafts using the API
    try {
      const response = await SpaceTravelApi.getSpacecrafts();
      if (!response.isError) {
        setSpacecrafts(response.data);
      } else {
        console.error("error:", response.data);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }

  useEffect(() =>
            {
              async function runGetSpacecrafts ()
              {
                enableLoading();
                await getSpacecrafts();
                disableLoading();
              }

              runGetSpacecrafts();
            },
            [enableLoading, disableLoading]
  );

  const navigate = useNavigate();

  function handleClickOfBuild ()
  {
    // todo navigate to build spacecraft page
    navigate("/spacecrafts/build");
  }

  function handleClickOfImageContainer (event, spacecraft)
  {
    event.stopPropagation();

    console.log(`handleClickOfImageContainer: ${spacecraft.id}`);
    navigate(`/spacecraft/${spacecraft.id}?name=${encodeURIComponent(spacecraft.name)}&capacity=${encodeURIComponent(spacecraft.capacity)}&description=${encodeURIComponent(spacecraft.description)}&pictureUrl=${encodeURIComponent(spacecraft.pictureUrl)}`);
  }

  async function handleClickOfDestroy (event, id)
  {
    enableLoading();
    const {isError} = await SpaceTravelApi.destroySpacecraftById({id});
    if (!isError)
    {
      await getSpacecrafts();
    }
    disableLoading();
  }

  return (
    <div>
      <button onClick={handleClickOfBuild}>
        🏗 Build a Spacecraft
      </button>
      <div>
        {
          spacecrafts.map(
            (spacecraft, index) =>
              <div
                key={spacecraft.id}
                className={styles["spacecraft"]}
              >
                <div
                  className={styles["spacecraft__imageContainer"]}
                  onClick={(event) => handleClickOfImageContainer(event, spacecraft)}
                >
                  {
                    spacecraft.pictureUrl
                    ?
                    <img
                      src={spacecraft.pictureUrl}
                      alt={`The spacecraft ${spacecraft.name}`}
                      className={styles["spacecraft__image"]}
                    />
                    :
                    <span className={styles["spacecraft__image--default"]}>🚀</span>
                  }
                </div>

                <div className={styles["spacecraft__infoContainer"]}>
                  <div className={styles["spacecraft__info"]}>
                    <span>Name:</span>
                    <span>{spacecraft.name}</span>
                  </div>

                  <div className={styles["spacecraft__info"]}>
                    <span>Capacity:</span>
                    <span>{spacecraft.capacity}</span>
                  </div>
                </div>

                <div>
                  <button onClick={(event) => handleClickOfDestroy(event, spacecraft.id)}>💥 Destroy</button>
                </div>
              </div>
          )
        }
      </div>
    </div>
  );
}

export default Spacecrafts;
