import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './Contact.css';
import contactImg from "../Assets/make-contact-black.png";

const Contact = ({ isNightMode = false, id }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({ 
        success: false, 
        message: 'Please fill all required fields' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Format the date/time reliably
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });

    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim() || 'No subject provided',
      message: formData.message.trim(),
      time: timeString,
      year: now.getFullYear().toString()
    };

    emailjs.send(
      'service_c5cbvvk',
      'template_zj1oy9o',
      templateParams,
      'Zfb2oO3xVVMQyP2ea'
    )
    .then(() => {
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      setSubmitStatus({ 
        success: false, 
        message: 'Failed to send message. Please try again.' 
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section id="contact" className={`contact-section ${isNightMode ? 'night' : 'day'}`}>
      <div className="contact-container">
        <div className="contact-wrapper">
          <div className="contact-image">
            <img 
              src={contactImg}
              alt="Contact Illustration" 
              className={`contact-img ${isNightMode ? 'night' : 'day'}`} 
            />
          </div>
          
          <div className="contact-form-container">
            <h2 className="section-title">Make Contact</h2>
            <p className="section-subtitle">
              Have a project in mind or want to discuss opportunities?<br/> Reach out and let's connect.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
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

              <div className="form-group">
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
              </div>

              {submitStatus && (
                <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
                  {submitStatus.success ? <FaCheckCircle className="status-icon" /> : <FaExclamationCircle className="status-icon" />}
                  {submitStatus.message}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-btn ${isNightMode ? 'night' : 'day'}`}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <FaPaperPlane className="btn-icon" /> Send Message
                    </>
                  )}
                </button>

                <div className="social-links-container">
                  <div className="social-links">
                    <a
                      href="https://github.com/eniolatalabi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-link ${isNightMode ? 'night' : 'day'}`}
                      aria-label="GitHub Profile"
                      title="Connect with EST via GitHub"
                    >
                      <FaGithub />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/eniola-solomon-talabi-723648271"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-link ${isNightMode ? 'night' : 'day'}`}
                      aria-label="LinkedIn Profile"
                      title="Connect with EST via LinkedIn"
                    >
                      <FaLinkedin />
                    </a>

                    <a
                      href="https://x.com/abgriffinn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-link ${isNightMode ? 'night' : 'day'}`}
                      aria-label="Twitter Profile"
                      title="Connect with EST via Twitter/X"
                    >
                      <FaTwitter />
                    </a>
                  </div>
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