import {useState, useContext} from "react";
import {useNavigate,useSearchParams } from "react-router-dom";

import styles from "./Spacecraft.module.css";
import {LoadingContext} from "../../context/LoadingProvider.jsx";
import SpaceTravelApi from "../../services/SpaceTravelApi.js";

/**
 * Component for building a new spacecraft.
 * Renders a form to input spacecraft details including name, capacity,
 * description and picture URL. Handles form submission and navigation.
 * 
 * @component
 * @returns {JSX.Element} A form interface for spacecraft creation
 */
function SpacecraftBuild ()
{
  const INITIAL_SPACECRAFT = {
    name: "",
    capacity: "",
    description: "",
    pictureUrl: ""
  };
  const [spacecraft, setSpacecraft] = useState(INITIAL_SPACECRAFT);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const {enableLoading, disableLoading} = useContext(LoadingContext);

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const capacity = searchParams.get('capacity');
  const description = searchParams.get('description');
  const pictureUrl = searchParams.get('pictureUrl');


  function handleChangeOfFormInput (event)
  {
    console.log(`handleChangeOfFormInput: ${event}`);
    // todo update form state
    const { name, value } = event.target;
    setSpacecraft(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmitOfForm (event)
  {
    console.log(`handleSubmitOfForm: ${event}`);
    // todo submit the form using the API
    event.preventDefault();
    enableLoading();
    const { isError } = await SpaceTravelApi.buildSpacecraft(spacecraft);
    disableLoading();
    if (!isError) {
        navigate('/spacecrafts');
    }
  }

  function handleClickOfBack (event)
  {
    // todo navigate back
    navigate(-1);
  }

  return (
    <>
      <button
        className={styles["button__back"]}
        onClick={handleClickOfBack}
      >
        Back 👈
      </button>
      <div>
        <form onSubmit={handleSubmitOfForm}>
          <div className={styles["form"]}>
            <div className={styles["form__inputs"]}>
              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="capacity"
                  placeholder="Capacity"
                  value={capacity}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={handleChangeOfFormInput}
                />
              </div>

              <div className={styles["form__inputContainer"]}>
                <input
                  type="text"
                  name="pictureUrl"
                  placeholder="Picture URL"
                  value={pictureUrl}
                  onChange={handleChangeOfFormInput}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles["submitContainer"]}>
              <div className={styles["errorContainer"]}>
                {
                  errors.map((error, index) => <div
                    key={index}
                    className={styles["error"]}
                  >{error}</div>)
                }
              </div>

              <div className={styles["button__submit"]}>
                <button
                  type="submit"
                  onClick={handleSubmitOfForm}
                >
                  Build 🏗️
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SpacecraftBuild;
