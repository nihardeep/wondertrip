import { useState } from 'react';
import { User, Settings, CreditCard, Heart, MapPin, Calendar, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    country: '',
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockBookings = [
    {
      id: 'BK001',
      destination: 'Bali Paradise',
      location: 'Indonesia',
      checkIn: '2024-02-15',
      checkOut: '2024-02-22',
      status: 'confirmed',
      totalPrice: 1200,
      image: '/images/destinations/bali.jpg'
    },
    {
      id: 'BK002',
      destination: 'Swiss Alps Adventure',
      location: 'Switzerland',
      checkIn: '2024-03-10',
      checkOut: '2024-03-15',
      status: 'upcoming',
      totalPrice: 1800,
      image: '/images/destinations/swiss-alps.jpg'
    }
  ];

  const mockFavorites = [
    {
      id: 1,
      name: 'Tokyo Explorer',
      location: 'Japan',
      rating: 4.7,
      price: 1500,
      image: '/images/destinations/tokyo.jpg'
    },
    {
      id: 2,
      name: 'Santorini Sunset',
      location: 'Greece',
      rating: 4.9,
      price: 1350,
      image: '/images/destinations/santorini.jpg'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Profile Overview</h2>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? 'secondary' : 'primary'}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-primary-600" />
                  </div>

                  <div className="flex-1">
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                        <Input
                          label="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                        <Input
                          label="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        <Input
                          label="Phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                        <Input
                          label="Address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveProfile}>Save Changes</Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{user?.name}</h3>
                        <p className="text-gray-600 mb-4">{user?.email}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Personal Information</h4>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-600">Phone:</span> {user?.phone || 'Not provided'}</p>
                              <p><span className="text-gray-600">Member since:</span> January 2024</p>
                              <p><span className="text-gray-600">Total bookings:</span> 3</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Travel Preferences</h4>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-600">Favorite destinations:</span> Beach, Mountain</p>
                              <p><span className="text-gray-600">Travel style:</span> Adventure, Luxury</p>
                              <p><span className="text-gray-600">Group size:</span> 2-4 people</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">My Bookings</h2>

            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} hover>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{booking.destination}</h3>
                          <p className="text-gray-600">{booking.location}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {booking.checkIn} - {booking.checkOut}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold">${booking.totalPrice}</div>
                          <div className={`text-sm px-2 py-1 rounded-full ${booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                            }`}>
                            {booking.status}
                          </div>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Favorite Destinations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockFavorites.map((destination) => (
                <Card key={destination.id} hover>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{destination.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{destination.location}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{destination.rating}</span>
                          </div>
                          <span className="font-semibold text-primary-600">${destination.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Account Settings</h2>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                    <span className="ml-2">Email notifications for bookings</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                    <span className="ml-2">Promotional offers and deals</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                    <span className="ml-2">Travel tips and destination guides</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-red-600">Danger Zone</h3>
                <p className="text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="danger">Delete Account</Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <Button variant="outline" onClick={logout} className="w-full">
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
