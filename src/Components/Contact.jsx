import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import "./Contact.css";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const CONTACT_EMAIL = "talabi.eniola.s@gmail.com";
const emptyForm = { name: "", email: "", message: "" };

const validateForm = (form) => {
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
    return "Please fill all fields.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return "Please enter a valid email address.";
  }
  return null;
};

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateForm(formData);
    if (error) {
      setStatus({ success: false, message: error });
      return;
    }
    if (!accessKey) {
      setStatus({ success: false, message: `Form not configured. Email me at ${CONTACT_EMAIL}.` });
      return;
    }
    if (event.target.botcheck && event.target.botcheck.value) return;

    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: "New message from talabiverse",
          message: formData.message.trim(),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus({ success: true, message: "Message sent. I will respond soon." });
        setFormData(emptyForm);
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (err) {
      setStatus({ success: false, message: `Could not send. Email me at ${CONTACT_EMAIL}.` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-inner section-inner">
        <p className="eyebrow">Contact</p>

        <div className="contact-grid">
          <div className="contact-lead">
            <h2 className="contact-head">Let us build something.</h2>
            <p className="contact-sub">
              Have a project in mind or a role to discuss? Reach out directly or
              send a message.
            </p>
            <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL} <FiArrowUpRight />
            </a>
            <div className="contact-socials">
              <a href="https://github.com/eniolatalabi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/eniolasolomontalabi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <input type="checkbox" name="botcheck" tabIndex="-1" style={{ display: "none" }} />

            <div className="field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required />
            </div>

            <button type="submit" className="contact-send" disabled={isSubmitting}>
              {isSubmitting ? <ImSpinner8 className="spin" /> : null}
              {isSubmitting ? "Sending" : "Send message"}
            </button>

            {status && (
              <p className={`contact-status ${status.success ? "ok" : "err"}`}>{status.message}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
