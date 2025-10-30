import React, { useState } from 'react';
import { User, Mail, Lock, Bell, Shield, Palette, Camera, Eye, EyeOff } from 'lucide-react';

export default function Setting() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Product designer passionate about creating intuitive user experiences.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    productUpdates: true
  });

  const [theme, setTheme] = useState('light');

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // Simulate API call or validation
    alert('Password changed successfully ✅');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const tabs = [
    { id: 'security', label: 'Security', icon: Lock },
    // { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className=" bg-white h-[88vh] rounded-md">
      <div className=" mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Tabs */}
        {/* <div className="w-full md:w-64 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
          </div>
          <div className="flex flex-col">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div> */}

        {/* Main Content */}
        <div className="flex-1 justify-center items-center bg-white rounded-lg shadow-sm p-6">
            <>
            
               <div className='flex flex-col justify-center items-center'>

              <h2 className="text-2xl text-left font-semibold text-gray-900 mb-6">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-xl">
                {['current', 'new', 'confirm'].map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key === 'confirm' ? 'Confirm New Password' : `${key} Password`}
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords[key] ? 'text' : 'password'}
                        name={`${key}Password`}
                        value={passwordData[`${key}Password`]}
                        onChange={handlePasswordChange}
                        className="lg:w-[35vw] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((prev) => ({ ...prev, [key]: !prev[key] }))
                        }
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                      >
                        {showPasswords[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
              </form>
            </div>
            </>
        </div>
      </div>
    </div>
  );
}
