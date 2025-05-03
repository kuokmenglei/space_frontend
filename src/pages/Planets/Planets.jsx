import {useState, useEffect, useContext} from "react";

import styles from "./Planets.module.css";
import {LoadingContext} from "../../context/LoadingProvider.jsx";
import SpaceTravelApi from "../../services/SpaceTravelApi.js";

function Planets ()
{
  const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([]);
  const {isLoading, enableLoading, disableLoading} = useContext(LoadingContext);
  const [selectedPlanetId, setSelectedPlanetId] = useState();
  const [selectedSpacecraftId, setSelectedSpacecraftId] = useState();

  async function getPlanetsWithSpacecrafts() {
    try {
      const {data: planets, isError: isErrorPlanets} = await SpaceTravelApi.getPlanets();
      const {data: spacecrafts, isError: isErrorSpacecrafts} = await SpaceTravelApi.getSpacecrafts();

      console.log("PLANETS:", planets);
      console.log("SPACECRAFTS:", spacecrafts);
    
      if (!Array.isArray(planets) || !Array.isArray(spacecrafts)) {
        console.error("Invalid data received");
        return [];
      }

      if (!isErrorPlanets && !isErrorSpacecrafts) {
        console.log(`getPlanetsWithSpacecrafts: ${spacecrafts.length} spacecrafts, ${planets.length} planets`);

        // Filter spacecrafts for each planet based on planetId
        const result = planets.map(planet => {
          const planetSpacecrafts = spacecrafts.filter(spacecraft => spacecraft.planetId === planet.id);
          console.log(`Planet ${planet.name} has ${planetSpacecrafts.length} spacecrafts`);
          return {
            ...planet,
            spacecrafts: planetSpacecrafts
          };
        });

        console.log(`Processed ${result.length} planets with their spacecrafts`);
        return result;
      }
      return [];
    } catch (error) {
      console.error("Error in getPlanetsWithSpacecrafts:", error);
      return [];
    }
  }

  useEffect(() => {
    async function runGetPlanetsWithSpacecrafts() {
      try {
        enableLoading();
        const planetsWithShips = await getPlanetsWithSpacecrafts();
        console.log(">>> Final merged data:", planetsWithShips);
        setPlanetsWithSpacecrafts(planetsWithShips || []);
      } catch (error) {
        console.error("Error in useEffect:", error);
        setPlanetsWithSpacecrafts([]);
      } finally {
        disableLoading();
      }
    }

    runGetPlanetsWithSpacecrafts();
  }, [enableLoading, disableLoading]);

  function handleClickOfPlanet (event, id)
  {
    // todo set the selected planet
    setSelectedPlanetId(id);

    console.log(`handleClickOfPlanet: ${id}`);
  }

  async function handleClickOfSpacecraft (event, spacecraftId, planetId)
  {
    // todo set the selected spacecraft
    // todo send spacecraft to planet using the API
    // todo call getPlanetsWithSpacecrafts to refresh the page content
    setSelectedSpacecraftId(spacecraftId);

    console.log(`Clicked spacecraft with ID: ${spacecraftId}`);

    enableLoading();
    const { isError } = await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, planetId });
    disableLoading();
    if (!isError) {
        await getPlanetsWithSpacecrafts();
    }
  }

  return (
    <>
      {
        planetsWithSpacecrafts.map(
          (planet, index) =>
            <div
              key={index}
              className={styles["planetWithSpacecrafts"]}
            >
              <div
                className={`${styles["planet"]} ${selectedPlanetId === planet.id && styles["planet--selected"]}`}
                onClick={(event) => handleClickOfPlanet(event, planet.id)}
              >
                <div className={styles["planet__imageContainer"]}>
                  <img
                    src={planet.pictureUrl}
                    alt={`The planet ${planet.name}`}
                    className={styles["planet__image"]}
                  />
                </div>

                <div className={styles["planet__info"]}>
                  <div>{planet.name}</div>
                  <div>{planet.currentPopulation}</div>
                </div>
              </div>

              <div className={styles["planet__spacecrafts"]}>
                {
                  planet.spacecrafts.map((spacecraft, index) =>
                                           <div
                                             key={index}
                                             className={`${styles["planet__spacecraft"]} ${selectedSpacecraftId === spacecraft.id && styles["planet__spacecraft--selected"]}`}
                                             onClick={(event) => handleClickOfSpacecraft(event, spacecraft.id, planet.id)}
                                           >
                                             <div className={styles["planet__spacecraft__imageContainer"]}>
                                               {
                                                 spacecraft.pictureUrl
                                                 ?
                                                 <img
                                                   src={spacecraft.pictureUrl}
                                                   alt={`The spacecraft ${spacecraft.name}`}
                                                   className={styles["planet__spacecraft__image"]}
                                                 />
                                                 :
                                                 <span className={styles["planet__spacecraft__image--default"]}>🚀</span>
                                               }

                                             </div>
                                             <div className={"planet__spacecraft__info"}>
                                               <div>{spacecraft.name}</div>
                                               <div>{spacecraft.capacity}</div>
                                             </div>
                                           </div>
                  )
                }
              </div>
            </div>
        )
      }
    </>
  );
}

export default Planets;