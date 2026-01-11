import React from 'react'
import { Phone, MessageCircle, User, BookOpen, Video, AlertTriangle } from 'lucide-react';
import './Resource.css'
import { useNavigate } from 'react-router-dom';
import resource from '../../../assets/resource.png'
const Resource = () => {
  const navigate=useNavigate();
  return (
    <div className="resource-container">
        <header className="resource-header">
          <div className="header-content">
            <h1>Student Wellness Resources</h1>
            <p className="physician-note">
              "Your feelings are valid. Whether you are dealing with academic pressure or anxiety, you are not alone."
            </p>
          </div>
          <img 
              src={resource}
              alt="Wellness Mascot" 
              className="header-image"
          />
        </header>

        <section className="section-block emergency-section">
          <div className="section-title">
              <AlertTriangle className="section-icon red" />
              <h2>Immediate Action: Crisis Support</h2>
          </div>
          <p className="sub-text">If you are feeling unsafe right now, please use these resources immediately. You do not need to wait.</p>
          
          <div className="emergency-grid">
              <div className="emergency-card">
                  <h3>Tele-MANAS</h3>
                  <p>Govt. of India (24/7, Free)</p>
                  <a href="tel:14416" className="emergency-btn">Dial 14416</a>
              </div>
              <div className="emergency-card">
                  <h3>Kiran Helpline</h3>
                  <p>Mental Health Rehab</p>
                  <a href="tel:18005990019" className="emergency-btn">Dial 1800-599-0019</a>
              </div>
              <div className="emergency-card">
                  <h3>Vandrevala Foundation</h3>
                  <p>WhatsApp or Call</p>
                  <a href="tel:+919999666555" className="emergency-btn">Dial +91 9999 666 555</a>
              </div>
          </div>
        </section>

        
        <section className="section-block">
          <div className="section-title">
              <User className="section-icon blue" />
              <h2>Your Campus Tools: ThinkFit</h2>
          </div>
          <div className="cards-grid">
              <div className="feature-card">
                  <div className="icon-circle"><MessageCircle /></div>
                  <h3>AI Wellness Chatbot</h3>
                  <p>Anonymous, non-judgmental support 24/7. Ask questions without fear.</p>
                  <button className="action-btn" onClick={()=>{navigate("/user/chatbot")}}>Start Chat</button>
              </div>
              <div className="feature-card">
                  <div className="icon-circle"><User /></div>
                  <h3>Book a Counselor</h3>
                  <p>Privately schedule appointments with trained human counselors.</p>
                  <button className="action-btn" onClick={()=>{navigate("/user/appointment")}}>Book Now</button>
              </div>
          </div>
        </section>

        <section className="section-block prescription-section">
          <div className="section-title">
              <BookOpen className="section-icon green" />
              <h2>Physician’s Prescription: Active Coping</h2>
          </div>
          
          <div className="exercise-layout">
              <div className="exercise-card">
                  <h3>🛑 5-4-3-2-1 Grounding</h3>
                  <p className="instruction-text">Use this when you feel panic or high stress.</p>
                  <ul className="step-list">
                      <li><strong>5</strong> things you see</li>
                      <li><strong>4</strong> things you touch</li>
                      <li><strong>3</strong> things you hear</li>
                      <li><strong>2</strong> things you smell</li>
                      <li><strong>1</strong> thing you taste</li>
                  </ul>
              </div>

              <div className="exercise-card">
                  <h3>🌬️ Box Breathing</h3>
                  <p className="instruction-text">Regulate your nervous system.</p>
                  <div className="breathing-visual">
                      <div className="breath-step">Inhale (4s)</div>
                      <div className="breath-step">Hold (4s)</div>
                      <div className="breath-step">Exhale (4s)</div>
                      
                  </div>
              </div>
              
              <div className="exercise-card">
                  <h3>⭕ Circle of Control</h3>
                  <p className="instruction-text">For relationship or exam pressure.</p>
                  <ul className="control-list">
                      <li className="in-control"><span>Inside:</span> Your habits, your effort, your boundaries.</li>
                      <li className="out-control"><span>Outside:</span> Others' opinions, exam results.</li>
                  </ul>
              </div>
          </div>
        </section>

        {/* 4. EXTERNAL & VIDEO RESOURCES */}
        <section className="section-block">
          <div className="section-title">
              <Video className="section-icon purple" />
              <h2>Curated Video & Web Resources</h2>
          </div>
          <div className="resource-links">
              <a href="https://nimhans.ac.in" target="_blank" rel="noopener noreferrer" className="link-item">
                  <strong>NIMHANS</strong> - Stress Management Yoga
              </a>
              <a href="https://manodarpan.education.gov.in" target="_blank" rel="noopener noreferrer" className="link-item">
                  <strong>Manodarpan</strong> - Student Wellness Webinars
              </a>
              <a href="https://www.who.int/health-topics/mental-health" target="_blank" rel="noopener noreferrer" className="link-item">
                  <strong>WHO</strong> - Mental Health Guidelines
              </a>
          </div>
        </section>

      </div>
    
  );
};

export default Resource;