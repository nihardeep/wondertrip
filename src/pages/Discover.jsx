import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Home, Globe, MapPin, Users, User, Settings, HelpCircle, Clock, Plus, X, Upload, Video, Image as ImageIcon } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';
import Input from '../components/common/Input';

const Discover = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedDestination, setSelectedDestination] = useState(searchQuery || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripType, setTripType] = useState('video'); // 'video' or 'photos'
  const [formData, setFormData] = useState({
    videoUrl: '',
    videoFile: null,
    photos: [],
    destination: '',
    tripType: 'adventure'
  });

  // Update selectedDestination when URL search param changes
  useEffect(() => {
    if (searchQuery) {
      setSelectedDestination(searchQuery);
    }
  }, [searchQuery]);

  // Scroll to top when modal opens
  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isModalOpen]);

  const handleFileChange = (e, type) => {
    if (type === 'video') {
      setFormData(prev => ({ ...prev, videoFile: e.target.files[0] }));
    } else if (type === 'photos') {
      setFormData(prev => ({ ...prev, photos: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setIsModalOpen(false);
    // Scroll to top after submission
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Reset form
    setFormData({
      videoUrl: '',
      videoFile: null,
      photos: [],
      destination: '',
      tripType: 'adventure'
    });
  };

  // Mock creator posts data - at least 5 profiles as requested
  const creatorPosts = [
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

  // Filter posts based on selected destination
  const filteredPosts = selectedDestination
    ? creatorPosts.filter(post => 
        post.location.toLowerCase().includes(selectedDestination.toLowerCase())
      )
    : creatorPosts;

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
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-gray-900">WonderTrip</span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search trips, creators, destinations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                />
              </div>
            </div>

            {/* User Profile */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
            />
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                  item.active
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-purple-600' : ''}`} />
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
              {filteredPosts.map((post) => (
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
                      <Button variant="outline" size="sm">
                        View Trip
                      </Button>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                        Create Trip From This Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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

          {/* AI Trip Generation CTA */}
          <Card className="border-0 shadow-lg rounded-2xl bg-[#5b61ff]">
            <CardContent className="p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Turn Any Video Into a Trip</h3>
              <p className="text-sm mb-5 leading-relaxed text-white/90">
                Let WonderFlow&apos;s AI craft your next adventure from your content. Share your
                experiences, generate detailed itineraries, and inspire others.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white text-[#5b61ff] hover:bg-white/90 font-semibold py-3 px-4 rounded-full transition-colors duration-200 text-sm"
              >
                Start AI Trip Generation
              </button>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* AI Trip Generation Modal */}
      {isModalOpen && (
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
                    className={`p-4 border-2 rounded-lg transition-all ${
                      tripType === 'video'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Video className={`w-6 h-6 mx-auto mb-2 ${tripType === 'video' ? 'text-purple-600' : 'text-gray-400'}`} />
                    <span className={`font-medium ${tripType === 'video' ? 'text-purple-600' : 'text-gray-700'}`}>
                      Create from Video
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('photos')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      tripType === 'photos'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ImageIcon className={`w-6 h-6 mx-auto mb-2 ${tripType === 'photos' ? 'text-purple-600' : 'text-gray-400'}`} />
                    <span className={`font-medium ${tripType === 'photos' ? 'text-purple-600' : 'text-gray-700'}`}>
                      Create from Photos
                    </span>
                  </button>
                </div>
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
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
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
                          {formData.videoFile ? formData.videoFile.name : 'MP4, MOV, AVI (max 500MB)'}
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Photos Option */}
              {tripType === 'photos' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Photo Collage
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors cursor-pointer">
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
                      {formData.photos.slice(0, 6).map((photo, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none"
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
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Create Trip
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
