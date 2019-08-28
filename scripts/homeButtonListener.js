let userIdFromFrame = undefined;
let sessionId = undefined;
let iframeOrigin = "https://supertokens.io";
let buttonClickEventType = "Button Clicked";
let viewAppearedEventType = "View Appeared"
let analyticsMessageType = "analytics";
let webSource = "supertokens-web-source";
let iframeId = "st-timer-frame";
let blockedIp = [
    "49.36.0.143",
]


async function sendFeedback(uuid, url, happy) {
    try {
        fetch("https://api-jdhry57disoejch.qually.com/0/supertokens/documentation/feedback", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "api-version": "0",
            },
            body: JSON.stringify({
                url,
                userId: uuid,
                helpful: happy,
            }),
        });
    } catch {
        // IGNORING
    }
}

function isMobileDevice() {
    let width = window.innerWidth;
    if ( width < 480 ) {
        return true;
    }
    return false;
}

function showScheduleCallModal() {
    let modal = document.getElementById("schedule-call-modal");
    if ( modal !== null ) {
        modal.style.display = "block";
    }
    let iframe = document.getElementById(iframeId);
    if ( iframe !== null && iframe.contentWindow !== null ) {
        iframe.contentWindow.postMessage({
            source: webSource,
            messageType: analyticsMessageType,
            userId: userIdFromFrame,
            sessionId: sessionId,
            timestamp: new Date().getTime(),
            eventName: viewAppearedEventType,
            pageUrl: window.location.href,
            target: "schedule-call-modal",
        }, iframeOrigin)
    }
}

function dismissScheduleCallModal() {
    let modal = document.getElementById("schedule-call-modal");
    if ( modal !== null ) {
        modal.style.display = "none";
    }
}

function onScheduleCallClicked() {
    window.open("https://calendly.com/supertokens-rishabh", "_blank");
    dismissScheduleCallModal();
    let iframe = document.getElementById(iframeId);
    if ( iframe !== null && iframe.contentWindow !== null ) {
        iframe.contentWindow.postMessage({
            source: webSource,
            messageType: analyticsMessageType,
            userId: userIdFromFrame,
            sessionId: sessionId,
            timestamp: new Date().getTime(),
            eventName: buttonClickEventType,
            pageUrl: window.location.href,
            target: "schedule-call",
        }, iframeOrigin)
    }
}

function onCloseScheduleCallClicked() {
    dismissScheduleCallModal();
    let iframe = document.getElementById(iframeId);
    if ( iframe !== null && iframe.contentWindow !== null ) {
        iframe.contentWindow.postMessage({
            source: webSource,
            messageType: analyticsMessageType,
            userId: userIdFromFrame,
            sessionId: sessionId,
            timestamp: new Date().getTime(),
            eventName: buttonClickEventType,
            pageUrl: window.location.href,
            target: "schedule-call-close",
            shouldResetTimer: true,
        }, iframeOrigin)
    }
}

function addScheduleCallModal() {
    let splittedCurrPath = window.location.pathname.split("/");
    let imgPath = ["", splittedCurrPath[1], "img", "scheduleCallPopupEmoji.png"].join("/");
    let modal = `
        <div
            id="schedule-call-modal"
            style="display: none"
            class="modal">
            <div
                style="display: flex; height: 100%; width: 100%; align-items: center; justify-content: center">
                <div
                    style="box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; padding-top: 40px; padding-bottom: 40px; padding-right: 40px; padding-left: 40px; background-color: #222222; border-radius: 6px; width: ${isMobileDevice() ? "calc(100vw - 40px)" : "45vw"}; display: flex; flex-direction: column;">
                        <div
                            style="display: flex; flex-direction: row; justify-content: space-between; -webkit-justify-content: space-between; align-items: center">
                            <div
                                style="color: #ffffff; font-weight: bold; font-size: 20px">
                                Need help with implementation?
                            </div>
                            <div
                                onClick="onCloseScheduleCallClicked()"
                                style="color: #ffffff; text-decoration: underline; font-size: 18px; cursor: pointer">
                            Close
                            </div>
                        </div>
                        <div
                            style="font-size: 16px; color: #dddddd; margin-top: 30px; width: 100%">
                            Schedule a chat or a free 20 minutes call with us to get your questions answered and learn more about SuperTokens <span><img src="${imgPath}" style="height: 18px; width: 18px"></img></span>
                        </div>
                        <div
                            onclick="onScheduleCallClicked()"
                            style="display: flex; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; padding-right: 20px; padding-left: 20px; padding-top: 9px; padding-bottom: 9px; border-radius: 6px; background-color: #dddddd; align-self: flex-start; cursor: pointer; margin-top: 30px; font-weight: bold; color: #222222;">
                            Schedule a Call
                        </div>
                </div>
            </div>
        </div>
    `;
    let container = document.getElementsByClassName("container mainContainer")[0];
    if ( container !== null ) {
        container.innerHTML = container.innerHTML + modal;
    }
}

function feedbackSelected(happy) {
    let uuid = getUUID();
    let url = window.location.href;
    if (happy) {
        // happy selected
        sendFeedback(uuid, url, true);
        let happyImage = document.getElementById("feedback-happy");
        let sadImage = document.getElementById("feedback-sad");

        happyImage.className = "feedback-button-happy selected";
        sadImage.className = "feedback-button-sad";
    } else {
        // sad selected
        sendFeedback(uuid, url, false);
        let happyImage = document.getElementById("feedback-happy");
        let sadImage = document.getElementById("feedback-sad");

        happyImage.className = "feedback-button-happy";
        sadImage.className = "feedback-button-sad selected";
    }
}

function goToGithub() {
    window.open(
        'https://github.com/supertokens/supertokens-website',
        '_blank'
    );
}

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function getUUID() {
    let userId = localStorage.getItem("uuid");
    if (userId === null || userId === undefined) {
        // generate new one
        userId = create_UUID();
        localStorage.setItem("uuid", userId);
    }
    return userId;
}

function getFeedbackButtons(mode) {
    let alignItems = "center";
    let justifyContent = "center";

    if (mode === 'mobile') {
        alignItems = "left";
        justifyContent = "left";
    }

    let splittedCurrPath = window.location.pathname.split("/");
    let happySelected = ["", splittedCurrPath[1], "img", "happySelected.png"].join("/");
    let sadSelected = ["", splittedCurrPath[1], "img", "sadSelected.png"].join("/");
    return `
        <div
            style="display: flex; flex: 1; flex-direction: column; align-items: `+ alignItems + `; justify-content: ` + justifyContent + `">
            <div
                style="display: flex;">
                <img
                    id="feedback-sad"
                    src="`+ sadSelected + `"
                    class="feedback-button-sad"
                    onClick="feedbackSelected(false)"/>

                <img
                    id="feedback-happy"
                    src="`+ happySelected + `"
                    class="feedback-button-happy"
                    onClick="feedbackSelected(true)"/>
            </div>
            <div
                style="font-size: 16px; color: #dddddd; margin-top: 10px">
                Was it helpful?
            </div>
        </div>
    `;
}

function addFeedbackButtons() {
    let prevNextContainer = document.getElementsByClassName("docs-prevnext")[0];
    if (prevNextContainer === null || prevNextContainer === undefined) {
        return;
    }
    if (window.screen.width <= 735) {
        // MOBILE
        let feedbackButton = getFeedbackButtons("mobile");
        prevNextContainer.innerHTML = `
            <div style="position: relative">
                `+ feedbackButton + `
                `+ prevNextContainer.innerHTML + `
            </div>
        `;
    } else {
        // WEB
        let feedbackButton = getFeedbackButtons("web");
        prevNextContainer.innerHTML = `
            <div style="position: relative">
                `+ prevNextContainer.innerHTML + `
                `+ feedbackButton + `
            </div>
        `;
    }
}

function addChat() {
    fetch("https://api-jdhry57disoejch.qually.com/0/supertokens/ip", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "api-version": "0",
        },
    })
        .then(response => response.json())
        .then(response => {
            let ip = response.ip;
            if ( blockedIp.indexOf(ip) === -1 ) {
                let code = `
                var $zoho = $zoho || {};
                $zoho.salesiq = $zoho.salesiq || {
                    widgetcode: "efafccf9d6d7d27460a05d4a76361143d076be81031a0c995358044f0cc8b3841a2010ab7b6727677d37b27582c0e9c4",
                    values: {},
                    ready: function() {}
                };
                var d = document;
                s = d.createElement("script");
                s.type = "text/javascript";
                s.id = "zsiqscript";
                s.defer = true;
                s.src = "https://salesiq.zoho.com/widget";
                t = d.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(s, t);
                `

                let zohodiv = document.createElement("div");
                zohodiv.id = "zsiqwidget";
                document.body.appendChild(zohodiv);

                let script = document.createElement("script");
                script.type = "text/javascript";
                script.text = code;
                document.body.appendChild(script);
            }
        });
}

function sendWindowOriginToFrame(){
    let iframe = document.getElementById("st-timer-frame");
    if ( iframe !== null && iframe.contentWindow !== null ) {
        iframe.contentWindow.postMessage({
            source: "supertokens-web-source",
            origin: window.location.origin,
            pageUrl: window.location.href,
            messageType: "handshake",
        }, "https://supertokens.io");
    }
}

function addIframe() {
    let iframe = document.createElement("iframe");
    iframe.id = "st-timer-frame";
    iframe.width = "0px";
    iframe.height = "0px";
    iframe.src = `${iframeOrigin}/utils/iframe.html`;
    iframe.style.borderWidth = "0px";
    iframe.onload = sendWindowOriginToFrame
    document.body.appendChild(iframe);
}

function uncollapseInitial(node, title, currNav) {
    node.classList.remove("hide");
    currNav.children[0].innerHTML = title + '<span class="arrow rotate"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="#565656" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></span>';
}

function collapseInitial(node, title, currNav) {
    node.classList.add("hide");
    currNav.children[0].innerHTML = title + '<span class="arrow"><svg width="24" height="24" viewBox="0 0 24 24"><path fill="#565656" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></span>'
}

function uncollapse(node, title, currNav) {
    node.classList.remove("hide");
    let arrow = currNav.children[0].children[0];
    arrow.classList.toggle("rotate");
}

function collapse(node, title, currNav) {
    node.classList.add("hide");
    let arrow = currNav.children[0].children[0];
    arrow.classList.toggle("rotate");
}

function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

function bindClickEvents() {
    let navGroupElements = document.getElementsByClassName("navGroup subNavGroup");

    let activeItem = document.getElementsByClassName("navListItemActive")[0];

    for (let i = 0; i < navGroupElements.length; i++) {
        let currNav = navGroupElements[i];
        const title = currNav.children[0].innerText;
        const content = navGroupElements[i].childNodes[1];
        currNav.children[0].classList.add("collapsible");
        currNav.childNodes[0].addEventListener("click", function () {
            if (!content.classList.contains("hide")) {
                collapse(content, title, currNav);
            } else {
                uncollapse(content, title, currNav);
            }
        });

        if (isDescendant(currNav, activeItem)) {
            uncollapseInitial(content, title, currNav);
        } else {
            collapseInitial(content, title, currNav);
        }

    }
}

document.addEventListener("DOMContentLoaded", () => {
    addScheduleCallModal();
    bindClickEvents();

    let superTokensPrevButtons = document.getElementsByClassName("docs-prev");
    let superTokensNextButtons = document.getElementsByClassName("docs-next");
    Array.from(superTokensPrevButtons).forEach(element => {
        element.children[1].innerHTML = "Previous";
    });

    Array.from(superTokensNextButtons).forEach(element => {
        element.children[0].innerHTML = "Next";
    });

    let superTokensLinks = document.getElementsByTagName("a");
    Array.from(superTokensLinks).forEach(element => {
        let url = element.href;
        let splittedUrl = url.split("/");
        let path = splittedUrl.filter((x, i) => i >= 3).join("/");
        let base = splittedUrl.filter((x, i) => i < 3).join("/");
        let currLocation = window.location.origin;
        let lastPath = splittedUrl[splittedUrl.length - 1];
        if (lastPath === "versions") {
            element.className = "header-version-text";
        }

        if (base === currLocation && splittedUrl.length === 5 && lastPath === "") {
            element.href = "https://supertokens.io";
            element.target = "_blank";
        }
    });

    let specialNotes = document.getElementsByClassName("specialNote");
    for (let i = 0; i < specialNotes.length; i++) {
        let text = " " + specialNotes[i].innerHTML.trim();
        let header = document.getElementsByClassName("fixedHeaderContainer")[0];
        let splittedCurrPath = window.location.pathname.split("/");
        let imgPath = ["", splittedCurrPath[1], "img", "star.png"].join("/");
        specialNotes[i].innerHTML = `
            <div style="border: 1px solid #6ab1fd; border-radius: 6px; width: 100%; padding: 20px; display: flex">
            <div style="margin-right: 20px;">
            <img src="` + imgPath + `" style="width: 15px"></img>
            </div>
            <div style="flex: 1"><span style="color: #6ab1fd">Note:</span>` + text + `</div></div>
        `;
    }

    let header = document.getElementsByClassName("fixedHeaderContainer")[0];
    let splittedCurrPath = window.location.pathname.split("/");
    let imgPath = ["", splittedCurrPath[1], "img", "githubFold.png"].join("/");
    header.innerHTML = `
    <div style="position: relative">
        ` + header.innerHTML + `
        <img 
            src="`+ imgPath + `"
            style="width: 50px; height: 50px; position: absolute; top: -8px; right: 0px; cursor: pointer"
            onClick="goToGithub()">
        </img>
    </div>
    `;
    addFeedbackButtons();

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-143540696-1');

    let body = document.getElementsByTagName("body")[0];
    addIframe();
    addChat();
    body.style.display = "block";
});

window.addEventListener("message", (e) => {
    if ( typeof e.data === "object" && e.data.source === "st-timer" ) {
        if ( e.data.userId !== undefined ) {
            userIdFromFrame = e.data.userId;
        }
        if ( e.data.sessionId !== undefined ) {
            sessionId = e.data.sessionId;
        }

        if ( e.data.showMessage !== undefined ) {
            if ( e.data.showMessage ) {
                showScheduleCallModal();
            }
        }
    }
}, false);
