(function() {
  // 1. Inject CSS Styles into Webpage Header
  const style = document.createElement('style');
  style.innerHTML = `
    .chatbot-widget-btn { position: fixed; bottom: 20px; right: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; z-index: 10000; transition: transform 0.3s ease; }
    .chatbot-avatar { width: 65px; height: 65px; background: linear-gradient(135deg, #0056b3, #003366); border-radius: 50%; box-shadow: 0px 4px 15px rgba(0,0,0,0.25); display: flex; justify-content: center; align-items: center; border: 3px solid #ffffff; outline: 2px solid #0056b3; margin: 0 auto; }
    .chatbot-label { background: #ffffff; color: #0056b3; font-weight: bold; font-size: 12px; padding: 6px 14px; border-radius: 20px; box-shadow: 0px 2px 8px rgba(0,0,0,0.15); margin-top: 8px; border: 1px solid #0056b3; white-space: nowrap; text-align: center; }
    .chatbot-widget-btn:hover { transform: translateY(-3px); }
    .chat-close-btn { background: transparent; border: none; color: white; font-size: 18px; font-weight: bold; cursor: pointer; }
    .chat-input-wrapper { padding: 12px; background: #ffffff; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; }
    .chat-input-container { display: flex; align-items: center; background: #fff; border: 1px solid #ccc; border-radius: 30px; padding: 3px 4px 3px 15px; }
    .chat-input-container:focus-within { border-color: #0056b3; }
    #user-input { flex: 1; border: none; background: transparent; font-size: 14px; outline: none; padding: 5px 0; }
    .send-text-btn { background: #0056b3; color: white; border: none; border-radius: 20px; padding: 6px 16px; font-weight: bold; cursor: pointer; }
  `;
  document.head.appendChild(style);

  // 2. Inject HTML UI elements into Webpage Body
  const widgetContainer = document.createElement('div');
  widgetContainer.innerHTML = `
    <!-- Chatbot Floating Icon -->
    <div class="chatbot-widget-btn" id="dwss-bot-launcher">
      <div class="chatbot-avatar">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12V18C2 19.1 2.9 20 4 20H7C8.1 20 9 19.1 9 18V14C9 12.9 8.1 12 7 12H4C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12H17C15.9 12 15 12.9 15 14V18C15 19.1 15.9 20 17 20H20C21.1 20 22 19.1 22 18V12C22 6.48 17.52 2 12 2Z" fill="#ffffff"/>
          <circle cx="12" cy="12" r="2.5" fill="#fbc02d"/>
        </svg>
      </div>
      <div class="chatbot-label">ਸੇਵਾਵਾਂ ਦੀ ਸੰਖੇਪ ਜਾਣਕਾਰੀ</div>
    </div>

    <!-- Chat Box UI -->
    <div id="dwss-chat-box" style="display: none; position: fixed; bottom: 110px; right: 20px; width: 350px; height: 420px; background: white; border: 1px solid #ccc; border-radius: 16px; box-shadow: 0px 5px 20px rgba(0,0,0,0.15); z-index: 10001; overflow: hidden;">
      <div style="background: #0056b3; color: white; padding: 10px 14px; border-top-left-radius: 16px; border-top-right-radius: 16px; font-weight: bold; font-size: 15px; display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          Chatbot<br>
          <span style="font-size: 12px; font-weight: normal;">ਜਲ ਸਪਲਾਈ ਅਤੇ ਸੈਨੀਟੇਸ਼ਨ ਵਿਭਾਗ, ਪੰਜਾਬ</span>
        </div>
        <button class="chat-close-btn" id="dwss-bot-close">✖</button>
      </div>
      <div id="chat-messages" style="height: 290px; background: #3a77b4; padding: 10px; overflow-y: auto; font-size: 14px; white-space: pre-line;">
        <p style="background: #e9ecef; padding: 10px; border-radius: 8px; line-height: 1.5; margin: 0;"><b>Chatbot:</b>\n\n<b>ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ, ਜਲ ਸਪਲਾਈ ਅਤੇ ਸੈਨੀਟੇਸ਼ਨ ਵਿਭਾਗ, ਪੰਜਾਬ ਦੇ Chat bot ਵਿਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।</b>\n\nਵਿਭਾਗ ਦੀਆਂ ਹੇਠ ਲਿਖੀਆਂ services ਬਾਰੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ:\n\n1. ਪਾਣੀ ਦਾ ਨਵਾਂ ਕੁਨੈਕਸ਼ਨ ਲਗਵਾਉਣਾ\n2. ਪਾਣੀ ਦੀ ਸ਼ਿਕਾਇਤ ਦਰਜ਼ ਕਰਵਾਉਣਾ\n3. ਘਰ ਵਿਚ ਲੈਟਰੀਨ (ਫਲੱਸ਼) ਲਈ ਅਪਲਾਈ ਕਰਨਾ\n\n<b>Press a number:</b></p>
      </div>
      <div class="chat-input-wrapper">
        <div class="chat-input-container">
          <input type="text" id="user-input" placeholder="ਨੰਬਰ 1, 2, 3 ਜਾਂ 0 ਲਿਖੋ..." />
          <button class="send-text-btn" id="dwss-send-btn">ਭੇਜੋ</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(widgetContainer);

  // 3. Logic & Functions
  const RETURN_FOOTER = "\n\n-------------------------\n🔄 <b>Main Menu 'ਤੇ ਵਾਪਸ ਜਾਣ ਲਈ 0 ਦਬਾਓ।</b>";

  function toggleChat() {
    var box = document.getElementById("dwss-chat-box");
    box.style.display = box.style.display === "none" ? "block" : "none";
  }

  function getMainMenu() {
    return `<b>ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ, ਜਲ ਸਪਲਾਈ ਅਤੇ ਸੈਨੀਟੇਸ਼ਨ ਵਿਭਾਗ, ਪੰਜਾਬ ਦੇ Chat bot ਵਿਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।</b>\n\nਵਿਭਾਗ ਦੀਆਂ ਹੇਠ ਲਿਖੀਆਂ services ਬਾਰੇ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ:\n\n1. ਪਾਣੀ ਦਾ ਨਵਾਂ ਕੁਨੈਕਸ਼ਨ ਲਗਵਾਉਣਾ\n2. ਪਾਣੀ ਦੀ ਸ਼ਿਕਾਇਤ ਦਰਜ਼ ਕਰਵਾਉਣਾ\n3. ਘਰ ਵਿਚ ਲੈਟਰੀਨ (ਫਲੱਸ਼) ਲਈ ਅਪਲਾਈ ਕਰਨਾ\n\n<b>Press a number:</b>`;
  }

  function getNewConnectionInfo() {
    return `<b>ਸਰਵਿਸ 1: ਨਵਾਂ ਪਾਣੀ ਦਾ ਕੁਨੈਕਸ਼ਨ ਲੈਣ ਲਈ</b>\n\n<b>1.1 ਵੇਰਵਾ:</b> ਨਵੇਂ ਘਰੇਲੂ ਜਾਂ ਕਮਰਸ਼ੀਅਲ ਪਾਣੀ ਦੇ ਕੁਨੈਕਸ਼ਨ ਲਈ ਅਪਲਾਈ ਕਰਨ ਦੀ ਪ੍ਰਕਿਰਿਆ।\n\n<b>1.2 ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ:</b>\n- ਆਧਾਰ ਕਾਰਡ ਜਾਂ ਪਛਾਣ ਪੱਤਰ\n\n<b>1.3 ਤਰੀਕਾ:</b>\n- ਸੇਵਾ ਕੇਂਦਰ ਜਾ ਕੇ ਅਪਲਾਈ ਕਰੋ।\n- ਸੰਬੰਧਿਤ JE ਵੈਰੀਫਾਈ ਕਰੇਗਾ।\n- ਸੇਵਾ ਕੇਂਦਰ ਵਿਚ 100 ਰੁ: ਫੀਸ ਲੱਗੇਗੀ।\n\n<b>1.4 ਸਰਵਿਸ ਦਾ ਸਮਾਂ:</b>\n- 7 ਦਿਨ (ਕੰਮ ਵਾਲੇ)` + RETURN_FOOTER;
  }

  function getComplaintInfo() {
    return `<b>ਸਰਵਿਸ 2: ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰਵਾਉਣਾ (Grievance Redressal)</b>\n\n<b>2.1 ਵੇਰਵਾ:</b> ਲੀਕੇਜ, ਗੰਦੇ ਪਾਣੀ ਜਾਂ ਬਿੱਲ ਸਬੰਧੀ ਸ਼ਿਕਾਇਤ।\n\n<b>2.2 ਹੈਲਪਲਾਈਨ ਨੰਬਰ:</b> 1800-180-2468\n\n<b>2.3 ਪ੍ਰੋਸੈਸ:</b> ਟੋਲ-ਫ੍ਰੀ ਨੰਬਰ 'ਤੇ ਕਾਲ ਕਰੋ ਜਾਂ ਵਿਭਾਗ ਦੀ ਵੈਬਸਾਈਟ <a href="https://dwss.punjab.gov.in/" target="_blank" style="color: #0056b3; text-decoration: underline;">https://dwss.punjab.gov.in/</a> 'ਤੇ ਕੰਪਲੇਂਟ ਦਰਜ਼ ਕਰਵਾਓ।` + RETURN_FOOTER;
  }

  function getToiletAppInfo() {
    return `<b>ਸਰਵਿਸ 3: ਘਰ ਵਿਚ ਲੈਟਰੀਨ (ਫਲੱਸ਼/ਪਖ਼ਾਨਾ) ਲਈ ਵਿੱਤੀ ਸਹਾਇਤਾ</b>\n\n<b>3.1 ਵੇਰਵਾ:</b> ਘਰ ਵਿਚ ਲੈਟਰੀਨ ਬਨਾਉਣ ਲਈ 15000 ਰੁਪਏ ਦੀ ਵਿੱਤੀ ਸਹਾਇਤਾ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ।\n\n<b>3.2 ਆਨ-ਲਾਈਨ ਅਪਲਾਈ ਲਿੰਕ:</b>\n<a href="https://sbm.gov.in/sbm_dbt/secure/login.aspx" target="_blank" style="color: #0056b3; text-decoration: underline;">https://sbm.gov.in/sbm_dbt/secure/login.aspx</a>` + RETURN_FOOTER;
  }

  function getInvalidOptionMsg() {
    return `<span style="color: red; font-weight: bold;">ਗਲਤ ਚੋਣ! ਕਿਰਪਾ ਕਰਕੇ ਹੇਠਾਂ ਦਿੱਤੇ ਨੰਬਰਾਂ ਵਿੱਚੋਂ ਇੱਕ ਚੁਣੋ:</span>\n\n1. ਪਾਣੀ ਦਾ ਨਵਾਂ ਕੁਨੈਕਸ਼ਨ ਲਗਵਾਉਣਾ\n2. ਪਾਣੀ ਦੀ ਸ਼ਿਕਾਇਤ ਦਰਜ਼ ਕਰਵਾਉਣਾ\n3. ਘਰ ਵਿਚ ਲੈਟਰੀਨ (ਫਲੱਸ਼) ਲਈ ਅਪਲਾਈ ਕਰਨਾ\n0. Main Menu`;
  }

  function processMessage() {
    let input = document.getElementById("user-input");
    let msg = input.value.trim().toLowerCase();
    if (!msg) return;

    let chatBox = document.getElementById("chat-messages");
    chatBox.innerHTML += `<p style="background: #d1e7dd; padding: 8px 12px; border-radius: 8px; text-align: right; margin: 6px 0;"><b>You:</b> ${input.value}</p>`;
    input.value = "";

    let reply = "";
    if (["0", "hi", "hello", "hey", "start", "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ"].includes(msg) || msg.includes("menu")) {
      reply = getMainMenu();
    } else if (msg === "1" || msg.includes("ਕੁਨੈਕਸ਼ਨ")) {
      reply = getNewConnectionInfo();
    } else if (msg === "2" || msg.includes("ਸ਼ਿਕਾਇਤ")) {
      reply = getComplaintInfo();
    } else if (msg === "3" || msg.includes("ਫਲੱਸ਼") || msg.includes("ਲੈਟਰੀਨ")) {
      reply = getToiletAppInfo();
    } else {
      reply = getInvalidOptionMsg();
    }

    chatBox.innerHTML += `<p style="background: #e9ecef; padding: 10px; border-radius: 8px; margin: 6px 0;"><b>AI Assistant:</b>\n${reply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Event Listeners
  document.getElementById("dwss-bot-launcher").addEventListener("click", toggleChat);
  document.getElementById("dwss-bot-close").addEventListener("click", toggleChat);
  document.getElementById("dwss-send-btn").addEventListener("click", processMessage);
  document.getElementById("user-input").addEventListener("keypress", function(e) {
    if (e.key === 'Enter') processMessage();
  });
})();
