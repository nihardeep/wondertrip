import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Home, Globe, MapPin, Users, User, Settings as SettingsIcon, HelpCircle, Heart, Share2 } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';
import ChatBot from '../components/common/ChatBot';

const UserProfile = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Mock user profile data
    const profileData = {
        name: user?.name || 'Jessica Lee',
        email: user?.email || 'jessica@wondertrip.com',
        bio: 'Adventure seeker, storyteller, and digital nomad exploring hidden gems. Join me as I discover unique cultures, breathtaking landscapes, and unforgettable experiences around the globe.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
        banner: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80',
        stats: {
            posts: 24,
            trips: 15,
            followers: 1200000
        },
        featuredTrips: [
            {
                id: 1,
                title: 'Patagonia Adventure',
                location: 'Chile & Argentina',
                image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80'
            },
            {
                id: 2,
                title: 'Southeast Asia Temples',
                location: 'Cambodia & Thailand',
                image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=400&q=80'
            },
            {
                id: 3,
                title: 'Kyoto Culinary Journey',
                location: 'Japan',
                image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80'
            }
        ],
        posts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
                description: 'The most incredible hike through the Dolomites! Every corner revealed a new breathtaking view. Highly recommend the Tre Cime di Lavaredo loop.',
                summary: 'Show AI-Generated Summary'
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
                description: 'Exploring the ancient streets of Marrakech, feeling completely immersed in the vibrant culture and flavors. The souks are a labyrinth of wonders!',
                summary: 'Show AI-Generated Summary'
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
                description: 'Island hopping in the Philippines has been a dream come true! White sand beaches and stunning sunsets. What\'s your favorite island escape?',
                summary: 'Show AI-Generated Summary'
            }
        ]
    };

    const navigationItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Globe, label: 'Discover', path: '/discover' },
        { icon: MapPin, label: 'My Trips', path: '/profile' },
        { icon: Users, label: 'Subscriptions', path: '/subscriptions' },
        { icon: User, label: 'Profile', path: '/profile', active: true }
    ];

    const trendingCreators = [
        { name: 'Alice Travel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces' },
        { name: 'Wanderlust Ben', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces' },
        { name: 'Journey Jules', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces' }
    ];

    const trendingDestinations = [
        'Kyoto, Japan',
        'Santorini, Greece',
        'Banff, Canada',
        'Patagonia, Chile'
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                <Globe className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-gray-900">WonderTrip</span>
                        </Link>

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
                                />
                            </div>
                        </div>

                        <img
                            src={profileData.avatar}
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
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-colors ${item.active
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
                            <SettingsIcon className="w-5 h-5" />
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
                        {/* Profile Hero */}
                        <Card className="overflow-hidden mb-6">
                            <div className="relative h-48 bg-gradient-to-r from-purple-400 to-pink-400">
                                <img
                                    src={profileData.banner}
                                    alt="Profile banner"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between -mt-16 mb-4">
                                    <img
                                        src={profileData.avatar}
                                        alt={profileData.name}
                                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                                    />
                                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                                        Subscribe
                                    </Button>
                                </div>
                                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                                    {profileData.name}
                                </h1>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {profileData.bio}
                                </p>

                                {/* Stats */}
                                <div className="flex space-x-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{profileData.stats.posts}</div>
                                        <div className="text-sm text-gray-600">Posts</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{profileData.stats.trips}</div>
                                        <div className="text-sm text-gray-600">Trips</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {profileData.stats.followers >= 1000000
                                                ? `${(profileData.stats.followers / 1000000).toFixed(1)}M`
                                                : profileData.stats.followers.toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-600">Followers</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Trips */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Featured Trips</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {profileData.featuredTrips.map((trip) => (
                                    <Card key={trip.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={trip.image}
                                                alt={trip.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-gray-900 mb-1">{trip.title}</h3>
                                            <p className="text-sm text-gray-600">{trip.location}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Posts */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Posts</h2>
                            <div className="space-y-6">
                                {profileData.posts.map((post) => (
                                    <Card key={post.id}>
                                        <CardContent className="p-6">
                                            <div className="flex space-x-4">
                                                <div className="w-64 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                                                    <img
                                                        src={post.image}
                                                        alt="Post"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-700 leading-relaxed mb-4">
                                                        {post.description}
                                                    </p>
                                                    <button className="text-purple-600 text-sm font-medium hover:underline mb-4">
                                                        {post.summary}
                                                    </button>
                                                    <div className="flex space-x-3">
                                                        <Button variant="outline" size="sm">
                                                            <Heart className="w-4 h-4 mr-2" />
                                                            View Trip
                                                        </Button>
                                                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                                                            <Share2 className="w-4 h-4 mr-2" />
                                                            Create Trip From This Post
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
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
                                        src={creator.avatar}
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
                                >
                                    <Globe className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-700">{destination}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Card */}
                    <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                        <CardContent className="p-6 text-center">
                            <h3 className="text-lg font-bold mb-2">Turn Any Video into a Trip</h3>
                            <p className="text-sm text-white/90 mb-4">
                                Let AI turn your next adventure into your content.
                            </p>
                            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                                Start Exploring
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>

            <ChatBot />
        </div>
    );
};

export default UserProfile;
