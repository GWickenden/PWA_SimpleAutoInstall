(function() {
  // Store the beforeinstallprompt event for later triggering.
  let deferredPrompt = null;

  // Listen for the beforeinstallprompt event (Chrome/Android)
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    // If the banner already exists, ensure it's visible (for non-iOS devices).
    const banner = document.getElementById('installBanner');
    if (banner && !isIOS() && !isAppInstalled()) {
      banner.style.display = 'block';
    }
  });

  // Utility: Check if the app is already installed.
  function isAppInstalled() {
    // For iOS devices:
    if (window.navigator.standalone) return true;
    // For modern browsers (Chrome, etc.) supporting display-mode:
    if (window.matchMedia('(display-mode: standalone)').matches) return true;
    return false;
  }

  // Utility: Detect if the device is running iOS.
  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }

  // Create and insert the banner into the DOM.
  function createInstallBanner() {
    // Create CSS for the banner.
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      #installBanner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f9f9f9;
        border-top: 1px solid #ccc;
        padding: 10px;
        text-align: center;
        font-family: sans-serif;
        box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
        display: none;
        z-index: 1000;
      }
      #installBanner button {
        margin-left: 10px;
        padding: 5px 10px;
        font-size: 1em;
      }
    `;
    document.head.appendChild(style);

    // Create the banner elements.
    const banner = document.createElement('div');
    banner.id = 'installBanner';

    const bannerMessage = document.createElement('span');
    bannerMessage.id = 'bannerMessage';

    const installButton = document.createElement('button');
    installButton.id = 'installButton';
    installButton.textContent = 'Install';

    const dismissButton = document.createElement('button');
    dismissButton.id = 'dismissButton';
    dismissButton.textContent = 'Dismiss';

    // Append the message and buttons to the banner.
    banner.appendChild(bannerMessage);
    banner.appendChild(installButton);
    banner.appendChild(dismissButton);
    document.body.appendChild(banner);

    // Set banner content based on platform.
    if (isIOS()) {
      bannerMessage.innerHTML = "<span style='color:black'><b>To install this app:</b><br> Tap the Share button below <svg width='20px' height='20px' id='a' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.34 18.5'><line x1='7.32' y1='.55' x2='7.32' y2='10.61' style='fill:none; stroke:#35549f; stroke-miterlimit:10;'/><line x1='5.09' y1='5.99' x2='.02' y2='5.99' style='fill:none; stroke:#35549f; stroke-miterlimit:10;'/><line x1='14.34' y1='18' x2='.02' y2='18' style='fill:none; stroke:#35549f; stroke-miterlimit:10;'/><line x1='14.34' y1='5.99' x2='9.27' y2='5.99' style='fill:none; stroke:#35549f; stroke-miterlimit:10;'/><line x1='.5' y1='5.99' x2='.5' y2='18' style='fill:none; stroke:#35549f; stroke-miterlimit:10;'/><line x1='13.84' y1='5.99' x2='13.84' y2='18' style='fill:none; stroke:#35549f; stroke-miterlimit:10;'/><line x1='7.64' y1='.35' x2='4.56' y2='3.44' style='fill:none; stroke:#35549f; stroke-miterlimit:10;'/><line x1='6.93' y1='.35' x2='10.02' y2='3.44' style='fill:none; stroke:#35549f; stroke-miterlimit:10;'/></svg><br>Scroll down and tap <svg width='20px' height='20px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14.34 13.01'>  <rect x='.5' y='.5' width='13.34' height='12.01' fill='none' stroke='#3260ad' stroke-miterlimit='10'/>  <line x1='7.17' y1='2.59' x2='7.17' y2='10.41' fill='none' stroke='#3260ad' stroke-miterlimit='10'/>  <line x1='2.71' y1='6.5' x2='11.63' y2='6.5' fill='none' stroke='#3260ad' stroke-miterlimit='10'/></svg> 'Add to Home Screen'.</span><br>";
      // Hide the auto-install button on iOS.
      installButton.style.display = 'none';
    } else {
      bannerMessage.innerHTML = "<span style='color:black'>Install this app for a better experience!</span>";
    }

    // Show the banner.
    banner.style.display = 'block';

    // Install button click event (for browsers that support auto-install).
    installButton.addEventListener('click', function() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function(choiceResult) {
          console.log('User response to the install prompt:', choiceResult.outcome);
          deferredPrompt = null;
          banner.style.display = 'none';
        });
      }
    });

    // Dismiss button click event.
    dismissButton.addEventListener('click', function() {
      banner.style.display = 'none';
    });
  }

  // Initialize the banner if the app is not already installed.
  if (!isAppInstalled()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createInstallBanner);
    } else {
      createInstallBanner();
    }
  }
})();
