"use client"
import EstimatePriceForm from '../components/EstimatePriceForm';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 to-purple-600 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="relative z-10 p-6 bg-white rounded-lg shadow-lg max-w-lg">
        <h1 className=" fill-transparent text-2xl font-bold text-center mb-4">Home Price Prediction</h1>
        <EstimatePriceForm />
      </div>
    </div>
  );
}


