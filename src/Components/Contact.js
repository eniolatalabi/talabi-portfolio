import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaTwitter, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaMicrophone } from 'react-icons/fa';
import { ImSpinner8 } from 'react-icons/im';
import './Contact.css';
import contactImg from "../Assets/make-contact-black.png";

const Contact = ({ isNightMode = false, id }) => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const messageRef = useRef(null);
  const recognitionRef = useRef(null);
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('mcdosV_qTGd_quZiT');
  }, []);

  // Speech recognition setup
  const setupSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSubmitStatus({ 
        success: false, 
        message: 'Speech recognition not supported in your browser' 
      });
      return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setFormData(prev => ({
        ...prev,
        message: prev.message + ' ' + transcript
      }));
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setSubmitStatus({ 
        success: false, 
        message: `Speech error: ${event.error}` 
      });
    };
    
    return recognition;
  };
  
  const toggleListening = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = setupSpeechRecognition();
      if (!recognitionRef.current) return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setSubmitStatus(null);
      } catch (error) {
        console.error('Speech recognition error:', error);
        setSubmitStatus({ 
          success: false, 
          message: 'Microphone access denied. Please allow microphone permissions.' 
        });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Stop speech recognition if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    // Validate required fields
    if (!formData.from_name.trim() || !formData.from_email.trim() || !formData.message.trim()) {
      setSubmitStatus({ 
        success: false, 
        message: 'Please fill all required fields' 
      });
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.from_email)) {
      setSubmitStatus({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const timeString = new Date().toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const templateParams = {
        from_name: formData.from_name.trim(),
        from_email: formData.from_email.trim(),
        subject: formData.subject.trim() || 'No subject provided',
        message: formData.message.trim(),
        time: timeString,
        year: new Date().getFullYear().toString()
      };

      const response = await emailjs.send(
        'service_lk5zbom',
        'template_ykwh82r',
        templateParams
      );

      if (response.status === 200) {
        setSubmitStatus({ 
          success: true, 
          message: 'Message sent successfully! I will respond soon.' 
        });
        setFormData({ 
          from_name: '', 
          from_email: '', 
          subject: '', 
          message: '' 
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.text || 'Failed to send message. Please try again or contact me directly at eniola@example.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
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

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder=" "
                />
                <label htmlFor="from_name" className="form-label">Full Name</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder=" "
                />
                <label htmlFor="from_email" className="form-label">Email Address</label>
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
                    disabled={isSubmitting}
                  >
                    <FaMicrophone />
                  </button>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`control-btn send-btn ${isNightMode ? 'night' : 'day'} ${isSubmitting ? 'sending' : ''}`}
                    aria-label={isSubmitting ? "Sending message" : "Send message"}
                    data-tooltip={isSubmitting ? "Sending..." : "Send message"}
                  >
                    {isSubmitting ? (
                      <ImSpinner8 className="send-spinner" />
                    ) : (
                      <FaPaperPlane />
                    )}
                  </button>
                </div>
              </div>

              {submitStatus && (
                <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
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
                    href="https://github.com/eniolatalabi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${isNightMode ? 'night' : 'day'}`}
                    aria-label="GitHub Profile"
                  >
                    <FaGithub />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/eniola-solomon-talabi-723648271"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${isNightMode ? 'night' : 'day'}`}
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin />
                  </a>

                  <a
                    href="https://x.com/abgriffinn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${isNightMode ? 'night' : 'day'}`}
                    aria-label="Twitter Profile"
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