import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import logo from "./assets/IMG_0682.JPEG";
import insta from "./assets/insta.png";
import BookingForm from "./components/BookingForm";

function App() {
  const [count, setCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMenuClick = (sectionId) => {
    // Close dropdown first
    setIsDropdownOpen(false);

    // Scroll to section with offset for fixed header
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80; // Adjust this value based on your header height

        // Check if we're on desktop (large screen)
        const isDesktop = window.innerWidth >= 1024;

        if (isDesktop && scrollContainerRef.current) {
          // For desktop: scroll within the container
          const containerRect =
            scrollContainerRef.current.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          const scrollTop = scrollContainerRef.current.scrollTop;

          const offsetPosition =
            scrollTop + (elementRect.top - containerRect.top) - headerHeight;

          scrollContainerRef.current.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        } else {
          // For mobile: scroll the window
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }, 100);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <>
      {/* Mobile Layout - unchanged */}
      <div className="lg:hidden">
        {/* Sticky menu bar */}
        <div className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center bg-primary py-2">
          <div className="relative dropdown-container">
            <button
              className="btn m-1 justify-self-center bg-primary cursor-pointer"
              onClick={handleToggleDropdown}
            >
              <Menu color="#DFFE59" />
            </button>

            {isDropdownOpen && (
              <ul className="absolute top-full left-1/2 transform -translate-x-1/2 border-accent border-2 flex flex-col text-secondary text-lg text-center max-w-xl bg-primary rounded-box z-[60] w-52 p-2 mt-1">
                <li>
                  <button
                    className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                    onClick={() => handleMenuClick("events")}
                  >
                    events
                  </button>
                </li>
                <li>
                  <button
                    className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                    onClick={() => handleMenuClick("private-events")}
                  >
                    request a private event
                  </button>
                </li>
                <li>
                  <button
                    className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                    onClick={() => handleMenuClick("about")}
                  >
                    about us
                  </button>
                </li>
                <li>
                  <button
                    className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                    onClick={() => handleMenuClick("faqs")}
                  >
                    FAQs
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Main content with top padding to account for fixed header */}
        <div className="flex flex-col justify-start min-h-screen items-center">
          <div className="">
            <a target="_blank">
              <img
                src={logo}
                className="w-full"
                alt="Karaoke with Megan logo"
              />
            </a>
          </div>

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
                    Erin's new ownership! Contact our instagram
                    @karaokewithmegan to claim your spot!
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
                    from 9PM to 1AM and then dance the night away with a
                    Christmas dance party.{" "}
                  </p>
                  <p className="text-sm text-primary">Date: July 27, 2025</p>
                  <p className="text-sm text-primary">
                    Time: 9:00 PM - 3:00 AM
                  </p>
                  <p className="text-sm text-primary">Location: Erin's Pub</p>
                </div>
              </div>
            </div>
          </section>

          {/* Private Events Section */}
          <section
            id="private-events"
            className="max-w-4xl px-6 ml-4 mr-4 mb-8 py-16 bg-secondary rounded-lg"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-primary mb-8">
                request a private event
              </h2>
              <div className="max-w-2xl mx-auto">
                <p className="text-lg text-gray-700 mb-8">
                  Looking to host a special celebration? We offer private
                  karaoke events for birthdays, corporate parties, and other
                  special occasions.
                </p>
                <BookingForm />
              </div>
            </div>
          </section>

          {/* About Us Section */}
          <section
            id="about"
            className="w-full max-w-4xl mx-auto mt-8 px-6 pb-16"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-secondary mb-8">
                about us
              </h2>
              <div className="max-w-3xl mx-auto bg-secondary rounded-lg p-6">
                <p className="text-lg text-gray-700 font-semibold mb-6">
                  Hi, I'm Megan! You can often find me in the host's chair at
                  Erin's Pub on Thursdays. My goal has been and will always be
                  to create a safe, fun, and inclusive event in the downtown
                  space. Everyone should get to feel like a star, and no one
                  feels alone on stage.
                </p>
                <a
                  href="https://www.instagram.com/karaokewithmegan?igsh=MTB1d3c0bjg1OHhxeg%3D%3D&utm_source=qr"
                  target="_blank"
                >
                  <img
                    src={insta}
                    className="w-8 h-8 mt-4 justify-self-center"
                    alt="follow us on instagram!"
                  />
                </a>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎤</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      Professional Equipment
                    </h3>
                    <p className="text-gray-600">
                      4 screens, 2 microphones, and a sound system that can
                      handle a crowd!
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
                      We get our tracks from Youtube, so the songs you practice
                      on are exactly what you will sing with!
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
                      Inclusive environment for performers of all levels!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section
            id="faqs"
            className="max-w-4xl mr-4 ml-4 rounded-lg px-6 py-16 bg-gray-50"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-secondary mb-8">faqs</h2>
              <div className="max-w-3xl mx-auto text-left">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      How long will my song take?
                    </h3>
                    <p className="text-gray-700">
                      That really depends on how many people are there and how
                      many songs you want to sing! I try to make sure everyone
                      gets a turn per round, and often I will do a host tax
                      (aka, sing a song!) as a marker that we're at the top of
                      the round. I have found this is the fairest way to ensure
                      that everyone gets a chance to perform
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      How much to bump my songs up?{" "}
                    </h3>
                    <p className="text-gray-700">
                      Bribes start at $50! Sure, it is a high price to pay, but
                      I feel like if I'm going to compromise on the system, it
                      has to be worth my while!
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
                      You certainly can! If there's no karaoke version of the
                      song you want on Youtube, feel free to sing along to the
                      regular track if you're comfortable
                    </p>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      What are your age restrictions?
                    </h3>
                    <p className="text-gray-700">
                      19+, but this is flexible for private events.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Desktop Layout - fixed */}
      <div className="flex w-screen h-screen overflow-hidden pt-12 justify-center items-center">
        <div className="hidden lg:flex h-screen w-3/4">
          {/* Left side - Image */}
          <div className="w-1/2 h-3/4">
            <a
              target="_blank"
              href="https://www.instagram.com/betterpleasure?igsh=MTB6dGFtMHJxbncyMw=="
            >
              <img
                src={logo}
                className="w-full"
                alt="Karaoke with Megan logo, made by the bestie @betterpleasure"
              />
            </a>
          </div>

          {/* Right side - Content */}
          <div className="w-1/2 h-3/4 flex flex-col">
            {/* Sticky menu bar */}
            <div className="sticky top-0 z-50 w-full flex justify-center bg-primary py-2 flex-shrink-0">
              <div className="relative dropdown-container">
                <button
                  className="btn m-1 justify-self-center bg-primary cursor-pointer"
                  onClick={handleToggleDropdown}
                >
                  <Menu color="#DFFE59" />
                </button>

                {isDropdownOpen && (
                  <ul className="absolute top-full left-1/2 transform -translate-x-1/2 border-accent border-2 flex flex-col text-secondary text-lg text-center max-w-xl bg-primary rounded-box z-[60] w-52 p-2 mt-1">
                    <li>
                      <button
                        className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                        onClick={() => handleMenuClick("desktop-events")}
                      >
                        events
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                        onClick={() =>
                          handleMenuClick("desktop-private-events")
                        }
                      >
                        request a private event
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                        onClick={() => handleMenuClick("desktop-about")}
                      >
                        about us
                      </button>
                    </li>
                    <li>
                      <button
                        className="text-secondary w-full p-2 text-center cursor-pointer bg-transparent border-none hover:bg-accent rounded"
                        onClick={() => handleMenuClick("desktop-faqs")}
                      >
                        FAQs
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Scrollable content */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden"
            >
              {/* Events Section */}
              <section
                id="desktop-events"
                className="w-full px-6 py-16 min-h-screen"
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-secondary mb-8">
                    events
                  </h2>
                  <div className="grid gap-6">
                    <div className="bg-accent rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        Thursdays at Erin's
                      </h3>
                      <p className="text-primary mb-4">
                        Join us every Thursday night for karaoke!
                      </p>
                      <p className="text-sm text-primary">
                        Date: Every Thursday
                      </p>
                      <p className="text-sm text-primary">
                        Time: 11:00 PM - close
                      </p>
                      <p className="text-sm text-primary">
                        Location: Erin's Pub
                      </p>
                    </div>
                    <div className="bg-accent rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        Erin's Anniversary Screech In
                      </h3>
                      <p className="text-primary mb-4">
                        In collaboration with Fogged Up Comedy, we will be
                        hosting a traditional Newfoundland Screech In to
                        celebrate 3 years of Erin's new ownership! Contact our
                        instagram @karaokewithmegan to claim your spot!
                      </p>
                      <p className="text-sm text-primary">
                        Date: July 24, 2025
                      </p>
                      <p className="text-sm text-primary">Time: 11:00 PM</p>
                      <p className="text-sm text-primary">
                        Location: Erin's Pub
                      </p>
                    </div>
                    <div className="bg-accent rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        Christmas in July{" "}
                      </h3>
                      <p className="text-primary mb-4">
                        Join us for extended anniversary celebrations with
                        karaoke from 9PM to 1AM and then dance the night away
                        with a Christmas dance party.{" "}
                      </p>
                      <p className="text-sm text-primary">
                        Date: July 27, 2025
                      </p>
                      <p className="text-sm text-primary">
                        Time: 9:00 PM - 3:00 AM
                      </p>
                      <p className="text-sm text-primary">
                        Location: Erin's Pub
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Private Events Section */}
              <section
                id="desktop-private-events"
                className="px-6 mb-8 py-16 bg-secondary rounded-lg mx-6 min-h-screen"
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-primary mb-8">
                    request a private event
                  </h2>
                  <div className="max-w-2xl mx-auto">
                    <p className="text-lg text-gray-700 mb-8">
                      Looking to host a special celebration? We offer private
                      karaoke events for birthdays, corporate parties, and other
                      special occasions.
                    </p>
                    <BookingForm />
                  </div>
                </div>
              </section>

              {/* About Us Section */}
              <section
                id="desktop-about"
                className="w-full px-6 mt-20 pb-16 min-h-screen"
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-secondary mb-8">
                    about us
                  </h2>
                  <div className="mx-auto bg-secondary rounded-lg p-6">
                    <p className="text-lg text-gray-700 font-semibold mb-6">
                      Hi, I'm Megan! You can often find me in the host's chair
                      at Erin's Pub on Thursdays. My goal has been and will
                      always be to create a safe, fun, and inclusive event in
                      the downtown space. Everyone should get to feel like a
                      star, and no one feels alone on stage.
                    </p>
                    <a
                      href="https://www.instagram.com/karaokewithmegan?igsh=MTB1d3c0bjg1OHhxeg%3D%3D&utm_source=qr"
                      target="_blank"
                    >
                      <img
                        src={insta}
                        className="w-8 h-8 mt-4 justify-self-center"
                        alt="follow us on instagram!"
                      />
                    </a>
                    <div className="grid gap-8 mt-12">
                      <div className="text-center">
                        <div className="bg-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">🎤</span>
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">
                          Professional Equipment
                        </h3>
                        <p className="text-gray-600">
                          4 screens, 2 microphones, and a sound system that can
                          handle a crowd!
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
                          We get our tracks from Youtube, so the songs you
                          practice on are exactly what you will sing with!
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
                          Inclusive environment for performers of all levels!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQs Section */}
              <section
                id="desktop-faqs"
                className="px-6 py-16 bg-gray-50 mx-6 rounded-lg mb-8 min-h-screen"
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-secondary mb-8">
                    faqs
                  </h2>
                  <div className="text-left">
                    <div className="space-y-6">
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          How long will my song take?
                        </h3>
                        <p className="text-gray-700">
                          That really depends on how many people are there and
                          how many songs you want to sing! I try to make sure
                          everyone gets a turn per round, and often I will do a
                          host tax (aka, sing a song!) as a marker that we're at
                          the top of the round. I have found this is the fairest
                          way to ensure that everyone gets a chance to perform
                        </p>
                      </div>
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          How much to bump my songs up?{" "}
                        </h3>
                        <p className="text-gray-700">
                          Bribes start at $50! Sure, it is a high price to pay,
                          but I feel like if I'm going to compromise on the
                          system, it has to be worth my while!
                        </p>
                      </div>
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          What if I'm nervous about singing?
                        </h3>
                        <p className="text-gray-700">
                          Don't worry! We have a very supportive crowd and
                          encourage singers of all levels. You can also start
                          with group songs or duets if that makes you more
                          comfortable.
                        </p>
                      </div>
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          Can I request songs not in your library?
                        </h3>
                        <p className="text-gray-700">
                          You certainly can! If there's no karaoke version of
                          the song you want on Youtube, feel free to sing along
                          to the regular track if you're comfortable
                        </p>
                      </div>
                      <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          What are your age restrictions?
                        </h3>
                        <p className="text-gray-700">
                          19+, but this is flexible for private events.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
