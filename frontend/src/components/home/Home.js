import React from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import "./Home.css";
import mockup from "./web_mockup_compressed.webp";
import profile from "./profile.jpeg";
import mern from "./MERN-logo.png";
import figma from "./figma_logo.png";
import socket from "./socketio.png";

function Home() {
  return (
    <>
      <div id="home">
        <div id="home-main-screen">
          <div id="left-box">
            <div>
              <Flip bottom duration={1000} delay={500}>
                <h1 style={{ fontWeight: 1, margin: 0 }}>
                  Send, receive messages, edit your profile and more!
                </h1>
              </Flip>
              <div style={{ display: "flex", marginBottom: 15 }}>
                <div>
                  <p>Available for:</p>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 61 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M0.000671387 29.024V28.9392C0.764462 19.0947 4.32882 11.7114 10.524 7.04383C16.6343 2.29135 23.2539 -2.16383e-05 30.4674 -2.16383e-05C38.0205 -0.0848873 45.0643 2.46108 51.3444 7.55302C57.7093 12.5601 60.8493 20.0283 60.8493 29.7029V30.297C60.8493 40.0566 57.7093 47.355 51.3444 52.3621C44.9795 57.454 37.9356 60 30.3826 60H30.0431C22.6598 59.9151 15.8705 57.3691 9.59049 52.2772C3.31043 47.2701 0.085537 39.5474 0.000671387 29.024ZM28.6004 15.7001V2.29135H26.5636C26.1393 2.80054 25.7998 3.3946 25.4604 3.9038C25.1209 4.41299 24.7814 4.92218 24.442 5.51624C24.1025 6.02544 23.6782 6.70436 23.4236 7.21356C23.0841 7.72275 22.8295 8.23195 22.5749 8.826C22.0657 9.67466 21.6414 10.5233 21.3019 11.2871C20.8776 12.0509 20.5382 12.8147 20.2836 13.4936C20.7928 13.8331 21.3868 14.2574 22.0657 14.512C22.8295 14.7666 23.5933 15.0212 24.3571 15.1909C25.2058 15.3607 25.9696 15.4455 26.6485 15.5304C27.4123 15.6153 28.0912 15.7001 28.6004 15.7001ZM32.1647 2.29135V15.6153C32.5891 15.6153 33.0983 15.7001 33.6075 15.6153C34.1167 15.6153 34.7107 15.5304 35.2199 15.4455C36.1534 15.2758 37.2567 15.0212 38.1053 14.7666C39.0389 14.4271 39.8875 14.0028 40.4816 13.4936C39.4632 11.0325 38.3599 9.0806 37.2567 7.21356C36.1534 5.34651 34.8804 3.73407 33.5226 2.37622V2.29135H32.1647ZM22.9993 3.05514V2.97028C22.4052 3.22487 21.8111 3.6492 21.1322 3.9038C20.5382 4.15839 19.7744 4.49786 19.1803 4.83732C17.9922 5.43138 16.8041 6.1103 15.6159 6.87409C14.5127 7.63789 13.4094 8.48654 12.4759 9.3352C12.8154 9.67466 13.2397 10.0141 13.5792 10.2687C13.9186 10.5233 14.343 10.8628 14.7673 11.2022C15.1068 11.372 15.5311 11.6266 15.9554 11.966C16.3797 12.2206 16.8889 12.5601 17.3981 12.8996C18.0771 11.372 18.756 9.75953 19.6046 8.31681C20.4533 6.78923 21.3868 5.34651 22.3203 4.07353C22.4052 3.9038 22.4901 3.73407 22.6598 3.56433C22.7447 3.47947 22.8295 3.22487 22.9993 3.05514ZM48.9681 9.3352V9.25033C46.8465 7.63789 44.9795 6.28004 43.1124 5.43138C41.2454 4.58272 39.3783 3.73407 37.681 3.05514C39.0389 4.41299 40.227 6.1103 40.9908 7.72275C41.8394 9.42006 42.6881 11.2022 43.367 12.8996C43.7065 12.7298 44.1308 12.5601 44.64 12.2206C45.0643 11.966 45.6584 11.7114 46.1676 11.4568C46.6768 11.1174 47.1011 10.7779 47.6103 10.4385C48.1195 10.0141 48.6287 9.67466 48.9681 9.3352ZM47.5254 28.2602H57.285C57.285 25.1202 56.606 22.1499 55.3331 19.0947C54.1449 16.1244 52.4476 13.6633 50.326 11.5417V11.4568C49.9017 12.1358 49.3076 12.7298 48.7135 13.1542C48.0346 13.5785 47.4406 13.9179 46.7616 14.2574C46.3373 14.512 45.913 14.8515 45.4886 15.0212C45.0643 15.2758 44.4703 15.4455 44.0459 15.7001C44.3854 16.379 44.7249 17.1428 45.0643 17.8218C45.3189 18.5856 45.7432 19.4342 45.913 20.198C46.4222 21.5558 46.7616 22.9986 47.1011 24.4413C47.3557 25.7143 47.5254 27.0721 47.5254 28.2602ZM16.8041 15.7001V15.6153C16.1251 15.2758 15.3614 15.0212 14.7673 14.6817C14.1732 14.2574 13.5792 13.8331 13.07 13.4936C12.5608 13.239 12.0516 12.8996 11.6273 12.5601C11.2029 12.2206 10.8635 11.8812 10.524 11.5417C8.3175 13.6633 6.70506 16.0396 5.68667 18.8401C4.58342 21.6407 3.81962 24.7807 3.48016 28.1754H13.9186C13.9186 25.7991 14.2581 23.5078 14.8522 21.2164C15.3614 18.8401 16.1251 17.058 16.8041 15.7001ZM28.6004 28.1754V18.4158C27.9215 18.5007 27.0728 18.5007 26.309 18.4158C25.4604 18.331 24.6117 18.0764 23.8479 17.8218C23.169 17.652 22.3203 17.4823 21.6414 17.2277C20.8776 17.058 20.1138 16.7185 19.5198 16.379C19.0106 17.2277 18.5862 18.2461 18.2468 19.3493C17.8225 20.3677 17.5679 21.471 17.3133 22.4894C17.1435 23.5078 17.0587 24.611 16.9738 25.5445C16.8889 26.4781 16.8041 27.4116 16.8041 28.1754H28.6004ZM32.1647 18.5856V28.1754H44.7249C44.7249 27.6662 44.7249 27.0721 44.64 26.3932C44.4703 25.7991 44.3854 25.0353 44.3005 24.3564C44.0459 23.338 43.7913 22.2348 43.4519 21.2164C43.1124 20.2829 42.7729 19.3493 42.3486 18.5856C42.1789 18.1612 42.0092 17.652 41.8394 17.3126C41.5848 16.8882 41.3302 16.6336 41.1605 16.379C40.227 17.058 38.954 17.4823 37.4264 17.8218C35.9837 18.1612 34.2864 18.5007 32.7588 18.5856H32.1647ZM13.9186 30.9759H3.48016C3.48016 32.4186 3.73476 34.0311 4.15909 35.983C4.58342 38.0198 5.43207 39.8868 6.36559 41.9236C6.78992 42.942 7.29912 43.9604 7.80831 44.9788C8.40237 45.9123 9.08129 46.9307 9.76022 47.8642C10.2694 47.5247 10.7786 47.2701 11.2029 47.0155C11.7121 46.7609 12.3062 46.4215 12.8154 46.1669C13.4094 45.9123 14.0035 45.6577 14.6824 45.3182C15.2765 45.0636 16.0403 44.7242 16.8041 44.3847C16.1251 42.2631 15.3614 40.2263 14.8522 37.9349C14.2581 35.7284 13.9186 33.5219 13.9186 31.0608V30.9759ZM28.6004 40.9052V30.9759H16.8041C16.8041 31.6549 16.8889 32.6732 17.0587 33.6916C17.1435 34.71 17.3981 35.8133 17.5679 36.9165C17.9073 38.1046 18.1619 39.2928 18.5014 40.3112C18.8408 41.3295 19.1803 42.1782 19.5198 42.942C21.0473 42.3479 22.5749 41.9236 23.5933 41.669C24.6966 41.3295 25.715 41.0749 26.7333 40.9901H27.6669C28.0063 40.9052 28.3458 40.9052 28.6004 40.9052ZM32.1647 30.9759V40.8203C32.7588 40.9052 33.4377 40.9901 34.1167 41.0749C34.8804 41.1598 35.814 41.3295 36.5778 41.4993L37.8507 41.7539C38.2751 41.9236 38.7843 42.0085 39.2086 42.0933C39.7178 42.2631 40.227 42.3479 40.7362 42.5177C41.1605 42.6874 41.5848 42.7723 41.9243 42.942C43.0275 40.1414 43.7065 37.85 44.1308 35.8981C44.5551 34.0311 44.7249 32.4186 44.7249 31.0608V30.9759H32.1647ZM57.285 31.0608V30.9759H47.5254V31.4851C47.4406 33.0976 47.186 34.9646 46.8465 36.9165C46.507 38.7836 45.7432 40.9901 44.7249 43.7058C46.0827 44.3847 47.3557 45.0636 48.3741 45.7425C49.3925 46.4215 50.326 47.1853 51.0049 47.8642C52.4476 46.4215 53.7206 44.4696 54.8239 41.9236C55.9271 39.4625 56.6909 36.9165 57.1152 34.2008C57.2001 33.6916 57.2001 33.1824 57.285 32.6732V31.0608ZM28.6004 56.8599V43.6209C26.4787 43.9604 24.6966 44.3847 23.3387 44.7242C21.9809 45.0636 20.9625 45.4031 20.2836 45.7425C20.7928 47.0155 21.3019 48.1188 21.8111 49.1372C22.3203 50.0707 22.9144 51.0891 23.4236 51.9377C23.5933 52.2772 23.9328 52.6167 24.1874 53.041C24.442 53.3805 24.6117 53.8048 24.8663 54.1442C25.1209 54.5686 25.3755 55.0778 25.6301 55.587C25.9696 56.0113 26.2242 56.5205 26.5636 56.8599H28.6004ZM32.1647 56.8599H34.1167C34.8804 56.2659 35.6442 55.4172 36.2383 54.4837C36.9172 53.5502 37.681 52.4469 38.1902 51.5134C38.7843 50.4102 39.3783 49.3918 39.8875 48.3734C40.3967 47.355 40.821 46.4215 41.1605 45.7425C40.227 45.4031 38.954 45.0636 37.681 44.7242C36.408 44.3847 34.6258 44.0452 32.1647 43.7058V56.8599ZM48.9681 49.901V49.8161C48.7984 49.5615 48.4589 49.222 48.2043 48.9674C47.9498 48.7128 47.5254 48.3734 47.1011 48.1188C46.7616 47.8642 46.3373 47.6096 45.8281 47.355C45.3189 47.1004 44.64 46.7609 44.0459 46.4215C43.7065 47.1004 43.1124 48.2885 42.2638 49.901C41.5 51.5134 40.1421 53.4653 38.4448 55.587C40.5664 55.2475 42.4335 54.4837 44.1308 53.4653C45.9978 52.5318 47.6103 51.2588 48.9681 49.901ZM17.3981 47.1853V47.1004C16.8041 47.4399 15.8705 47.8642 14.937 48.2885C13.9186 48.7128 12.8154 49.222 11.797 49.901C12.3911 50.4102 12.9851 50.9194 13.4943 51.2588C14.0035 51.6831 14.5976 52.0226 15.1068 52.3621C16.0403 52.9561 17.1435 53.5502 18.2468 54.0594C19.35 54.5686 20.7079 55.0778 22.4052 55.587C21.8111 54.908 21.3868 54.0594 20.9625 53.3805C20.5382 52.7015 20.029 52.0226 19.6046 51.3437C19.1803 50.6648 18.8408 49.901 18.5014 49.222C18.0771 48.5431 17.7376 47.8642 17.3981 47.1853Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="60.85" height="60" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 52 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginLeft: "15%" }}
                  >
                    <path
                      d="M15.6258 0.170979C15.3337 0.17286 15.0466 0.247464 14.7906 0.388055C13.9498 0.854102 13.6414 1.9343 14.1072 2.7745L16.0055 6.20227C11.432 9.03184 8.40146 13.8653 8.40146 19.3819V20.4069C7.52298 19.3963 6.23189 18.7582 4.7893 18.7582C2.14611 18.7582 6.10352e-05 20.9043 6.10352e-05 23.5473V38.2999C6.10352e-05 40.9427 2.14631 43.0889 4.7893 43.0889C6.23189 43.0889 7.52298 42.4506 8.40126 41.44V43.5065C8.40126 46.2926 10.6811 48.5722 13.4672 48.5722H14.7525V55.135C14.7525 57.7782 16.8987 59.9242 19.5417 59.9242C22.1847 59.9242 24.3308 57.778 24.3308 55.135V48.5722H26.5545V55.135C26.5545 57.7782 28.7008 59.9242 31.3438 59.9242C33.9868 59.9242 36.1328 57.778 36.1328 55.135V48.5722H37.4183C40.2042 48.5722 42.484 46.2926 42.484 43.5065V41.44C43.3623 42.4506 44.6536 43.0889 46.0962 43.0889C48.7392 43.0889 50.8852 40.9427 50.8852 38.2999V23.5473C50.8852 20.9043 48.7392 18.7582 46.0962 18.7582C44.6536 18.7582 43.3623 19.3963 42.484 20.4069V19.5554V19.5065C42.4844 19.4547 42.484 19.4132 42.484 19.3819C42.484 13.8663 39.4466 9.03762 34.8746 6.20786L36.7783 2.7745C37.2439 1.9343 36.9357 0.854102 36.0949 0.388055C35.8389 0.247464 35.5518 0.17286 35.2597 0.170979C34.6388 0.164999 34.0294 0.492308 33.7085 1.07138L31.7179 4.66739C29.7716 3.94919 27.6539 3.5555 25.4429 3.5555C23.2338 3.5555 21.1121 3.945 19.1674 4.66181L17.177 1.07138C16.8559 0.492308 16.2467 0.165398 15.6258 0.170979Z"
                      fill="white"
                    />
                    <path
                      d="M4.78927 20.0057C2.81705 20.0057 1.24768 21.5751 1.24768 23.5473V38.3C1.24768 40.2722 2.81705 41.8416 4.78927 41.8416C6.7615 41.8416 8.33107 40.2722 8.33107 38.3V23.5473C8.33107 21.5751 6.7615 20.0057 4.78927 20.0057ZM46.0964 20.0057C44.124 20.0057 42.5546 21.5751 42.5546 23.5473V38.3C42.5546 40.2722 44.124 41.8416 46.0964 41.8416C48.0686 41.8416 49.638 40.2722 49.638 38.3V23.5473C49.638 21.5751 48.0686 20.0057 46.0964 20.0057Z"
                      fill="#A4C639"
                    />
                    <path
                      d="M19.5417 36.8408C17.5695 36.8408 15.9999 38.4102 15.9999 40.3826V55.135C15.9999 57.1073 17.5695 58.6766 19.5417 58.6766C21.514 58.6766 23.0833 57.1073 23.0833 55.135V40.3826C23.0833 38.4102 21.514 36.8408 19.5417 36.8408ZM31.3438 36.8408C29.3714 36.8408 27.802 38.4102 27.802 40.3826V55.135C27.802 57.1073 29.3714 58.6766 31.3438 58.6766C33.316 58.6766 34.8854 57.1073 34.8854 55.135V40.3826C34.8854 38.4102 33.316 36.8408 31.3438 36.8408Z"
                      fill="#A4C639"
                    />
                    <path
                      d="M15.6365 1.41865C15.5527 1.41966 15.4706 1.44202 15.3979 1.48363C15.1454 1.62357 15.0624 1.9138 15.2026 2.16695L17.6976 6.67413C12.8976 9.17181 9.65525 13.9182 9.64887 19.3656H41.2366C41.23 13.9182 37.9878 9.17161 33.1878 6.67413L35.6827 2.16715C35.823 1.914 35.7399 1.62357 35.4873 1.48363C35.4146 1.442 35.3325 1.41963 35.2487 1.41865C35.0693 1.41666 34.8997 1.50636 34.804 1.67898L32.2764 6.2348C30.2089 5.31785 27.8899 4.80297 25.4426 4.80297C22.9954 4.80297 20.6765 5.31765 18.6088 6.2348L16.0812 1.67898C16.0381 1.59901 15.9739 1.53243 15.8955 1.48652C15.8171 1.4406 15.7276 1.41712 15.6367 1.41865H15.6365ZM9.64887 20.6131V43.5068C9.6478 44.0085 9.74582 44.5055 9.93733 44.9692C10.1288 45.4329 10.4101 45.8543 10.7648 46.209C11.1196 46.5638 11.541 46.845 12.0047 47.0364C12.4684 47.2279 12.9654 47.3259 13.4671 47.3248H37.4183C37.92 47.3259 38.4171 47.2279 38.8808 47.0364C39.3446 46.8449 39.7659 46.5637 40.1207 46.2089C40.4755 45.8542 40.7567 45.4328 40.9482 44.9691C41.1397 44.5053 41.2377 44.0083 41.2366 43.5066V20.6133H9.64887V20.6131Z"
                      fill="#A4C639"
                    />
                    <path
                      d="M18.1532 10.9481C17.4322 10.9481 16.8351 11.5449 16.8351 12.2659C16.8351 12.9871 17.4322 13.5839 18.1532 13.5839C18.8743 13.5839 19.4712 12.9871 19.4712 12.2659C19.4712 11.5449 18.8743 10.9481 18.1532 10.9481ZM32.7322 10.9481C32.011 10.9481 31.4141 11.5449 31.4141 12.2659C31.4141 12.9871 32.011 13.5839 32.7322 13.5839C33.4531 13.5839 34.0502 12.9871 34.0502 12.2659C34.0502 11.5449 33.4531 10.9481 32.7322 10.9481Z"
                      fill="white"
                    />
                  </svg>
                  <p style={{ margin: "0 0 15px 0", fontSize: "0.8rem" }}>
                    *Android, desktop and mobile web.
                  </p>
                </div>
              </div>
              <Link className="home-button" to="/login">
                Start Chatting
              </Link>
            </div>
          </div>
          <div id="right-box">
            <img
              src={mockup}
              style={{ width: "100%", overflow: "hidden" }}
              alt="preview"
            />
          </div>
        </div>
        <Fade>
          <div id="tech">
            <div id="tech-left">
              <h2 style={{ fontWeight: 1, marginBottom: 0 }}>
                About the project
              </h2>
              <p>
                MouseChat was developed in 2021 as part of my MERN web dev
                portfolio, using several tools as Figma for the UI, Socket.io
                for the connection between users, Abode Illustrator and Adobe
                Photoshop for the visual identity, besides Javascript as the
                main coding language.{" "}
              </p>
            </div>
            <div id="tech-center">
              <div
                style={{
                  backgroundColor: "#BC1414",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "18px",
                  borderRadius: "20px",
                  flexDirection: "column",
                  boxShadow: "5px 6px 10px 0px rgba(0,0,0,0.8)",
                  margin: "15px ",
                }}
              >
                <img
                  src={profile}
                  style={{ borderRadius: "50%", border: "5px solid #fff" }}
                  alt="profile"
                  width="70%"
                />
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "0 8px",
                    marginTop: "10px",
                    minWidth: "150px",
                    borderRadius: 15,
                  }}
                >
                  <p style={{ margin: "5px 0", textAlign: "center" }}>
                    Julian Caceres Florez <br />
                    <span style={{ color: "#565656" }}>
                      {" "}
                      Web dev, journalist{" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div id="tech-right">
              <h2 style={{ fontWeight: 1 }}>Technologies</h2>
              <img
                src={mern}
                alt="MERN stack. MongoDB, ExpressJS, ReactJS, NodeJS"
                id="tech-1"
              />
              <div>
                <img src={figma} alt="Figma" width="30%" />
                <img src={socket} alt="Socket.io" width="30%" />
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
}

export default Home;
