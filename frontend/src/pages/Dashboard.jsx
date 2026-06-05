import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || localStorage.getItem('medqr_email');
  const profileUuid = localStorage.getItem('profileUuid') || localStorage.getItem('medqr_uuid');

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:5000/api/profile/me/${email}`)
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoading(false);
      });
  }, [email, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-600 animate-pulse">Loading dashboard...</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">No medical profile found!</h2>
        <Link to="/register" className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
          Create Profile
        </Link>
      </div>
    );
  }

  // Generate QR code to link to the public emergency web page
  const qrData = `${window.location.origin}/emergency/${profileUuid}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100">
        <h1 className="text-2xl font-bold text-red-600">🏥 MedQR Dashboard</h1>
        <button 
          onClick={() => { 
            localStorage.clear(); 
            navigate('/'); 
          }} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8 w-full grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        
        {/* Profile Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">👤 {profile.fullName}</h2>
              {profile.organDonor && (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                  Organ Donor
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm pt-2">
              <div>
                <p className="text-gray-400 font-semibold text-xs">🩸 BLOOD GROUP</p>
                <p className="text-lg font-bold text-gray-800">{profile.bloodGroup}</p>
              </div>
              <div>
                <p className="text-gray-400 font-semibold text-xs">👤 GENDER</p>
                <p className="text-lg font-bold text-gray-800">{profile.gender}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <p className="text-sm text-gray-400 font-semibold">⚠️ ALLERGIES</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.allergies && profile.allergies.length > 0 ? (
                    profile.allergies.map((a, i) => (
                      <span key={i} className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-100 rounded-lg text-xs font-semibold">
                        {typeof a === 'object' ? `${a.allergen} (${a.severity})` : a}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm italic">None reported</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 font-semibold">🏥 MEDICAL CONDITIONS</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.conditions && profile.conditions.length > 0 ? (
                    profile.conditions.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-xs font-semibold">
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm italic">None reported</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 font-semibold">💊 CURRENT MEDICATIONS</p>
                <div className="space-y-1.5 mt-1">
                  {profile.medications && profile.medications.length > 0 ? (
                    profile.medications.map((m, i) => (
                      <div key={i} className="bg-gray-50 p-2 rounded-lg text-xs border border-gray-100">
                        <p className="font-bold text-gray-700">{m.name}</p>
                        {m.dosage && <p className="text-gray-500">{m.dosage} — {m.frequency}</p>}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic">None reported</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-gray-100 text-xs">
            <div>
              <p className="text-gray-400 font-semibold">🩺 PRIMARY DOCTOR</p>
              <p className="font-bold text-gray-700">{profile.doctorName || 'Not specified'}</p>
              {profile.doctorPhone && <p className="text-gray-500">{profile.doctorPhone}</p>}
            </div>
            <div>
              <p className="text-gray-400 font-semibold">📞 EMERGENCY CONTACTS</p>
              {profile.emergencyContacts && profile.emergencyContacts.length > 0 ? (
                profile.emergencyContacts.map((c, i) => (
                  <div key={i} className="mt-0.5">
                    <p className="font-bold text-gray-700">{c.name} ({c.relation})</p>
                    <p className="text-gray-500">{c.phone}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">None reported</p>
              )}
            </div>
          </div>
        </div>

        {/* QR Code Canvas Card */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center text-center border border-gray-100 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Your Emergency QR Code</h2>
            <p className="text-green-600 font-semibold mt-1 text-sm">✅ Scan with any phone camera to access your profile</p>
          </div>
          
          <div className="p-4 bg-white border-4 border-gray-100 rounded-2xl shadow-inner flex items-center justify-center">
            <QRCodeCanvas value={qrData} size={220} level="M" />
          </div>

          <div className="text-xs text-gray-400 max-w-xs space-y-2">
            <p>This QR code links directly to your public emergency profile. You can print it, save it, or place it on your lockscreen.</p>
            <p className="font-semibold text-blue-600 pt-1">
              <a href={qrData} target="_blank" rel="noopener noreferrer" className="hover:underline text-sm">
                Preview Emergency Page →
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;