import { useState } from "react";
import logo from "./assets/IMG_0682.JPEG";
import "./App.css";
import { Menu } from "lucide-react";
import BookingForm from "./components/BookingForm";

function App() {
  const [count, setCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    closeDropdown();
  };

  return (
    <>
      {/* Sticky menu bar */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center bg-primary py-2">
        <div
          className={`dropdown dropdown-center ${
            isDropdownOpen ? "dropdown-open" : ""
          }`}
        >
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 justify-self-center bg-primary"
            onClick={toggleDropdown}
          >
            <Menu color="#DFFE59" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content border-accent border-2 flex flex-col text-secondary text-lg text-center menu max-w-xl bg-primary rounded-box z-[60] w-52 p-2"
          >
            <li>
              <a
                className="text-secondary self-center text-center w-full justify-center cursor-pointer"
                onClick={() => scrollToSection("events")}
              >
                events
              </a>
            </li>
            <li>
              <a
                className="text-secondary self-center text-center w-full justify-center cursor-pointer"
                onClick={() => scrollToSection("private-events")}
              >
                request a private event
              </a>
            </li>
            <li>
              <a
                className="text-secondary self-center text-center w-full justify-center cursor-pointer"
                onClick={() => scrollToSection("about")}
              >
                about us
              </a>
            </li>
            <li>
              <a
                className="text-secondary self-center text-center w-full justify-center cursor-pointer"
                onClick={() => scrollToSection("faqs")}
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content with top padding to account for fixed header */}
      <div className="flex flex-col justify-start min-h-screen items-center">
        <a href="https://vite.dev" target="_blank">
          <img src={logo} className="w-full" alt="Karaoke with Megan logo" />
        </a>

        {/* Events Section */}
        <section id="events" className="w-full max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-secondary mb-8">events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-accent rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  Thursdays at Erin's
                </h3>
                <p className="text-primary mb-4">
                  Join us every Thursday night for karaoke!
                </p>
                <p className="text-sm text-primary">Date: Every Thursday</p>

                <p className="text-sm text-primary">Time: 11:00 PM - close</p>
                <p className="text-sm text-primary">Location: Erin's Pub</p>
              </div>
              <div className="bg-accent rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  Erin's Anniversary Screech In
                </h3>
                <p className="text-primary mb-4">
                  In collaboration with Fogged Up Comedy, we will be hosting a
                  traditional Newfoundland Screech In to celebrate 3 years of
                  Erin's new ownership! Contact our instagram @karaokewithmegan
                  to claim your spot!
                </p>
                <p className="text-sm text-primary">Date: July 24, 2025</p>
                <p className="text-sm text-primary">Time: 11:00 PM</p>
                <p className="text-sm text-primary">Location: Erin's Pub</p>
              </div>
              <div className="bg-accent rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  Christmas in July{" "}
                </h3>
                <p className="text-primary mb-4">
                  Join us for extended anniversary celebrations with karaoke
                  from 9PM to 1AM and then dance the night away with a Christmas
                  dance party.{" "}
                </p>
                <p className="text-sm text-primary">Date: July 27, 2025</p>
                <p className="text-sm text-primary">Time: 9:00 PM - 3:00 AM</p>
                <p className="text-sm text-primary">Location: Erin's Pub</p>
              </div>
            </div>
          </div>
        </section>

        {/* Private Events Section */}
        <section
          id="private-events"
          className="w-full max-w-4xl mx-auto px-6 py-16 bg-secondary rounded-lg"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary mb-8">
              request a private event
            </h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                Looking to host a special celebration? We offer private karaoke
                events for birthdays, corporate parties, and other special
                occasions.
              </p>
              <BookingForm />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-secondary mb-8">about us</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-6">
                Welcome to Karaoke with Megan! We're passionate about bringing
                people together through the joy of music and performance.
                Whether you're a seasoned performer or just looking to have fun
                with friends, our welcoming environment is perfect for everyone.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Professional Equipment
                  </h3>
                  <p className="text-gray-600">
                    State-of-the-art sound systems and microphones
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Huge Song Library
                  </h3>
                  <p className="text-gray-600">
                    Over 10,000 songs from all eras and genres
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    Fun Atmosphere
                  </h3>
                  <p className="text-gray-600">
                    Supportive environment for performers of all levels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section
          id="faqs"
          className="w-full max-w-4xl mx-auto px-6 py-16 bg-gray-50"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-secondary mb-8">faqs</h2>
            <div className="max-w-3xl mx-auto text-left">
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Do I need to make a reservation?
                  </h3>
                  <p className="text-gray-700">
                    No way! First come first serve!
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    What if I'm nervous about singing?
                  </h3>
                  <p className="text-gray-700">
                    Don't worry! We have a very supportive crowd and encourage
                    singers of all levels. You can also start with group songs
                    or duets if that makes you more comfortable.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Can I request songs not in your library?
                  </h3>
                  <p className="text-gray-700">
                    We're always updating our song library! Let us know what
                    you'd like to see added, and we'll do our best to include it
                    for future events.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    What are your age restrictions?
                  </h3>
                  <p className="text-gray-700">
                    Our regular events are all-ages until 9 PM, then 21+ only.
                    Private events can be customized based on your group's needs
                    and preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
