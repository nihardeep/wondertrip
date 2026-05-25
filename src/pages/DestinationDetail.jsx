import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';

const HUB_DATA = {
  ibiza: {
    name: 'Ibiza',
    country: 'Spain',
    heroImage: 'https://images.unsplash.com/photo-1560242259-2470a6c6ec2d?q=80&w=1600',
    tagline: 'The ultimate Mediterranean escape. Famous for historic old towns, quiet villages, yoga retreats, and pristine beaches.',
    categories: ['Boat Tours', 'Nightlife', 'Historic Walk', 'Beach Clubs', 'Yoga Retreats'],
    activities: [
      { id: 1, title: 'Ibiza Sunset Cruise Tour', rating: 4.8, reviews: '3.8K+', oldPrice: '€ 60.00', price: '€ 45.00', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=600', badge: 'Combo 14% off' },
      { id: 2, title: 'Dalt Vila Historical Experience', rating: 5.0, reviews: '33', oldPrice: '€ 15.00', price: '€ 12.50', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600', badge: '' },
      { id: 3, title: 'Formentera Day Trip Ticket', rating: 4.5, reviews: '1.8K+', oldPrice: '€ 40.00', price: '€ 35.00', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600', badge: '' },
      { id: 4, title: 'Kayak the bay with snorkeling', rating: 4.6, reviews: '1.9K+', oldPrice: '€ 35.00', price: '€ 25.00', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600', badge: 'Spring deal' }
    ],
    hotels: [
      { id: 'ib1', name: 'The Ibiza Bay Resort', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600', rating: 4.8, reviews: 124, price: '€350' },
      { id: 'ib2', name: 'Sol House Ibiza', image: 'https://images.unsplash.com/photo-1522792040997-7e7e60086c20?q=80&w=600', rating: 4.6, reviews: 89, price: '€280' },
      { id: 'ib3', name: 'Destino Pacha', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600', rating: 4.9, reviews: 210, price: '€450' },
      { id: 'ib4', name: 'Hard Rock Hotel', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d12c5b?q=80&w=600', rating: 4.5, reviews: 340, price: '€310' },
      { id: 'ib5', name: 'Ushuaïa Ibiza Beach Hotel', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600', rating: 4.7, reviews: 520, price: '€400' }
    ]
  },
  tokyo: {
    name: 'Tokyo',
    country: 'Japan',
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600',
    tagline: 'Dive into the bustling metropolis of Tokyo with its unique blend of tradition and modernity.',
    categories: ['Mt Fuji Tours', 'Theme Parks', 'Food & Dining', 'Rail Passes', 'Cultural Walk'],
    activities: [
      { id: 1, title: 'Mt Fuji & Hakone Day Tour', rating: 4.8, reviews: '15K+', oldPrice: '¥ 12,000', price: '¥ 10,500', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600', badge: 'Best Seller' },
      { id: 2, title: 'Tokyo Disneyland Ticket', rating: 4.9, reviews: '40K+', oldPrice: '', price: '¥ 8,400', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600', badge: 'Direct Entry' },
      { id: 3, title: 'Shibuya Food Tour', rating: 4.7, reviews: '2.1K+', oldPrice: '¥ 15,000', price: '¥ 13,000', image: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=600', badge: 'Foodie Pick' },
      { id: 4, title: 'TeamLab Planets TOKYO', rating: 4.9, reviews: '22K+', oldPrice: '', price: '¥ 3,800', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d12c5b?q=80&w=600', badge: 'Must Do' }
    ],
    hotels: [
      { id: 'tk1', name: 'Aman Tokyo', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600', rating: 4.9, reviews: 412, price: '¥120,000' },
      { id: 'tk2', name: 'Park Hyatt Tokyo', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600', rating: 4.8, reviews: 320, price: '¥85,000' },
      { id: 'tk3', name: 'Conrad Tokyo', image: 'https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=600', rating: 4.7, reviews: 215, price: '¥70,000' },
      { id: 'tk4', name: 'The Ritz-Carlton', image: 'https://images.unsplash.com/photo-1542314831-c6a4d14cd40f?q=80&w=600', rating: 4.8, reviews: 180, price: '¥95,000' },
      { id: 'tk5', name: 'Shinjuku Prince Hotel', image: 'https://images.unsplash.com/photo-1493997181344-712f2f19d87e?q=80&w=600', rating: 4.4, reviews: 650, price: '¥25,000' }
    ]
  },
  maldives: {
    name: 'Maldives',
    country: 'Maldives',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600',
    tagline: 'Crystal clear waters, overwater bungalows, and pristine beaches make this a dream destination.',
    categories: ['Seaplane Transfers', 'Sunset Cruises', 'Scuba Diving', 'Resort Passes', 'Spa Packages'],
    activities: [
      { id: 1, title: 'Malé City Walking Tour', rating: 4.5, reviews: '340', oldPrice: '$ 45.00', price: '$ 30.00', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600', badge: '' },
      { id: 2, title: 'Whale Shark Snorkeling', rating: 5.0, reviews: '1.2K+', oldPrice: '$ 150.00', price: '$ 120.00', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600', badge: 'Popular' },
      { id: 3, title: 'Luxury Sunset Dolphin Cruise', rating: 4.8, reviews: '890', oldPrice: '$ 200.00', price: '$ 175.00', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=600', badge: 'Romantic' },
      { id: 4, title: 'Introductory Scuba Dive', rating: 4.9, reviews: '2.4K+', oldPrice: '$ 120.00', price: '$ 99.00', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600', badge: 'Beginner Friendly' }
    ],
    hotels: [
      { id: 'm1', name: 'Soneva Jani', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600', rating: 4.9, reviews: 110, price: '$2,500' },
      { id: 'm2', name: 'Gili Lankanfushi', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600', rating: 4.8, reviews: 290, price: '$1,800' },
      { id: 'm3', name: 'Conrad Maldives', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=600', rating: 4.7, reviews: 450, price: '$1,200' },
      { id: 'm4', name: 'Six Senses Laamu', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=600', rating: 4.8, reviews: 140, price: '$1,500' },
      { id: 'm5', name: 'Baros Maldives', image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600', rating: 4.9, reviews: 520, price: '$900' }
    ]
  }
};

const ActivityCarousel = ({ activities, destName }) => {
  const scrollRef = useRef(null);

  const scroll = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-display font-bold text-gray-900">Top Things to Do in {destName}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-300)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={() => scroll(300)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-5 pb-4 snap-x hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {activities.map(act => (
          <Link to={`/discover?search=${encodeURIComponent(destName)}`} key={act.id} className="snap-start flex-shrink-0 w-64 bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col group cursor-pointer shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-40 relative overflow-hidden bg-gray-100">
              <img src={act.image} alt={act.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              {act.badge && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded">
                  {act.badge}
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-gray-900 text-base leading-tight mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">{act.title}</h3>
              <div className="flex items-center text-sm mb-3">
                <Star className="w-4 h-4 text-orange-400 fill-orange-400 mr-1" />
                <span className="font-bold text-gray-900 mr-1">{act.rating}</span>
                <span className="text-gray-500">({act.reviews})</span>
              </div>
              <div className="mt-auto">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900">{act.price}</span>
                  {act.oldPrice && <span className="text-sm font-medium text-gray-400 line-through">{act.oldPrice}</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const HotelCarousel = ({ hotels, destName }) => {
  const scrollRef = useRef(null);

  const scroll = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-16 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-display font-bold text-gray-900">Best Stays in {destName}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-300)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={() => scroll(300)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-4 snap-x hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {hotels.map(hotel => (
          <Link to={`/discover?search=${encodeURIComponent(destName)}`} key={hotel.id} className="snap-start flex-shrink-0 w-[280px] group cursor-pointer block">
            <div className="relative h-[200px] rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
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
                <div className="flex items-center text-sm font-semibold text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 mr-1 fill-yellow-400 text-yellow-400" />
                  {hotel.rating}
                </div>
              </div>
              <div className="text-gray-500 text-sm mb-2">{hotel.reviews} reviews</div>
              <div className="font-bold text-gray-900 text-lg">{hotel.price} <span className="text-sm font-normal text-gray-500 mr-1">night</span></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const DestinationDetail = () => {
  const { id } = useParams();
  const destId = id?.toLowerCase() || 'ibiza';
  const dest = HUB_DATA[destId] || HUB_DATA['ibiza'];

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* Hero Header */}
      <div className="relative w-full h-[450px] md:h-[550px] bg-gray-900 overflow-hidden">
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

        {/* Top Navbar Back Action */}
        <div className="absolute top-6 left-6 z-20">
          <Link to="/destinations" className="flex items-center text-white hover:text-primary-300 font-bold bg-black/30 hover:bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full transition-all border border-white/amo">
            <ArrowLeft className="w-5 h-5 mr-2" />
            All Destinations
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col">
              <div className="text-white/90 font-bold text-sm md:text-base uppercase tracking-widest mb-3 bg-primary-600/90 inline-block px-3 py-1 rounded w-fit">{dest.country}</div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-4 drop-shadow-xl tracking-tight">{dest.name}</h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl text-shadow leading-relaxed font-medium">{dest.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-30">

        {/* Category Pills (Filters) */}
        <div className="flex overflow-x-auto gap-3 pb-6 mb-10 hide-scrollbar whitespace-nowrap bg-white py-4 px-2 rounded-2xl shadow-sm border border-gray-100" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {dest.categories.map(cat => (
            <button key={cat} className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-700 font-bold hover:border-black hover:text-black hover:bg-gray-50 transition-all shadow-sm bg-white">
              {cat}
            </button>
          ))}
        </div>

        {/* Top Things to Do Carousel */}
        <ActivityCarousel activities={dest.activities} destName={dest.name} />

        {/* Separator */}
        <div className="w-full h-px bg-gray-200 my-8"></div>

        {/* Best Stays Carousel */}
        <HotelCarousel hotels={dest.hotels} destName={dest.name} />

      </div>
    </div>
  );
};

export default DestinationDetail;
