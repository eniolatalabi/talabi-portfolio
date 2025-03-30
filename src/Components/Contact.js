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
  const finalTranscriptRef = useRef('');
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('mcdosV_qTGd_quZiT');
  }, []);

  // Enhanced speech recognition setup with punctuation
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
    
    let timeout;
    let lastProcessedIndex = 0;

    recognition.onresult = (event) => {
      clearTimeout(timeout);
      
      let interimTranscript = '';
      let newFinalContent = false;

      // Process all new results since last callback
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          const processedText = formatWithPunctuation(transcript, true);
          finalTranscriptRef.current += (finalTranscriptRef.current ? ' ' : '') + processedText;
          newFinalContent = true;
          lastProcessedIndex = finalTranscriptRef.current.length;
        } else {
          interimTranscript += transcript;
        }
      }

      // Update the textarea with both final and interim results
      setFormData(prev => ({
        ...prev,
        message: finalTranscriptRef.current + (interimTranscript ? ' ' + interimTranscript : '')
      }));

      // Set timeout to handle speech pauses
      timeout = setTimeout(() => {
        if (interimTranscript) {
          const processedText = formatWithPunctuation(interimTranscript, false);
          finalTranscriptRef.current = finalTranscriptRef.current.substring(0, lastProcessedIndex) + 
            (lastProcessedIndex > 0 ? ' ' : '') + processedText;
          lastProcessedIndex = finalTranscriptRef.current.length;
          
          setFormData(prev => ({
            ...prev,
            message: finalTranscriptRef.current
          }));
        }
      }, 1200); // 1.2 second pause detection
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      setSubmitStatus({ 
        success: false, 
        message: `Speech error: ${event.error === 'no-speech' ? 'No speech detected' : 'Please check microphone permissions'}` 
      });
    };
    
    return recognition;
  };

  // Professional punctuation formatter
  const formatWithPunctuation = (text, isFinal) => {
    if (!text.trim()) return '';
    
    // Clean up speech artifacts
    text = text.trim()
      .replace(/\b(um|uh|ah|like|you know|kind of|sort of)\b/gi, '') // Remove filler words
      .replace(/\s{2,}/g, ' '); // Collapse multiple spaces

    // Capitalization rules
    if (isFinal || text.length < 3) {
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }

    // Punctuation rules for professional communication
    if (isFinal) {
      const lowerText = text.toLowerCase();
      
      // Questions clients might ask
      const isQuestion = /\b(can you|would you|how|what|when|where|why|who|are you|do you|is there)\b/i.test(text) || 
                         text.endsWith(' right') || 
                         text.endsWith(' correct') ||
                         /\?$/.test(text);
      
      // Professional closings
      const isClosing = /\b(look forward|thank you|regards|sincerely|best|cheers|kind regards)\b/i.test(text);
      
      // Professional openings
      const isOpening = /\b(dear|hi|hello|greetings|good morning|good afternoon)\b/i.test(text);
      
      // Add appropriate punctuation
      if (!/[.!?]$/.test(text)) {
        if (isQuestion) {
          text += '?';
        } else if (isClosing) {
          text += '.';
        } else if (isOpening) {
          text += ',';
        } else if (text.length > 60) { // Longer statements get periods
          text += '.';
        } else if (/(and|but|however|therefore|moreover)\s/i.test(lowerText)) {
          text += ',';
        }
      }
    }

    return text;
  };
  
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      finalTranscriptRef.current = ''; // Reset on stop
    } else {
      if (!recognitionRef.current) {
        recognitionRef.current = setupSpeechRecognition();
        if (!recognitionRef.current) return;
      }
      
      try {
        finalTranscriptRef.current = formData.message; // Preserve existing content
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
    // Keep transcript ref in sync with manual edits
    if (name === 'message') {
      finalTranscriptRef.current = value;
    }
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
        finalTranscriptRef.current = '';
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
                    {isListening && <span className="listening-dot"></span>}
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