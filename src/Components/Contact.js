import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaMicrophone } from 'react-icons/fa';
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
  const [isListening, setIsListening] = useState(false);
  const messageRef = useRef(null);
  const recognitionRef = useRef(null);
  
  // Speech recognition setup
  const setupSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setFormData(prev => ({
        ...prev,
        message: transcript
      }));
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    return recognition;
  };
  
  const toggleListening = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = setupSpeechRecognition();
      if (!recognitionRef.current) return; // Speech recognition not supported
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      messageRef.current.focus();
      // Store current message to prevent it from being overwritten
      const currentMessage = formData.message;
      
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Speech recognition error:', error);
        // Restart recognition if it's already running
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current.start();
          setIsListening(true);
        }, 100);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Stop speech recognition if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
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
                  ref={messageRef}
                ></textarea>
                <label htmlFor="message" className="form-label">Your Message</label>
                
                <div className="textarea-controls">
                  <button 
                    type="button" 
                    onClick={toggleListening}
                    className={`control-btn mic-btn ${isListening ? 'active' : ''} ${isNightMode ? 'night' : 'day'}`}
                    aria-label={isListening ? "Stop dictation" : "Start dictation"}
                    data-tooltip={isListening ? "Stop dictation" : "Start dictation"}
                  >
                    <FaMicrophone />
                  </button>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`control-btn send-btn ${isNightMode ? 'night' : 'day'}`}
                    aria-label="Send message"
                    data-tooltip="Send message"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>

              {submitStatus && (
                <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
                  {submitStatus.success ? <FaCheckCircle className="status-icon" /> : <FaExclamationCircle className="status-icon" />}
                  {submitStatus.message}
                </div>
              )}

              <div className="contact-divider">
                <span className="divider-text">OR</span>
              </div>

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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;