document.addEventListener('DOMContentLoaded', function() {
    const popups = {
      popup1: {
          id: "popup1",
          redirectUrl: "shows.html", // Replace with your desired URL
          redirect: function() {
              window.location.href = this.redirectUrl;
          }
      },
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
        popup3: {
            id: "popup3",
            redirectUrl: "https://kabayan.top", // Replace with your desired URL
            showCountdown: function() {
                popups.countdown.show(); // Show countdown popup
                setTimeout(() => {
                    window.location.href = this.redirectUrl;
                }, 3000); // Redirect after 3 seconds
            }
        },
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
            redirectUrl: "donate.html", // Replace with your desired URL
            redirect: function() {
                window.location.href = this.redirectUrl;
            }
        },
        popup7: {
            id: "popup7",
            redirectUrl: "https://dashtoons.xyz", // Replace with your desired URL
            showCountdown: function() {
                popups.countdown.show(); // Show countdown popup
                setTimeout(() => {
                    window.location.href = this.redirectUrl;
                }, 3000); // Redirect after 3 seconds
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
              if (popupId === 'popup1') {
                  popups.popup1.redirect();
              } else if (popups[popupId]) {
                  popups[popupId].show();
              }
          });
      });

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
              if (popupId === 'popup3') {
                  popups.popup3.showCountdown();
              } else if (popups[popupId]) {
                  popups[popupId].show();
              }
          });
      });
      document.querySelectorAll('.popup-btn').forEach(button => {
          button.addEventListener('click', function() {
              const popupId = this.getAttribute('data-popup');
              if (popupId === 'popup7') {
                  popups.popup7.showCountdown();
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
});
