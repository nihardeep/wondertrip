import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Star, Heart } from 'lucide-react';

const MOCK_INSPIRATIONS = [
  {
    id: 'ibiza',
    name: 'Ibiza',
    tagline: 'The ultimate party and relaxation island.',
    image: 'https://images.unsplash.com/photo-1560242259-2470a6c6ec2d?q=80&w=1200',
    hotels: [
      { id: 'ib1', name: 'The Ibiza Bay Resort', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600', rating: 4.8, reviews: 124, price: '€350' },
      { id: 'ib2', name: 'Sol House Ibiza', image: 'https://images.unsplash.com/photo-1522792040997-7e7e60086c20?q=80&w=600', rating: 4.6, reviews: 89, price: '€280' },
      { id: 'ib3', name: 'Destino Pacha', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600', rating: 4.9, reviews: 210, price: '€450' },
      { id: 'ib4', name: 'Hard Rock Hotel', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d12c5b?q=80&w=600', rating: 4.5, reviews: 340, price: '€310' },
      { id: 'ib5', name: 'Ushuaïa Ibiza Beach Hotel', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600', rating: 4.7, reviews: 520, price: '€400' }
    ]
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    tagline: 'Experience the perfect blend of tradition and the future.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200',
    hotels: [
      { id: 'tk1', name: 'Aman Tokyo', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600', rating: 4.9, reviews: 412, price: '¥120,000' },
      { id: 'tk2', name: 'Park Hyatt Tokyo', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600', rating: 4.8, reviews: 320, price: '¥85,000' },
      { id: 'tk3', name: 'Conrad Tokyo', image: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=600', rating: 4.7, reviews: 215, price: '¥70,000' },
      { id: 'tk4', name: 'The Ritz-Carlton', image: 'https://images.unsplash.com/photo-1542314831-c6a4d14cd40f?q=80&w=600', rating: 4.8, reviews: 180, price: '¥95,000' },
      { id: 'tk5', name: 'Shinjuku Prince Hotel', image: 'https://images.unsplash.com/photo-1493997181344-712f2f19d87e?q=80&w=600', rating: 4.4, reviews: 650, price: '¥25,000' }
    ]
  },
  {
    id: 'maldives',
    name: 'Maldives',
    tagline: 'Crystal clear waters and overwater luxury.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200',
    hotels: [
      { id: 'm1', name: 'Soneva Jani', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600', rating: 4.9, reviews: 110, price: '$2,500' },
      { id: 'm2', name: 'Gili Lankanfushi', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600', rating: 4.8, reviews: 290, price: '$1,800' },
      { id: 'm3', name: 'Conrad Maldives', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=600', rating: 4.7, reviews: 450, price: '$1,200' },
      { id: 'm4', name: 'Six Senses Laamu', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600', rating: 4.8, reviews: 140, price: '$1,500' },
      { id: 'm5', name: 'Baros Maldives', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600', rating: 4.9, reviews: 520, price: '$900' }
    ]
  }
];

const DestinationSection = ({ dest }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-20">
      {/* Destination Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div>
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-2">{dest.name}</h2>
          <p className="text-xl text-gray-600">{dest.tagline}</p>
        </div>
        <Link
          to={`/destinations/${dest.id}`}
          className="mt-4 md:mt-0 inline-flex items-center font-bold text-primary-600 hover:text-primary-700 transition-colors group text-lg"
        >
          Explore {dest.name}
          <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hotel Carousel */}
      <div className="relative group/section max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className="hidden lg:flex absolute left-0 sm:-left-4 top-[110px] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full items-center justify-center shadow-xl border border-gray-100 text-gray-700 hover:text-primary-600 hover:scale-105 transition-all opacity-0 group-hover/section:opacity-100"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="hidden lg:flex absolute right-0 sm:-right-4 top-[110px] -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full items-center justify-center shadow-xl border border-gray-100 text-gray-700 hover:text-primary-600 hover:scale-105 transition-all opacity-0 group-hover/section:opacity-100"
        >
          <ChevronRight className="w-7 h-7" />
        </button>

        {/* Carousel Track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 pt-2 snap-x hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dest.hotels.map(hotel => (
            <div key={hotel.id} className="snap-start flex-shrink-0 w-[300px] group cursor-pointer">
              <div className="relative h-[220px] rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow bg-gray-100">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow flex items-center justify-center hover:text-red-500 text-gray-400 transition-colors">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <div className="px-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 text-lg truncate pr-2 group-hover:text-primary-600 transition-colors">{hotel.name}</h3>
                  <div className="flex items-center text-sm font-semibold text-gray-900 px-1 py-0.5 rounded">
                    <Star className="w-3.5 h-3.5 mr-1 fill-gray-900 text-gray-900" />
                    {hotel.rating}
                  </div>
                </div>
                <div className="text-gray-500 text-sm mb-2">{hotel.reviews} reviews</div>
                <div className="font-bold text-gray-900 text-lg">{hotel.price} <span className="text-sm font-normal text-gray-500 ml-1">night</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Destinations = () => {
  return (
    <div className="bg-white min-h-screen pb-20 pt-16">
      {/* Header / Hero component for Inspiration Page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 tracking-tight">
          Get Inspired for Your Next Journey
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Discover stunning accommodations in the world's most sought-after destinations. Explore and start planning today.
        </p>
      </div>

      {/* Render each Inspiration Section */}
      {MOCK_INSPIRATIONS.map(dest => (
        <DestinationSection key={dest.id} dest={dest} />
      ))}
    </div>
  );
};

export default Destinations;
