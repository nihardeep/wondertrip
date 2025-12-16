import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Home, Globe, MapPin, Users, User, Settings, HelpCircle, Clock, Plus } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';

const Discover = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [selectedDestination, setSelectedDestination] = useState(searchQuery || '');

  // Update selectedDestination when URL search param changes
  useEffect(() => {
    if (searchQuery) {
      setSelectedDestination(searchQuery);
    }
  }, [searchQuery]);

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
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
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
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
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
                    <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-blue-300 rounded-lg mb-4 flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-white opacity-50" />
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
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
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
          <Card className="bg-purple-600 border-0">
            <CardContent className="p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Turn Any Video Into a Trip</h3>
              <p className="text-purple-100 text-sm mb-4 leading-relaxed">
                Let WonderTrip's AI craft your next adventure from your content. Share your experiences, generate detailed itineraries, and inspire others.
              </p>
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                Start AI Trip Generation
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
};

export default Discover;
