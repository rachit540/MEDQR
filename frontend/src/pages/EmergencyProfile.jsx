import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function EmergencyProfile() {
  const { uuid } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/emergency/${uuid}`)
      .then(res => setProfile(res.data))
      .catch(() => setError('Profile not found'));
  }, [uuid]);

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border-2 border-red-500 text-center space-y-4">
          <span className="text-5xl block">⚠️</span>
          <h2 className="text-2xl font-black text-red-600">Emergency Profile Not Found</h2>
          <p className="text-gray-500">The scanned medical profile code is invalid or has been deactivated by the user.</p>
          <Link to="/" className="inline-block px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <h2 className="text-xl font-bold text-red-600 animate-pulse">Retrieving emergency medical records...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border-t-8 border-red-600 overflow-hidden">
        
        {/* Header Warning */}
        <div className="bg-red-600 text-white text-center py-4 px-6">
          <h1 className="text-2xl font-black tracking-wider flex items-center justify-center gap-2">
            🚨 EMERGENCY MEDICAL ID
          </h1>
          <p className="text-xs text-red-100 font-semibold mt-1">
            CRITICAL INFO FOR FIRST RESPONDERS & MEDICAL STAFF
          </p>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Main Info Card */}
          <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800">{profile.fullName}</h2>
              {profile.organDonor && (
                <span className="inline-block px-2.5 py-0.5 mt-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  Organ Donor
                </span>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
              <p className="text-red-500 font-bold text-xs tracking-wider">BLOOD GROUP</p>
              <p className="text-3xl font-black text-red-700 mt-1">{profile.bloodGroup}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <p className="text-gray-400 font-bold text-xs tracking-wider">GENDER</p>
              <p className="text-2xl font-bold text-gray-700 mt-1">{profile.gender}</p>
            </div>
          </div>

          {/* Detailed Lists */}
          <div className="space-y-4">
            
            {/* Allergies - HIGHEST priority warning */}
            <div>
              <p className="text-xs font-bold text-gray-400 tracking-wider">⚠️ ALLERGIES</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.allergies && profile.allergies.length > 0 ? (
                  profile.allergies.map((a, i) => (
                    <span key={i} className="px-3 py-1.5 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-bold">
                      {typeof a === 'object' ? `${a.allergen.toUpperCase()} (${a.severity.toUpperCase()})` : a.toUpperCase()}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm font-medium italic">None reported</span>
                )}
              </div>
            </div>

            {/* Conditions */}
            <div>
              <p className="text-xs font-bold text-gray-400 tracking-wider">🏥 MEDICAL CONDITIONS</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.conditions && profile.conditions.length > 0 ? (
                  profile.conditions.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg text-sm font-semibold">
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm italic">None reported</span>
                )}
              </div>
            </div>

            {/* Medications */}
            <div>
              <p className="text-xs font-bold text-gray-400 tracking-wider">💊 CURRENT MEDICATIONS</p>
              <div className="space-y-2 mt-1">
                {profile.medications && profile.medications.length > 0 ? (
                  profile.medications.map((m, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-lg text-sm border border-gray-100">
                      <p className="font-bold text-gray-700">{m.name}</p>
                      {m.dosage && <p className="text-gray-500 text-xs mt-0.5">{m.dosage} — {m.frequency}</p>}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">None reported</p>
                )}
              </div>
            </div>

            {/* Contacts & Doctor */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider">🩺 PRIMARY DOCTOR</p>
                <p className="font-bold text-gray-800 mt-1 text-sm">{profile.doctorName || 'Not specified'}</p>
                {profile.doctorPhone && (
                  <a href={`tel:${profile.doctorPhone}`} className="text-xs text-blue-600 hover:underline mt-0.5 block font-semibold">
                    📞 {profile.doctorPhone}
                  </a>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 tracking-wider">📞 EMERGENCY CONTACTS</p>
                {profile.emergencyContacts && profile.emergencyContacts.length > 0 ? (
                  profile.emergencyContacts.map((c, i) => (
                    <div key={i} className="mt-1 text-sm">
                      <p className="font-bold text-gray-800">{c.name} ({c.relation})</p>
                      <a href={`tel:${c.phone}`} className="text-xs text-blue-600 hover:underline font-semibold block">
                        📞 {c.phone}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs italic">None reported</p>
                )}
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col gap-2">
            {profile.doctorPhone && (
              <a href={`tel:${profile.doctorPhone}`} className="w-full text-center py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow">
                📞 Call Primary Doctor
              </a>
            )}
            
            {profile.emergencyContacts && profile.emergencyContacts[0]?.phone && (
              <a href={`tel:${profile.emergencyContacts[0].phone}`} className="w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow">
                📞 Call Emergency Contact ({profile.emergencyContacts[0].name})
              </a>
            )}
          </div>

        </div>
      </div>
      <p className="text-xs text-gray-400 mt-6 text-center max-w-xs">
        Emergency information provided by user via MedQR. Verify identity and clinical context prior to administration of care.
      </p>
    </div>
  );
}

export default EmergencyProfile;