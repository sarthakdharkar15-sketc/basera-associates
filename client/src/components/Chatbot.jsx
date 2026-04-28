import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Sparkles, Phone, Crown, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Basera Associates. I am your personal AI Concierge. How may I assist you with your luxury estate requirements today?", sender: "ai" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Chatbot failed to fetch projects:", err));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      
      // Proactive engagement if conversation is stale or just started
      if (messages.length === 1) {
          setTimeout(() => {
              const proactiveMsg = { 
                  id: Date.now() + 5, 
                  text: "Looking for high ROI properties or our new Smart Broker Network? I can help you find exclusive investment assets.", 
                  sender: "ai",
                  isSuggestion: true
              };
              setMessages(prev => [...prev, proactiveMsg]);
          }, 2000);
      }
    }
  }, [messages, isOpen, isTyping]);

  // Helper to format price in Indian units (Lakh/Cr)
  const formatIndianPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} Lakh`;
    return price.toLocaleString('en-IN');
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userMsg = { id: Date.now(), text: userText, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lowerInput = userText.toLowerCase();
      
      // deep intelligent Filtering Logic
      const matchedProjects = projects.filter(p => {
         const title = (p.title || '').toLowerCase();
         const city = (p.city || '').toLowerCase();
         const location = (p.location || '').toLowerCase();
         const type = (p.type || '').toLowerCase();
         const desc = (p.description || '').toLowerCase();
         const tags = (p.tags || []).map(t => t.toLowerCase()).join(' ');
         const status = (p.status || '').toLowerCase();
         
         // 1. Core Intent Match (City, Type, Location)
         const coreMatch = lowerInput.includes(city) || lowerInput.includes(location) || lowerInput.includes(type) || lowerInput.includes(title);
         
         // 2. Attribute Specific Matches
         const bhkMatch = lowerInput.match(/(\d)\s*bhk/);
         const bhkRequested = bhkMatch ? bhkMatch[1] : null;
         const pConfig = (p.configurations || '').toLowerCase();
         const matchBHK = bhkRequested ? pConfig.includes(`${bhkRequested}bhk`) || pConfig.includes(`${bhkRequested} bhk`) : true;

         const isVastu = lowerInput.includes('vastu') && (desc.includes('vastu') || tags.includes('vastu'));
         const isReady = (lowerInput.includes('ready') || lowerInput.includes('move')) && (status.includes('ready') || status.includes('move'));
         const isPreLaunch = (lowerInput.includes('new') || lowerInput.includes('launch')) && (status.includes('launch') || status.includes('upcoming'));

         // 3. Price/Budget Filter
         let pricePass = true;
         let budgetFound = false;
         const hasBudgetKeyword = lowerInput.match(/(budget|under|below|max|lakh|lac|cr|crore|₹|rs)/);
         
         if (hasBudgetKeyword) {
             const regex = /(\d+(\.\d+)?)\s*(lakh|lac|cr|crore)/;
             const match = lowerInput.match(regex);
             
             if (match) {
                 budgetFound = true;
                 const val = parseFloat(match[1]);
                 const isCr = match[3].startsWith('cr');
                 const multiplier = isCr ? 10000000 : 100000;
                 const limit = val * multiplier;
                 
                 // 15% upper buffer, 70% lower bound for relevance
                 pricePass = p.price <= (limit * 1.15) && p.price >= (limit * 0.3);
             } else {
                 const numMatch = lowerInput.match(/\d{5,}/);
                 if (numMatch) {
                     budgetFound = true;
                     const limit = parseInt(numMatch[0]);
                     pricePass = p.price <= (limit * 1.15) && p.price >= (limit * 0.3);
                 }
             }
         }

         // Combined matching weight
         if (budgetFound) {
             const hasCity = ['mumbai', 'pune', 'indore', 'goa'].some(c => lowerInput.includes(c));
             if (hasCity && !lowerInput.includes(city)) return false; 
             return pricePass && matchBHK;
         }

         if (coreMatch && pricePass && matchBHK) return true;
         if (isVastu || isReady || isPreLaunch) return true;
         
         return false;
      });

      // Sort by closest price if budget was specified
      if (lowerInput.match(/(budget|under|below|max|lakh|lac|cr|crore|₹|rs)/)) {
          const regex = /(\d+(\.\d+)?)\s*(lakh|lac|cr|crore)/;
          const match = lowerInput.match(regex);
          if (match) {
              const val = parseFloat(match[1]);
              const multiplier = match[3].startsWith('cr') ? 10000000 : 100000;
              const limit = val * multiplier;
              matchedProjects.sort((a, b) => Math.abs(a.price - limit) - Math.abs(b.price - limit));
          }
      }

      let aiResponse = { id: Date.now() + 1, sender: "ai" };

      if (matchedProjects.length > 0) {
        let responseText = `Based on your specific needs, I've curated ${matchedProjects.length} premium options. ${matchedProjects[0].title} seems like a perfect fit!`;
        if (lowerInput.match(/(budget|lakh|lac|cr|crore)/)) {
             responseText = `I found ${matchedProjects.length} properties that fit your budget perfectly. ${matchedProjects[0].title} is an excellent choice to consider!`;
        }
        aiResponse.text = responseText;
        aiResponse.results = matchedProjects.slice(0, 3);
      } else {
        // Advanced Knowledge Base Expansion
        const knowledgeBox = [
            { keys: ['hi', 'hello', 'hey', 'start', 'sup'], response: "Greetings! I'm Basera AI, your real estate strategist. Are you looking for a long-term home or a short-term high-yield investment today?" },
            { keys: ['coastal', 'goa', 'sea', 'beach', 'villa'], response: "Our Coastal Luxury Collection features 20 premium properties in Mumbai & Goa. They offer an average ROI of 14.2% and exclusive beachfront access. Would you like to see the Goa or Mumbai collection?" },
            { keys: ['loan', 'emi', 'finance', 'mortgage'], response: "We have tie-ups with HDFC, ICICI, and SBI for seamless home loans with interest rates starting at 8.4%. I can also help you calculate your EMI." },
            { keys: ['roi', 'invest', 'value', 'return', 'profit'], response: "Indore and Mumbai are currently high-growth zones. Our Indore plots have seen 18% appreciation in 12 months. Our new Coastal Villas are projected at 14.2% ROI." },
            { keys: ['mumbai', 'flat', 'apartment', '2bhk', '3bhk'], response: "Mumbai's luxury market is booming. We have high-end configurations (3BHK, 4BHK) in Altamount Road and South Mumbai. Should I show you the Altamount Crown?" },
            { keys: ['pune', 'plot', 'land'], response: "Pune's Baner and Hinjewadi areas are perfect for IT professionals. We have RERA-approved plots starting from 45 Lakhs." },
            { keys: ['legal', 'rera', 'agreement', 'papers'], response: "All our projects are 100% RERA verified. We handle all documentation, from sale agreements to registration, to ensure your peace of mind." },
            { keys: ['membership', 'club', 'join'], response: "Our Investment Club membership (₹99/mo) gives you first access to under-market deals and pre-launch prices. It's a game-changer for serious investors." },
            { keys: ['broker', 'network', 'partnership'], response: "Our Smart Broker Network provides real-time commission tracking and verified leads. You can register your interest in the 'Broker Network' section." },
            { keys: ['contact', 'call', 'whatsapp', 'reach', 'office'], response: "You can reach us at +91-9876543210. Or just click the WhatsApp button on the bottom left for an instant chat with our manager." },
            { keys: ['price', 'budget', 'cheap', 'cost'], response: "We have a wide range from affordable 40 Lakh flats to 100 Cr+ ultra-luxury penthouses. What's your preferred range?" },
            { keys: ['indore', 'mp'], response: "Indore is our core hub! We have the best residential plots and flats in Indore (Vijay Nagar, Bypass, Scheme 140)." },
            { keys: ['thanks', 'thank you', 'okay', 'ok', 'good', 'nice'], response: "You're most welcome! I'm here to ensure your property search is seamless. Anything else you'd like to explore?" },
            { keys: ['bye', 'goodbye', 'see you'], response: "Goodbye! Have a great day ahead. Feel free to return if you have more questions about Basera properties." }
        ];

        let found = false;
        // Natural Language Intent Mapping
        for (const item of knowledgeBox) {
          if (item.keys.some(k => lowerInput.includes(k))) {
            aiResponse.text = item.response;
            found = true;
            break;
          }
        }

        if (!found) {
            aiResponse.text = "I'm still learning, but I can tell you about our top performing assets. Here are some trending properties that match the current market demand:";
            aiResponse.results = projects.filter(p => p.isFeatured).slice(0, 2);
        }
      }

      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickReply = (text) => {
    setInputValue(text);
    setTimeout(() => {
      handleSend({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <div className="concierge-wrapper">
      {!isOpen && (
        <button className="concierge-trigger" onClick={() => setIsOpen(true)}>
          <div className="btn-inner">
            <Sparkles size={24} className="sparkle-icon" />
            <span className="btn-badge">AI</span>
          </div>
          <div className="pulse-ring"></div>
        </button>
      )}

      {isOpen && (
        <div className="concierge-window glass-premium">
          <div className="concierge-header">
            <div className="header-left">
              <div className="header-title-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div className="online-indicator-static"></div>
                  <span className="concierge-label">AI ASSISTANT</span>
                </div>
                <h4 className="concierge-name">Basera AI</h4>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn"><X size={20} /></button>
          </div>

          <div className="messages-area">
            {messages.map(msg => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`} style={{flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'}}>
                <div style={{display: 'flex', gap: '10px', alignItems: 'flex-start', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'}}>
                    {msg.sender === 'ai' && <div className="bot-icon-small"><Crown size={12} /></div>}
                    <div className="message-bubble">{msg.text}</div>
                </div>
                
                {msg.results && (
                  <div className="chat-results-grid">
                    {msg.results.map(result => (
                      <Link key={result._id} to={`/project/${result._id}`} className="chat-result-card animate-fade-in">
                        <img src={result.images?.[0] || `https://images.unsplash.com/photo-${['1560518883-ce09059eeffa', '1512917774080-9991f1c4c750', '1600585154340-be6161a56a0c', '1600607687940-c52af04657b3', '1545324418-cc1a3fa10c00'][result.title.length % 5]}?q=80&w=100`} alt={result.title} />
                        <div className="result-info">
                          <h6>{result.title}</h6>
                          <p>{result.city} • ₹{formatIndianPrice(result.price)}</p>
                        </div>
                        <ExternalLink size={14} className="link-icon" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
                <div className="typing-indicator message-wrapper ai">
                    <div className="message-bubble typing"><span></span><span></span><span></span></div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="action-chips">
             <button onClick={() => handleQuickReply("Top Investment ROI")}>Top ROI 🔥</button>
             <button onClick={() => handleQuickReply("Mumbai Luxury Flats")}>Mumbai Flats</button>
             <button onClick={() => handleQuickReply("Pune Premium Plots")}>Pune Plots</button>
             <button onClick={() => handleQuickReply("Join Investment Club")}>Membership 💎</button>
             <button onClick={() => handleQuickReply("Broker Network")}>Broker Access 🚀</button>
          </div>

          <form className="concierge-input-box" onSubmit={handleSend}>
            <div className="input-inner">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask about Mumbai flats, Pune plots..." />
              <button type="submit" disabled={!inputValue.trim()}><Send size={18} /></button>
            </div>
          </form>
        </div>
      )}

      <style>
        {`
          .concierge-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 999999; perspective: 1000px; }
          .concierge-trigger { width: 70px; height: 70px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #d4af37); border: 2px solid rgba(255,255,255,0.2); cursor: pointer; position: relative; z-index: 2; transition: all 0.4s; display: flex; align-items: center; justify-content: center; color: #fff; box-shadow: 0 10px 30px rgba(195, 157, 99, 0.4); }
          .btn-inner { position: relative; }
          .btn-badge { position: absolute; top: -12px; right: -15px; background: #fff; color: var(--primary); font-size: 0.6rem; font-weight: 900; padding: 2px 5px; border-radius: 4px; }
          .pulse-ring { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 50%; border: 4px solid var(--primary); animation: ring-pulse 2s infinite; z-index: -1; }
          @keyframes ring-pulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }

          .concierge-window { width: 400px; height: 600px; background: rgba(15, 17, 21, 0.95); backdrop-filter: blur(25px); border: 1px solid rgba(195, 157, 99, 0.2); border-radius: 30px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 80px rgba(0,0,0,0.8); animation: window-appear 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; position: absolute; bottom: 0; right: 0; transform-origin: bottom right; }
          @keyframes window-appear { 0% { opacity: 0; transform: scale(0.5) translateY(100px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }

          .concierge-header { padding: 25px; background: linear-gradient(to bottom, rgba(195,157,99,0.1), transparent); border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; }
          .online-indicator-static { width: 8px; height: 8px; background: #2ecc71; border-radius: 50%; box-shadow: 0 0 5px #2ecc71; }
          .header-left { display: flex; gap: 5px; align-items: center; }
          .concierge-label { font-size: 0.65rem; color: var(--primary); font-weight: 800; letter-spacing: 2px; }
          .concierge-name { font-family: 'Outfit', sans-serif; color: #fff; margin: 0; font-size: 1.3rem; line-height: 1; }
          .close-btn { background: transparent; border: none; color: #fff; opacity: 0.5; cursor: pointer; transition: 0.3s; }
          .close-btn:hover { opacity: 1; transform: rotate(90deg); }

          .messages-area { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
          .message-wrapper { display: flex; gap: 10px; opacity: 0; transform: translateY(10px); animation: msg-fade 0.5s forwards; }
          @keyframes msg-fade { to { opacity: 1; transform: translateY(0); } }
          .message-bubble { padding: 12px 18px; border-radius: 18px; font-size: 0.9rem; line-height: 1.5; box-shadow: 0 4px 15px rgba(0,0,0,0.2); max-width: 85%; }
          .ai .message-bubble { background: rgba(255,255,255,0.07); color: #fff; border-bottom-left-radius: 4px; }
          .user .message-bubble { background: var(--primary); color: #fff; border-bottom-right-radius: 4px; }
          .bot-icon-small { width: 24px; height: 24px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }

          /* Results Grid in Chat */
          .chat-results-grid { width: 100%; display: flex; flex-direction: column; gap: 10px; margin-top: 10px; padding-left: 34px; }
          .chat-result-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 15px; padding: 10px; display: flex; align-items: center; gap: 12px; transition: all 0.3s; text-decoration: none; color: inherit; }
          .chat-result-card:hover { background: rgba(195,157,99,0.1); border-color: var(--primary); transform: translateX(5px); }
          .chat-result-card img { width: 50px; height: 50px; border-radius: 10px; object-fit: cover; }
          .result-info h6 { margin: 0; font-size: 0.9rem; color: #fff; }
          .result-info p { margin: 2px 0 0 0; font-size: 0.75rem; color: var(--text-muted); }
          .link-icon { margin-left: auto; color: var(--primary); opacity: 0.7; }

          .typing-indicator span { width: 6px; height: 6px; background: #fff; border-radius: 50%; display: inline-block; margin: 0 2px; animation: bounce 1s infinite alternate; }
          .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
          .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-5px); } }

          .action-chips { padding: 10px 20px; display: flex; gap: 8px; overflow-x: auto; }
          .action-chips::-webkit-scrollbar { display: none; }
          .action-chips button { white-space: nowrap; padding: 6px 15px; border-radius: 100px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 0.75rem; cursor: pointer; transition: 0.3s; }
          .action-chips button:hover { background: var(--primary); border-color: var(--primary); }

          .concierge-input-box { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
          .input-inner { display: flex; gap: 10px; background: rgba(255,255,255,0.05); padding: 5px 5px 5px 20px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); }
          .input-inner input { flex: 1; background: transparent; border: none; color: #fff; outline: none; font-size: 0.9rem; }
          .input-inner button { width: 40px; height: 40px; border-radius: 50%; background: var(--primary); border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        `}
      </style>
    </div>
  );
}

export default Chatbot;
