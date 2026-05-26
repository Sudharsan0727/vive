import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 is the entry selection
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selections, setSelections] = useState({
    category: '',
    target: '',
    concern: '',
    type: '',
    sensitive: '',
    age: '',
    priority: ''
  });

  // Scroll to top on every step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep === 6) {
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 3000);
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const categories = [
    { id: 'skin', title: "Skin", icon: "✨", desc: "Face care & serums" },
    { id: 'hair', title: "Hair", icon: "🌱", desc: "Hair & scalp care" },
    { id: 'wellness', title: "Wellness", icon: "📦", desc: "Supplements & nutrition" }
  ];

  const quizSteps = [
    {
      id: 'target',
      question: "Who are you shopping for?",
      options: ["Women", "Men", "Both / Everyone"]
    },
    {
      id: 'concern',
      question: selections.category === 'Hair' ? "What is your primary hair concern?" : "What is your primary skin concern?",
      options: selections.category === 'Hair' 
        ? ["Hair Fall", "Dandruff", "Dry/Frizzy Hair", "Slow Growth", "Damage/Split Ends"]
        : ["Acne", "Dark Spots", "Aging/Wrinkles", "Dullness", "Dryness", "Sun Damage"]
    },
    {
      id: 'type',
      question: selections.category === 'Hair' ? "What is your hair type?" : "What is your skin type?",
      options: selections.category === 'Hair' 
        ? ["Oily Scalp", "Dry/Damaged", "Normal", "Thin/Fine"]
        : ["Oily", "Dry", "Combination", "Normal"]
    },
    {
      id: 'sensitive',
      question: selections.category === 'Hair' ? "Do you have a sensitive scalp?" : "Do you have sensitive skin?",
      options: ["Yes", "No"]
    },
    {
      id: 'age',
      question: "What is your age range?",
      options: ["18-25", "26-35", "36-45", "45+"]
    },
    {
      id: 'priority',
      question: selections.category === 'Hair' ? "Which step is most important in your hair routine?" : "Which step is most important in your skincare routine?",
      options: selections.category === 'Hair' 
        ? ["Cleanse (Shampoo)", "Treat (Oil/Serum)", "Condition", "Style/Protect"]
        : ["Cleanse", "Treat (Serums/Actives)", "Moisturize", "Protect (Sunscreen)"]
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 py-12 relative overflow-hidden bg-gray-50/30">
        
        {/* Step 0: Initial Category Selection */}
        {currentStep === 0 && (
          <div className="max-w-5xl w-full space-y-16 animate-fade-in">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">What are you shopping for today?</h1>
              <p className="text-gray-500 text-lg">Get personalized product recommendations in 60 seconds</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {categories.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { setSelections({ ...selections, category: opt.title }); handleNext(); }}
                  className="flex flex-col items-center p-10 bg-white rounded-[32px] border border-gray-100 hover:border-brand-magenta transition-all duration-300 w-full sm:w-[280px] shadow-sm hover:shadow-xl group"
                >
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">{opt.icon}</div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">{opt.title}</h3>
                  <p className="text-gray-400 text-base">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Analyzing State */}
        {isAnalyzing && (
          <div className="max-w-md w-full text-center space-y-8 animate-fade-in py-20">
            <div className="relative w-20 h-20 mx-auto">
               <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-brand-dark rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="space-y-6">
               <h1 className="text-3xl font-bold text-brand-dark">Finding your perfect matches</h1>
               <div className="space-y-3 text-gray-500 font-medium">
                  <p className="animate-pulse delay-75">Analyzing your concerns...</p>
                  <p className="animate-pulse delay-150">Checking compatibility...</p>
                  <p className="animate-pulse delay-300">Prioritizing best matches...</p>
               </div>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-brand-dark animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Step 1-6: Quiz Questions */}
        {!isAnalyzing && currentStep > 0 && currentStep <= quizSteps.length && (
          <div className="max-w-xl w-full animate-slide-up px-4">
            <div className="flex items-center justify-between mb-4 px-1">
               <button onClick={handleBack} className="flex items-center gap-1.5 text-[11px] font-semibold text-brand-dark hover:text-brand-magenta transition-colors uppercase tracking-widest">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
               </button>
               <button onClick={() => { setIsAnalyzing(true); setTimeout(() => setIsAnalyzing(false), 3000); setCurrentStep(7); }} className="text-[11px] font-semibold text-gray-400 hover:text-brand-dark transition-colors uppercase tracking-widest">Skip questions</button>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full mb-2 overflow-hidden">
               <div className="h-full bg-brand-magenta transition-all duration-700" style={{ width: `${(currentStep / 6) * 100}%` }}></div>
            </div>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-8 px-1">Question {currentStep} of 6</p>

            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-50">
               <h2 className="text-2xl md:text-[28px] font-serif font-semibold text-brand-dark mb-8 text-left leading-tight">{quizSteps[currentStep-1].question}</h2>
               <div className="space-y-4">
                  {quizSteps[currentStep-1].options.map((opt) => (
                    <button 
                      key={opt}
                      onClick={() => {
                        setSelections({ ...selections, [quizSteps[currentStep-1].id]: opt });
                        handleNext();
                      }}
                      className="w-full flex items-center justify-between p-5 px-8 bg-white border border-gray-100 rounded-2xl hover:border-brand-magenta hover:bg-brand-magenta/[0.02] transition-all group active:scale-[0.98]"
                    >
                      <span className="text-lg font-medium text-brand-dark/80 group-hover:text-brand-dark transition-colors">{opt}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-brand-magenta transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* Results Page */}
        {!isAnalyzing && currentStep > quizSteps.length && (
          <div className="max-w-4xl w-full space-y-12 animate-fade-in py-10 px-4">
            
            <div className="flex justify-between items-end border-b border-gray-100 pb-6">
               <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-brand-dark">Your recommended routine</h1>
                  <p className="text-gray-500 font-medium">A complete daily routine selected for your needs</p>
               </div>
               <button onClick={() => setCurrentStep(1)} className="text-sm font-bold text-gray-400 hover:text-brand-magenta underline underline-offset-4">Edit</button>
            </div>

            {/* Product List */}
            <div className="space-y-4">
               {[
                 { step: 1, title: "Oat Extract Salicylic Acid Anti Acne Face Wash", price: "269", usage: "Cleanse - Morning & Evening", icon: "🧼" },
                 { step: 2, title: "Anti Acne Face Serum Clears Breakouts & Controls Oil", price: "499", usage: "Treat - Evening", icon: "💧" },
                 { step: 3, title: "WOW 10-in-1 Active Day Cream SPF 15 PA+++", price: "399", usage: "Protect & Moisturize - Morning", icon: "☀️" }
               ].map((prod) => (
                 <div key={prod.step} className="flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-dark text-white rounded-full flex items-center justify-center text-xs font-bold">{prod.step}</div>
                    <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center text-4xl">{prod.icon}</div>
                    <div className="flex-1 space-y-1">
                       <h3 className="text-lg font-bold text-brand-dark leading-tight group-hover:text-brand-magenta transition-colors">{prod.title}</h3>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{prod.usage}</p>
                       <button className="text-xs font-bold text-brand-magenta underline underline-offset-2 pt-2">View product →</button>
                    </div>
                    <div className="text-xl font-bold text-brand-dark">₹{prod.price}</div>
                 </div>
               ))}
            </div>

            {/* Total & CTA */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
               <div className="flex justify-between items-center px-2">
                  <span className="text-gray-500 font-bold">Routine total</span>
                  <span className="text-3xl font-bold text-brand-dark">₹1,167</span>
               </div>
               <div className="space-y-3">
                  <button className="w-full py-5 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-magenta transition-all flex items-center justify-center gap-3 group">
                     Continue to checkout
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l7-7m-7 7h18" />
                     </svg>
                  </button>
                  <button className="w-full py-5 bg-white text-brand-dark font-bold rounded-xl border border-gray-200 hover:border-brand-dark transition-all flex items-center justify-center gap-3">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                     </svg>
                     Add routine to cart
                  </button>
               </div>
            </div>

            {/* Save Routine */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 space-y-4">
               <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-dark text-white rounded-xl">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                     </svg>
                  </div>
                  <div className="space-y-1">
                     <h4 className="font-bold text-brand-dark">Save this routine</h4>
                     <p className="text-sm text-gray-500">We'll send it to your phone or email so you can come back to it later.</p>
                  </div>
               </div>
               <div className="flex gap-2">
                  <input type="text" placeholder="Email or phone" className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20 transition-all text-sm" />
                  <button className="px-8 py-3 bg-gray-400 text-white font-bold rounded-xl hover:bg-brand-dark transition-all text-sm">Send</button>
               </div>
               <button className="text-xs font-bold text-brand-dark flex items-center gap-2 hover:text-brand-magenta transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Copy link to this routine
               </button>
            </div>

            {/* Why it works */}
            <div className="space-y-6">
               <button className="w-full flex justify-between items-center py-4 border-b border-gray-100 group">
                  <span className="text-lg font-bold text-brand-dark">Why this routine works</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 group-hover:text-brand-magenta transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
               </button>
               <div className="text-gray-600 space-y-6 text-[15px] leading-relaxed">
                  <p>Here's your recommended routine for <span className="font-bold text-brand-dark lowercase">{selections.type}</span>, <span className="font-bold text-brand-dark lowercase">{selections.concern}-prone</span> skin:</p>
                  
                  <div className="space-y-4">
                     <p><span className="font-bold text-brand-dark">Step 1: Cleanse</span><br/>
                     <span className="font-bold">Oat Extract Salicylic Acid Face Wash</span> — use morning & evening<br/>
                     A gentle cleanser that helps dissolve pore buildup and reduce breakouts without stripping moisture.</p>

                     <p><span className="font-bold text-brand-dark">Step 2: Treat</span><br/>
                     <span className="font-bold text-brand-dark">Anti Acne Face Serum</span> — use evening<br/>
                     Targets active breakouts and helps control excess oil while supporting clearer-looking skin overnight.</p>

                     <p><span className="font-bold text-brand-dark">Step 3: Protect & Moisturize</span><br/>
                     <span className="font-bold text-brand-dark">10-in-1 Active Day Cream</span> — use morning<br/>
                     Hydrates skin while giving daytime sun protection, which is vital when using active ingredients.</p>
                  </div>

                  <div className="p-8 bg-brand-magenta/[0.03] rounded-3xl border border-brand-magenta/5">
                     <p><span className="font-bold text-brand-dark">Why this works for you</span><br/>
                     Since your skin is <span className="font-bold text-brand-dark">{selections.type.toLowerCase()}</span> and <span className="font-bold text-brand-dark">{selections.concern.toLowerCase()}-prone</span>, the goal is to treat clogged pores without stripping moisture. The <span className="font-bold">salicylic acid</span> helps dissolve buildup, while <span className="font-bold">oat extract</span> adds a soothing touch. This routine is balanced to help you get <span className="font-bold text-brand-dark underline decoration-brand-magenta/20 underline-offset-4">clearer skin</span> while keeping it comfortable and hydrated.</p>
                  </div>
               </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
