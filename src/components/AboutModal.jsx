import React from 'react';
import { Info, Users, GraduationCap, X, Save } from 'lucide-react';

export default function AboutModal({ isOpen, onClose, aboutInfo, setAboutInfo }) {
  if (!isOpen) return null;

  const handleMemberChange = (index, value) => {
    const updated = [...aboutInfo.teamMembers];
    updated[index] = value;
    const newAbout = { ...aboutInfo, teamMembers: updated };
    setAboutInfo(newAbout);
    localStorage.setItem('canteen_truth_about', JSON.stringify(newAbout));
  };

  const handleCollegeChange = (value) => {
    const newAbout = { ...aboutInfo, collegeName: value };
    setAboutInfo(newAbout);
    localStorage.setItem('canteen_truth_about', JSON.stringify(newAbout));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={22} style={{ color: '#3b82f6' }} /> About Project & Team Credentials
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>
              Academic credits for presentation submission.
            </p>
          </div>
          <button className="btn-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Project Meta Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Project Name</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff', marginTop: '4px' }}>🥤 Canteen Truth Detector</div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Subject Curriculum</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#fff', marginTop: '4px' }}>Statistics / Hypothesis Testing</div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Academic Module</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#60a5fa', marginTop: '4px' }}>Module VII — Testing of Hypothesis – I</div>
          </div>
        </div>

        {/* Editable Institution / College */}
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label">
            <GraduationCap size={16} /> College / University Name (Editable)
          </label>
          <input
            type="text"
            className="form-control"
            value={aboutInfo.collegeName}
            onChange={(e) => handleCollegeChange(e.target.value)}
            placeholder="e.g. National Institute of Technology / University Science Dept"
          />
        </div>

        {/* Editable Team Members */}
        <div>
          <label className="form-label" style={{ marginBottom: '10px' }}>
            <Users size={16} /> Project Team Members (6 Members — Editable)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
            {aboutInfo.teamMembers.map((member, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8', width: '70px', fontWeight: '600' }}>Member {idx + 1}:</span>
                <input
                  type="text"
                  className="form-control"
                  style={{ padding: '6px 10px', fontSize: '13px' }}
                  value={member}
                  onChange={(e) => handleMemberChange(idx, e.target.value)}
                  placeholder={`Student Name ${idx + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose}>
            <Save size={16} /> Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
