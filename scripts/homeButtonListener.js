let userIdFromFrame = undefined;
let sessionId = undefined;
let infoFormFilledStorageKey = "st-info-filled";
let iframeOrigin = "https://supertokens.io";
let buttonClickEventType = "Button Clicked";
let viewAppearedEventType = "View Appeared";
let analyticsMessageType = "analytics";
let infoFormFilledMessageType = "st-info-form-filled";
let webSource = "supertokens-web-source";
let iframeId = "st-timer-frame";
let isInfoFormSubmitting = false;

const blockedUserIds = [
    "ST1566567977207yfvepU", // r
    "ST1566568839844eyRqkU", // b
    "ST1566799601658ljXWFU", // j
    "ST1566566094822uKpOuU", // n
    "ST1566558830508GAYlhU", // n 0.0.0.0
    "ST1566395222245ZLWomU", // n localhost
    "ST1566999771277eNuDcU", // a
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
                url: `${url}/latest-version=${getLatestVersion()}`,
                userId: userIdFromFrame,
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

function sendViewAppearedEvent(target, additionalData) {
    let timestamp = new Date().getTime();
    let eventName = "View Appeared";
    let pageUrl = window.location.href;
    let webSource = "supertokens-web-source";
    let analyticsMessageType = "analytics";

    let iframe = document.getElementById("st-timer-frame");
    if ( iframe !== null && iframe.contentWindow !== null ) {
        iframe.contentWindow.postMessage({
            source: webSource,
            messageType: analyticsMessageType,
            eventName,
            userId: userIdFromFrame,
            sessionId,
            timestamp,
            pageUrl,
            target,
            additionalData,
        }, iframeOrigin);
    }
}

function sendButtonClickedEvent(target, additionalData) {
    let timestamp = new Date().getTime();
    let eventName = "Button Clicked";
    let pageUrl = window.location.href;
    let webSource = "supertokens-web-source";
    let analyticsMessageType = "analytics";

    let iframe = document.getElementById("st-timer-frame");
    if ( iframe !== null && iframe.contentWindow !== null ) {
        iframe.contentWindow.postMessage({
            source: webSource,
            messageType: analyticsMessageType,
            eventName,
            userId: userIdFromFrame,
            sessionId,
            timestamp,
            pageUrl,
            target,
            additionalData,
        }, iframeOrigin);
    }
}

function showScheduleCallModal() {
    if (isMobileDevice()) {
        return;
    }
    let modal = document.getElementById("schedule-call-modal");
    if ( modal !== null ) {
        let splittedCurrPath = window.location.pathname.split("/");
        let openedImagePath = ["", splittedCurrPath[1], "img", "scheduleCallOpen.png"].join("/");
        let scheduleCallIcon = document.getElementById("schedule-call-icon");
        if (scheduleCallIcon !== null) {
            scheduleCallIcon.src = openedImagePath;
        }
        modal.classList.add("schedule-call-modal-open");
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
    if (isMobileDevice()) {
        return;
    }
    let modal = document.getElementById("schedule-call-modal");
    if ( modal !== null ) {
        let splittedCurrPath = window.location.pathname.split("/");
        let closedImagePath = ["", splittedCurrPath[1], "img", "scheduleCallClosed.png"].join("/");
        let scheduleCallIcon = document.getElementById("schedule-call-icon");
        if (scheduleCallIcon !== null) {
            scheduleCallIcon.src = closedImagePath;
        }
        modal.classList.remove("schedule-call-modal-open");
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
    if (isMobileDevice()) {
        return;
    }
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

function onScheduleModalImageClicked() {
    if (isMobileDevice()) {
        return;
    }
    let scheduleCallModal = document.getElementById("schedule-call-modal");
    if (scheduleCallModal !== null) {
        let classList = scheduleCallModal.classList;
        let open = classList.contains("schedule-call-modal-open");
        if (open) {
            onCloseScheduleCallClicked();
        } else {
            showScheduleCallModal();
        }
    }
}

function addScheduleCallModal() {
    if (isMobileDevice()) {
        return;
    }
    
    let splittedCurrPath = window.location.pathname.split("/");
    let emojiPath = ["", splittedCurrPath[1], "img", "scheduleCallPopupEmoji.png"].join("/");
    let closedImagePath = ["", splittedCurrPath[1], "img", "scheduleCallClosed.png"].join("/");
    
    let modal = `
        <div
            id="schedule-call-modal"
            class="schedule-call-modal"
            style="background-color: #d6eeff">
            <div style="width: 100%, height: 100%; background-color: transparent">
                <div
                    onclick="onScheduleModalImageClicked()"
                    style="display: flex; align-items: center; cursor: pointer">
                    <div
                        class="schedule-call-child"
                        style="font-size: 18px; line-height: 26px; color: #222222; display: flex; font-weight: 600">
                        Need help with anything?
                    </div>
                    <img
                        id="schedule-call-icon"
                        style="width: 16px; height: 15px; margin-left: 12px;"
                        src="${closedImagePath}"
                        />
                </div>

                <div
                    style="font-size: 16px; line-height: 20px; color: #222222; display: flex; margin-top: 20px"
                    class="schedule-call-child">
                    Schedule a 20 minutes call.
                </div>

                <div
                    style="font-size: 16px; line-height: 20px; color: #222222; display: flex; margin-top: 10px"
                    class="schedule-call-child">
                    It will get your questions answered without any cost.
                </div>

                <div
                    onclick="onScheduleCallClicked()"
                    class="schedule-call-child"
                    style="margin-top: 20px; padding-top: 10px; padding-bottom: 10px; padding-left: 35px; padding-right: 35px; display: flex;
                        align-items: center; background-color: #0a84ff; justify-content: center; border-radius: 12px; cursor: pointer">
                    <div
                        style="color: #ffffff; font-weight: bold">
                        Schedule a Call
                    </div>
                    <img
                        style="width: 18px; height: 18px; margin-left: 10px"
                        src="${emojiPath}"
                        />
                </div>
            </div>
        </div>
    `;
    let container = document.getElementsByTagName("body")[0];
    if ( container !== null ) {
        container.insertAdjacentHTML("beforeend", modal);
    }
}

function getScheduleCallPopupContent(bgColor, force) {
    let splittedCurrPath = window.location.pathname.split("/");
    let whatsappImagePath = ["", splittedCurrPath[1], "img", "scheduleCallWhatsapp.png"].join("/");
    return `
        <div
            style="display: flex; flex-direction: column; padding-top: 20px; padding-bottom: 20px; box-sizing: border-box; -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;">
            <div
                style="color: #ffffff; font-size: 20px; line-height: 24px; margin-right: 20px; margin-left: 20px; display: flex;
                    flex-direction: column; font-weight: bold">
                        Let's discuss these benefits in detail!
            </div>

            <div
                id="schedule-call-form-interested"
                onClick="onScheduleCallClicked()"
                style="margin-top: 20px; margin-right: 20px; margin-left: 20px; display: flex; padding-top: 6px; padding-bottom: 6px;
                    align-items: center; justify-content: center; border-radius: 6px; color: #ffffff; font-size: 18px; font-weight: bold;
                    line-height: 23px; background-color: #0a84ff; cursor: pointer">
                        ${"Schedule a call"}
            </div>

            <div
                style="display: flex; justify-content: center; flex: 1; position: relative; align-items: center; margin-top: 20px">
                    <div
                        style="height: 1px; background-color: #141414; width: 100%">
                    </div>
                    <div
                        style="color: #ffffff; position: absolute; background-color: ${bgColor}; padding-bottom: 2px; padding-left: 10px;
                            padding-right: 10px">
                        or
                    </div>
            </div>

            <div
                style="display: flex; flex-direction: row; align-items: center; width: 100%; margin-top: 20px; padding-right: 20px;
                    padding-left: 20px">
                    <img
                        style="height: 26px; width: 26px"
                        src="${whatsappImagePath}"/>
                    
                    <div
                        style="margin-left: 20px; font-size: 18px; line-height: 24px; color: #ffffff">
                        Whatsapp "SuperTokens" on 
                        <span
                            style="color: #ffffff; font-weight: bold">
                            +91 7021000012
                        </span>
                    </div>
            </div>
        </div>
    `;
}

function showScheduleFormSuccess() {
    let disclaimer = document.getElementById("docs-info-form-disclaimer");
    if (disclaimer !== null) {
        disclaimer.style.display = "none";
    }
    let formContainer = document.getElementById("docs-schedule-call-form-content");
    if (formContainer !== null) {
        formContainer.style.height = null;
        formContainer.innerHTML = `
            <div
                onclick="onScheduleCallFormCloseClicked()"
                style="color: #dddddd; text-decoration: underline; font-size: 18px; line-height: 25px; align-self: flex-end;
                    cursor: pointer">
                Close
            </div>
            ${getScheduleCallPopupContent("#222222", true)}
        `;
    }
}

function postScheduleCallSubmit(success) {
    // closeScheduleCallForm();
    if (success) {
        let iframe = document.getElementById("st-timer-frame");
        if (iframe !== null) {
            iframe.contentWindow.postMessage({
                source: webSource,
                messageType: infoFormFilledMessageType,
            }, iframeOrigin);
        }
        let interestedButton = document.getElementById("schedule-call-form-interested");
        if (interestedButton !== null) {
            interestedButton.innerHTML = "Schedule a call";
        }
    }

    showScheduleFormSuccess();
}

function onSubmitPressed() {
    let submitButton = document.getElementById("docs-schedule-call-submit");
    if (submitButton !== null) {
        if (submitButton.className !== "schedule-call-email-enabled") {
            return;
        }

        if (isInfoFormSubmitting) {
            return;
        }

        isInfoFormSubmitting = true;

        let howYouFoundUsRadios = document.getElementsByName("how-find");
        let whyUseSupertokensRadios = document.getElementsByName("use-for");
        let emailInput = document.getElementById("docs-schedule-call-form-email");
        let nameInput = document.getElementById("docs-schedule-call-form-name");

        let selectedHowOption = "";
        let selectedWhyOption = "";
        let email = "";
        let name = "";

        for (let i = 0; i < howYouFoundUsRadios.length; i++) {
            let current = howYouFoundUsRadios[i];
            if (current.checked) {
                if (current.id === "how-find-other") {
                    selectedHowOption = current.value + " | ";
                    let otherInput = document.getElementById("docs-schedule-call-form-how-other");
                    if (otherInput !== null) {
                        selectedHowOption += otherInput.value;
                    }
                } else {
                    selectedHowOption = current.value;
                }
                break;
            }
        }
    
        for (let i = 0; i < whyUseSupertokensRadios.length; i++) {
            let current = whyUseSupertokensRadios[i];
            if (current.checked) {
                selectedWhyOption = current.value;
                break;
            }
        }

        if (emailInput !== null) {
            email = emailInput.value;
        }

        if (nameInput !== null) {
            name = nameInput.value;
        }

        let payload = {
            userId: userIdFromFrame,
            sessionId,
            email,
            how: selectedHowOption,
            who: selectedWhyOption, // API uses who as the key
            pageURL: window.location.href,
            name,
        }

        if (window.location.origin.includes("localhost") || window.location.origin.includes("0.0.0.0")) {
            isInfoFormSubmitting = false;
            postScheduleCallSubmit(false);
            return;
        }

        let apiVersion = "1";
        let url = "https://api.supertokens.io/0/website/visitorinfo";

        sendButtonClickedEvent("docs-visitor-info-form-submit", {
            email,
            how: selectedHowOption,
            why: selectedWhyOption,
            name,
        })

        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                "api-version": apiVersion,
            }
        })
            .then(() => {
                isInfoFormSubmitting = false;
                postScheduleCallSubmit(true);
            })
            .catch(() => {
                isInfoFormSubmitting = false;
                postScheduleCallSubmit(false);
            })
    } 
}

function onScheduleCallFormCloseClicked() {
    sendButtonClickedEvent("docs-visitor-info-form-close");
    closeScheduleCallForm();
}

{/* <div
        onclick="onScheduleCallFormCloseClicked()"
        style="color: #dddddd; text-decoration: underline; font-size: 16px; line-height: 25px; align-self: flex-end;
            cursor: pointer">
        Close
    </div> */}

function getInfoFormContent() {
    return `
        <div
            style="font-size: 16px; line-height: 30px; color: #dddddd; font-weight: bold">
            Name:
        </div>

        <input
            id="docs-schedule-call-form-name"
            type="text"
            placeholder="Your name"
            style="border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; margin-top: 10px; border-radius: 12px;
                display: flex; width: 100%; resize: none; padding-right: 20px; padding-left: 20px; padding-top: 10px;
                padding-bottom: 10px; border-width: 0px; background-color: #444444; font-size: 14px; color: #dddddd">

        <div
            style="font-size: 16px; line-height: 30px; color: #dddddd; font-weight: bold; margin-top: 20px">
            Email:
        </div>

        <input
            id="docs-schedule-call-form-email"
            type="text"
            placeholder="Your email (work email preferred)"
            style="border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; margin-top: 10px; border-radius: 12px;
                display: flex; width: 100%; resize: none; padding-right: 20px; padding-left: 20px; padding-top: 10px;
                padding-bottom: 10px; border-width: 0px; background-color: #444444; font-size: 14px; color: #dddddd">

        <div
            style="color: rgba(221,221,221,0.6); font-size: 10px; margin-top: 10px">
                We promise not to spam this email. It will be used to give you important alerts about bug fixes to the library. Occasionally, we may ask for your feedback - with the aim of building a better solution, <span style="font-style: italic; color: rgba(221,221,221,0.6)">for you</span>
        </div>

        <div
            style="margin-top: 20px; font-size: 16px; color: #dddddd; font-weight: bold;">
                How did you find us?
        </div>

        <div class="radio-item">
            <input type="radio" name="how-find" id="how-find-blog" value="SuperTokens Blog post">
            <label for="how-find-blog">SuperTokens blog post<a
                style="margin-left: 10px; color: #007bff"
                target="_blank"
                href="https://supertokens.io/blog/all-you-need-to-know-about-user-session-security">See blog↗</a></label>
        </div>

        <div class="radio-item">
            <input type="radio" name="how-find" id="how-find-search" value="Via search">
            <label for="how-find-search">Through a search engine</label>
        </div>

        <div class="radio-item">
            <input type="radio" name="how-find" id="how-find-meet" value="You have met us">
            <label for="how-find-meet">Met someone from SuperTokens team</label>
        </div>

        <div class="radio-item">
            <input type="radio" name="how-find" id="how-find-other" value="Other">
            <label for="how-find-other">Other</label>
        </div>

        <input
            id="docs-schedule-call-form-how-other"
            type="text"
            placeholder="Please tell us how (Optional)"
            style="border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; margin-top: 10px; border-radius: 12px;
                display: flex; width: 100%; resize: none; padding-right: 20px; padding-left: 20px; padding-top: 10px;
                padding-bottom: 10px; border-width: 0px; background-color: #444444; font-size: 14px; color: #dddddd;
                display: none;">

        <div
            style="margin-top: 20px; font-size: 16px; line-height: 30px; color: #dddddd; font-weight: bold;">
                You want to use SuperTokens for
        </div>

        <div class="radio-item">
            <input type="radio" name="use-for" id="use-for-personal" value="Personal project">
            <label for="use-for-personal">Personal project</label>
        </div>

        <div class="radio-item">
            <input type="radio" name="use-for" id="use-for-startup" value="A startup">
            <label for="use-for-startup">A startup</label>
        </div>

        <div class="radio-item">
            <input type="radio" name="use-for" id="use-for-enterprise" value="An enterprise">
            <label for="use-for-enterprise">An enterprise</label>
        </div>

        <div class="radio-item">
            <input type="radio" name="use-for" id="use-for-education" value="Educational purposes">
            <label for="use-for-education">Educational purposes</label>
        </div>

        <div class="radio-item">
            <input type="radio" name="use-for" id="use-for-private" value="Id rather not say">
            <label for="use-for-private">I'd rather not say</label>
        </div>

        <div
            onclick="onSubmitPressed()"
            id="docs-schedule-call-submit"
            class="schedule-call-email-disabled"
            style="border-radius: 12px; padding: 10px; font-size: 16px; display: flex;
                align-self: flex-end; padding-top: 6px; padding-bottom: 6px; margin-top: 20px">
                Submit
        </div>
    `;
}

function emailHasCorrectFormat(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function enableSubmitIfRequired() {
    let howYouFoundUsRadios = document.getElementsByName("how-find");
    let whyUseSupertokensRadios = document.getElementsByName("use-for");
    let emailInput = document.getElementById("docs-schedule-call-form-email");
    let nameInput = document.getElementById("docs-schedule-call-form-name");

    let isHowRadioChecked = false;
    let isWhyRadioChecked = false;
    let isEmailValid = false;
    let isNameFilled = false;

    for (let i = 0; i < howYouFoundUsRadios.length; i++) {
        let current = howYouFoundUsRadios[i];
        if (current.checked) {
            isHowRadioChecked = true;
            break;
        }
    }

    for (let i = 0; i < whyUseSupertokensRadios.length; i++) {
        let current = whyUseSupertokensRadios[i];
        if (current.checked) {
            isWhyRadioChecked = true;
            break;
        }
    }

    if (emailInput !== null && emailHasCorrectFormat(emailInput.value)) {
        isEmailValid = true;
    }

    if (nameInput !== null && nameInput.value.trim() !== "") {
        isNameFilled = true;
    }

    let submitButton = document.getElementById("docs-schedule-call-submit");

    if (submitButton !== null) {
        if (isHowRadioChecked && isWhyRadioChecked && isEmailValid && isNameFilled) {
            submitButton.className = "schedule-call-email-enabled";
        } else {
            submitButton.className = "schedule-call-email-disabled";
        }
    }
}

function showScheduleCallForm() {
    sendViewAppearedEvent("docs-visitor-info-form");
    let form = document.getElementById("docs-schedule-call-form");
    if (form !== null) {
        form.style.visibility = "visible"
    }
}

function closeScheduleCallForm() {
    let form = document.getElementById("docs-schedule-call-form");
    if (form !== null) {
        form.style.visibility = "hidden"
        let howYouFoundUsRadios = document.getElementsByName("how-find");
        for(let i = 0; i < howYouFoundUsRadios.length; i++) {
            let current = howYouFoundUsRadios[i];
            current.checked = false;
        }

        let whyUseSupertokensRadios = document.getElementsByName("use-for");
        for(let i = 0; i < whyUseSupertokensRadios.length; i++) {
            let current = whyUseSupertokensRadios[i];
            current.checked = false;
        }

        let otherInput = document.getElementById("docs-schedule-call-form-how-other");
        if (otherInput !== null) {
            otherInput.value = "";
            otherInput.style.display = "none";
        }

        let emailInput = document.getElementById("docs-schedule-call-form-email");
        if (emailInput !== null) {
            emailInput.value = "";
        }
    }

    let formContainer = document.getElementById("docs-schedule-call-form-content");
    if (formContainer !== null) {
        formContainer.innerHTML = getInfoFormContent();
    }
}

function hasFilledScheduleCallForm() {
    let isFilled = window.localStorage.getItem(infoFormFilledStorageKey);
    return isFilled === "true";
}

function addInfoForm() {
    if (isMobileDevice()) {
        return;
    }

    let form = `
        <div
            id="docs-schedule-call-form"
            style="box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; display: flex; flex-direction: column;
                position: fixed; top: 0px; left: 0px; z-index: 999999999999; height: 100%; width: 100%; align-items: center;
                justify-content: center; background-color: #000000; visibility: hidden; overflow: scroll">
                <div
                    id="docs-info-form-disclaimer"
                    style="color: #ffffff; font-size: 16px; font-weight: bold; margin-top: 10px; margin-bottom: 10px;">
                        Please fill the form below to see documentation:
                </div>

                <div
                    id="docs-schedule-call-form-content"
                    style="background-color: #222222; padding-top: 20px; padding-bottom: 20px; padding-left: 40px; padding-right: 40px;
                        display: flex; flex-direction: column; border-radius: 12px; width: 36vw; border-box; -moz-box-sizing: border-box;
                        -webkit-box-sizing: border-box; height: calc(100% - 20px); overflow: scroll; margin-top: 10px; border-bottom-right-radius: 0px;
                        border-bottom-left-radius: 0px">
                        ${getInfoFormContent()}
                </div>
        </div>
    `;

    let container = document.getElementsByTagName("body")[0];
    if ( container !== null ) {
        container.insertAdjacentHTML("beforeend", form);
    }

    let howYouFoundUsRadios = document.getElementsByName("how-find");
    for (let i = 0; i < howYouFoundUsRadios.length; i ++) {
        let current = howYouFoundUsRadios[i];
        current.addEventListener("change", () => {
            if (current.checked && current.id === "how-find-other") {
                let otherInput = document.getElementById("docs-schedule-call-form-how-other");
                if (otherInput !== null) {
                    otherInput.style.display = "block";
                }
            } else {
                let otherInput = document.getElementById("docs-schedule-call-form-how-other");
                if (otherInput !== null) {
                    otherInput.style.display = "none";
                }
            }

            if (current.checked) {
                enableSubmitIfRequired();
            }
        });
    }

    let whyUseSupertokensRadios = document.getElementsByName("use-for");
    for (let i = 0; i < whyUseSupertokensRadios.length; i++) {
        let current = whyUseSupertokensRadios[i];
        current.addEventListener("change", () => {
            if (current.checked) {
                enableSubmitIfRequired();
            }
        });
    }

    let emailInput = document.getElementById("docs-schedule-call-form-email");
    if (emailInput !== null) {
        emailInput.addEventListener("input", () => {
            enableSubmitIfRequired();
        });
    }

    let nameInput = document.getElementById("docs-schedule-call-form-name");
    if (nameInput !== null) {
        nameInput.addEventListener("input", () => {
            enableSubmitIfRequired();
        });
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
        getGithubUrl(),
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

function addChatIfRequired() {
    if ( blockedUserIds.indexOf(userIdFromFrame) === -1 && !window.location.origin.includes("test.supertokens.io") ) {
        addChat();
    }
}

function sendWindowOriginToFrame(){
    let iframe = document.getElementById("st-timer-frame");
    if ( iframe !== null && iframe.contentWindow !== null ) {
        iframe.contentWindow.postMessage({
            source: "supertokens-web-source",
            origin: window.location.origin,
            pageUrl: window.location.href,
            messageType: "handshake",
        }, iframeOrigin);
    }
}

function addIframe() {
    let iframe = document.createElement("iframe");
    iframe.id = iframeId;
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

    //---- make additional information part
    let additionalInfo = document.getElementsByClassName("additionalInformation");
    for (let i = 0; i < additionalInfo.length; i++) {
        let splittedCurrPath = window.location.pathname.split("/");
        let imgPath = ["", splittedCurrPath[1], "img", "plus.png"].join("/");
        let curr = additionalInfo[i];
        let time = curr.getAttribute("time");
        let text = curr.getAttribute("text");
        if (time === null && text === null) {
            continue;
        }
        let buttonText = "";
        if (text !== null) {
            buttonText = text;
        } else {
            buttonText = time === "1" ? "Additional 1 min read" : "Additional " + time + " mins read";
        }
        let children = curr.innerHTML.trim();
        let randomID = "additionalInfoRandomId" + i;
        let html = `
        <div class="${randomID}">
            <div style="display: flex">
            <div onClick=clickedAdditionalInfo("${randomID}")>
                <h2 style="color: #ffffff;
                    padding-top: 0px; margin-top: 0px;
                    background-color: #333333;
                    display: flex; cursor: pointer;
                    align-items: center; justify-content: flex-start;
                    padding-left: 10px; padding-right: 10px; border-radius: 6px;">
                    <img src="${imgPath}" style="width: 12px; margin-right: 10px"></img>
                        ${buttonText}
                </h2>
            </div>
            </div>
            <div style="display: none">
                ${children}
            </div>
        </div>
        `;
        curr.innerHTML = html;
    }
    //-------------

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'UA-143540696-1');
    
    let body = document.getElementsByTagName("body")[0];
    addIframe();
    addInfoForm();
    body.style.display = "block";
});

window.addEventListener("message", (e) => {
    if ( typeof e.data === "object" && e.data.source === "st-timer" ) {
        if ( e.data.userId !== undefined ) {
            userIdFromFrame = e.data.userId;
            addChatIfRequired();
        }

        if ( e.data.sessionId !== undefined ) {
            sessionId = e.data.sessionId;
        }

        if ( e.data.showMessage !== undefined ) {
            if ( e.data.showMessage ) {
                showScheduleCallModal();
            }
        }

        if (e.data.type === "show-info-form") {
            showScheduleCallForm();
        }
    }
}, false);

clickedAdditionalInfo = (randomId) => {
    let element = document.getElementsByClassName(randomId)[0];
    let isCollapsed = element.children[1].style.display === "none";
    if (!isCollapsed) {
        let splittedCurrPath = window.location.pathname.split("/");
        let imgPath = ["", splittedCurrPath[1], "img", "plus.png"].join("/");
        element.children[0].children[0].children[0].children[0].src = imgPath;
        element.children[1].style.display = "none";
    } else {
        let splittedCurrPath = window.location.pathname.split("/");
        let imgPath = ["", splittedCurrPath[1], "img", "minus.png"].join("/");
        element.children[0].children[0].children[0].children[0].src = imgPath;
        element.children[1].style.display = "block";
    }
}