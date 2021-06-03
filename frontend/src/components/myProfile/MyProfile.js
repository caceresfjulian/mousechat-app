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
              <p>
                {validProfile.bio === ""
                  ? `No biography provided`
                  : validProfile.bio}
              </p>
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
    return (
      <div id="loading-page">
        <svg
          version="1.1"
          id="L7"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 100 100"
        >
          <path
            fill="#fff"
            d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
  c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="2s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
          <path
            fill="#fff"
            d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
  c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="-360 50 50"
              repeatCount="indefinite"
            />
          </path>
          <path
            fill="#fff"
            d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
  L82,35.7z"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="2s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <h1>Loading</h1>
      </div>
    );
  }
}

export default MyProfile;
