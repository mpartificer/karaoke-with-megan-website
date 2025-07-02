import { useState, useEffect } from "react";
import { Home, User, Mail } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState({
    google: false,
    facebook: false,
  });
  const { login } = useAuth();

  // Load Google OAuth script
  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) return;

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
      }
    };

    loadGoogleScript();
  }, []);

  // Load Facebook SDK
  useEffect(() => {
    const loadFacebookSDK = () => {
      if (window.FB) return;

      window.fbAsyncInit = function () {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: "v18.0",
        });
      };

      const script = document.createElement("script");
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      document.head.appendChild(script);
    };

    loadFacebookSDK();
  }, []);

  const handleGoogleResponse = (response) => {
    setIsLoading((prev) => ({ ...prev, google: true }));

    try {
      // Decode the credential (JWT token)
      const payload = JSON.parse(atob(response.credential.split(".")[1]));

      const userData = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        provider: "google",
      };

      // Use the login function from auth context
      login(userData);

      // Redirect to upload page
      window.location.hash = "upload";
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    } finally {
      setIsLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading((prev) => ({ ...prev, google: true }));

    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to popup
          window.google.accounts.id.renderButton(
            document.getElementById("google-signin-button"),
            {
              theme: "outline",
              size: "large",
              width: "100%",
              text: "continue_with",
            }
          );
        }
        setIsLoading((prev) => ({ ...prev, google: false }));
      });
    } else {
      console.error("Google Sign-In not loaded");
      setIsLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const handleFacebookLogin = () => {
    setIsLoading((prev) => ({ ...prev, facebook: true }));

    if (window.FB) {
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            // Get user info
            window.FB.api(
              "/me",
              { fields: "name,email,picture" },
              (userInfo) => {
                const userData = {
                  id: userInfo.id,
                  name: userInfo.name,
                  email: userInfo.email,
                  picture: userInfo.picture?.data?.url,
                  provider: "facebook",
                };

                // Use the login function from auth context
                login(userData);

                // Redirect to upload page
                window.location.hash = "upload";
              }
            );
          } else {
            console.error("Facebook login failed");
            alert("Facebook login failed. Please try again.");
          }
          setIsLoading((prev) => ({ ...prev, facebook: false }));
        },
        { scope: "public_profile" }
      );
    } else {
      console.error("Facebook SDK not loaded");
      setIsLoading((prev) => ({ ...prev, facebook: false }));
    }
  };

  const navigateHome = () => {
    window.location.hash = "home";
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header with back button */}
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={navigateHome}
            className="flex items-center space-x-2 text-secondary hover:text-accent transition-colors"
          >
            <Home size={24} />
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-neutral rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              please confirm who you are for megan's safety!!
            </h1>
            <p className="text-gray-600">
              gross ppl are gross, help a gurl out{" "}
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-4">
            {/* Google Login Button */}
            <div>
              <div id="google-signin-button" className="w-full"></div>
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading.google || isLoading.facebook}
                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isLoading.google ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Facebook Login Button */}
            <button
              onClick={handleFacebookLogin}
              disabled={isLoading.google || isLoading.facebook}
              className="w-full flex items-center justify-center space-x-3 bg-[#1877F2] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#166FE5] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading.facebook ? (
                <div className="w-5 h-5 border-2 border-blue-300 border-t-white rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              )}
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 bg-white">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Having trouble? Contact us directly:
            </p>
            <a
              href="https://www.instagram.com/karaokewithmegan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-accent hover:text-secondary transition-colors font-medium"
            >
              <Mail size={16} />
              <span>@karaokewithmegan</span>
            </a>
          </div>

          {/* Terms */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
