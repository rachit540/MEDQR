import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const API = 'http://localhost:5000/api'

function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    gender: 'Male',
    bloodGroup: 'O+',
    allergies: [{ allergen: '', severity: 'Mild' }],
    conditions: [''],
    medications: [{ name: '', dosage: '', frequency: '' }],
    organDonor: false,
    emergencyContacts: [{ name: '', relation: '', phone: '' }],
    doctorName: '',
    doctorPhone: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAllergyChange = (i, field, value) => {
    const updated = [...form.allergies]
    updated[i][field] = value
    setForm({ ...form, allergies: updated })
  }

  const addAllergy = () => {
    setForm({ ...form, allergies: [...form.allergies, { allergen: '', severity: 'Mild' }] })
  }

  const removeAllergy = (i) => {
    setForm({ ...form, allergies: form.allergies.filter((_, idx) => idx !== i) })
  }

  const handleMedChange = (i, field, value) => {
    const updated = [...form.medications]
    updated[i][field] = value
    setForm({ ...form, medications: updated })
  }

  const addMed = () => {
    setForm({ ...form, medications: [...form.medications, { name: '', dosage: '', frequency: '' }] })
  }

  const removeMed = (i) => {
    setForm({ ...form, medications: form.medications.filter((_, idx) => idx !== i) })
  }

  const handleConditionChange = (i, value) => {
    const updated = [...form.conditions]
    updated[i] = value
    setForm({ ...form, conditions: updated })
  }

  const addCondition = () => {
    setForm({ ...form, conditions: [...form.conditions, ''] })
  }

  const removeCondition = (i) => {
    setForm({ ...form, conditions: form.conditions.filter((_, idx) => idx !== i) })
  }

  const handleContactChange = (i, field, value) => {
    const updated = [...form.emergencyContacts]
    updated[i][field] = value
    setForm({ ...form, emergencyContacts: updated })
  }

  const addContact = () => {
    setForm({ ...form, emergencyContacts: [...form.emergencyContacts, { name: '', relation: '', phone: '' }] })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const cleanData = {
        ...form,
        allergies: form.allergies.filter(a => a.allergen.trim() !== ''),
        conditions: form.conditions.filter(c => c.trim() !== ''),
        medications: form.medications.filter(m => m.name.trim() !== ''),
        emergencyContacts: form.emergencyContacts.filter(c => c.name.trim() !== '' && c.phone.trim() !== '')
      }
      const res = await axios.post(API + '/profile/register', cleanData)
      localStorage.setItem('medqr_email', cleanData.email)
      localStorage.setItem('medqr_uuid', res.data.profileUuid)
      alert('Profile created successfully!')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <Link to="/" className="text-2xl font-bold text-red-600">🏥 MedQR</Link>
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">Already have account? Login</Link>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Emergency Profile</h2>
        <p className="text-gray-500 mb-4">Step {step} of 4</p>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-red-600 h-2 rounded-full transition-all" style={{ width: (step / 4) * 100 + '%' }}></div>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">{error}</div>}

        {step === 1 && (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-700">👤 Personal Information</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Email *</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Password *</label>
              <input type="password" name="password" value={form.password} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Create a password" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Full Name *</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                placeholder="Your full name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Date of Birth</label>
                <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Blood Group *</label>
              <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
            <button onClick={() => {
              if (!form.email || !form.password || !form.fullName) { setError('Fill email, password and name'); return }
              setError(''); setStep(2)
            }} className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
              Next → Medical Info
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-700">⚠️ Allergies & Conditions</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Allergies</label>
              {form.allergies.map((a, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" placeholder="e.g. Penicillin" value={a.allergen}
                    onChange={(e) => handleAllergyChange(i, 'allergen', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
                  <select value={a.severity} onChange={(e) => handleAllergyChange(i, 'severity', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Mild</option><option>Moderate</option><option>Severe</option><option>Life-threatening</option>
                  </select>
                  {form.allergies.length > 1 && (
                    <button onClick={() => removeAllergy(i)} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg">✕</button>
                  )}
                </div>
              ))}
              <button onClick={addAllergy} className="text-blue-600 text-sm font-semibold">+ Add allergy</button>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Medical Conditions</label>
              {form.conditions.map((c, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input type="text" placeholder="e.g. Diabetes, Asthma" value={c}
                    onChange={(e) => handleConditionChange(i, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
                  {form.conditions.length > 1 && (
                    <button onClick={() => removeCondition(i)} className="px-3 py-2 bg-red-100 text-red-600 rounded-lg">✕</button>
                  )}
                </div>
              ))}
              <button onClick={addCondition} className="text-blue-600 text-sm font-semibold">+ Add condition</button>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={form.organDonor}
                onChange={(e) => setForm({ ...form, organDonor: e.target.checked })} className="w-5 h-5" />
              <label className="text-sm font-semibold text-gray-600">I am an organ donor</label>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg">← Back</button>
              <button onClick={() => setStep(3)} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">Next → Medications</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-700">💊 Medications</h3>
            {form.medications.map((m, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Medication {i + 1}</span>
                  {form.medications.length > 1 && (
                    <button onClick={() => removeMed(i)} className="text-red-600 text-sm">Remove</button>
                  )}
                </div>
                <input type="text" placeholder="Medicine name" value={m.name}
                  onChange={(e) => handleMedChange(i, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Dosage (e.g. 500mg)" value={m.dosage}
                    onChange={(e) => handleMedChange(i, 'dosage', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
                  <input type="text" placeholder="Frequency (e.g. Twice daily)" value={m.frequency}
                    onChange={(e) => handleMedChange(i, 'frequency', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
                </div>
              </div>
            ))}
            <button onClick={addMed} className="text-blue-600 text-sm font-semibold">+ Add medication</button>
            <h3 className="text-xl font-bold text-gray-700 pt-4">👨‍⚕️ Doctor Info (Optional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="doctorName" placeholder="Doctor name" value={form.doctorName} onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
              <input type="text" name="doctorPhone" placeholder="Doctor phone" value={form.doctorPhone} onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
            </div>
            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg">← Back</button>
              <button onClick={() => setStep(4)} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">Next → Emergency Contacts</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-xl font-bold text-gray-700">☎️ Emergency Contacts</h3>
            {form.emergencyContacts.map((c, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-2">
                <span className="font-semibold text-gray-600">Contact {i + 1}</span>
                <input type="text" placeholder="Contact name" value={c.name}
                  onChange={(e) => handleContactChange(i, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Relation (Father, Mother...)" value={c.relation}
                    onChange={(e) => handleContactChange(i, 'relation', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
                  <input type="text" placeholder="Phone number" value={c.phone}
                    onChange={(e) => handleContactChange(i, 'phone', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" />
                </div>
              </div>
            ))}
            <button onClick={addContact} className="text-blue-600 text-sm font-semibold">+ Add contact</button>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setStep(3)} className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg">← Back</button>
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                {loading ? 'Creating...' : '✅ Create Profile & Get QR'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
