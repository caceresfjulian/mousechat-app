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
import LoadingComp from "../loadingPage/LoadingComp";

function MyProfile() {
  //The following information is provided by the context and, at the same time, its updated from this component
  const {
    emailCheck,
    validProfile,
    setValidProfile,
    profileIsOpen,
    setProfileIsOpen,
  } = useContext(AuthContext);

  const [overlay, setOverlay] = useState(false);
  //Toggle the editing window
  const [edit, setEdit] = useState("");
  //Store the name of the property to be edited
  const [newValue, setNewValue] = useState("");
  const [base64, setBase64] = useState("");

  function editOnClick(param) {
    setEdit(param);
    setOverlay(true);
  }

  //Get the profile info
  async function solicitarPerfil() {
    await axios
      .get("https://mousechat-mern.herokuapp.com/myprofile")
      .then((res) => {
        setValidProfile(res.data);
        swal("Updated!", "Check your new info.", "success");
      });
    setBase64(false);
  }

  //Update profile with new bio, username or country
  async function actualizarPerfil(e) {
    e.preventDefault();
    setOverlay(false);
    try {
      //Validating strings
      if (
        (newValue === "" ||
          newValue.trim().length < 3 ||
          newValue.trim().length > 18) &&
        (edit === "username" || edit === "country")
      ) {
        swal("Oops!", "Check the required field.", "warning");
        setNewValue("");
        //Validating string extension
      } else if (
        (newValue === "" ||
          newValue.trim().length < 12 ||
          newValue.trim().length > 100) &&
        edit === "bio"
      ) {
        swal("Oops!", "Check the required field.", "warning");
        setNewValue("");
      } else {
        swal("Loading...", "Wait a moment, please", "info", { button: false });
        const newData = {
          email: emailCheck,
          edit,
          newValue,
        };
        setNewValue("");
        await axios
          .post("https://mousechat-mern.herokuapp.com/myprofile", newData)
          .then(
            setTimeout(() => {
              solicitarPerfil();
            }, 3000)
          )
          .then(
            swal("Loading", "Wait a moment please", "warning", {
              button: false,
            })
          );
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Validate and interprete the uploaded photo
  function photoUpload(file) {
    const reader = new FileReader();
    if (reader !== undefined && file !== undefined) {
      if (file.size > 2000000) {
        swal("Max size 2MB!", "Check the file and try again", "warning");
      } else if (file.type !== "image/png" && file.type !== "image/jpeg") {
        swal("Png/Jpg only", "Check the file and try again", "warning");
      } else {
        reader.onloadend = (e) => {
          setBase64(btoa(e.target.result));
          setEdit("base64");
          setNewValue(btoa(e.target.result));
        };
        reader.readAsBinaryString(file);
      }
    }
  }

  const validProfileHasChanged = useRef(false);

  useEffect(() => {
    //Function to avoid re rendering the component by using the ref
    async function getProfile() {
      const infoProfile = await axios.get(
        "https://mousechat-mern.herokuapp.com/myprofile"
      );
      setValidProfile(infoProfile.data);
    }
    //If there's no valid profile, request it.
    if (!validProfileHasChanged.current) {
      getProfile();
      validProfileHasChanged.current = true;
    }
  }, [validProfile, setValidProfile]);

  // Set a function to ESC key (hide overlay)
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
          <span
            id={profileIsOpen ? "profile-none" : "profile-toggle-description"}
            onClick={() => setProfileIsOpen(!profileIsOpen)}
          >
            My profile
          </span>
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
                  accept=".png, .jpg"
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
    return <LoadingComp />;
  }
}

export default MyProfile;
