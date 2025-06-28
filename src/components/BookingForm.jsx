import { useState } from "react";

function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    eventDate: "",
    duration: "",
    numberOfPeople: "",
    additionalNotes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email content
      const emailSubject = "New Private Event Booking Request";
      const emailBody = `
New booking request from ${formData.fullName}

Contact Information:
- Name: ${formData.fullName}
- Email: ${formData.email}

Event Details:
- Date: ${formData.eventDate}
- Duration: ${formData.duration}
- Number of People: ${formData.numberOfPeople}

Additional Notes:
${formData.additionalNotes || "No additional notes provided."}
      `;

      // Open user's email client with pre-filled information
      const mailtoLink = `mailto:karaokewithmegan@gmail.com?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        eventDate: "",
        duration: "",
        numberOfPeople: "",
        additionalNotes: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Thank you! Your booking request has been sent. We'll get back to you
          soon!
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          There was an error sending your request. Please try again or contact
          us directly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="your full name"
              className="w-full px-3 py-2 border text-accent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-accent placeholder:opacity-70"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your email address"
              className="w-full px-3 py-2 text-accent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-accent placeholder:opacity-70"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              date *
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-3 py-2 border text-accent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-accent placeholder:opacity-70"
            />
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              length *
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border text-accent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-accent placeholder:opacity-70"
            >
              <option value="">select length</option>
              <option value="2 hours">2 hours</option>
              <option value="3 hours">3 hours</option>
              <option value="4 hours">4 hours</option>
              <option value="5+ hours">5+ hours</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="numberOfPeople"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              guest count *
            </label>
            <input
              type="number"
              id="numberOfPeople"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleInputChange}
              required
              min="1"
              max="100"
              placeholder="how many people?"
              className="w-full px-3 py-2 border text-accent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-accent placeholder:opacity-70"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="additionalNotes"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            anything else?{" "}
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleInputChange}
            rows="4"
            placeholder="tell us about your event, any special requests, or questions you might have..."
            className="w-full px-3 py-2 border text-accent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-accent placeholder:opacity-70"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending Request..." : "Submit Booking Request"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
