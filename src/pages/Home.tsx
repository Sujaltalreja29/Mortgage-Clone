// src/pages/Home.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // State to track which category is selected in the CTA section
  const [activeCategory, setActiveCategory] = useState<'products' | 'calculators' | 'guides'>('products');

  // Card data by category
  const cardData = {
    products: [
      {
        id: 1,
        title: "Buying your first home with Better",
        description: "",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      {
        id: 2,
        title: "One Day Mortgage",
        description: "Kick your home loan into hyperdrive. Going from locked rate to Commitment Letter takes weeks for traditional lenders. We do it in a single day.",
        image: ""
      },
      {
        id: 3,
        title: "Better HELOC",
        description: "Introducing One Day HELOC™—your express lane to getting cash from your home with our Home Equity Line of Credit2. Access up to 90% of your home equity as cash in as little as 7 days.",
        image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      },
      {
        id: 4,
        title: "Insurance",
        description: "",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80"
      }
    ],
    calculators: [
      {
        id: 1,
        title: "Mortgage Calculator",
        description: "Estimate your monthly mortgage payment with taxes and insurance included.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1011&q=80"
      },
      {
        id: 2,
        title: "Affordability Calculator",
        description: "Find out how much home you can afford based on your income, savings, and debt.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      },
      {
        id: 3,
        title: "Refinance Calculator",
        description: "See if refinancing makes sense for you and how much you could save.",
        image: ""
      },
      {
        id: 4,
        title: "Rent vs Buy Calculator",
        description: "Compare the costs of renting versus buying a home over time.",
        image: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
      }
    ],
    guides: [
      {
        id: 1,
        title: "First-Time Home Buyer Guide",
        description: "Everything you need to know when buying your first home.",
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1296&q=80"
      },
      {
        id: 2,
        title: "Mortgage Loan Types",
        description: "Learn about different mortgage options and which one is right for you.",
        image: ""
      },
      {
        id: 3,
        title: "Closing Process Explained",
        description: "A step-by-step guide to the mortgage closing process.",
        image: "https://images.unsplash.com/photo-1565041368951-7a238b50e9db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
      },
      {
        id: 4,
        title: "Common Mortgage Questions",
        description: "Answers to frequently asked questions about mortgages and home buying.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      }
    ]
  };

  // Get cards for the active category
  const activeCards = cardData[activeCategory];

  return (
    <div>
      {/* Hero Section - Improved centering */}
      <section className="bg-emerald-900 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-[505px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-emerald-400 leading-tight">
                Mortgages<br />made simple
              </h1>
              <div className="mt-10">
                <Link 
                  to="/start" 
                  className="bg-emerald-400 text-emerald-900 font-medium py-3 px-8 rounded-full text-lg hover:bg-emerald-300 transition-colors inline-block transform hover:scale-105 duration-200"
                >
                  Start my approval
                </Link>
                <div className="flex items-center justify-center lg:justify-start mt-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>3 min | No credit impact</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="https://images.unsplash.com/photo-1621768216002-5ac171876625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                alt="Mortgage approval on phone" 
                className="max-w-xs sm:max-w-sm md:max-w-md shadow-2xl rounded-lg transform transition-transform duration-500 hover:rotate-1 hover:scale-105"
              />
            </div>
          </div>
          {/* <div className="absolute right-10 lg:right-24 bottom-8">
            <div className="inline-flex flex-col items-end">
              <div className="flex">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6" />
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-white text-sm mt-1">4.6 stars | 3177 Google reviews</span>
            </div>
          </div> */}
        </div>
      </section>

      {/* Content Section - With clickable category tabs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Got Questions?</h2>
              <p className="text-3xl font-bold text-gray-800">We've got answers</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out cursor-pointer ${
                  activeCategory === 'products' 
                    ? 'border-2 border-emerald-600 text-emerald-600 bg-emerald-50' 
                    : 'border border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'
                }`}
                onClick={() => setActiveCategory('products')}
              >
                Our Products
              </button>
              <button 
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out cursor-pointer ${
                  activeCategory === 'calculators' 
                    ? 'border-2 border-emerald-600 text-emerald-600 bg-emerald-50' 
                    : 'border border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'
                }`}
                onClick={() => setActiveCategory('calculators')}
              >
                Calculators
              </button>
              <button 
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ease-in-out cursor-pointer ${
                  activeCategory === 'guides' 
                    ? 'border-2 border-emerald-600 text-emerald-600 bg-emerald-50' 
                    : 'border border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'
                }`}
                onClick={() => setActiveCategory('guides')}
              >
                Guides & FAQs
              </button>
            </div>
          </div>

          {/* Cards Grid with Animation */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeCards.map((card) => (
              <div 
                key={card.id} 
                className="bg-emerald-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">{card.title}</h3>
                {card.description && (
                  <p className="text-gray-700 mb-4 font-medium leading-relaxed">
                    {card.description}
                  </p>
                )}
                <Link to="/start">
                <button className="rounded-full border border-emerald-600 p-2 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 cursor-pointer" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                </Link>
                {card.image && (
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-48 object-cover rounded-lg shadow transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;