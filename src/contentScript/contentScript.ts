(() => {
  // Container for update status task
  const updateStatusTask = document.getElementById("update_status_task");

  // Custom button bar (Includes 3 buttons: Follow, Comment and Log)
  const buttonBar = document.querySelector(
    ".pull-right.bc-pull-right-custom"
  ) as HTMLElement;

  // Form add comment
  const formAddComment = document.getElementById("form_add_comment");

  // Log time popup
  let logTimePopup;
  if (document.getElementsByClassName("log-time-popup")?.length === 1) {
    logTimePopup = document.getElementsByClassName("log-time-popup")[0];
  }

  // Update comment popup
  let updateCommentPopup;
  if (document.getElementsByClassName("update-comment").length === 1) {
    updateCommentPopup = document.getElementsByClassName("update-comment")[0];
  }

  // Log time date
  const logTimeDate = document.getElementById(
    "bc_date_start"
  ) as HTMLInputElement;

  const navbar = document.querySelector(".nav.navbar-nav.navbar-right");

  // Field change assignee
  let fieldChangeAssignee;
  const tmp = Array.from(
    document.querySelectorAll("#task_view_detail .bc-view-pp-right")
  ).filter(
    (e) => e.querySelector(".bc-detal-task-title span").innerHTML === "People"
  );
  if (tmp?.length === 1) {
    fieldChangeAssignee = Array.from(
      tmp[0].querySelectorAll(".bc-title-inner")
    ).filter((e) => e.innerHTML === "Assignee: ");
  }
  if (fieldChangeAssignee?.length === 1) {
    fieldChangeAssignee = fieldChangeAssignee[0].parentNode;
  }

  function addChangeAssigneeToButtonBar() {
    if (!fieldChangeAssignee) return;

    fieldChangeAssignee.style.position = "fixed";
    fieldChangeAssignee.style.width = "25%";
    fieldChangeAssignee.style.display = "flex";
    fieldChangeAssignee.style.gap = "16px";
    fieldChangeAssignee.style.borderBottomRightRadius = "6px";
    fieldChangeAssignee.style.justifyContent = "flex-end";
    fieldChangeAssignee.style.top = "218px";
    fieldChangeAssignee.style.right = "16px";
    fieldChangeAssignee.style.backgroundImage =
      "linear-gradient(to right, rgba(0, 0, 255, 0), rgb(160, 175, 255))";
    fieldChangeAssignee.style.zIndex = 999;
    fieldChangeAssignee.style.fontWeight = 700;
    fieldChangeAssignee.style.padding = "6px 20px 12px 0px";
  }

  /**
   * Toggle element's display property between 'block' and 'none'
   *
   * @param {*} element
   */
  function toggleDisplay(element) {
    if (element) {
      if (element.style.visibility === "visible") {
        element.style.opacity = 0;
        element.style.visibility = "hidden";
      } else {
        element.style.opacity = 1;
        element.style.visibility = "visible";
      }
    }
  }

  /**
   * Style fixed position at bottom right of the window for dialog elements
   *
   * @param {*} element
   */
  function styleFixedDialog(element, height = 500) {
    if (element) {
      element.style.position = "fixed";
      element.style.top = "unset";
      element.style.right = 0;
      element.style.bottom = 0;
      element.style.left = "unset";
      element.style.transform = "none";
      element.style.maxWidth = "100%";
      element.style.width = "1892px";
      element.style.zIndex = "999";
      element.style.height = `${height}px`;
    }
  }

  function customPositionUpdateTaskStatus() {
    if (!updateStatusTask) return;

    const parentNode = updateStatusTask.parentNode as HTMLElement;

    parentNode.classList.add("change-task-status-container");
  }

  function customPositionButtonBar() {
    if (!buttonBar) return;

    if (!updateStatusTask) {
      buttonBar.style.borderBottomRightRadius = "6px";
      buttonBar.style.paddingBottom = "12px";
    }

    if (!formAddComment) return;

    styleFixedDialog(formAddComment);

    // Add button toggle comment dialog to Custom button bar
    const customCommentButton = document.createElement("span");
    if (!customCommentButton) return;
    customCommentButton.classList.add("btn", "btn-update", "show-add-comment");
    customCommentButton.innerText = "Comment";
    customCommentButton.addEventListener("click", () => {
      toggleDisplay(formAddComment);
    });
    buttonBar.insertBefore(
      customCommentButton,
      buttonBar.querySelector(".log-time")
    );
  }

  /**
   * Add close button to Form add comment
   */
  function addCloseButtonToFormAddComment() {
    if (!formAddComment) return;

    const buttonCancel = document.createElement("span");
    buttonCancel.classList.add("cancel");
    buttonCancel.innerText = "X";
    buttonCancel.addEventListener("click", () => {
      toggleDisplay(formAddComment);
    });
    const contentPart = formAddComment.querySelector(".grid-content");
    if (!contentPart) return;

    contentPart.insertBefore(buttonCancel, contentPart.firstChild);
  }

  /**
   * Custom layout for Log time popup (Wrap 3 first fields in a horizontal flex div)
   */
  function customLogTimePopupLayout() {
    if (!logTimePopup) return;

    let rows = logTimePopup.getElementsByClassName("formRow");
    if (!rows) return;
    rows = Array.from(rows);

    const rowsToGroup = rows.filter(
      (row) =>
        row.querySelector("#time_spent") !== null ||
        row.querySelector("#log_type") !== null ||
        row.querySelector("#bc_date_start") !== null
    );
    const wrapperDiv = document.createElement("div");
    wrapperDiv.style.width = "30%";
    wrapperDiv.style.display = "flex";
    wrapperDiv.style.flexDirection = "column";
    wrapperDiv.style.gap = "16px";
    rowsToGroup.forEach((row) => {
      row.style.float = "none";
      wrapperDiv.appendChild(row);
    });
    if (logTimePopup.getElementsByClassName("cancel").length === 1) {
      logTimePopup
        .getElementsByClassName("cancel")[0]
        ?.insertAdjacentElement("afterend", wrapperDiv);
    }

    const buttonLogTimePopupSubmit = logTimePopup.querySelector(
      ".btn.btn-success.btn-success-log"
    );

    if (!buttonLogTimePopupSubmit) {
      return;
    }

    // Move buttonLogTimePopupSubmit to wrapperDiv
    wrapperDiv.appendChild(buttonLogTimePopupSubmit);

    if (!logTimeDate) return;
    const currentTime = new Date()
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/\//g, "-")
      .replace(",", "");
    logTimeDate.value = currentTime;
  }

  /**
   * Add button scroll to bottom
   */
  function addToBottomButton() {
    const scrollToBottomButton = document.createElement("span");
    scrollToBottomButton.id = "toBotBtn";

    scrollToBottomButton.addEventListener("click", scrollToBottom);

    document.body.appendChild(scrollToBottomButton);

    function toggleScrollToBottomButton() {
      if (
        window.scrollY <
        document.documentElement.scrollHeight - window.innerHeight
      ) {
        scrollToBottomButton.style.visibility = "visible";
        scrollToBottomButton.style.opacity = "1";
      } else {
        scrollToBottomButton.style.visibility = "hidden";
        scrollToBottomButton.style.opacity = "0";
      }
    }

    function scrollToBottom() {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }

    toggleScrollToBottomButton();

    window.onscroll = function () {
      toggleScrollToBottomButton();
    };
  }

  function addTaskNameToNavBar() {
    const taskName = document.querySelector("span.block_task_name");

    if (!taskName) {
      return;
    }

    if (!navbar) {
      return;
    }

    const taskNameSpan = document.createElement("div");
    taskNameSpan.style.fontWeight = "bold";
    taskNameSpan.style.padding = "10px 20px";
    taskNameSpan.style.fontSize = "18px";
    taskNameSpan.style.minWidth = "25%";
    taskNameSpan.style.textAlign = "right";
    taskNameSpan.style.position = "fixed";
    taskNameSpan.style.top = "62px";
    taskNameSpan.style.right = "16px";
    taskNameSpan.style.backgroundImage =
      "linear-gradient(to right, rgba(0, 0, 255, 0), rgb(160, 175, 255))";
    taskNameSpan.style.zIndex = "999";
    taskNameSpan.style.borderBottom = "2px dashed #fff";
    taskNameSpan.innerHTML = taskName.innerHTML;

    navbar.appendChild(taskNameSpan);
  }

  customPositionUpdateTaskStatus();

  customPositionButtonBar();

  addCloseButtonToFormAddComment();

  styleFixedDialog(logTimePopup, 440);

  styleFixedDialog(updateCommentPopup);

  customLogTimePopupLayout();

  addToBottomButton();

  addChangeAssigneeToButtonBar();

  addTaskNameToNavBar();

  // Change dialogs' background images
  function changeDialogBgImages(imageUrl) {
    if (!formAddComment) return;
    const formAddCommentBgContainer = formAddComment.querySelector(
      ".grid.create-task-custom"
    ) as HTMLElement;
    if (!formAddCommentBgContainer) return;

    if (!updateCommentPopup) return;
    const updateCommentPopupBgContainer = updateCommentPopup.querySelector(
      ".grid.create-task-custom"
    );
    if (!updateCommentPopupBgContainer) return;

    if (!logTimePopup) return;
    const logTimePopupBgContainer = logTimePopup.querySelector(
      ".grid.create-task-custom"
    );
    if (!logTimePopupBgContainer) return;

    formAddCommentBgContainer.style.backgroundRepeat = "no-repeat";
    formAddCommentBgContainer.style.backgroundPosition = "left top";
    formAddCommentBgContainer.style.backgroundImage = `url("${imageUrl}")`;
    updateCommentPopupBgContainer.style.backgroundRepeat = "no-repeat";
    updateCommentPopupBgContainer.style.backgroundPosition = "left top";
    updateCommentPopupBgContainer.style.backgroundImage = `url("${imageUrl}")`;
    logTimePopupBgContainer.style.backgroundRepeat = "no-repeat";
    logTimePopupBgContainer.style.backgroundPosition = "left top";
    logTimePopupBgContainer.style.backgroundImage = `url("${imageUrl}")`;
  }

  function gotMessage(message, sender, sendResponse) {
    const backgroundImageUrl = message.backgroundImageUrl;

    if (!backgroundImageUrl) return;

    localStorage.setItem("custom_pms_dialog_bg", backgroundImageUrl);

    changeDialogBgImages(backgroundImageUrl);
  }

  chrome.runtime.onMessage.addListener(gotMessage);

  function getDialogBackgroundFromLocalStorage() {
    const bgImage =
      localStorage.getItem("custom_pms_dialog_bg") ||
      'url("https://res.cloudinary.com/dmnntmjiv/image/upload/v1702635528/anime-girl_l6n5sg.png")';

    changeDialogBgImages(bgImage);
  }

  getDialogBackgroundFromLocalStorage();
})();
