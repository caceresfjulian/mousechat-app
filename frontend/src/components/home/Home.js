import React from 'react'
import profile from './profile.jpeg';
import mern from './MERN-logo.png';
import figma from './figma_logo.png';
import socket from './socketio.png';

function Home() {
    return (
        <>
            <div className="container">
                <div className="main-screen">
                    <div style={{ margin: '50px 60px 0 0' }}>
                        <div style={{ width: '300px' }}>
                            <h1 style={{ fontWeight: 1 }}>“If you’re looking for a front end web dev, check me out!”</h1>
                            <div style={{ display: 'flex', marginTop: 30, marginBottom: 50 }}>
                                <img src={profile} alt="Dev" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: "50%" }} />
                                <div style={{ marginLeft: 25 }}>
                                    <p style={{ margin: 0, padding: 0 }}>Julian Caceres Florez</p>
                                    <p style={{ color: '#828282', margin: 0, padding: '5px 0 0 0' }}>Web dev, journalist</p>
                                </div>
                            </div>
                            <a className="nav-button" href="/Login">Start Chatting</a>
                            <a style={{ fontSize: '0.8em', display: 'block', marginTop: 20 }} href="/">+About this project</a>
                        </div>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="500" height="511" viewBox="0 0 737 511" fill="none">
                            <g>
                                <path d="M544.651 510.845C562.542 510.845 577.046 509.35 577.046 507.507C577.046 505.663 562.542 504.169 544.651 504.169C526.76 504.169 512.257 505.663 512.257 507.507C512.257 509.35 526.76 510.845 544.651 510.845Z" fill="#268200"></path>
                                <path d="M640.515 510.845C658.406 510.845 672.91 509.35 672.91 507.507C672.91 505.663 658.406 504.169 640.515 504.169C622.624 504.169 608.12 505.663 608.12 507.507C608.12 509.35 622.624 510.845 640.515 510.845Z" fill="#268200"></path>
                                <path d="M714.782 509.836C727.096 509.836 737.078 508.793 737.078 507.507C737.078 506.221 727.096 505.178 714.782 505.178C702.468 505.178 692.486 506.221 692.486 507.507C692.486 508.793 702.468 509.836 714.782 509.836Z" fill="#268200"></path>
                                <path d="M721.152 489.498C720.997 495.242 720.065 500.986 718.278 506.498C718.2 506.653 718.2 506.731 718.122 506.886H707.402C707.402 506.808 707.402 506.653 707.402 506.498C708.101 498.27 712.218 448.202 707.324 439.663C707.79 440.362 721.929 463.339 721.152 489.498Z" fill="#268200"></path>
                                <path d="M720.298 506.498C720.22 506.653 720.142 506.731 719.987 506.886H711.908C711.985 506.808 712.063 506.653 712.141 506.498C713.461 504.091 717.423 496.95 721.075 489.498C725.036 481.503 728.61 473.197 728.299 470.17C728.455 470.868 731.174 491.516 720.298 506.498Z" fill="#268200"></path>
                                <path d="M495.243 322.839H5.90408C2.6413 322.839 0 320.2 0 316.94V5.89944C0 2.63922 2.6413 0 5.90408 0H495.243C498.506 0 501.148 2.63922 501.148 5.89944V316.94C501.148 320.2 498.506 322.839 495.243 322.839ZM5.90408 2.32873C3.96195 2.32873 2.33056 3.95883 2.33056 5.89944V316.94C2.33056 318.88 3.96195 320.51 5.90408 320.51H495.243C497.186 320.51 498.817 318.88 498.817 316.94V5.89944C498.817 3.95883 497.186 2.32873 495.243 2.32873H5.90408Z" fill="#424242"></path>
                                <path d="M368.461 45.8759H109.225C106.584 45.8759 104.409 48.0494 104.409 50.6886V272.228C104.409 274.867 106.584 277.041 109.225 277.041H368.461C371.102 277.041 373.278 274.867 373.278 272.228V50.6886C373.278 48.0494 371.102 45.8759 368.461 45.8759ZM371.335 272.15C371.335 273.703 370.015 275.022 368.461 275.022H109.225C107.672 275.022 106.351 273.703 106.351 272.15V50.6886C106.351 49.1361 107.672 47.8165 109.225 47.8165H368.461C370.015 47.8165 371.335 49.1361 371.335 50.6886V272.15Z" fill="#3F3D56"></path>
                                <path d="M169.043 237.608C169.043 237.918 169.043 238.306 169.043 238.617C168.499 249.407 159.255 257.712 148.457 257.091C138.435 256.548 130.434 248.553 129.967 238.617C129.967 238.306 129.967 237.918 129.967 237.608C129.967 226.818 138.746 218.046 149.544 218.046C160.342 218.046 169.043 226.818 169.043 237.608Z" fill="#FF0000"></path>
                                <path d="M348.341 224.567H194.679C192.893 224.567 191.416 226.042 191.416 227.827C191.416 229.612 192.893 231.087 194.679 231.087H348.341C350.127 231.087 351.603 229.612 351.603 227.827C351.603 226.042 350.127 224.567 348.341 224.567Z" fill="#FF0000"></path>
                                <path d="M260.789 244.128H194.679C192.893 244.128 191.416 245.603 191.416 247.388C191.416 249.174 192.893 250.648 194.679 250.648H260.789C262.576 250.648 264.052 249.174 264.052 247.388C264.052 245.603 262.576 244.128 260.789 244.128Z" fill="#E6E6E6"></path>
                                <path d="M430.066 200.426H170.83C167.8 200.426 165.392 197.942 165.392 194.992V81.1949C165.392 78.1676 167.878 75.7612 170.83 75.7612H430.066C433.095 75.7612 435.504 78.2452 435.504 81.1949V194.914C435.581 197.942 433.095 200.426 430.066 200.426Z" fill="#FF0000"></path>
                                <path d="M223.578 116.048C221.791 116.048 220.315 117.523 220.315 119.308C220.315 121.094 221.791 122.569 223.578 122.569H377.24C379.026 122.569 380.502 121.094 380.502 119.308C380.502 117.523 379.026 116.048 377.24 116.048H223.578Z" fill="white"></path>
                                <path d="M223.578 134.911C221.791 134.911 220.315 136.386 220.315 138.171C220.315 139.956 221.791 141.431 223.578 141.431H377.24C379.026 141.431 380.502 139.956 380.502 138.171C380.502 136.386 379.026 134.911 377.24 134.911H223.578Z" fill="white"></path>
                                <path d="M223.578 153.541C221.791 153.541 220.315 155.016 220.315 156.801C220.315 158.586 221.791 160.061 223.578 160.061H289.766C291.553 160.061 293.029 158.586 293.029 156.801C293.029 155.016 291.553 153.541 289.766 153.541H223.578Z" fill="white"></path>
                                <path d="M20.8973 20.5704C23.1284 20.5704 24.937 18.7632 24.937 16.534C24.937 14.3047 23.1284 12.4975 20.8973 12.4975C18.6663 12.4975 16.8577 14.3047 16.8577 16.534C16.8577 18.7632 18.6663 20.5704 20.8973 20.5704Z" fill="#FF0000"></path>
                                <path d="M35.1137 20.5704C37.3448 20.5704 39.1534 18.7632 39.1534 16.534C39.1534 14.3047 37.3448 12.4975 35.1137 12.4975C32.8827 12.4975 31.0741 14.3047 31.0741 16.534C31.0741 18.7632 32.8827 20.5704 35.1137 20.5704Z" fill="#FF0000"></path>
                                <path d="M49.2525 20.5704C51.4835 20.5704 53.2921 18.7632 53.2921 16.534C53.2921 14.3047 51.4835 12.4975 49.2525 12.4975C47.0214 12.4975 45.2128 14.3047 45.2128 16.534C45.2128 18.7632 47.0214 20.5704 49.2525 20.5704Z" fill="white"></path>
                                <path d="M599.109 339.761L595.768 358.158C594.836 363.359 598.254 368.249 603.459 369.181C604.469 369.336 605.479 369.413 606.489 369.258C611.694 368.56 615.345 363.747 614.568 358.546C614.49 358.236 614.49 358.003 614.413 357.692L610.218 339.606L625.289 290.858L621.793 238.694L600.196 246.146L609.985 286.045L599.109 339.761Z" fill="#FFB8B8"></path>
                                <path d="M590.33 192.818C600.284 192.818 608.353 184.756 608.353 174.81C608.353 164.864 600.284 156.801 590.33 156.801C580.376 156.801 572.307 164.864 572.307 174.81C572.307 184.756 580.376 192.818 590.33 192.818Z" fill="#FFB8B8"></path>
                                <path d="M582.717 226.352L617.986 225.809C610.451 207.489 604.314 190.257 605.867 178.458L581.086 182.339C584.038 199.028 585.436 211.06 582.717 226.352Z" fill="#FFB8B8"></path>
                                <path d="M554.595 270.908L601.983 279.68C617.986 250.416 626.765 224.023 611.927 207.024L583.805 205.394C565.859 224.567 550.633 243.197 560.965 256.626L554.595 270.908Z" fill="#FF0000"></path>
                                <path d="M550.245 489.964L568.967 489.032L581.086 362.272L642.768 488.334L662.034 487.79L625.133 377.176C623.657 340.227 622.181 303.433 606.411 287.442L600.895 275.876L556.848 266.484L550.789 278.05C536.727 310.807 544.962 404.5 550.245 489.964Z" fill="#2F2E41"></path>
                                <path d="M539.602 508.904L561.431 511C566.326 511.466 570.598 507.895 571.064 503.005C571.142 502.384 571.142 501.84 571.064 501.219L569.433 486.16C563.373 487.713 556.926 487.402 550.167 485.617L541.932 492.758L538.048 494C535.096 494.932 532.999 497.571 532.688 500.676C532.377 504.79 535.407 508.516 539.602 508.904Z" fill="#2F2E41"></path>
                                <path d="M632.125 508.904L653.954 511C658.849 511.466 663.121 507.895 663.587 503.005C663.665 502.384 663.665 501.84 663.587 501.219L661.956 486.16C655.897 487.713 649.449 487.402 642.69 485.617L634.455 492.758L630.571 494C627.619 494.932 625.522 497.571 625.211 500.676C624.9 504.79 627.93 508.516 632.125 508.904Z" fill="#2F2E41"></path>
                                <path d="M568.967 236.21C576.658 244.904 587.301 246.302 600.895 240.092V210.362L583.805 205.394L568.967 236.21Z" fill="#FF0000"></path>
                                <path d="M528.726 318.803L517.306 333.629C514.121 337.82 514.898 343.72 519.015 346.98C519.792 347.601 520.724 348.067 521.656 348.377C526.628 350.163 532.066 347.523 533.775 342.555C533.853 342.323 533.931 342.012 534.008 341.702L538.592 323.693L574.405 287.365L595.302 239.471L572.696 236.133L557.236 277.972L528.726 318.803Z" fill="#FFB8B8"></path>
                                <path d="M583.416 148.185C591.729 143.993 601.595 142.751 610.451 145.701C619.307 148.65 626.687 155.869 628.94 164.874C630.649 171.705 629.406 178.768 628.784 185.755C628.163 192.741 628.396 200.27 632.436 206.015C634.922 209.585 638.728 212.069 642.457 214.476C646.186 216.804 649.993 219.211 652.712 222.626C655.431 226.042 656.907 230.854 655.275 234.891C653.178 240.092 647.041 242.187 641.68 243.74C633.989 245.913 626.221 248.087 618.219 248.242C610.218 248.397 601.905 246.302 596.001 240.868C588 233.494 586.058 221.462 587.611 210.672C589.165 199.882 593.515 189.791 596.234 179.312C597.322 175.275 597.943 170.385 594.991 167.358C591.962 164.33 586.912 164.951 583.183 162.856C578.833 160.449 577.201 154.938 579.61 150.591C580.853 148.262 583.105 146.632 585.747 146.089" fill="#2F2E41"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="737" height="511" fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                        <div style={{ textAlign: 'right', marginTop: -70 }}>
                            <p>Send, receive messages, edit your profile and more!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%', margin: 0 }}>
                <svg style={{ position: 'absolute', bottom: 0, zIndex: -1 }} width="80%" viewBox="0 0 1321 214" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M530.902 71.6281C308.233 68.5331 311.236 0 0 0V214H1321C1242.77 192.482 1080.82 136.182 928.703 136.182C738.559 136.182 753.57 74.7231 530.902 71.6281Z" fill="white" />
                </svg>
                <img src={mern} alt="MERN stack. MongoDB, ExpressJS, ReactJS, NodeJS" width="18%" style={{ margin: '0 0 20px 20px' }} />
                <img src={figma} alt="Figma" width="10%" style={{ marginLeft: 40 }} />
                <img src={socket} alt="Socket.io" width="10%" style={{ marginLeft: 20 }} />
            </div>
        </>

    )
}

export default Home
