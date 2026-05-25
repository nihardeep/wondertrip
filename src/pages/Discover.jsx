import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home, Globe, MapPin, Users, User, Settings, HelpCircle, Clock, Plus, X, Upload, Video, Image as ImageIcon, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';
import Input from '../components/common/Input';
import AuthModal from '../components/common/AuthModal';
import TripSuccessModal from '../components/common/TripSuccessModal';
import ChatBot from '../components/common/ChatBot';
import Footer from '../components/common/Footer';
import { NAV_LINKS } from '../data/constants';

const Discover = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Helper to determine if we should auto-fill the search input
  const shouldAutoFillInput = (query) => {
    if (!query) return false;

    // 1. Structure Check: If it has multiple commas, it's likely a list (e.g. "Maldives, Tokyo...")
    // "City, Country" has 1 comma (2 parts). Our list has 5+ commas.
    // So if > 2 parts, treat as list -> don't auto-fill.
    if (query.split(',').length > 2) return false;

    // 2. Content Check: Case-insensitive match for our featured keys
    const indicators = ['maldives', 'tokyo', 'bali', 'ibiza', 'rome'];
    const qLower = query.toLowerCase();
    const matchCount = indicators.filter(i => qLower.includes(i)).length;

    // If it contains multiple featured destinations, definitely don't auto-fill
    return matchCount < 2;
  };

  const [selectedDestination, setSelectedDestination] = useState(() => {
    return shouldAutoFillInput(searchQuery) ? searchQuery : '';
  });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tripType, setTripType] = useState('video'); // 'video' or 'photos'
  const [formData, setFormData] = useState({
    videoUrl: '',
    videoFile: null,
    photos: [],
    destination: '',
    tripType: 'adventure',
    tripDescription: '',
    tripDate: '' // Initialize tripDate
  });

  const { user, activeSessionId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const chatBotRef = useRef(null);

  // Supported destinations configuration
  const SUPPORTED_DESTINATIONS = ['maldives', 'hanoi', 'kuala lumpur', 'tokyo', 'bali', 'ibiza', 'rome'];

  // Helper to map n8n response to posts
  const mapN8nResponseToPosts = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => {
        const json = item.json || item; // Handle wrapped json or direct object

        // Determine image based on destination (simple fallback logic)
        let image = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80';
        const dest = json.destination_city || json.destination || '';
        const destLower = dest.toLowerCase();

        if (destLower.includes('tokyo')) image = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80';
        else if (destLower.includes('bali')) image = 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80';
        else if (destLower.includes('ibiza')) image = 'https://images.unsplash.com/photo-1560242259-2470a6c6ec2d?w=800&q=80';
        else if (destLower.includes('maldives')) image = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
        else if (destLower.includes('paris')) image = 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80';
        else if (destLower.includes('rome')) image = 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80';

        return {
          id: json.itinerary_id || Math.random().toString(36).substr(2, 9),
          creator: {
            name: json.user_id || 'AI Traveler', // Map user_id to name
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces', // Default avatar
            subscribed: false
          },
          image: image,
          description: json.description || json.headline || 'An amazing trip itinerary generated just for you.',
          location: `${json.destination_city || ''}, ${json.destination_country || ''}`,
          stops: json.duration_days || 1, // Map duration to stops
          route: [] // Can be populated if key_locations represents points
        };
      });
    }
    return [];
  };

  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Fetch posts from n8n (Centralized Logic)
  const fetchPosts = async (query) => {
    setSearchError(null); // Reset error

    // Check supported destinations
    const effectiveQuery = query || 'Maldives, Hanoi, Kuala Lumpur, Tokyo, Bali, Ibiza, Rome';
    const queryLower = effectiveQuery.toLowerCase();

    // Check if at least one supported destination is in the query (partial match)
    // We allow the default query to pass always
    const isSupported = SUPPORTED_DESTINATIONS.some(dest => queryLower.includes(dest));

    // Special check for empty query which defaults to supported list, so it's valid
    // But if a user typed a specific query that is NOT in the list, we block it.
    if (query && !isSupported) {
      console.warn('Unsupported destination search:', query);
      setPosts([]); // Clear posts
      setSearchError(true);
      return;
    }

    try {
      setIsSearching(true);
      console.log('Fetching posts for:', effectiveQuery);

      const response = await fetch('https://nds1234567.app.n8n.cloud/webhook/ac5d8037-976d-4384-8622-a08566629e3e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent: 'Search',
          query: effectiveQuery,
          startDate, // Note: these might be empty on initial load, which is fine
          endDate,
          adults,
          rooms,
          activeSessionId,
          email: user?.email || '',
          sessionId: activeSessionId
        }),
      });

      const data = await response.json();
      const mappedPosts = mapN8nResponseToPosts(data);

      if (mappedPosts.length > 0) {
        setPosts(mappedPosts);
        // Focus top of screen when results show
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Optional: setPosts(defaultCreatorPosts) on error? 
      // For now, keeping existing posts or defaults is safer.
    } finally {
      setIsSearching(false);
    }
  };

  // 1. Handle Initial Load & URL Changes
  useEffect(() => {
    // If we have state from Hero navigation, use that first then clear it
    if (location.state?.n8nData) {
      const mappedPosts = mapN8nResponseToPosts(location.state.n8nData);
      if (mappedPosts.length > 0) {
        setPosts(mappedPosts);
      }
      // Clear state to avoid stale data
      window.history.replaceState({}, document.title);
    } else {
      // Otherwise, fetch based on URL query or defaults
      fetchPosts(searchQuery);
    }
  }, [searchQuery]); // Trigger when URL search param changes

  // Handle opening the modal with auth check
  const handleOpenModal = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setIsModalOpen(true);
  };

  // Update selectedDestination input when URL changes
  useEffect(() => {
    if (searchQuery) {
      if (shouldAutoFillInput(searchQuery)) {
        setSelectedDestination(searchQuery);
      } else {
        setSelectedDestination(''); // Keep input clean
      }
    }
  }, [searchQuery]);

  // Scroll to top when modal opens
  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isModalOpen]);


  const handleSearch = async (e) => {
    // If triggered by keydown, only proceed on Enter
    if (e && e.key && e.key !== 'Enter') return;

    // Update URL to trigger the useEffect above
    // This makes the URL the single source of truth
    if (selectedDestination.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set('search', selectedDestination);
      navigate(`/discover?${params.toString()}`);
    } else {
      // Cleared search
      navigate('/discover');
    }
  };

  const handleFileChange = (e, type) => {
    if (type === 'video') {
      setFormData(prev => ({ ...prev, videoFile: e.target.files[0] }));
    } else if (type === 'photos') {
      setFormData(prev => ({ ...prev, photos: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('email', user?.email || '');
    formDataToSend.append('tripType', formData.tripType);
    formDataToSend.append('destination', formData.destination);
    formDataToSend.append('tripDescription', formData.tripDescription);
    formDataToSend.append('tripDate', formData.tripDate); // Add date to payload
    formDataToSend.append('intent', 'Create a new trip');
    formDataToSend.append('type', tripType === 'photos' ? 'images' : 'video');
    formDataToSend.append('sessionId', activeSessionId);

    // Optional video
    if (formData.videoFile) {
      formDataToSend.append('video', formData.videoFile);
    }

    // Optional images
    if (formData.photos && formData.photos.length > 0) {
      formData.photos.forEach((photo) => {
        formDataToSend.append('images', photo);
      });
    }



    try {
      // Show processing state immediately for both video and photos
      if (formData.videoFile || (formData.photos && formData.photos.length > 0)) {
        setIsModalOpen(false);
        setShowSuccessModal(true);
        setIsProcessing(true);
      }

      // Send to n8n webhook
      const response = await fetch('https://nds1234567.app.n8n.cloud/webhook/ac5d8037-976d-4384-8622-a08566629e3e', {
        method: 'POST',
        body: formDataToSend,
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Handle array response from n8n
      const responseItem = Array.isArray(data) ? data[0] : data;
      const responseStatus = responseItem?.status || responseItem?.json?.status;

      // Handle single message (legacy/simple structure)
      const singleMessage = responseItem?.message || responseItem?.json?.message;

      // Handle multiple messages structure (new structure)
      const multipleMessages = responseItem?.messages || responseItem?.json?.messages;

      // Check for multiple messages first
      if (multipleMessages && Array.isArray(multipleMessages) && multipleMessages.length > 0) {
        setIsProcessing(false);
        setShowSuccessModal(false);

        // Open chat immediately
        chatBotRef.current?.openWithBotMessage("I found some things we need to double check:");

        // Add each message with a small delay to feel natural, or just add them all
        multipleMessages.forEach((msg, index) => {
          setTimeout(() => {
            chatBotRef.current?.openWithBotMessage(msg.message);
          }, (index + 1) * 500);
        });
        return;
      }

      // Check for single chat/question response
      if (singleMessage &&
        (responseStatus !== 'success' || singleMessage.includes('?'))) {
        setIsProcessing(false);
        setShowSuccessModal(false);
        chatBotRef.current?.openWithBotMessage(singleMessage);
        return;
      }

      if (response.ok || responseStatus === 'success') {
        // Stop processing animation
        setIsProcessing(false);
        // Ensure success modal is open (it might be already open)
        setShowSuccessModal(true);

        // Reset form
        setFormData({
          videoUrl: '',
          videoFile: null,
          photos: [],
          destination: '',
          tripType: 'adventure',
          tripDescription: ''
        });
      } else {
        // Handle error
        setShowSuccessModal(false);
        setIsProcessing(false);
        setIsModalOpen(true); // Re-open form
        alert('Failed to start trip generation. Please try again.');
      }
    } catch (error) {
      console.error('Error sending data to webhook:', error);
      setShowSuccessModal(false);
      setIsProcessing(false);
      setIsModalOpen(true); // Re-open form
      alert('Connection error. Please try again.');
    }
  };

  // Default creator posts data
  const defaultCreatorPosts = [
    {
      id: 1,
      creator: {
        name: 'John Doe',
        avatar: '/images/creators/john-doe.jpg',
        subscribed: false
      },
      image: '/images/destinations/tokyo.jpg',
      description: 'Exploring the vibrant streets of Tokyo! The neon lights and bustling energy are truly unforgettable. Every corner holds a new adventure.',
      location: 'Tokyo, Japan',
      stops: 7,
      route: [
        { lat: 35.6762, lng: 139.6503, name: 'Shibuya' },
        { lat: 35.6586, lng: 139.7454, name: 'Tokyo Skytree' },
        { lat: 35.6762, lng: 139.6503, name: 'Harajuku' }
      ]
    },
    {
      id: 2,
      creator: {
        name: 'Sophia Travels',
        avatar: '/images/creators/sophia.jpg',
        subscribed: false
      },
      image: '/images/destinations/bali.jpg',
      description: 'Bali is paradise on earth! From stunning beaches to ancient temples, every moment here is magical. The culture and hospitality are unmatched.',
      location: 'Bali, Indonesia',
      stops: 5,
      route: []
    },
    {
      id: 3,
      creator: {
        name: 'Alice Travel',
        avatar: '/images/creators/alice.jpg',
        subscribed: true
      },
      image: '/images/destinations/maldives.jpg',
      description: 'Maldives - where crystal clear waters meet endless blue skies. The overwater bungalows and marine life make this a dream destination.',
      location: 'Maldives',
      stops: 4,
      route: []
    },
    {
      id: 4,
      creator: {
        name: 'Wanderlust Ben',
        avatar: '/images/creators/ben.jpg',
        subscribed: false
      },
      image: '/images/destinations/kuala-lumpur.jpg',
      description: 'Kuala Lumpur is a perfect blend of modern architecture and rich culture. The food scene here is incredible - from street food to fine dining!',
      location: 'Kuala Lumpur, Malaysia',
      stops: 6,
      route: []
    },
    {
      id: 5,
      creator: {
        name: 'Journey Jules',
        avatar: '/images/creators/jules.jpg',
        subscribed: false
      },
      image: '/images/destinations/hanoi.jpg',
      description: 'Hanoi\'s old quarter is a maze of history and flavors. The street food tours and motorbike rides through the city are unforgettable experiences.',
      location: 'Hanoi, Vietnam',
      stops: 8,
      route: []
    },
    {
      id: 6,
      creator: {
        name: 'Tokyo Explorer',
        avatar: '/images/creators/tokyo-explorer.jpg',
        subscribed: false
      },
      image: '/images/destinations/tokyo-2.jpg',
      description: 'Discovering hidden gems in Tokyo\'s neighborhoods. From traditional tea houses to modern art galleries, this city never stops surprising.',
      location: 'Tokyo, Japan',
      stops: 9,
      route: []
    },
    {
      id: 7,
      creator: {
        name: 'Bali Dreams',
        avatar: '/images/creators/bali-dreams.jpg',
        subscribed: false
      },
      image: '/images/destinations/bali-2.jpg',
      description: 'Rice terraces, waterfalls, and spiritual experiences await in Bali. This island has something for every type of traveler.',
      location: 'Bali, Indonesia',
      stops: 6,
      route: []
    }
  ];

  const [posts, setPosts] = useState(defaultCreatorPosts);

  // Filter posts based on selected destination - REMOVED client side filter
  // We now rely on the API to filter results based on the search query
  const filteredPosts = posts;

  const trendingCreators = [
    { name: 'Alice Travel', avatar: '/images/creators/alice.jpg' },
    { name: 'Wanderlust Ben', avatar: '/images/creators/ben.jpg' },
    { name: 'Journey Jules', avatar: '/images/creators/jules.jpg' }
  ];

  const trendingDestinations = [
    'Kyoto, Japan',
    'Santorini, Greece',
    'Banff, Canada',
    'Patagonia, Chile'
  ];

  const navigationItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Globe, label: 'Discover', path: '/discover', active: true },
    { icon: MapPin, label: 'My Trips', path: '/profile' },
    { icon: Users, label: 'Subscriptions', path: '/subscriptions' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-display font-bold text-gray-900 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span>WonderTrip</span>
            </Link>

            {/* Navigation Links */}
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 mx-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>



            {/* User Profile */}
            {user ? (
              user.avatar ? (
                <Link to="/profile">
                  <img
                    src={user.avatar}
                    alt="User profile"
                    className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
                  />
                </Link>
              ) : (
                <Link to="/profile" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all text-primary-700 font-bold text-sm">
                  {user?.name
                    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                    : <User className="w-6 h-6 text-primary-600" />
                  }
                </Link>
              )
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Search Row */}
          <div className="mt-4 flex justify-center pb-2">
            <div className="w-full max-w-6xl">
              <div className="flex items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:border-primary-400 transition-colors hidden md:flex">
                {/* Destination */}
                <div className="flex-[2] relative border-r border-gray-200">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="w-full pl-10 pr-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent border-none"
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                </div>

                {/* Check-in */}
                <div className="flex-1 relative border-r border-gray-200 min-w-[120px]">
                  <div className="absolute left-2 top-1 text-[10px] text-gray-500 font-medium">Check-in</div>
                  <input
                    type="date"
                    className="w-full pl-2 pt-3 pb-1 border-none focus:ring-0 text-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                {/* Check-out */}
                <div className="flex-1 relative border-r border-gray-200 min-w-[120px]">
                  <div className="absolute left-2 top-1 text-[10px] text-gray-500 font-medium">Check-out</div>
                  <input
                    type="date"
                    className="w-full pl-2 pt-3 pb-1 border-none focus:ring-0 text-sm"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                {/* Adults */}
                <div className="w-20 border-r border-gray-200 relative">
                  <div className="absolute left-2 top-1 text-[10px] text-gray-500 font-medium">Adults</div>
                  <input
                    type="number"
                    min="1"
                    className="w-full pl-3 pt-3 pb-1 rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent border-none text-sm"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                  />
                </div>

                {/* Rooms */}
                <div className="w-20 relative border-r border-gray-200">
                  <div className="absolute left-2 top-1 text-[10px] text-gray-500 font-medium">Rooms</div>
                  <input
                    type="number"
                    min="1"
                    className="w-full pl-3 pt-3 pb-1 rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent border-none text-sm"
                    value={rooms}
                    onChange={(e) => setRooms(parseInt(e.target.value) || 1)}
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={() => handleSearch()}
                  className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-r-lg transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Mobile View Placeholder or simplified view could go here if needed, but keeping consistent with existing structure */}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-16">
          <nav className="p-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors ${item.active
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-primary-600' : ''}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}

            <div className="border-t border-gray-200 my-4"></div>

            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </Link>

            <Link
              to="/help"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Help</span>
            </Link>

            {/* New AI Trip CTA */}
            <div className="mt-6 mx-4 p-6 rounded-2xl bg-gradient-to-br from-primary-600 to-pink-500 text-white text-center shadow-lg relative overflow-hidden group">
              {/* Abstract decorative elements */}
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-pink-500 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold mb-1 leading-tight">
                  Your Memories.
                </h3>
                <h3 className="text-xl font-display font-bold mb-4 leading-tight">
                  AI-Powered Journeys
                </h3>

                <p className="text-xs text-white/90 mb-6 leading-relaxed">
                  Transform videos & photos into personalized travel plans
                </p>

                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="w-full py-3 px-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full font-semibold text-sm hover:bg-white hover:text-primary-600 transition-all duration-300 shadow-sm"
                >
                  Create My AI Trip
                </button>

                <p className="mt-4 text-[10px] text-white/80 font-medium tracking-wide uppercase opacity-80">
                  Share. Discover. Inspire.
                </p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Discover New Adventures
            </h1>
            <p className="text-gray-600 mb-8">
              Explore unique travel stories and itineraries from creators around the world.
            </p>

            {/* Creator Posts */}
            <div className="space-y-6">
              {searchError ? (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">We're expanding soon! 🌍</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We currently only feature curated trips for a select few destinations. Please try searching for one of these instead:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                    {SUPPORTED_DESTINATIONS.map((dest) => (
                      <span
                        key={dest}
                        onClick={() => setSelectedDestination(dest.charAt(0).toUpperCase() + dest.slice(1))}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 cursor-pointer transition-colors capitalize"
                      >
                        {dest}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    {/* Creator Header */}
                    <CardContent className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              post.creator.name === 'John Doe'
                                ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
                                : post.creator.name === 'Sophia Travels'
                                  ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces'
                                  : post.creator.name === 'Alice Travel'
                                    ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces'
                                    : post.creator.name === 'Wanderlust Ben'
                                      ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
                                      : post.creator.name === 'Journey Jules'
                                        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
                                        : post.creator.name === 'Tokyo Explorer'
                                          ? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
                                          : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=faces'
                            }
                            alt={post.creator.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span className="font-semibold text-gray-900">{post.creator.name}</span>
                        </div>
                        <Button
                          variant={post.creator.subscribed ? 'secondary' : 'outline'}
                          size="sm"
                        >
                          {post.creator.subscribed ? 'Subscribed' : 'Subscribe'}
                        </Button>
                      </div>

                      {/* Main Image */}
                      <div className="w-full h-64 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={
                            post.location.includes('Tokyo')
                              ? 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80'
                              : post.location.includes('Bali')
                                ? 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80'
                                : post.location.includes('Maldives')
                                  ? 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
                                  : post.location.includes('Kuala Lumpur')
                                    ? 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80'
                                    : post.location.includes('Hanoi')
                                      ? 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'
                                      : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'
                          }
                          alt={post.location}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {post.description}
                      </p>

                      {/* Location & Stops */}
                      <div className="flex items-center space-x-6 mb-4 text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{post.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{post.stops} stops</span>
                        </div>
                      </div>

                      {/* Map Snippet */}
                      {post.route.length > 0 && (
                        <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <div className="text-gray-400 text-sm">Map Route Preview</div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            console.log('Opening trip in new tab:', post.id);
                            window.open(`/trip/${post.id}`, '_blank');
                          }}
                        >
                          View Trip
                        </Button>
                        <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white" onClick={() => navigate('/create-trip')}>
                          Create Trip From This Post
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )))}
            </div>
          </div>
          <div className="mt-12">
            <Footer />
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 bg-white border-l border-gray-200 p-6 sticky top-16 h-screen overflow-y-auto">
          {/* Trending Creators */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Creators</h3>
            <div className="space-y-3">
              {trendingCreators.map((creator, index) => (
                <div key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <img
                    src={
                      creator.name === 'Alice Travel'
                        ? 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces'
                        : creator.name === 'Wanderlust Ben'
                          ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
                          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
                    }
                    alt={creator.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-900">{creator.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Destinations */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Destinations</h3>
            <div className="space-y-2">
              {trendingDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => setSelectedDestination(destination.split(',')[0])}
                >
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{destination}</span>
                </div>
              ))}
            </div>
          </div>


        </aside>
      </div>

      {/* Search Loading Overlay */}
      {isSearching && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="w-8 h-8 text-primary-600 animate-pulse" />
            </div>
          </div>
          <div className="text-center max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 animate-pulse">Finding perfect destinations...</h3>
            <p className="text-gray-600">Curating the best travel experiences just for you.</p>
          </div>
        </div>
      )}

      {/* AI Trip Generation Modal */}
      {
        isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-gray-900">Create AI Trip</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Trip Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose Content Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setTripType('video')}
                      className={`p-4 border-2 rounded-lg transition-all ${tripType === 'video'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <Video className={`w-6 h-6 mx-auto mb-2 ${tripType === 'video' ? 'text-primary-600' : 'text-gray-400'}`} />
                      <span className={`font-medium ${tripType === 'video' ? 'text-primary-600' : 'text-gray-700'}`}>
                        Create from Video
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType('photos')}
                      className={`p-4 border-2 rounded-lg transition-all ${tripType === 'photos'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <ImageIcon className={`w-6 h-6 mx-auto mb-2 ${tripType === 'photos' ? 'text-primary-600' : 'text-gray-400'}`} />
                      <span className={`font-medium ${tripType === 'photos' ? 'text-primary-600' : 'text-gray-700'}`}>
                        Create from Photos
                      </span>
                    </button>
                  </div>
                </div>

                {/* Trip Date Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    When did you visit?
                  </label>
                  <Input
                    type="date"
                    value={formData.tripDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, tripDate: e.target.value }))}
                  />
                </div>

                {/* Video Option */}
                {tripType === 'video' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Video or Instagram/YouTube URL
                      </label>
                      <Input
                        type="text"
                        placeholder="Paste Instagram or YouTube URL..."
                        value={formData.videoUrl}
                        onChange={(e) => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                      />
                    </div>
                    <div className="text-center text-gray-500 text-sm">OR</div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Video File
                      </label>
                      {!formData.videoFile ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleFileChange(e, 'video')}
                            className="hidden"
                            id="video-upload"
                          />
                          <label htmlFor="video-upload" className="cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              MP4, MOV, AVI (max 500MB)
                            </p>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center overflow-hidden">
                            <Video className="w-8 h-8 text-primary-600 mr-3 flex-shrink-0" />
                            <div className="truncate">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {formData.videoFile.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, videoFile: null }))}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove video"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Photos Option */}
                {tripType === 'photos' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photo Collage
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFileChange(e, 'photos')}
                        className="hidden"
                        id="photos-upload"
                      />
                      <label htmlFor="photos-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.photos.length > 0
                            ? `${formData.photos.length} photo(s) selected`
                            : 'JPG, PNG, HEIC (max 10MB each)'}
                        </p>
                      </label>
                    </div>
                    {formData.photos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative group">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newPhotos = [...formData.photos];
                                newPhotos.splice(index, 1);
                                setFormData(prev => ({ ...prev, photos: newPhotos }));
                              }}
                              className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100"
                              title="Remove photo"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Trip Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your Trip in few words
                  </label>
                  <textarea
                    placeholder="e.g. A relaxing beach vacation with some hiking..."
                    value={formData.tripDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, tripDescription: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none min-h-[100px]"
                  />
                </div>

                {/* Trip Destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Destination
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter destination (e.g., Tokyo, Japan)"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    required
                  />
                </div>

                {/* Trip Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Type
                  </label>
                  <select
                    value={formData.tripType}
                    onChange={(e) => setFormData(prev => ({ ...prev, tripType: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none"
                    required
                  >
                    <option value="adventure">Adventure</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="cultural">Cultural</option>
                    <option value="beach">Beach</option>
                    <option value="mountain">Mountain</option>
                    <option value="city">City</option>
                    <option value="nature">Nature</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
                  >
                    Create Trip
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )
      }
      {/* Auth Requirement Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Trip Success Modal */}
      <TripSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        isProcessing={isProcessing}
        tripType={tripType}
      />

      <ChatBot ref={chatBotRef} />
    </div >
  );
};

export default Discover;
