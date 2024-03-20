/**
 * 发送 Ajax 请求
 * @param {Object} options - Request Configuration Object
 * @param {string} options.method - Request method, default to GET
 * @param {string} options.url - Request URL
 * @param {Object} options.headers - Request header object
 * @param {string|Object} options.data - Request body data, which can be strings or objects
 * @param {string} options.dataType - Response data type, can be 'text' or 'JSON', default to 'text'
 * @param {function} options.success - Request successful callback function, receiving response data as parameters
 * @param {function} options.error - Request failure callback function, receiving status code and status text as parameters
 */
function ajax(options) {
  // Create an XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set request method and URL
  xhr.open(options.method || 'GET', options.url);

  // Set request header
  if (options.headers) {
    for (var header in options.headers) {
      console.log(header, options.headers[header])
      xhr.setRequestHeader(header, options.headers[header]);
    }
  }

  // Listening for readyState change events
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // Request completed, processing response
      var response = xhr.responseText;
      if (options.dataType === 'json') {
        response = JSON.parse(response);
      }
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
        // Request successful
        options.success && options.success(response);
      } else {
        // request failure
        options.error && options.error(xhr.status, xhr.statusText);
      }
    }
  };

  // Send request
  xhr.send(options.data || null);
}





// Step 1: Build a constructor that carries the parameters of a JSON object, which refers to the content in curly braces
function Page(json) {
  this.option = {
    count: 100,//Total data
    pagenum: 10,//Number of data displayed per page
    pageindex: 5//Number of page numbers displayed per page
  }
  Object.assign(this.option, json.data);
  this.callback = json.callback;
  //The dom element pointed to by this. target, obtaining the element
  this.target = document.querySelector(json.el);
  //Step 3, dynamically generate li in ul based on the data in the option, and the data in the option will be dynamically requested at that time
  this.showpageindex = 1;//The displayed page uses the checked class attribute
  //Step 2: After obtaining the dom element, create a virtual dom, generate a page, and use encapsulation functions to generate calls
  this.creat();
  this.creatdata();
  // this.clickevent();
}
Page.prototype.clickevent = function () {
  this.prev.className = 'checked';
  this.next.className = 'checked';
  this.prev.onclick = "";
  this.next.onclick = "";
  //Here are two layers of functions, and it is important to note the issue of this pointer pointing
  if (this.showpageindex != 1) {
    this.prev.onclick = () => {
      this.showpageindex--;
      this.creatdata();
    }
    this.prev.className = "";
  }
  if (this.showpageindex != this.maxShowNum) {
    this.next.onclick = () => {
      this.showpageindex++;
      this.creatdata();
    }
    this.next.className = "";
    //Can switch pages, but will generate duplicate dom elements
  }
}


Page.prototype.creatdata = function () {
  var middle = Math.floor(this.option.pageindex / 2);//Round Down
  var start = 1;
  var maxShowNum = Math.ceil(this.option.count / this.option.pagenum);//Maximum number of pages
  this.maxShowNum = maxShowNum;
  var end = this.option.pageindex;
  end = end > maxShowNum ? maxShowNum : end;//Determine the relationship between the custom end count and the maximum number of pages generated between data to avoid excessive page numbers

  this.content.innerHTML = "";//This step points to the bug issue with the clickevent function. Before generating li, clear the li first

  if (this.showpageindex > middle) {//If the page number with a class is greater than the middle value, because the page number is odd, it is+- the middle value
    start = this.showpageindex - middle;
    end = this.showpageindex + middle;
  }
  if (this.showpageindex > (maxShowNum - middle)) {
    start = maxShowNum - this.option.pageindex + 1;
    end = maxShowNum;
  }
  if (start <= 1) {
    start = 1
  }
  var that = this;
  for (var i = start; i <= end; i++) {
    var li = document.createElement('li');
    li.innerHTML = i;
    if (i == this.showpageindex) {
      li.className = 'checked';
    }
    this.content.appendChild(li);

    li.onclick = function () {
      that.showpageindex = this.innerHTML * 1;
      that.creatdata();
    }
  }
  this.clickevent();
  this.callback(this.showpageindex);
}


//Corresponds to the encapsulation function in the second step
Page.prototype.creat = function () {
  //Create elements and add them to the page
  this.prev = document.createElement('span');
  this.prev.className = 'page-prev';
  this.prev.innerHTML = '上一页';
  this.target.appendChild(this.prev)//Write, appendChild usage

  this.content = document.createElement('ul');
  this.content.className = 'page-content';
  this.target.appendChild(this.content);

  this.next = document.createElement('span');
  this.next.className = 'page-next';
  this.next.innerHTML = '下一页';
  this.target.appendChild(this.next);
}



//Rich Text Editor
/**
*1. Use the editorHtml() method to render the table first
*2. Then execute the JavaScript code editor(), which must be executed after editorHtml()
*3. document. getElementById ("edit").oninput=function(){
*     //val is the value of rich text
 *     let val=document. getElementById ("edit"). innerHTML
}
*/
const editor = () => {

  //Rich Text Editor Class
  class Editor {
    constructor() {
      this.bindElem();
    }
    bindElem() {

      var toolbar = document.getElementById("toolbar");
      var bs = toolbar.querySelectorAll('input,select');
      for (var i = 0; i < bs.length; i++) {
        if (bs[i].tagName.toLowerCase() == 'select') {
          bs[i].onchange = function () {
            document.execCommand(this.name, true, this.value);
          }
        } else if (bs[i].tagName.toLowerCase() == 'input') {
          this.action(bs[i], bs[i].name);
        }
      }


    }

    action(obj, attr) {
      obj.onclick = function () {
        document.execCommand(attr, true);
      }
    }

  }
  new Editor();

}

const editorHtml = (title = "") => {
  return `
      <div class="toolbarTitle" style="display:flex">
      <div style="width:150px; text-align:right;">${title}:</div>
      <div style="width:80%;margin-left:10px;">
      <div id="toolbar"
          style="border-radius: 5px 5px 0 0;width:100%;margin:10px 0 0 0;border:2px solid gray;padding: 5px;overflow: auto;font-family: 'Courier New', Courier, monospace;border-bottom: none;">
          <input  class='tableAdd' type="button" name="bold" value='Bold' class="bold">
          <input  class='tableAdd' type="button" name="italic" value='Italic' class="italic">
          <input  class='tableAdd' type="button" name="underline" value='Underline' class="decotation">
      </div>
      <div id="edit"
          style="width:100%;height:200px;margin:0 0 0 0px;border:2px solid gray;padding: 5px;overflow: auto;"
          contenteditable="true">
      </div>
      </div>
      </div>
      `
  // <button id="save" style="width:300px;height:30px;margin:auto;margin-top:30px;
  // background-color: green;border:1px solid green;display: block;color: white;font-family:'Courier New', Courier, monospace;
  // font-weight: 500;font-size: 20px;">Click</button>
}

//message


// 消息类型
const MessageType = {
  MESSAGE: 'message', //ordinary
  SUCCESS: 'success', // success
  ERROR: 'error', // error
  WARNING: 'warning' // warning
}

// 状态icon图标
const MessageIcons = {
  MESSAGE: 'el-icon-info',
  SUCCESS: 'el-icon-success',
  ERROR: 'el-icon-error',
  WARNING: 'el-icon-warning'
}

// The main color corresponding to the state
const MessageTypeColor = {
  MESSAGE: '#909399',
  SUCCESS: '#67c23a',
  ERROR: '#f56c6c',
  WARNING: '#e6a23c'
}

// Create DOM
const createDom = ({ isId = false, name = '', tag = 'div' }) => {
  if (!tag) {
    return null
  }
  const ele = document.createElement(tag)
  if (name) {
    if (isId) {
      ele.id = name
    } else {
      ele.className = name
    }
  }
  return ele
}

// Obtain the background color corresponding to the type
const getTypeBGColor = type => {
  let bgColor = ''
  switch (type) {
    case MessageType.SUCCESS:
      bgColor = 'background-color: #f0f9eb'
      break
    case MessageType.ERROR:
      bgColor = 'background-color: #f0f9eb'
      break
    case MessageType.WARNING:
      bgColor = 'background-color: #f0f9eb'
      break
    default:
      bgColor = 'background-color: #edf2fc'
      break
  }
  return bgColor
}

// Obtain the background color and text color corresponding to the type
const getTypeDomCss = type => {
  let cssStr = ''
  let commonCss = ''
  switch (type) {
    case MessageType.SUCCESS:
      cssStr = commonCss + `${getTypeBGColor(type)};color: ${MessageTypeColor.SUCCESS};`
      break
    case MessageType.ERROR:
      cssStr = commonCss + `${getTypeBGColor(type)};color: ${MessageTypeColor.ERROR};`
      break
    case MessageType.WARNING:
      cssStr = commonCss + `${getTypeBGColor(type)};color: ${MessageTypeColor.WARNING};`
      break
    default:
      cssStr = commonCss + `${getTypeBGColor(type)};color: ${MessageTypeColor.MESSAGE};`
      break
  }
  return cssStr
}

// Obtain the code of the icon corresponding to the type
const getIconClass = type => {
  let iconClass = ''
  switch (type) {
    case MessageType.SUCCESS:
      iconClass = MessageIcons.SUCCESS
      break
    case MessageType.ERROR:
      iconClass = MessageIcons.ERROR
      break
    case MessageType.WARNING:
      iconClass = MessageIcons.WARNING
      break
    default:
      iconClass = MessageIcons.MESSAGE
      break
  }
  return iconClass
}

// Obtain additional styles for icon icons corresponding to the type
const getTypeIconCss = type => {
  let cssStr = ''
  let commonCss = 'margin-right: 10px;font-size: 20px;'
  switch (type) {
    case MessageType.SUCCESS:
      cssStr = commonCss + `color: ${MessageTypeColor.SUCCESS};`
      break
    case MessageType.ERROR:
      cssStr = commonCss + `color: ${MessageTypeColor.ERROR};`
      break
    case MessageType.WARNING:
      cssStr = commonCss + `color: ${MessageTypeColor.WARNING};`
      break
    default:
      cssStr = commonCss + `color: ${MessageTypeColor.MESSAGE};`
      break
  }
  return cssStr
}

const createMessage = ({ type, content, duration, delay, againBtn, minWidth, maxWidth }, mainContainer) => {
  if (!mainContainer) {
    console.error('主容器不存在，查看调用流程，确保doucument.body已生成!')
    return
  }
/**Random key*/
  const randomKey = Math.floor(Math.random() * (99999 - 10002)) + 10002

  /**Attribute Configuration*/
  const config = {
    isRemove: false, // Has it been removed
    type: type || MessageType.MESSAGE, // type message success error warning
    content: content || '', // Prompt content
    duration: duration || 3000, // display time
    delay: delay || 0, // Popup delay
    timeout: null, // timer event
    againBtn: againBtn || false // Do you need to display the no longer prompt button
  }
  // #Generate DOM, styles, and relationships for region
  const messageContainer = createDom({ name: `message-${randomKey}`, tag: 'div' })
  messageContainer.style = `
  min-width: ${minWidth}px;
  max-width:${maxWidth}px;
  padding: 12px 12px;
  margin-top: -20px;
  border-radius: 4px;
  box-shadow: -5px 5px 12px 0 rgba(204, 204, 204, 0.8);
  ${getTypeBGColor(config.type)};
  animation: all cubic-bezier(0.18, 0.89, 0.32, 1.28) 0.4s;
  transition: all .4s;
  pointer-events: auto;
  overflow:hidden;
  `
  /**内容区域 */
  const messageTypeDom = createDom({ tag: 'div' })
  messageTypeDom.style = getTypeDomCss(config.type)
  // icon
  // const messageTypeIcon = createDom({ name: `icon iconfont ${getIconClass(config.type)}`, tag: 'i' })
  const messageTypeIcon = createDom({ name: `${getIconClass(config.type)}`, tag: 'i' })
  messageTypeIcon.style = getTypeIconCss(config.type)
  /**Text content */
  const messageTypeText = createDom({ tag: 'span' })
  messageTypeText.style = 'font-size: 14px;line-height: 20px;'
  messageTypeText.innerHTML = config.content
  /**Establishing an HTML tree relationship */
  messageTypeDom.appendChild(messageTypeIcon)
  messageTypeDom.appendChild(messageTypeText)
  messageContainer.appendChild(messageTypeDom)
  /**Button that will no longer prompt */
  if (config.againBtn) {
    const messageAgainDiv = createDom({ name: 'message-again-btn', tag: 'div' })
    messageAgainDiv.style = `margin-top: 5px;text-align: right;`
    const messageAgainBtnText = createDom({ name: 'message-again-text', tag: 'span' })
    messageAgainBtnText.innerHTML = "Don't prompt again"
    messageAgainBtnText.style = `
      font-size: 12px;
      color: rgb(204, 201, 201);
      border-bottom: 1px solid rgb(204, 201, 201);
      cursor: pointer;
      `
    // Mouse in
    messageAgainBtnText.onmouseover = () => {
      messageAgainBtnText.style.color = '#fdb906'
      messageAgainBtnText.style.borderBottom = '1px solid #fdb906'
    }
    // Mouse Out
    messageAgainBtnText.onmouseout = () => {
      messageAgainBtnText.style.color = 'rgb(204, 201, 201)'
      messageAgainBtnText.style.borderBottom = '1px solid rgb(204, 201, 201)'
    }
    messageAgainDiv.appendChild(messageAgainBtnText)
    messageContainer.appendChild(messageAgainDiv)
    config.elsAgainBtn = messageAgainBtnText
  }
  mainContainer.appendChild(messageContainer)
  // #endregion

  /**Bind DOM and destroy events for controlling content and status*/
  config.els = messageContainer
  config.destory = destory.bind(this)
  function destory(mainContainer, isClick) {
    if (!config.els || !mainContainer || config.isRemove) {
      // If it does not exist or has been removed, it will not continue
      return
    }
    config.els.style.marginTop = '-20px' // For transitional effects
    config.els.style.opacity = '0' // For transitional effects
    config.isRemove = true
    if (isClick) {
      mainContainer.removeChild(messageContainer)
      _resetMianPosition(mainContainer)
      free()
    } else {
      setTimeout(() => {
        mainContainer.removeChild(messageContainer)
        _resetMianPosition(mainContainer)
        free()
      }, 400)
    }
  }

  // Destroy Reset Binding
  function free() {
    config.els = null
    config.elsAgainBtn = null
    config.destory = null
  }

  return config
}

function _toBindEvents(domConfig, _self) {
  if (!domConfig) {
    return
  }
  // No longer prompt for button event binding
  if (domConfig.againBtn && domConfig.elsAgainBtn) {
    // Mouse click: Record the content and do not display pop-up boxes with the same content next time
    domConfig.elsAgainBtn.onclick = () => {
      clearTimeout(domConfig.timeout)
      let sessionJson = sessionStorage.getItem('MESSAGE_DONT_REMIND_AGAIN')
      let tempArr = sessionJson ? JSON.parse(sessionJson) : []
      let dontRemindAgainList = Array.isArray(tempArr) ? tempArr : []
      dontRemindAgainList.push(domConfig.content)
      sessionStorage.setItem(_self.sessionStorageName, JSON.stringify(dontRemindAgainList))
      domConfig.destory(_self.mainContainer, true)
    }
  }

  // Mouse in: Destroy the destroy timer
  domConfig.els.onmouseover = () => {
    clearTimeout(domConfig.timeout)
  }
  // Mouse out: Destroy the current message in one second
  domConfig.els.onmouseout = () => {
    domConfig.timeout = setTimeout(() => {
      domConfig.destory(_self.mainContainer)
      clearTimeout(domConfig.timeout)
    }, 1000)
  }

  // latency hiding
  domConfig.timeout = setTimeout(() => {
    domConfig.destory(_self.mainContainer)
    clearTimeout(domConfig.timeout)
  }, domConfig.duration)
}

function _resetMianPosition(mainContainer) {
  if (!mainContainer) {
    return
  }
  mainContainer.style.left = `calc(50vw - ${mainContainer.scrollWidth / 2}px)`
}

class messageControl {
  constructor() {
    this.minWidth = 380 // Content display width: minimum value
    this.maxWidth = 800 // Content display width: maximum
    this.top = 45 // Overall Topmost Distance
    this.zIndex = 999 // level
    this.mainContainerIdName = 'selfDefine-message-box' // The id name of the main DOM
    this.sessionStorageName = 'MESSAGE_DONT_REMIND_AGAIN' // Key for storing session information
    /**Generate the main DOM and style container */
    let mainDom = document.getElementById(this.mainContainerIdName)
    if (mainDom) {
      document.body.removeChild(mainDom)
    }
    this.mainContainer = createDom({ isId: true, name: this.mainContainerIdName, tag: 'div' })
    this.mainContainer.style = `
    pointer-events:none;
    position:fixed;
    top:${this.top}px;
    left:calc(50vw - ${this.minWidth / 2}px);
    z-index:${this.zIndex};
    display: flex;
    flex-direction: column;
    align-items:center;
    `
    document.body.appendChild(this.mainContainer)
  }

  /**
   * 消息提示
   * @param {String} type Type | Required | Optional Value：message success error warning
   * @param {String} content Content | mandatory| ''
   * @param {Number} duration Display time | Not mandatory | Default 3000 milliseconds
   * @param {Number} delay The delay that occurs | Not mandatory | Default 0
   * @param {Boolean} againBtn Display no longer prompt button | Not required | Default false
   */
  message(config = {}) {
    //The storage and judgment logic of no longer prompting (the same text content) needs to be optimized
    let sessionJson = sessionStorage.getItem(this.sessionStorageName)
    let dontRemindAgainList = sessionJson ? JSON.parse(sessionJson) : null
    // If the no longer prompt button needs to be displayed, and the content is valid, and the array of records that are no longer prompted contains the current content, no prompt will be given
    if (config.againBtn && config.content && dontRemindAgainList && Array.isArray(dontRemindAgainList) && dontRemindAgainList.includes(config.content)) {
      return
    }

    const domConfig = createMessage(
      {
        type: config.type,
        content: config.content,
        duration: config.duration,
        delay: config.delay,
        againBtn: config.againBtn,
        minWidth: this.minWidth,
        maxWidth: this.maxWidth
      },
      this.mainContainer
    )
    this.mainContainer.appendChild(domConfig.els)
    domConfig.els.style.marginTop = '20px' // For transitional effects
    _resetMianPosition(this.mainContainer)
    _toBindEvents(domConfig, this)
  }

  beforeDestory() {
    if (this.mainContainer && this.mainContainer.remove) {
      this.mainContainer.remove()
    } else {
      document.body.removeChild(this.mainContainer)
    }
    this.mainContainer = null
  }
}

