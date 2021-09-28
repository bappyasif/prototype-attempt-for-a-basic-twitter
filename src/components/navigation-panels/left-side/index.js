import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/left-panel.css";
import { deleteIcon, iconsArray } from "./svg-resources";

function LeftSideNavigationPanel({toggleModality, handleTweetModalToggle}) {
  // let [toggleModality, setToggleModality] = useState(false);

  // useEffect(() => {
  //   let tweetDiv = document.querySelector("#Tweet");
  //   let leftPanelContainer = document.querySelector("#left-panel-container");

  //   tweetDiv.addEventListener("click", (evt) => {
  //     clickHandler(evt);

  //     return () => tweetDiv.removeEventListener('click', clickHandler)
  //   });

  //   let clickHandler = (evt) => {
  //     if (!toggleModality) {
  //       // setToggleModality(true);
  //       handleTweetModalToggle()
  //       // leftPanelContainer.classList.add("left-opaque");
  //       // setTweetText('');
  //       // setExtraTweetText('');
  //       // readyTweetPublish(false);

  //     } else {
  //       // setToggleModality(false);
  //       handleTweetModalToggle();
  //       // leftPanelContainer.classList.remove("left-opaque");
  //     }
  //   }
  // }, [!toggleModality]);

  let clickHandler = () => handleTweetModalToggle()

  let panelDivs = iconsArray.map((icon) => (
    <div key={icon.id} id={icon.id} onClick={icon.id == 'Tweet' ? clickHandler : ''}>
      <Link className="item-divs" to={icon.id == 'Tweet' ? '/tweet/compose' : icon.id == 'Profile' ? '/user-profile' : '/'}>
        <span className="icons-span" style={{display: icon.id == 'Tweet' ? 'none': 'block'}}>{icon.svg}</span>
        <span className="names-span">{icon.id == "Twitter" ? "" : icon.id}</span>
      </Link>

      {/* <span className="icons-span">{icon.svg}</span>
      <span className="names-span">{icon.id == "Twitter" ? "" : icon.id}</span> */}
    </div>
  ));

  return <div id="left-panel-container" className={toggleModality ? 'left-opaque' : ''}>{panelDivs}</div>;
}

// let iconArrays = [TwitterIcon, HomeIcon, ExploreIcon, NotificationIcon, MessageIcon, BookmarkIcon, ListIcon, ProfileIcon, MoreIcon, TweetIcon]

export default LeftSideNavigationPanel;


/**
 *
 *
 *
   useEffect(() => {
    let tweetDiv = document.querySelector("#Tweet");
    let leftPanelContainer = document.querySelector("#left-panel-container");
    let modalDiv = tweetModal();;

    // console.log(toggleModality, "??")

    tweetDiv.addEventListener("click", () => {
        if(!toggleModality) {
            setToggleModality(true);
            leftPanelContainer.classList.add("left-opaque");
            document.body.insertAdjacentElement("afterbegin", modalDiv);
        } else {
            setToggleModality(false);
            leftPanelContainer.classList.remove("left-opaque");
          document.body.querySelector('#tweet-modal').remove();
        }
    });

    // return () => tweetDiv.removeEventListener('click', ()=>{
    //   setToggleModality(false)
    //   leftPanelContainer.classList.remove("left-opaque");
    //       document.body.querySelector('#tweet-modal').remove();
    // })
  }, [!toggleModality]);

  return <div id="left-panel-container">{panelDivs}</div>;
}

let tweetModal = () => {
  let tweetModal = document.createElement("div");
  tweetModal.id = "tweet-modal";
  tweetModal.textContent = "tweet here!!";
  // upperContentInModal();
  return tweetModal;
};

let upperContentInModal = () => {
  let deleteDiv = document.createElement('div');
  deleteDiv.append(deleteIcon())
  console.log(deleteDiv)
  // console.log(deleteIcon);
};
 *
 *
 useEffect(() => {
    let tweetDiv = document.querySelector("#Tweet");
    let leftPanelContainer = document.querySelector("#left-panel-container");
    let modalDiv;

    tweetDiv.addEventListener("click", handleClick);

    let handleClick = (evt) => {
        console.log('here!!', evt.target)
        if(!toggleModality) {
            setToggleModality(true);
            let modalDiv = tweetModal();
        //   modalDiv = tweetModal();

            leftPanelContainer.classList.add("left-opaque");
            document.body.insertAdjacentElement("afterbegin", modalDiv);
        } else {
            setToggleModality(false);
            leftPanelContainer.classList.remove("left-opaque");
            document.body.querySelector('#tweet-modal').textContent = ''
          //   document.body.insertAdjacentElement("afterbegin", modalDiv);
          //   document.body.removeChild(tweetDiv)
          // console.log(document.body.querySelector('#tweet-modal'));
          // document.body.querySelector('#tweet-modal').remove();
          // document.body.querySelector('#tweet-modal').style.display = 'none';
        }
    }


    return () => tweetDiv.removeEventListener('click', handleClick)
  }, [toggleModality]);
 */