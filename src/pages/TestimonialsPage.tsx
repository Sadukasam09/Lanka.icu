import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export interface TestimonialFormData {
  name: string;
  email: string;
  location: string;
  package?: string;
  rating: number;
  comment: string;
}

export interface Testimonial extends TestimonialFormData {
  id?: string;
  _id?: string; // Added for MongoDB compatibility
  date: string;
}

const TestimonialsPage: React.FC = () => {
  const [formData, setFormData] = useState<TestimonialFormData>({
    name: "",
    email: "",
    location: "",
    rating: 5,
    comment: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string>("");

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    setLoading(true);
    setLoadingError("");
    try {
      const response = await fetch("/api/testimonials");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTestimonials(data);
    } catch (error: unknown) {
      setLoadingError("Failed to load testimonials. Please try again later.");
      console.error("Fetch testimonials error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.comment) {
      setFormError("Please fill in all required fields");
      return;
    }

    setFormError("");
    setFormSubmitted(false);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit testimonial");
      }

      // After submit, reset form and fetch updated testimonials
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        location: "",
        rating: 5,
        comment: "",
      });

      await fetchTestimonials();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error: unknown) {
      setFormError("Failed to submit testimonial. Please try again.");
      console.error("Submit testimonial error:", error);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Traveler Testimonials
          </h1>
          <p className="text-lg max-w-2xl">
            Read what our customers have to say about their Sri Lankan
            adventures
          </p>
        </div>
      </section>

      {/* Success Message */}
      {formSubmitted && (
        <div className="container mt-8">
          <div className="bg-success/10 border border-success text-success px-4 py-3 rounded-lg">
            <p>
              Thank you for sharing your experience! Your testimonial has been
              submitted and will be reviewed soon.
            </p>
          </div>
        </div>
      )}

      {/* Loading and error for testimonials */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Authentic reviews from guests who have experienced our Sri Lankan
              tours
            </p>
          </div>

          {loading && (
            <p className="text-center text-neutral-500">
              Loading testimonials...
            </p>
          )}
          {loadingError && (
            <p className="text-center text-error">{loadingError}</p>
          )}

          {!loading && !loadingError && testimonials.length === 0 && (
            <p className="text-center text-neutral-500">
              No testimonials yet. Be the first to share your experience.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id || testimonial._id || testimonial.date}
                className="bg-white p-6 rounded-lg shadow-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < testimonial.rating
                          ? "text-warning fill-warning"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-neutral-500">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-neutral-500">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Testimonial Form */}
      <section className="section-padding bg-neutral-50">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
              <p className="text-neutral-600">
                We would love to hear about your journey with Ceylon Adventures!
                Your feedback helps us improve and inspires other travelers.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
            >
              {formError && (
                <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg mb-6">
                  <p>{formError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Country/City
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="package"
                    className="block text-sm font-medium text-neutral-700 mb-1"
                  >
                    Tour Package (if applicable)
                  </label>
                  <select
                    id="package"
                    name="package"
                    value={formData.package || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a package</option>
                    <option value="Essential Sri Lanka">
                      Essential Sri Lanka (7 Days)
                    </option>
                    <option value="Sri Lanka Grand Tour">
                      Sri Lanka Grand Tour (14 Days)
                    </option>
                    <option value="Ultimate Sri Lanka Explorer">
                      Ultimate Sri Lanka Explorer (21 Days)
                    </option>
                    <option value="Custom Tour">Custom Tour</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Your Rating *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={formData.rating === rating}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <Star
                        size={24}
                        className={`cursor-pointer ${
                          formData.rating >= rating
                            ? "text-warning fill-warning"
                            : "text-neutral-300"
                        }`}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-neutral-700 mb-1"
                >
                  Your Experience *
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-8">
                  Submit Your Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
