document.addEventListener('DOMContentLoaded', function() {
    const popups = {
        popup1: new Popup({
            id: "popup1",
            title: "",
            content: `
                1. We've moved our TV shows to {a-https://dash-tv.com}[Dash TV].
                2. Go to {a-https://dash-tv.com}[dash-tv.com] and start watching.
                3. Download Dash TV app {a-https://www.mediafire.com/file/o4w5p75zp2bzrau/Dash-TV.apk/file}[here].
                `,
            backgroundColor: "#000",
            titleColor: "#fff",
            textColor: "#fff",
            closeColor: "#fff",
            borderWidth: ".2em",
            borderColor: "#fff",
            linkColor: "#fff",
            fontSizeMultiplier: 1.2,
            titleMargin: "4%",
            underlineLinks: true,
        }),
        popup2: {
            id: "popup2",
            redirectUrl: "https://freedomwall.top", // Replace with your desired URL
            showCountdown: function() {
                popups.countdown.show(); // Show countdown popup
                setTimeout(() => {
                    window.location.href = this.redirectUrl;
                }, 3000); // Redirect after 3 seconds
            }
        },
        popup3: new Popup({
            id: "popup3",
            title: "",
            content: `
                Dashflix does not store any files on our servers. We only provide links to media hosted on third-party services. For more details, please refer to our <a href="terms.html">Terms of Service</a>.
                `,
            sideMargin: "2.9vw",
            titleColor: "#fff",
            textColor: "#fff",
            backgroundColor: "#222",
            closeColor: "#fff",
            fontSizeMultiplier: 1.2,
            linkColor: "#888",
        }),
        popup4: {
            id: "popup4",
            redirectUrl: "tvplus.html", // Replace with your desired URL
            redirect: function() {
                window.location.href = this.redirectUrl;
            }
        },
        popup5: {
            id: "popup5",
            redirectUrl: "request.html", // Replace with your desired URL
            redirect: function() {
                window.location.href = this.redirectUrl;
            }
        },
        popup6: {
            id: "popup6",
            redirectUrl: "requested.html", // Replace with your desired URL
            redirect: function() {
                window.location.href = this.redirectUrl;
            }
        },
        popup7: {
            id: "popup7",
            redirectUrl: "appdown.html", // Replace with your desired URL
            redirect: function() {
                window.location.href = this.redirectUrl;
            }
        },
        popup8: new Popup({
            id: "popup8",
            title: "",
            backgroundColor: "#FF0000",
            titleColor: "#FFF",
            textColor: "#FFF",
            closeColor: "#FFF",
            linkColor: "#FFF",
            underlineLinks: "true",
            fontSizeMultiplier: 1.2,
            titleMargin: "2em",
            content: `
            This page features content meant for mature audiences. Are you sure you want to continue?
            big-margin§If you know what you're doing,
            {a-login.html}[click here to proceed].`,
            borderWidth: ".2em",
            borderColor: "#FFF",
        }),
        countdown: new Popup({
            id: "countdown",
            title: "",
            content: "You will be redirected shortly. Please wait...",
            backgroundColor: "#000",
            titleColor: "#fff",
            textColor: "#fff",
            closeColor: "#fff",
            borderWidth: ".2em",
            borderColor: "#fff",
            fontSizeMultiplier: 1.2,
        })
    };

    document.querySelectorAll('.popup-btn').forEach(button => {
        button.addEventListener('click', function() {
            const popupId = this.getAttribute('data-popup');
            if (popupId === 'popup2') {
                popups.popup2.showCountdown();
            } else if (popups[popupId]) {
                popups[popupId].show();
            }
        });
    });

    document.querySelectorAll('.popup-btn').forEach(button => {
          button.addEventListener('click', function() {
              const popupId = this.getAttribute('data-popup');
              if (popupId === 'popup4') {
                  popups.popup4.redirect();
              } else if (popups[popupId]) {
                  popups[popupId].show();
              }
          });
      });
      document.querySelectorAll('.popup-btn').forEach(button => {
            button.addEventListener('click', function() {
                const popupId = this.getAttribute('data-popup');
                if (popupId === 'popup5') {
                    popups.popup5.redirect();
                } else if (popups[popupId]) {
                    popups[popupId].show();
                }
            });
        });
        document.querySelectorAll('.popup-btn').forEach(button => {
              button.addEventListener('click', function() {
                  const popupId = this.getAttribute('data-popup');
                  if (popupId === 'popup6') {
                      popups.popup6.redirect();
                  } else if (popups[popupId]) {
                      popups[popupId].show();
                  }
              });
          });
          document.querySelectorAll('.popup-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const popupId = this.getAttribute('data-popup');
                    if (popupId === 'popup7') {
                        popups.popup7.redirect();
                    } else if (popups[popupId]) {
                        popups[popupId].show();
                    }
                });
            });
});
