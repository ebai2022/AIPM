import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, BarChart2, Zap, Users, Lock } from 'lucide-react'
import { Button } from "../components/ui/button"
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-indigo-600">AB Tester</div>
            <div className="hidden md:flex space-x-4">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition duration-300">Features</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition duration-300">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition duration-300">Docs</a>
            </div>
            <Link href="/testing">
              <Button className="hidden md:block">Get Started</Button>
            </Link>
            <button 
              className="md:hidden focus:outline-none" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6 fill-current text-gray-700" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                )}
              </svg>
            </button>
          </div>
          {isMenuOpen && (
            <div className="mt-4 md:hidden">
              <a href="#features" className="block py-2 text-gray-700 hover:text-indigo-600 transition duration-300">Features</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600 transition duration-300">Pricing</a>
              <a href="#" className="block py-2 text-gray-700 hover:text-indigo-600 transition duration-300">Docs</a>
              <Link href="/testing">
                <Button className="mt-2 w-full">Get Started</Button>
              </Link>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-6 py-16 text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Optimize Your Website with
            <span className="text-indigo-600"> A/B Testing</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Boost conversions and improve user experience with data-driven decisions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/testing">
              <Button className="text-lg px-8 py-3">
                Start Testing <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: BarChart2, title: "Advanced Analytics", description: "Get deep insights into your test results" },
                { icon: Zap, title: "Quick Setup", description: "Set up tests in minutes, not hours" },
                { icon: Users, title: "User Segmentation", description: "Target specific user groups for precise testing" },
                { icon: Lock, title: "Data Security", description: "Your data is always safe and encrypted" }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-indigo-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to optimize your website?</h2>
            <p className="text-xl mb-8">Join thousands of companies making data-driven decisions.</p>
            <Link href="/testing">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-3">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3 className="text-lg font-semibold">AB Tester</h3>
              <p className="mt-2 text-sm">Empowering businesses with data-driven decisions</p>
            </div>
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <ul className="flex justify-center md:justify-end space-x-4">
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition duration-300">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            &copy; {new Date().getFullYear()} AB Tester. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}