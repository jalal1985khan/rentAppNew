'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import MobileHeader from '@/components/layout/MobileHeader';
import Sidebar from '@/components/layout/Sidebar';
import Image from 'next/image';
import { PencilIcon, CameraIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { user, userData, updateUserProfile } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    photoURL: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
      if (userData) {
        console.log(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        role: userData.role || '',
        photoURL: userData.photoURL || '',
      });
    }
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                              <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                              {formData.role === 'superadmin' && (
                              <>
                         {!isEditing && (
                            <button
                              onClick={() => setIsEditing(true)}
                              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-black hover:text-white"
                            >
                              <PencilIcon className="h-4 w-4 mr-2" />
                              Edit Profile
                            </button>
                                      )}
                                      </>
                              )}
                
              </div>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                  {formData.photoURL ? (
                    <Image
                      src={formData.photoURL}
                      alt={formData.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-purple-600 text-4xl">
                      {formData.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                                  )}
                                  <div className='absolute bottom-0 right-0 z-10'>
                                  {isEditing && (
                    <button
                      type="button"
                      className="absolute bottom-0 right-12 p-2 bg-primary text-purple-600 rounded-full hover:bg-primary-dark"
                    >
                      <CameraIcon className="h-5 w-5" />
                    </button>
                  )}
                                  </div>
                 
                              </div>
                              
                <p className="text-sm text-gray-500">Click to change profile picture</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                                    
                                      className="block w-full pl-2  py-2 border border-gray-300 bg-gray-50 rounded-2xl text-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600/50 focus:bg-white transition-all duration-200"
                                  />
                                  
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full pl-2  py-2 border border-gray-300 bg-gray-50 rounded-2xl text-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600/50 focus:bg-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full pl-2  py-2 border border-gray-300 bg-gray-50 rounded-2xl text-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600/50 focus:bg-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <select
                    name="department"
                    id="department"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="block w-full pl-2  py-2 border border-gray-300 bg-gray-50 rounded-2xl text-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-purple-600/50 focus:bg-white transition-all duration-200"
                  >
                    <option value="">Select Department</option>
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="finance">Finance</option>
                    <option value="operations">Operations</option>
                    <option value="management">Management</option>
                  </select>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-md hover:bg-primary-dark disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 