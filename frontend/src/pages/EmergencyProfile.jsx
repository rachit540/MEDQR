import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  if (error) return <h2 style={{ textAlign: 'center', color: 'red' }}>❌ {error}</h2>;
  if (!profile) return <h2 style={{ textAlign: 'center' }}>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h1>🚨 Emergency Medical Info</h1>
      <div style={styles.card}>
        <h2>👤 {profile.fullName}</h2>
        <p>🩸 <strong>Blood Group:</strong> {profile.bloodGroup}</p>
        <p>👤 <strong>Gender:</strong> {profile.gender}</p>
        <p>⚠️ <strong>Allergies:</strong> {profile.allergies?.join(', ') || 'None'}</p>
        <p>🏥 <strong>Conditions:</strong> {profile.conditions?.join(', ') || 'None'}</p>
        <p>💊 <strong>Medications:</strong> {profile.medications?.map(m => m.name).join(', ') || 'None'}</p>
        <p>🩺 <strong>Doctor:</strong> {profile.doctorName || 'Not specified'}</p>
        <p>📞 <strong>Doctor Phone:</strong> {profile.doctorPhone || 'Not specified'}</p>
      </div>
      {profile.doctorPhone && (
        <a href={`tel:${profile.doctorPhone}`} style={styles.callBtn}>
          📞 Call Doctor
        </a>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: '500px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' },
  card: { background: '#fff3f3', padding: '20px', borderRadius: '12px', margin: '20px 0', textAlign: 'left', border: '2px solid #f44336' },
  callBtn: { display: 'inline-block', padding: '15px 30px', backgroundColor: '#f44336', color: 'white', borderRadius: '8px', fontSize: '18px', textDecoration: 'none', marginTop: '10px' }
};

export default EmergencyProfile;