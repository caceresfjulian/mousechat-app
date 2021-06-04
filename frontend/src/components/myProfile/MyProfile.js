import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import moment from "moment";
import "./MyProfile.css";
import { Icon } from "@iconify/react";
import okIcon from "@iconify/icons-el/ok";
import userAvatarFilled from "@iconify/icons-carbon/user-avatar-filled";
import flagIcon from "@iconify/icons-akar-icons/flag";
import closeFilled from "@iconify/icons-carbon/close-filled";
import swal from "sweetalert";
import LoadingPage from "../loadingPage/LoadingPage";

// La información debe ser solicitada al backend.

function MyProfile() {
  // Guardamos en en contexto el perfil que ha sido validado.
  const {
    emailCheck,
    validProfile,
    setValidProfile,
    profileIsOpen,
    setProfileIsOpen,
  } = useContext(AuthContext);

  const [overlay, setOverlay] = useState(false);
  //Muestra u oculta la ventana de edición
  const [edit, setEdit] = useState("");
  //Almacena el NOMBRE de la propiedad a editar, el cual es pasado al componente ventana de edición
  const [newValue, setNewValue] = useState("");
  const [base64, setBase64] = useState("");

  const editOnClick = (param) => {
    setEdit(param);
    setOverlay(true);
  };

  async function solicitarPerfil() {
    const infoProfile = await axios.get("http://localhost:4000/myprofile");
    setValidProfile(infoProfile.data);
    setBase64("");
  }

  async function actualizarPerfil(e) {
    e.preventDefault();
    try {
      if (
        (newValue === "" ||
          newValue.trim().length < 3 ||
          newValue.trim().length > 12) &&
        (edit === "username" || edit === "country")
      ) {
        swal("Oops!", "Check the required field.", "warning");
      } else if (
        (newValue === "" ||
          newValue.trim().length < 12 ||
          newValue.trim().length > 100) &&
        edit === "bio"
      ) {
        swal("Oops!", "Check the required field.", "warning");
      } else {
        const newData = {
          email: emailCheck,
          edit,
          newValue,
        };
        await axios.post("http://localhost:4000/myprofile", newData);
        solicitarPerfil();
        swal("Updated", "Your profile was updated!", "success");
        setOverlay(false);
        setNewValue("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function photoUpload(file) {
    const reader = new FileReader();
    if (reader !== undefined && file !== undefined) {
      if (file.size > 2097152) {
        alert("Verifique el archivo e intente de nuevo.");
      } else if (file.type !== "image/png") {
        alert("Verifique la extensión del archivo e intente de nuevo.");
      } else {
        reader.onloadend = (e) => {
          setBase64(btoa(e.target.result));
          setEdit("base64");
          setNewValue(btoa(e.target.result));
        };
        reader.readAsBinaryString(file);
        // Esta línea es muy importante. Sin ella, no se actualizan los estados
      }
    }
  }

  const validProfileHasChanged = useRef(false);

  useEffect(() => {
    // Creamos esta función asíncrona para poder hacer uso de la referencia y evitar que corra
    // la solicitud del código al cerrar sesión
    async function getProfile() {
      // Si no hay perfil validado, solicitarlo. Si lo hay, no hacer nada.
      const infoProfile = await axios.get("http://localhost:4000/myprofile");
      setValidProfile(infoProfile.data);
    }
    if (!validProfileHasChanged.current) {
      getProfile();
      validProfileHasChanged.current = true;
    }
  }, [validProfile, setValidProfile]);

  // Al oprimir esc, ocultar el overlay
  const escFunction = useCallback((e) => {
    if (e.keyCode === 27) {
      setOverlay(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  if (validProfile !== "") {
    return (
      <>
        <div
          id="profile-container"
          className={profileIsOpen ? "" : "profile-responsive"}
        >
          <Icon
            icon={userAvatarFilled}
            id={profileIsOpen ? "profile-none" : "profile-toggle"}
            onClick={() => setProfileIsOpen(!profileIsOpen)}
          />
          <Icon
            icon={closeFilled}
            id={profileIsOpen ? "profile-toggle" : "profile-none"}
            onClick={() => setProfileIsOpen(!profileIsOpen)}
          />
          <div id={profileIsOpen ? "profile-general" : ""}>
            <div id="profile-top">
              <img
                id="profile-img"
                src={
                  base64
                    ? `data:image/png;base64,` + base64
                    : `data:image/png;base64,` + validProfile.base64
                }
                alt="Perfil"
              />
              <label id="profile-update-pic">
                Edit
                <input
                  className="register-upload-image"
                  type="file"
                  accept=".png"
                  onChange={(e) => photoUpload(e.target.files[0])}
                />
              </label>
              <h3 style={{ color: "#D8D8D8" }}>{validProfile.email}</h3>
            </div>
            <label
              className="verify-update"
              style={base64 ? { display: "flex" } : { display: "none" }}
              onClick={(e) => actualizarPerfil(e)}
            >
              <Icon
                icon={okIcon}
                style={{ color: "#009A06", fontSize: "25px" }}
              />
              Update
            </label>
            <div id="profile-bottom">
              <div className="profile-item">
                <div className="profile-item-left">
                  <Icon
                    icon={userAvatarFilled}
                    style={{ color: "#636363", fontSize: "25px" }}
                  />
                  <p>{validProfile.username}</p>
                </div>
                <span onClick={(e) => editOnClick("username")}>Edit</span>
              </div>
              <div className="profile-item">
                <div className="profile-item-left">
                  <Icon
                    icon={flagIcon}
                    style={{
                      color: "#636363",
                      fontSize: "25px",
                    }}
                  />
                  <p>
                    {validProfile.country === ""
                      ? `None`
                      : validProfile.country}
                  </p>
                </div>
                <span onClick={(e) => editOnClick("country")}>Edit</span>
              </div>
              <div className="profile-item">
                <h3>Biography:</h3>
                <span onClick={(e) => editOnClick("bio")}>Edit</span>
              </div>
              <div id="bio-box">
                <p>
                  {validProfile.bio === ""
                    ? `No biography provided`
                    : validProfile.bio}
                </p>
              </div>
            </div>
          </div>
          <div id="profile-created">
            <p>
              {`Created: ` + moment(validProfile.created).format("MM/DD/YYYY")}
            </p>
          </div>
        </div>
        <div
          id="edit-overlay"
          style={{ display: overlay ? "block" : "none" }}
          onClick={() => setOverlay(false)}
        ></div>
        <div id={overlay ? "edit-container" : ""}>
          <div id="edit-box" style={{ display: overlay ? "block" : "none" }}>
            <Icon
              icon={closeFilled}
              style={{ color: "#a0a0a0", fontSize: "25px" }}
              onClick={() => setOverlay(false)}
            />
            <div id="edit-box-input">
              <h2 style={{ alignSelf: "center" }}>Edit {edit}</h2>
              <div
                style={{
                  margin: "15px 0 0 0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  value={newValue}
                  id={edit === "bio" ? "bio-input" : null}
                  type="text"
                  placeholder={`Type new ${edit}`}
                  onChange={(e) => setNewValue(e.target.value)}
                />
                <button onClick={(e) => actualizarPerfil(e)}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <LoadingPage />;
  }
}

export default MyProfile;
