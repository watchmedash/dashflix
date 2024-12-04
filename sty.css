.terra {
display: flex;
justify-content: center; /* centers horizontally */
align-items: center; /* centers vertically */
margin-bottom: 5px;
margin-top: 5px;
}

.image-contained {
width: 100%;
max-width: 720px;
overflow: hidden;
}

.image-contained img {
width: 100%;
height: auto;
display: block; /* This ensures the image behaves as a block element */
}

.modal {
    display: none; /* Hidden by default */
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Darker overlay for less intensity */
}

.modal-content {
    background-color: #f9c74f; /* Softer warning yellow */
    margin: 15% auto;
    padding: 20px;
    border: 2px solid #f8b400; /* Softer orange border */
    width: 80%; /* Could be more or less, depending on screen size */
    text-align: center;
    border-radius: 8px; /* Rounded corners */
    color: #333; /* Dark text for readability */
}

input {
    width: 70%; /* Adjust input width */
    padding: 10px;
    border: 1px solid #f8b400; /* Softer orange border */
    border-radius: 4px; /* Rounded corners */
    background-color: #fff; /* White background for input */
    color: #333; /* Dark text color for readability */
}

button {
    padding: 10px 20px;
    background-color: #6c757d; /* Gray button color for a softer touch */
    color: #ffffff; /* Light text color */
    border: none;
    border-radius: 4px; /* Rounded corners */
    cursor: pointer; /* Pointer cursor */
}

button:hover {
    background-color: #5a6268; /* Darker gray shade on hover */
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: #1a1a1a; /* Dark background */
  padding: 5px;
  border-top: 2px solid #333; /* Darker border for contrast */
  z-index: 1000;
  transition: background-color 0.3s ease-in-out;
}

.nav-item {
  color: #e0e0e0; /* Light gray text for better contrast */
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  flex-grow: 1;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out, text-shadow 0.3s ease-in-out; /* Added text-shadow transition */
  position: relative;
}

.nav-item i {
  display: block;
  font-size: 18px;
  margin-bottom: 5px;
  transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Smooth bounce effect */
}

.nav-item:hover {
  color: #ffffff; /* Change color to normal white on hover */
  transform: scale(1.1);
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.6); /* Normal white glow effect */
}

.nav-item:hover i {
  transform: scale(1.4); /* Enlarge the icon */
}

.more-links {
  display: none;
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  background-color: #1a1a1a; /* Dark background */
  padding: 10px;
  border: 1px solid #333; /* Darker border for contrast */
  z-index: 1001;
  opacity: 0;
  transform: translateY(30px); /* More exaggerated start position */
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.more-links a {
  display: block;
  color: #e0e0e0; /* Light gray for links */
  padding: 3px 0;
  text-decoration: none;
  text-align: center;
  transition: color 0.3s ease-in-out, transform 0.3s, text-shadow 0.3s ease-in-out; /* Added text-shadow transition */
}

.more-links a:hover {
  color: #ffffff; /* Light teal color on hover */
  transform: scale(1.05); /* Slight scaling for links */
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.6); /* Normal white glow effect */
}

.more-links.show {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* Adding animation keyframes for attention-drawing effects */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply the animations conditionally */
.more-links.show {
  animation: slideIn 0.5s forwards ease-in-out;
}

.nav-item:hover {
  animation: pulse 1s infinite;
}

/* Additional hover effect for .bottom-nav */
.bottom-nav:hover {
  background-color: #2a2a2a; /* Slightly lighter on hover */
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.4); /* Slight shadow effect on hover */
}
