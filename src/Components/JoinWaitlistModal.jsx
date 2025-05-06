import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const JoinWaitlistModal = ({ isOpen, onClose }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    last_name: '',
    location: '',
    property: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedLocationButton, setSelectedLocationButton] = useState(null);
  const [selectedPropertyButton, setSelectedPropertyButton] = useState(null);
  const [showOtherLocation, setShowOtherLocation] = useState(false);
  const [showOtherProperty, setShowOtherProperty] = useState(false);
  const otherLocationRef = useRef(null);
  const otherPropertyRef = useRef(null);

  const locations = [
    'Golf Course Road',
    'Golf Course Extension Road',
    'Southern Peripheral Road',
    'Dwarka Expressway',
    'Sohna Road',
    'Other',
  ];

  const properties = ['2 BHK', '3 BHK', 'Other'];

  const selectLocation = (value, isOther = false, buttonRef) => {
    if (selectedLocationButton) {
      selectedLocationButton.classList.remove('selected');
    }
    buttonRef.classList.add('selected');
    setSelectedLocationButton(buttonRef);
    setShowOtherLocation(isOther);
    setFormData({ ...formData, location: isOther ? '' : value });
    setErrors({ ...errors, location: '' });
    if (isOther && otherLocationRef.current) {
      otherLocationRef.current.focus();
    }
  };

  const selectProperty = (value, isOther = false, buttonRef) => {
    if (selectedPropertyButton) {
      selectedPropertyButton.classList.remove('selected');
    }
    buttonRef.classList.add('selected');
    setSelectedPropertyButton(buttonRef);
    setShowOtherProperty(isOther);
    setFormData({ ...formData, property: isOther ? '' : value });
    setErrors({ ...errors, property: '' });
    if (isOther && otherPropertyRef.current) {
      otherPropertyRef.current.focus();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (currentTab === 0) {
      if (!formData.last_name.trim()) {
        newErrors.last_name = 'Please enter your name';
      }
      if (!formData.location.trim()) {
        newErrors.location = 'Please select a location';
        if (selectedLocationButton) {
          selectedLocationButton.classList.add('invalid');
        }
      }
      if (!formData.property.trim()) {
        newErrors.property = 'Please select a property type';
        if (selectedPropertyButton) {
          selectedPropertyButton.classList.add('invalid');
        }
      }
    } else if (currentTab === 1) {
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim() || formData.phone.length !== 10) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextPrev = (n) => {
    if (n === 1 && !validateForm()) return;
    if (currentTab + n >= 2) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DC40000026yrZ';
      const fields = {
        oid: '00DC40000026yrZ',
        company: 'Default company',
        lead_source: 'Landing Page Header',
        '00NC4000001FUZt': formData.location,
        '00NC4000001FUbV': formData.property,
        retURL: 'https://www.prehome.in/thank-you',
        last_name: formData.last_name,
        phone: formData.phone,
        email: formData.email,
      };
      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
      return;
    }
    setCurrentTab(currentTab + n);
    setErrors({});
    if (selectedLocationButton) selectedLocationButton.classList.remove('invalid');
    if (selectedPropertyButton) selectedPropertyButton.classList.remove('invalid');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            &times;
          </button>
        </div>
        <form id="prehomeForm" className="px-6 pb-6">
          <div className={`tab ${currentTab === 0 ? 'block' : 'hidden'}`}>
            <h3 className="text-2xl font-bold mb-2 text-left">Join our waitlist</h3>
            <p className="text-sm text-gray-700 mb-6 text-left">
              Be the first to know about our upcoming homes near you!
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-left mb-2">Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.last_name ? 'border-red-500' : ''}`}
                placeholder="Full Name"
                required
              />
              {errors.last_name && <small className="text-red-500 text-xs mt-1 block text-left">{errors.last_name}</small>}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-left mb-2">I'd like my new home in:</label>
              <div className="grid grid-cols-2 gap-3">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    className={`px-4 py-3 border border-gray-300 rounded-md text-left text-sm ${formData.location === loc ? 'bg-blue-50 border-blue-500' : ''} ${errors.location && !formData.location ? 'border-red-500' : ''}`}
                    onClick={(e) => selectLocation(loc, loc === 'Other', e.target)}
                    data-value={loc}
                  >
                    {loc}
                  </button>
                ))}
              </div>
              {showOtherLocation && (
                <input
                  type="text"
                  id="otherLocation"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full p-3 border border-gray-300 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-500' : ''}`}
                  placeholder="E.g., Golf Course Road"
                  ref={otherLocationRef}
                />
              )}
              {errors.location && <small className="text-red-500 text-xs mt-1 block text-left">{errors.location}</small>}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-left mb-2">I'd prefer my layout to be:</label>
              <div className="grid grid-cols-3 gap-3">
                {properties.map((prop) => (
                  <button
                    key={prop}
                    type="button"
                    className={`px-4 py-3 border border-gray-300 rounded-md text-sm ${formData.property === prop ? 'bg-blue-50 border-blue-500' : ''} ${errors.property && !formData.property ? 'border-red-500' : ''}`}
                    onClick={(e) => selectProperty(prop, prop === 'Other', e.target)}
                    data-value={prop}
                  >
                    {prop}
                  </button>
                ))}
              </div>
              {showOtherProperty && (
                <input
                  type="text"
                  id="otherPropertyType"
                  name="property"
                  value={formData.property}
                  onChange={handleInputChange}
                  className={`w-full p-3 border border-gray-300 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.property ? 'border-red-500' : ''}`}
                  placeholder="E.g., 4BHK"
                  ref={otherPropertyRef}
                />
              )}
              {errors.property && <small className="text-red-500 text-xs mt-1 block text-left">{errors.property}</small>}
            </div>
            <p className="text-xs text-gray-500 text-left mb-6">
              We're here to help you find the right home—your info stays safe with us.
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => nextPrev(1)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
              >
                Add me to the waitlist
              </button>
            </div>
          </div>
          <div className={`tab ${currentTab === 1 ? 'block' : 'hidden'}`}>
            <h3 className="text-2xl font-bold mb-2 text-left">Tell us about yourself</h3>
            <p className="text-sm text-gray-700 mb-6 text-left">Your details</p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-left mb-2">Phone Number</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : ''}`}
                placeholder="+91"
                maxLength="10"
                required
              />
              {errors.phone && <small className="text-red-500 text-xs mt-1 block text-left">{errors.phone}</small>}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-left mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Email Address"
                required
              />
              {errors.email && <small className="text-red-500 text-xs mt-1 block text-left">{errors.email}</small>}
            </div>
            <div className="mb-6">
              <label className="text-xs text-gray-500 text-left">
                By clicking on the button below, you agree to the{' '}
                <a href="privacypolicy.html" className="text-blue-500">
                  privacy policy
                </a>
              </label>
            </div>
            <p className="text-xs text-gray-500 text-left mb-6">
              Your details are private—we'll only reach out with updates that matter.
            </p>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => nextPrev(-1)}
                className="px-4 py-3 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition duration-200"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => nextPrev(1)}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
              >
                Keep me posted
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              <div className={`w-2 h-2 rounded-full ${currentTab === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`w-2 h-2 rounded-full ${currentTab === 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinWaitlistModal;