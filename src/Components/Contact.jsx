import React, { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaEnvelope,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import "./Contact.css";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const CONTACT_EMAIL = "talabi.eniola.s@gmail.com";

const emptyForm = { name: "", email: "", subject: "", message: "" };

const validateForm = (form) => {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    return "Please fill all required fields";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return "Please enter a valid email address";
  }
  return null;
};

const Contact = ({ isNightMode = false, id }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm(formData);
    if (validationError) {
      setSubmitStatus({ success: false, message: validationError });
      return;
    }
    if (!accessKey) {
      setSubmitStatus({
        success: false,
        message: `The form is not configured yet. Email me directly at ${CONTACT_EMAIL}.`,
      });
      return;
    }

    // The hidden botcheck field is a honeypot: humans never fill it,
    // bots usually do, and Web3Forms drops those submissions.
    if (event.target.botcheck && event.target.botcheck.value) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || "New message from talabiverse",
          message: formData.message.trim(),
        }),
      });
      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Message sent. I will respond soon.",
        });
        setFormData(emptyForm);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: `Could not send the message. Email me directly at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`contact-section ${isNightMode ? "night" : "day"}`}>
      <div className="contact-container">
        <div className="contact-wrapper">
          <div className="contact-form-container">
            <h2 className="section-title">Make Contact</h2>
            <p className="section-subtitle">
              Have a project in mind or want to discuss opportunities?
              <br /> Reach out and let's connect.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <input type="checkbox" name="botcheck" tabIndex="-1" style={{ display: "none" }} />

              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder=" "
                />
                <label htmlFor="name" className="form-label">Full Name</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder=" "
                />
                <label htmlFor="email" className="form-label">Email Address</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder=" "
                />
                <label htmlFor="subject" className="form-label">Subject (Optional)</label>
              </div>

              <div className="form-group message-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-input textarea"
                  placeholder=" "
                ></textarea>
                <label htmlFor="message" className="form-label">Your Message</label>

                <div className="textarea-controls">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`control-btn send-btn ${isNightMode ? "night" : "day"} ${isSubmitting ? "sending" : ""}`}
                    aria-label={isSubmitting ? "Sending message" : "Send message"}
                    data-tooltip={isSubmitting ? "Sending..." : "Send message"}
                  >
                    {isSubmitting ? <ImSpinner8 className="send-spinner" /> : <FaPaperPlane />}
                  </button>
                </div>
              </div>

              {submitStatus && (
                <div className={`status-message ${submitStatus.success ? "success" : "error"}`}>
                  {submitStatus.success ? (
                    <FaCheckCircle className="status-icon" />
                  ) : (
                    <FaExclamationCircle className="status-icon" />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <div className="contact-divider">
                <span className="divider-text">OR</span>
              </div>

              <div className="social-links-container">
                <div className="social-links">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className={`social-link ${isNightMode ? "night" : "day"}`}
                    aria-label="Email"
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href="https://github.com/eniolatalabi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${isNightMode ? "night" : "day"}`}
                    aria-label="GitHub Profile"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/eniolasolomontalabi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${isNightMode ? "night" : "day"}`}
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
