import React, { useEffect,useState } from 'react'
import Logo from "./ProfileAssets/HERO Logo.svg"
import Play from "./ProfileAssets/Play_Button.svg"
import profileImage from "./ProfileAssets/ProfileImage.svg"
import socialIconO from "./ProfileAssets/social-icon-1.svg"
import socialIconT from "./ProfileAssets/social-icon-2.svg"
import socialIconTh from "./ProfileAssets/social-icon-3.svg"
import switchIconO from "./ProfileAssets/SwitchIcon-1.svg"
import switchIconT from "./ProfileAssets/SwitchIcon-2.svg"
import  VerifyLogo  from './ProfileAssets/Verify-logo.svg'
import VideoContent1 from "./ProfileAssets/Video Content 1.png"
import VideoContent2 from "./ProfileAssets/Video Content 2.png"
import VideoContent3 from "./ProfileAssets/Video Content 3.png"
import VideoContent4 from "./ProfileAssets/Video Content 4.png"
import VideoContent5 from "./ProfileAssets/Video Content 5.png"
import VideoContent6 from "./ProfileAssets/Video Content 6.png"
import "./Profile.css"
import { useParams } from 'react-router-dom'
import { withRouter, useHistory, Link } from "react-router-dom";
import { MobilizerData } from "../../data/data.js"





const Profile = () => {


  const { id } = useParams();
  const [profile, setProfile] = useState({});
  useEffect(() => {

      console.log(id.substring(1))
      MobilizerData.map((value, index) => {
      if (value.id === id.substring(1)) {
          setProfile(value)
        }
      })
  })

  const redirectToclub = () => {
    window.location.replace("/profileClub:" + profile.id)
  }



  return (
    <div id="profile" className='Profile d-flex flex-column'>
      
    <header>
    <nav  className="navbar navbar-expand-lg navbar-light py-3 px-3">
          <a className="navbar-brand mx-auto logo" href="#">
          <img src={Logo} />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">

            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown link
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>

          <div className='d-flex flex-column justify-content-center'>
              <div className='Profile-About d-flex flex-column justify-content-center align-items-center'>
                <div className={'ProfileImage-' + profile.id}>
                
                </div>
                <p className='ProfileTitle'>{profile.name}</p>
                <span className='d-flex'>
                <small className='Profilesubtitle'>{profile.sm}</small>
                <img src={VerifyLogo} className="" id='profilesubicon'/>
                </span>
                <small className='Profilelocation'>{profile.location}</small>
                <p className='ProfileDesc mb-3'>
                  {profile.profileDescription}
                </p>
                <ul className='socialMediaIcons p-0 d-flex mx-auto'>
                  <li className='scoial-icon'>
                  <img src={socialIconO} className='socialIcon' />
                  </li>
                  <li className='scoial-icon'>
                  <img src={socialIconT} className='socialIcon mid' />
                  </li>
                  <li className='scoial-icon'>
                  <img src={socialIconTh} className='socialIcon' />
                  </li> 
                </ul>
              </div>

          </div>
          </header>

          <div>
          <div className='switchContainer d-flex justify-content-center'>
            <button className='switch '><img className='switch-btn-icon' src={switchIconO} /> Public Content</button>
    
            <button onClick={redirectToclub}  className='switch switch-r' ><img className='switch-btn-icon' src={switchIconT}/>Club Access</button>
            </div>
            
            { profile.id == "Anuna"  && 
            <div>
                <img className='col-4 VideoContent' src={VideoContent1}/>
                <img className='col-4 VideoContent' src={VideoContent2}/>
                <img className='col-4 VideoContent' src={VideoContent3}/>
                <img className='col-4 VideoContent' src={VideoContent4}/>
                <img className='col-4 VideoContent' src={VideoContent5}/>
              </div>

            }
            { profile.videoBG &&
              <>
              {profile.videoBG.map((value) => <img className='col-4 VideoContent' src={ "/videos/profileVideosBg/" + value }/>)}  
              </>          
            }

            



          </div>
    
    
    
    
    </div>
  )
}

export default withRouter(Profile);