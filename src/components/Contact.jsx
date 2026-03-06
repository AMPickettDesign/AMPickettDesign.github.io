import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const FORMSPREE_URL = 'https://formspree.io/f/mlgpreda';

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setSubmitting(false);
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <ScrollReveal>
            <div className="contact__info">
              <p className="section-label">Get in Touch</p>
              <h2 className="section-title">Let's create something great together.</h2>
              <p className="contact__text">
                Have a project in mind or just want to chat about design? 
                I'm always open to new opportunities and collaborations.
              </p>
              <div className="contact__links">
                <a href="mailto:AshleyPickett46@gmail.com" className="contact__link">
                  <span className="contact__link-label">Email</span>
                  <span>AshleyPickett46@gmail.com</span>
                </a>
                <a href="tel:+15096096956" className="contact__link">
                  <span className="contact__link-label">Phone</span>
                  <span>(509) 609-6956</span>
                </a>
                <span className="contact__link">
                  <span className="contact__link-label">Location</span>
                  <span>Spokane, WA</span>
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="project">Project Type</label>
                <select id="project" name="project">
                  <option value="">Select a project type</option>
                  <option value="ux">UX/UI Design</option>
                  <option value="graphic">Graphic Design</option>
                  <option value="branding">Branding</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <div className="form-message form-message--success">
                  Thank you! Your message has been sent. I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="form-message form-message--error">
                  Something went wrong. Please try emailing me directly.
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
