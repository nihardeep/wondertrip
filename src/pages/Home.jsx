import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Users, Award, Globe } from 'lucide-react';
import Hero from '../components/home/Hero';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';
import ChatBot from '../components/common/ChatBot';

const Home = () => {
  const stats = [
    { icon: Globe, label: 'Destinations', value: '500+' },
    { icon: Users, label: 'Happy Travelers', value: '50K+' },
    { icon: Star, label: 'Reviews', value: '25K+' },
    { icon: Award, label: 'Years Experience', value: '10+' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Easy Search',
      description: 'Find your perfect destination with our advanced search filters and recommendations.'
    },
    {
      icon: MapPin,
      title: 'Curated Destinations',
      description: 'Discover hand-picked destinations with authentic experiences and local insights.'
    },
    {
      icon: Star,
      title: 'Best Price Guarantee',
      description: 'We guarantee the best prices on all bookings with no hidden fees.'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <FeaturedDestinations />

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Why Choose WonderTrip?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium travel services designed for modern adventurers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover>
                <CardContent className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-400 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of travelers who've discovered their dream destinations with WonderTrip. Your next adventure awaits!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinations">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Explore Destinations
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <ChatBot />
    </div>
  );
};

export default Home;
