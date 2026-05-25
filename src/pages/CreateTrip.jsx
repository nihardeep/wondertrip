import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Heart, ChevronRight, ChevronLeft, Bus, Car, Star, Navigation, Zap, ChevronDown, Check } from 'lucide-react';
import Button from '../components/common/Button';

// Dummy Data
const MOCK_HOTELS = [
    {
        id: 1,
        name: 'The Ibiza Bay Resort',
        location: 'Talamanca, Ibiza - 2.5 km to center',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
        tags: ['BRAND EXCLUSIVES', 'Limited time offer'],
        rating: 4,
        score: '8.7',
        scoreText: 'Excellent',
        reviews: '86 reviews',
        locationScore: '9.0',
        priceLabel: 'Price has increased',
        priceLabelColor: 'text-red-500',
        oldPrice: '€350',
        price: '€245',
        badges: ['Boosted', 'WonderTrip Preferred'],
        snippet: '"Beautiful location, great views, and amazing service."'
    },
    {
        id: 2,
        name: 'Sol House Ibiza',
        location: 'San Antonio, Ibiza - 10.4 km to center',
        image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=800&auto=format&fit=crop',
        tags: ['BRAND EXCLUSIVES', 'Limited time offer'],
        rating: 4,
        score: '8.2',
        scoreText: 'Excellent',
        reviews: '458 reviews',
        locationScore: '8.7',
        priceLabel: '',
        oldPrice: '€250',
        price: '€180',
        badges: ['Boosted', 'WonderTrip Preferred'],
        snippet: '"Convenient Location, Well connected to major attractions"'
    },
    {
        id: 3,
        name: 'Hotel Pacha',
        location: 'Ibiza Town, Ibiza - 1.1 km to center',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        tags: ['Newly built in 2025'],
        rating: 5,
        score: '8.8',
        scoreText: 'Excellent',
        reviews: '132 reviews',
        locationScore: '9.3',
        priceLabel: 'ONLY 1 LEFT',
        priceLabelColor: 'text-white bg-red-600',
        oldPrice: '€400',
        price: '€320',
        badges: [],
        snippet: '"Amazing nightlife, the staff were wonderful and always helpful."'
    },
    {
        id: 4,
        name: 'Ushuaïa Beach Hotel',
        location: 'Playa d\'en Bossa, Ibiza - 4.5 km to center',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',
        tags: ['Popular Choice'],
        rating: 5,
        score: '9.5',
        scoreText: 'Exceptional',
        reviews: '2,148 reviews',
        locationScore: '9.8',
        priceLabel: 'High Demand',
        priceLabelColor: 'text-orange-600',
        oldPrice: '€600',
        price: '€450',
        badges: ['Best Seller'],
        snippet: '"The ultimate party destination with luxury rooms."'
    }
];

const MOCK_ACTIVITIES = [
    { title: 'Kayak the bay', price: 25, duration: '2 hours • equipment incl.', icon: 'water' },
    { title: 'Old Town Walking Tour', price: 15, duration: '3 hours • historical', icon: 'tree' }
];

const MOCK_TRANSIT = [
    { title: 'Private Taxi', price: 30, duration: '25 min • Door-to-door', type: 'car' },
    { title: 'Local Bus L3', price: 3.50, duration: '45 min • Frequent', type: 'bus' }
];

const MOCK_CAROUSEL_ACTIVITIES = [
    { id: 101, title: 'Kayak the bay with snorkeling', rating: 4.6, count: 1956, oldPrice: '€ 35.00', price: '€ 25.00', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', tags: [{ text: 'Spring deal', color: 'bg-orange-500' }, { text: 'Sale 15% off', color: 'text-orange-500 bg-orange-50 border-orange-200' }] },
    { id: 102, title: 'Old Town Walking Tour', rating: 4.8, count: 16000, oldPrice: '€ 20.00', price: '€ 15.00', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800&auto=format&fit=crop', tags: [{ text: 'Spring deal', color: 'bg-orange-500' }, { text: 'Sale 25% off', color: 'text-orange-500 bg-orange-50 border-orange-200' }] },
    { id: 103, title: 'Ibiza Sunset Cruise Tour', rating: 4.4, count: 3831, oldPrice: '€ 60.00', price: '€ 45.00', image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800&auto=format&fit=crop', tags: [{ text: 'Combo 14% off', color: 'text-red-500 bg-red-50 border-red-200' }] },
    { id: 104, title: 'Dalt Vila Historical Experience', rating: 5.0, count: 33, oldPrice: '€ 15.00', price: '€ 12.50', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop', tags: [] },
    { id: 105, title: 'Formentera Day Trip Ticket', rating: 4.5, count: 1768, oldPrice: '€ 40.00', price: '€ 35.00', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop', tags: [] }
];

const MOCK_POPULAR_DESTINATIONS = [
    { name: 'Ibiza', image: 'https://images.unsplash.com/photo-1560242259-2470a6c6ec2d?q=80&w=800&auto=format&fit=crop' },
    { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop' },
    { name: 'Maldives', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop' },
    { name: 'Bali', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop' },
    { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop' },
    { name: 'Rome', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=800&auto=format&fit=crop' }
];

const FILTER_POPULAR = [
    'Internet access', 'TV', 'Ironing facilities', 'Heating', 'Bathtub', 'Guest rating: 9+ Exceptional', 'Swimming pool', 'Breakfast included'
];

const FILTER_PROPERTY = [
    { name: 'Apartment/Flat', count: 554 },
    { name: 'Serviced apartment', count: 33 },
    { name: 'Hotel', count: 1897 },
    { name: 'Resort', count: 16 },
    { name: 'Guesthouse/bed and breakfast', count: 52 },
    { name: 'Motel', count: 1 },
    { name: 'Hostel', count: 21 },
    { name: 'Homestay', count: 34 },
    { name: 'Inn', count: 13 }
];

const CreateTrip = () => {
    const [selectedDestination, setSelectedDestination] = useState('Ibiza');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [adults, setAdults] = useState(1);
    const [rooms, setRooms] = useState(1);
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('1,21,700');
    const carouselRef = useRef(null);
    const popCarouselRef = useRef(null);

    return (
        <div className="bg-[#f5f7fa] min-h-screen pb-24">

            {/* Top Search Bar (Imported from Discover page) */}
            <div className="bg-white border-b border-gray-200 py-4 mb-2 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 flex justify-center">
                    <div className="flex w-full items-center bg-white border border-gray-300 rounded-lg shadow-sm hover:border-primary-400 transition-colors hidden md:flex">
                        {/* Destination */}
                        <div className="flex-[2] relative border-r border-gray-200">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Where to?"
                                className="w-full pl-10 pr-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent border-none"
                                value={selectedDestination}
                                onChange={(e) => setSelectedDestination(e.target.value)}
                            />
                        </div>

                        {/* Check-in */}
                        <div className="flex-1 relative border-r border-gray-200 min-w-[120px]">
                            <div className="absolute left-2 top-1 text-[10px] text-gray-500 font-medium">Check-in</div>
                            <input type="date" className="w-full pl-2 pt-3 pb-1 border-none focus:ring-0 text-sm" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>

                        {/* Check-out */}
                        <div className="flex-1 relative border-r border-gray-200 min-w-[120px]">
                            <div className="absolute left-2 top-1 text-[10px] text-gray-500 font-medium">Check-out</div>
                            <input type="date" className="w-full pl-2 pt-3 pb-1 border-none focus:ring-0 text-sm" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>

                        {/* Adults */}
                        <div className="w-20 border-r border-gray-200 relative">
                            <div className="absolute left-2 top-1 text-[10px] text-gray-500 font-medium">Adults</div>
                            <input type="number" min="1" className="w-full pl-3 pt-3 pb-1 rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500 border-none text-sm" value={adults} onChange={(e) => setAdults(e.target.value)} />
                        </div>

                        {/* Rooms */}
                        <div className="w-20 relative border-r border-gray-200">
                            <div className="absolute left-2 top-1 text-[10px] text-gray-500 font-medium">Rooms</div>
                            <input type="number" min="1" className="w-full pl-3 pt-3 pb-1 rounded-none focus:outline-none focus:ring-2 focus:ring-primary-500 border-none text-sm" value={rooms} onChange={(e) => setRooms(e.target.value)} />
                        </div>

                        {/* Search Button */}
                        <button className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-r-lg transition-colors flex items-center justify-center font-bold px-6">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Popular Destinations Carousel */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
                </div>
                <div className="relative group/pop">
                    {/* Left Scroll Button */}
                    <button
                        onClick={(e) => { e.preventDefault(); popCarouselRef.current?.scrollBy({ left: -350, behavior: 'smooth' }); }}
                        className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:scale-105 transition-all opacity-0 group-hover/pop:opacity-100 focus:opacity-100"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Right Scroll Button */}
                    <button
                        onClick={(e) => { e.preventDefault(); popCarouselRef.current?.scrollBy({ left: 350, behavior: 'smooth' }); }}
                        className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:scale-105 transition-all opacity-0 group-hover/pop:opacity-100 focus:opacity-100"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div ref={popCarouselRef} className="flex overflow-x-auto gap-5 pb-4 snap-x hide-scrollbar relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {MOCK_POPULAR_DESTINATIONS.map(dest => (
                            <Link to={`/discover?search=${encodeURIComponent(dest.name)}`} key={dest.name} className="snap-start flex-shrink-0 w-[280px] h-[240px] rounded-2xl relative overflow-hidden group cursor-pointer shadow-sm block">
                                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300"></div>
                                <div className="absolute top-5 left-5 z-20">
                                    <h3 className="text-white font-bold text-3xl drop-shadow-md">{dest.name}</h3>
                                </div>
                                <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="bg-white/95 backdrop-blur-sm text-gray-900 font-bold px-6 py-2.5 rounded-full text-sm shadow-xl flex items-center hover:bg-gray-50 scale-95 group-hover:scale-100 transition-all">
                                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-col lg:flex-row gap-6">

                {/* Left Sidebar (Filters + Itinerary) */}
                <aside className="w-full lg:w-1/4 flex-shrink-0 space-y-4">

                    {/* Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Text search"
                                className="w-full bg-[#f0f2f5] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                            />
                        </div>
                    </div>

                    {/* Budget Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 pt-5 pb-6 px-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm">Your budget (per night)</h3>

                        {/* Mock Slider */}
                        <div className="relative h-1 bg-gray-200 rounded-full mb-6 mx-2">
                            <div className="absolute top-0 left-0 h-1 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer"></div>
                            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer"></div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <div className="flex-1">
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">MIN</label>
                                <div className="border border-gray-300 rounded px-2 py-1.5 flex items-center">
                                    <span className="text-sm text-gray-500 mr-1">€</span>
                                    <input type="text" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full text-sm outline-none bg-transparent" />
                                </div>
                            </div>
                            <div className="text-gray-400 mt-5">-</div>
                            <div className="flex-1">
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">MAX</label>
                                <div className="border border-gray-300 rounded px-2 py-1.5 flex items-center">
                                    <span className="text-sm text-gray-500 mr-1">€</span>
                                    <input type="text" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full text-sm text-right outline-none bg-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Filters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 pt-5 pb-4 px-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm">Popular filters for Ibiza</h3>
                        <div className="space-y-3">
                            {FILTER_POPULAR.map((filter, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 border border-gray-300 rounded sm bg-white flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                        {/* Icon space for checkbox */}
                                    </div>
                                    <span className="text-sm text-gray-700">{filter}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 pt-5 pb-4 px-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm">Property type</h3>
                        <div className="space-y-3">
                            {FILTER_PROPERTY.map((prop, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 border border-gray-300 rounded sm bg-white flex items-center justify-center group-hover:border-purple-500 transition-colors"></div>
                                    <span className="text-sm text-gray-700">{prop.name} <span className="text-gray-400 text-xs ml-1">({prop.count})</span></span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Quick Itinerary (Activities & Transit) */}
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-sm border border-purple-100 p-0 overflow-hidden">
                        <div className="bg-purple-600 px-4 py-3 text-white">
                            <h3 className="font-bold text-sm tracking-wide">Included in Trip View</h3>
                            <p className="text-[10px] text-purple-200 uppercase tracking-widest mt-0.5">Ibiza • 3 Nights</p>
                        </div>

                        <div className="p-4 space-y-5">
                            {/* Activities block */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
                                    Must-Do Activities
                                    <span className="text-purple-600 font-semibold cursor-pointer hover:underline normal-case">Modify</span>
                                </h4>
                                <div className="space-y-2">
                                    {MOCK_ACTIVITIES.map((act, i) => (
                                        <div key={i} className="flex items-start gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                                {act.icon === 'water' ? <span className="font-bold">≈</span> : <span className="font-bold">🌴</span>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-gray-900 text-sm truncate">{act.title}</div>
                                                <div className="text-xs text-gray-500">{act.duration}</div>
                                            </div>
                                            <div className="font-bold text-purple-600 text-sm">€{act.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Transit block */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
                                    Transit Options
                                    <span className="text-purple-600 font-semibold cursor-pointer hover:underline normal-case">Modify</span>
                                </h4>
                                <div className="space-y-2">
                                    {MOCK_TRANSIT.map((trans, i) => (
                                        <div key={i} className="flex items-start gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                                                {trans.type === 'car' ? <Car className="w-4 h-4" /> : <Bus className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-gray-900 text-sm truncate">{trans.title}</div>
                                                <div className="text-xs text-gray-500">{trans.duration}</div>
                                            </div>
                                            <div className="font-bold text-blue-600 text-sm">€{trans.price.toFixed(trans.type === 'bus' ? 2 : 0)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button variant="outline" className="w-full text-xs font-bold bg-white text-purple-700 border-purple-200 hover:bg-purple-50 mt-2 py-2">
                                View more options <ChevronRight className="w-3 h-3 ml-1 inline" />
                            </Button>
                        </div>
                    </div>

                </aside>

                {/* Right Main Content (Hotel Listings) */}
                <main className="w-full lg:w-3/4 flex flex-col gap-4">

                    {/* Header Info & Sort */}
                    <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">2,969 properties in Ibiza</h1>
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-sm">
                                <option>Sort by: Best match</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Top Reviewed</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Hotel List */}
                    <div className="space-y-4">
                        {MOCK_HOTELS.map((hotel, index) => (
                            <div key={hotel.id}>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row mb-4">

                                    {/* Image Section */}
                                    <div className="w-full sm:w-72 relative flex-shrink-0 min-h-[240px]">
                                        <img src={hotel.image} alt={hotel.name} className="absolute inset-0 w-full h-full object-cover" />

                                        {/* Top banner / badges on image */}
                                        {hotel.tags[0] === 'BRAND EXCLUSIVES' ? (
                                            <div className="absolute top-0 left-0 right-0 bg-transparent">
                                                {/* We just rely on a tag above the image if needed, but in mockup Brand Exclusive is a bar *above* exactly like booking/agoda. We'll handle it inside the border padding below. For now, tag on image left: */}
                                                {/* Actually the mockup shows a dark purple bar top of the card if Brand Exclusive. We can add it outside the grid or as a top bar of the entire card! */}
                                            </div>
                                        ) : null}

                                        {/* Typical Image Badges */}
                                        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center cursor-pointer shadow-sm hover:text-red-500 text-gray-400 transition-colors">
                                            <Heart className="w-5 h-5" />
                                        </div>
                                        <div className="absolute top-1/2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100">
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded">
                                            1/10
                                        </div>

                                        {/* Blue "Newly Built" Tag on bottom left or top left (like Agoda mock) */}
                                        {hotel.tags.includes('Newly built in 2025') && (
                                            <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-semibold px-3 py-1 pb-1">
                                                Newly built in 2025
                                            </div>
                                        )}
                                    </div>

                                    {/* Middle Section (Info) & Right Section (Pricing) */}
                                    <div className="flex-1 flex flex-col sm:flex-row justify-between relative">

                                        {/* Top Brand Banner if any */}
                                        {hotel.tags.includes('BRAND EXCLUSIVES') && (
                                            <div className="absolute top-0 left-0 right-0 bg-[#59225c] text-white text-xs font-semibold px-4 py-1.5 flex items-center gap-2">
                                                <Zap className="w-3.5 h-3.5 fill-current" /> BRAND EXCLUSIVES
                                                <span className="font-normal opacity-80 text-[10px] ml-1">Limited time offer</span>
                                            </div>
                                        )}

                                        {/* Info Grid */}
                                        <div className={`flex-1 p-5 ${hotel.tags.includes('BRAND EXCLUSIVES') ? 'pt-10' : ''}`}>
                                            <h2 className="text-xl font-bold text-gray-900 leading-tight mb-1 pr-4">{hotel.name}</h2>

                                            <div className="flex items-center text-orange-400 mb-2 gap-0.5">
                                                {[...Array(hotel.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                            </div>

                                            <div className="flex items-start text-sm text-blue-600 font-semibold mb-3 cursor-pointer hover:underline">
                                                <MapPin className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" />
                                                <span>
                                                    {hotel.location.split('-')[0]}
                                                    <span className="text-gray-500 font-normal"> - {hotel.location.split('-')[1]}</span>
                                                </span>
                                            </div>

                                            {/* Badges */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {hotel.badges.map(b => (
                                                    <span key={b} className="text-xs font-semibold px-2 py-0.5 border border-gray-300 text-gray-600 rounded">
                                                        {b === 'Boosted' && <span className="text-blue-500 font-bold mr-1">Boosted</span>}
                                                        {b === 'WonderTrip Preferred' && <span className="text-purple-600 mr-1">★ Preferred</span>}
                                                        {b !== 'Boosted' && b !== 'WonderTrip Preferred' && <span className="text-gray-600">{b}</span>}
                                                    </span>
                                                ))}
                                                {hotel.badges.length === 0 && <span className="text-xs font-semibold px-2 py-0.5 bg-red-50 text-red-600 rounded">Booked 27 times today</span>}
                                            </div>

                                            <div className="flex items-start text-xs text-gray-600">
                                                <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-[10px] text-gray-500 mt-0.5">❝</span>
                                                <p className="italic text-gray-500">{hotel.snippet}</p>
                                            </div>
                                        </div>

                                        {/* Pricing & Rating Right Sidebar */}
                                        <div className={`sm:w-56 p-5 border-t sm:border-t-0 sm:border-l border-gray-100 flex flex-col justify-between ${hotel.tags.includes('BRAND EXCLUSIVES') ? 'pt-10' : ''}`}>

                                            {/* Top: Score */}
                                            <div className="text-right mb-6">
                                                <div className="flex items-center justify-end gap-2 mb-0.5">
                                                    <div className="text-right">
                                                        <div className="font-bold text-blue-700">{hotel.scoreText}</div>
                                                        <div className="text-xs text-gray-500">{hotel.reviews}</div>
                                                    </div>
                                                    <div className="w-9 h-9 bg-blue-700 text-white rounded-t-lg rounded-br-lg rounded-bl flex items-center justify-center font-bold text-lg">
                                                        {hotel.score}
                                                    </div>
                                                </div>
                                                <div className="text-xs font-bold text-gray-700 bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">
                                                    {hotel.locationScore} Location score
                                                </div>
                                            </div>

                                            {/* Bottom: Price */}
                                            <div className="text-right mt-auto">
                                                {hotel.priceLabel && (
                                                    <div className={`text-xs font-bold border inline-block px-2 py-0.5 rounded mb-2 ${hotel.priceLabelColor ? hotel.priceLabelColor + ' border-transparent' : 'text-red-500 border-red-200 bg-red-50'}`}>
                                                        {hotel.priceLabel.includes('Price') ? <ChevronRight className="w-3 h-3 inline transform -rotate-45" /> : null}
                                                        {hotel.priceLabel}
                                                    </div>
                                                )}

                                                <div className="text-[10px] text-gray-500 mb-0.5">Per night before taxes and fees</div>

                                                <div className="flex items-baseline justify-end gap-2">
                                                    <span className="text-red-500 text-lg font-bold line-through opacity-80">
                                                        {hotel.oldPrice}
                                                    </span>
                                                    <span className="text-2xl font-bold text-red-600">
                                                        {hotel.price}
                                                    </span>
                                                </div>

                                                {hotel.priceLabelColor?.includes('bg-red') ? (
                                                    <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide py-2.5 rounded shadow-sm text-sm">
                                                        Select Room
                                                    </Button>
                                                ) : (
                                                    <div className="bg-gray-100 border border-gray-200 mt-2 p-2 rounded text-xs text-gray-600 font-medium">
                                                        <span className="font-bold text-gray-900 text-sm">{hotel.price.replace('€', '€ ')}</span> When you <a href="/login" className="text-blue-600 hover:underline">sign in</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* Activity Carousel Inject after the second hotel (index 1) */}
                                {index === 1 && (
                                    <div className="py-6 mt-6 mb-2 border-t border-b border-gray-200">
                                        <div className="flex items-center justify-between mb-4 px-1">
                                            <h3 className="text-xl font-bold text-gray-900">Top things to do in Ibiza</h3>
                                        </div>
                                        <div className="relative group/carousel">
                                            {/* Scroll Left Button */}
                                            <button
                                                onClick={(e) => { e.preventDefault(); carouselRef.current?.scrollBy({ left: -350, behavior: 'smooth' }); }}
                                                className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>

                                            {/* Scroll Right Button */}
                                            <button
                                                onClick={(e) => { e.preventDefault(); carouselRef.current?.scrollBy({ left: 350, behavior: 'smooth' }); }}
                                                className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900 hover:scale-105 transition-all opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>

                                            <div ref={carouselRef} className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar relative" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                                {/* Intro Card */}
                                                <div className="snap-start flex-shrink-0 w-48 h-[280px] rounded-2xl relative overflow-hidden group cursor-pointer shadow-sm">
                                                    <img src="https://images.unsplash.com/photo-1560242259-2470a6c6ec2d?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Ibiza" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                                    <div className="absolute bottom-4 left-4 text-white">
                                                        <div className="font-bold text-2xl mb-1">Ibiza</div>
                                                        <div className="text-sm font-medium flex items-center hover:underline">Explore <ChevronRight className="w-4 h-4 ml-1" /></div>
                                                    </div>
                                                </div>

                                                {/* Activity Cards */}
                                                {MOCK_CAROUSEL_ACTIVITIES.map(act => (
                                                    <div key={act.id} className="snap-start flex-shrink-0 w-64 h-[280px] bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow relative">
                                                        {act.tags.find(t => t.color.includes('bg-orange-500')) && (
                                                            <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                                                                {act.tags.find(t => t.color.includes('bg-orange-500')).text}
                                                            </div>
                                                        )}
                                                        <div className="h-36 relative overflow-hidden">
                                                            <img src={act.image} alt={act.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                        </div>
                                                        <div className="p-4 flex flex-col flex-1">
                                                            <h4 className="font-bold text-gray-900 text-[15px] leading-tight mb-2 line-clamp-2">{act.title}</h4>
                                                            <div className="flex items-center text-[13px] text-orange-500 font-bold mb-auto">
                                                                <Star className="w-3.5 h-3.5 fill-current mr-1 text-orange-400" />
                                                                {act.rating} <span className="text-gray-400 font-normal ml-1">({act.count >= 1000 ? (act.count / 1000).toFixed(1) + 'K+' : act.count})</span>
                                                            </div>
                                                            <div className="mt-2 text-right">
                                                                <div className="flex gap-1.5 items-baseline justify-end">
                                                                    <span className="text-[11px] text-gray-500 line-through font-medium">
                                                                        {act.oldPrice}
                                                                    </span>
                                                                    <span className="font-bold text-gray-900 text-lg">
                                                                        {act.price}
                                                                    </span>
                                                                </div>
                                                                {act.tags.find(t => t.color.includes('border-')) && (
                                                                    <div className={`mt-1.5 inline-block text-[10px] font-bold px-1.5 py-0.5 border rounded-sm ${act.tags.find(t => t.color.includes('border-')).color}`}>
                                                                        {act.tags.find(t => t.color.includes('border-')).text}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}


                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreateTrip;
