import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import { useApi } from '../../hooks/useApi';
import Card from '../common/Card';
import CardContent from '../common/CardContent';
import Button from '../common/Button';

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const { makeRequest, loading, error } = useApi();

  useEffect(() => {
    const fetchFeaturedDestinations = async () => {
      try {
        // For now, using mock data since we don't have a real API
        const mockData = [
          {
            id: 1,
            name: 'Tokyo',
            location: 'Japan',
            image: '/images/destinations/tokyo.jpg',
            rating: 4.7,
            reviews: 2100,
            price: 1500,
            duration: '6 days',
            description: 'Dive into the bustling metropolis of Tokyo with its unique blend of tradition and modernity.',
            category: 'City'
          },
          {
            id: 2,
            name: 'Bali',
            location: 'Indonesia',
            image: '/images/destinations/bali.jpg',
            rating: 4.8,
            reviews: 1250,
            price: 1200,
            duration: '7 days',
            description: 'Tropical beaches, ancient temples, and vibrant culture await in this Indonesian paradise.',
            category: 'Beach'
          },
          {
            id: 3,
            name: 'Maldives',
            location: 'Maldives',
            image: '/images/destinations/maldives.jpg',
            rating: 4.9,
            reviews: 980,
            price: 2200,
            duration: '5 days',
            description: 'Crystal clear waters, overwater bungalows, and pristine beaches make this a dream destination.',
            category: 'Beach'
          },
          {
            id: 4,
            name: 'Kuala Lumpur',
            location: 'Malaysia',
            image: '/images/destinations/kuala-lumpur.jpg',
            rating: 4.6,
            reviews: 850,
            price: 1100,
            duration: '4 days',
            description: 'A perfect blend of modern architecture and rich culture with an incredible food scene.',
            category: 'City'
          },
          {
            id: 5,
            name: 'Hanoi',
            location: 'Vietnam',
            image: '/images/destinations/hanoi.jpg',
            rating: 4.7,
            reviews: 720,
            price: 900,
            duration: '5 days',
            description: 'Historic old quarter, delicious street food, and authentic Vietnamese culture await.',
            category: 'Cultural'
          }
        ];

        // Uncomment when API is ready:
        // const data = await makeRequest('/destinations/featured');
        // setDestinations(data);

        // Using mock data for now
        setDestinations(mockData);
      } catch (err) {
        console.error('Failed to fetch featured destinations:', err);
      }
    };

    fetchFeaturedDestinations();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-red-600">Failed to load featured destinations.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-16 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of the world's most amazing destinations,
            chosen for their unique experiences and unforgettable adventures.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {destinations.map((destination) => (
            <Card key={destination.id} hover className="overflow-hidden">
              <div className="relative">
                {/* Destination Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {/* Placeholder for actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-primary-600" />
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                  {destination.category}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {destination.location}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {destination.duration}
                  </div>
                  <div className="text-sm text-gray-600">
                    {destination.reviews} reviews
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">
                      ${destination.price}
                    </span>
                    <span className="text-gray-600 text-sm"> / person</span>
                  </div>
                  <Link to={`/discover?search=${encodeURIComponent(destination.name)}`}>
                    <Button size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/discover">
            <Button size="lg">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
