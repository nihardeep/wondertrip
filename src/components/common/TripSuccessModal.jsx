import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const TripSuccessModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 p-1 rounded-full"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 text-center">
                    {/* Icon/Illustration */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>

                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                        Trip Generation Started!
                    </h3>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Your trip is being created... We will send you an email once it's ready, or you can visit your profile section to see the trips created.
                    </p>

                    <Button
                        onClick={() => navigate('/profile')}
                        className="w-full justify-center bg-purple-600 hover:bg-purple-700 text-white"
                        size="lg"
                    >
                        Visit Profile
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <button
                        onClick={onClose}
                        className="mt-4 text-sm text-gray-500 hover:text-gray-700 font-medium"
                    >
                        Close and continue exploring
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripSuccessModal;
