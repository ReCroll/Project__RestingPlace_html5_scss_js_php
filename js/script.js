"use strict";

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  IOS: function () {
    return navigator.userAgent.match(/Iphone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.IOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

if (isMobile.any()) {
  document.body.classList.add("_touch");

  // let menuArrows = document.querySelectorAll('.menu__arrow');
  // let menuClassLinks = document.querySelectorAll('.menu__sub-list')
  // if (menuArrows.length > 0) {
  //     for (let index = 0; index < menuArrows.length; index++) {
  //         const menuArrow = menuArrows[index];
  //         menuArrow.addEventListener("click", function (e) {
  //             menuArrow.parentElement.classList.toggle('_active');
  //         });
  //     }

  // }
  // if (menuClassLinks.length > 0) {
  //     for (let index = 0; index < menuClassLinks.length; index++) {
  //         const menuClassLink = menuClassLinks[index];
  //         menuClassLink.addEventListener("click", function (e) {
  //             menuClassLink.parentElement.classList.toggle('_active');
  //         });
  //     }
  // }

  // } else {
  //     document.body.classList.add('_pc');
}
//=========== menu burger ===================
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function () {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}
//============================================

// прокрутка к блоку

const menuLinks = document.querySelectorAll("._goto-mode[data-goto]");
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        scrollY -
        document.querySelector("header").offsetHeight;

      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

//==================відео з ютюб ===========================

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

$(".to-play").click(function () {
  let btn = $(this),
    videoID = btn.data("video"),
    playerID = btn.data("id");

  player = new YT.Player(playerID, {
    playerVars: {
      autoplay: 0,
      controls: 1,
      playsinline: 1,
    },
    videoId: videoID,
    events: {
      onReady: onPlayerReady,
    },
  });
});

function onPlayerReady(event) {
  let video = event.target.g;
  $(video).siblings(".to-play").addClass("removed__img");
  event.target.playVideo();
}

// ================= зупинка відео після закриття ==================

// $(document).on('click', '.popup__body', function() {
//     jQuery("iframe").each(function() {
//         jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
//     });
// });

// ================= зупинка відео кінець ==========================

// ================= відгуки початок ===============================

const avatarIcons = document.querySelectorAll(".avatar__icon");

if (avatarIcons) {
  for (let index = 0; index < avatarIcons.length; index++) {
    const avatarIcon = avatarIcons[index];
    if (avatarIcon.classList.contains("_active")) {
      avatarIcon.style.width = "88px";
      avatarIcon.style.height = "88px";
    }
    avatarIcon.addEventListener("click", function (e) {
      if (this.classList.contains("_active")) {
        return;
      }
      if (avatarIcon) {
        this.style.width = "88px";
        this.style.height = "88px";
        // this.style.opacity = "0.3";
      }

      var avatarShows = avatarIcon
        .getAttribute("class")
        .replace("avatar__icon ", "");
      var avatarShow = document.getElementById(avatarShows);
      var comentShows = avatarIcon.getAttribute("id").replace("icon", "");
      var comentShow = document.getElementById(comentShows);
      let avatar = document.getElementsByClassName("coment__avatar _active");

      if (avatarIcon) {
        for (let y = 0; y < avatar.length; y++) {
          const avatarToggle = avatar[y];
          avatarToggle.classList.remove("_active");
          avatarShow.classList.add("_active");
        }
      }
      avatarIcon.classList.add("_active");
      let icon = document.getElementsByClassName("avatar__icon _active");
      if (avatarIcon) {
        for (let i = 0; i < icon.length; i++) {
          const iconToggle = icon[i];
          iconToggle.classList.remove("_active");
          avatarIcon.classList.add("_active");
        }
      }
      let coment = document.getElementsByClassName(
        "coment__attachment _active"
      );
      if (avatarIcon) {
        for (let c = 0; c < coment.length; c++) {
          const comentToggle = coment[c];
          comentToggle.classList.remove("_active");
          comentShow.classList.add("_active");
        }
      }
      e.preventDefault();
    });
  }
}
//================================= POPUP ============================
//============================== POPUP =========================

const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock__padding");

let unlock = true;
const timeout = 800;

const ollElementsArray = [];
let popupContentWraps;
let getPreCard;
let getElementsAttr;

//==========================================================================

function popupOpen(currentPopup) {
  if (unlock) {
    const popupActive = document.querySelector(".popup._open");
    if (popupActive) {
      popupClose(popupActive, currentPopup, false);
      // popupFormClose(popupActive);
    } else {
      bodyLock();
    }
    currentPopup.classList.add("_open");
  }
  const popupCloseIcon = currentPopup.querySelectorAll(".close-popup");
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(".popup"), currentPopup);
        // e.preventDefault();
      });
    }
  }
}
//==============================================================================
//==============================================================================

//==============================================================================

function popupClose(popupActive, currentPopup, doUnlock = true) {
  if (!currentPopup.classList.contains(".popup__close")) {
    // goBackProduct(currentPopup);
    popupActive.classList.remove("_open");

    if (doUnlock) {
      bodyUnLock();
    }
  }
}

//================================================================================

function popupFormClose(popupFormActive) {
  popupFormActive.addEventListener("click", function (e) {
    if (!e.target.closest(".popup__form-content")) {
      popupFormActive.classList.remove("_open");
      bodyUnLock();
    }
    // if (
    //   doUnlock &&
    //   popupFormActive.classList.contains("_close__popup-anchor")
    // ) {
    //   bodyUnLock();
    // }
    e.preventDefault();
  });
}

//==============================================================================
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("_lock");
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
//==============================================================================

//==============================================================================
function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove("_lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

//========================== SEND FORM & SHOW POPUP ===================

document.addEventListener("DOMContentLoaded", function () {
  // let form = document.getElementById("form__phone");
  let formEmail = document.getElementById("form__email");

  formEmail.addEventListener("submit", formSendEmail);

  async function formSendEmail(e) {
    e.preventDefault();

    let error = formValidate(formEmail);

    let formDataEmail = new FormData(formEmail);
    if (error === 0) {
      // sending.classList.add("sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formDataEmail,
      });
      // let response = true;
      if (response.ok) {
        // console.log("response ok");
        popupOpen(popupFormSuccess);
        popupFormClose(popupFormSuccess);
        formEmail.reset();
        // sending.classList.remove("sending");
      } else {
        // console.log("ERROR");
        popupOpen(popupFormError);
        // sending.classList.remove("sending");
        popupFormClose(popupFormError);
      }
    } else {
      // console.log("warning");
      popupOpen(popupFormEmailWarning);
      // sending.classList.remove("sending");
      popupFormClose(popupFormEmailWarning);
    }
  }

  function formValidate(form, telInput) {
    let error = 0;
    let formReg = form.querySelectorAll(".req");
    for (let index = 0; index < formReg.length; index++) {
      const input = formReg[index];
      formRemoveError(input);
      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("error");
    input.classList.add("error");
    // }
  }
  function formRemoveError(input) {
    if (input.classList.contains("error")) {
      input.parentElement.classList.remove("error");
      input.classList.remove("error");
    }
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

// ==================== BTN-HOME ====================
$(document).ready(function () {
  $("#btn-home").on("click", "a", function (event) {
    console.log("work function");
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id = $(this).attr("href"),
      //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 400 мс
    $("body,html").animate({ scrollTop: top }, 400);
  });
});

jQuery(function (f) {
  var element = f("#btn-home");
  f(window).scroll(function () {
    element["fade" + (f(this).scrollTop() > 230 ? "In" : "Out")](0);
  });
});
