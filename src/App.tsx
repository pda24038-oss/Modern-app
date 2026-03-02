import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  X, 
  Send, 
  Info, 
  Palette, 
  History,
  ChevronRight,
  Menu
} from 'lucide-react';
import Markdown from 'react-markdown';
import { MOVEMENTS } from './constants';
import { ArtMovement, ChatMessage } from './types';
import { askAboutArt } from './services/gemini';
import { cn } from './lib/utils';

export default function App() {
  const [selectedMovement, setSelectedMovement] = useState<ArtMovement | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to the Modern Art Explorer. Ask me anything about art movements, artists, or techniques!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await askAboutArt(userMsg, history);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-art-bg/80 backdrop-blur-sm border-b border-art-ink/5">
        <div className="flex items-center gap-2">
          <Palette className="w-6 h-6 text-art-accent" />
          <span className="font-serif text-xl font-bold tracking-tight">Modern Art Explorer</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#movements" className="hover:text-art-accent transition-colors">Movements</a>
          <a href="#about" className="hover:text-art-accent transition-colors">About</a>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 text-art-accent hover:opacity-80 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            Ask AI
          </button>
        </div>
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="px-6 py-12 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto relative">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h1 className="editorial-title text-art-ink">
                Modern<br />
                <span className="text-art-accent italic font-serif lowercase">Art</span><br />
                Explorer
              </h1>
              <p className="mt-8 max-w-xl text-lg md:text-xl text-art-ink/70 font-serif leading-relaxed">
                A curated journey through the revolutionary movements that redefined the visual language of the 20th century. From the fleeting light of Impressionism to the bold irony of Pop Art.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('movements')?.scrollIntoView({ behavior: 'smooth' })}
                  className="pill-button flex items-center gap-2"
                >
                  Explore Movements <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="px-6 py-2 rounded-full border border-art-ink/20 hover:bg-art-ink hover:text-white transition-all"
                >
                  Ask our Art Historian
                </button>
              </div>
            </motion.div>
            
            {/* Decorative Element */}
            <motion.div 
              animate={{ 
                rotate: [0, 10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -right-20 w-[40vw] aspect-square rounded-full bg-art-accent/5 blur-3xl -z-0"
            />
          </div>
        </section>

        {/* Movements Grid */}
        <section id="movements" className="px-6 py-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-art-accent font-bold mb-4 block">The Timeline</span>
                <h2 className="text-5xl md:text-7xl font-serif">Major Movements</h2>
              </div>
              <p className="max-w-md text-art-ink/60 font-serif italic text-lg">
                Each movement was a reaction, a rebellion, and a new way of seeing the world around us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOVEMENTS.map((movement, index) => (
                <motion.div
                  key={movement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedMovement(movement)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6">
                    <img 
                      src={movement.imageUrl} 
                      alt={movement.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <span className="text-white flex items-center gap-2 font-medium">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-art-accent font-bold mb-2 block">{movement.period}</span>
                  <h3 className="text-3xl font-serif mb-3 group-hover:text-art-accent transition-colors">{movement.name}</h3>
                  <p className="text-art-ink/60 line-clamp-2 font-serif italic">{movement.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-art-ink text-art-bg px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-white" />
              <span className="font-serif text-2xl font-bold">Modern Art Explorer</span>
            </div>
            <p className="text-art-bg/60 font-serif italic max-w-xs">
              Democratizing art history through interactive exploration and AI-driven insights.
            </p>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-art-bg/60 font-serif">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#movements" className="hover:text-white transition-colors">Movements</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Artists Index</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gallery Map</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-bold mb-6">Connect</h4>
            <p className="text-art-bg/60 font-serif mb-6">Stay updated with our latest art features.</p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-art-ink transition-all">
                <Info className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-art-ink transition-all">
                <History className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center text-art-bg/40 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Modern Art Explorer. Built with Passion for Art.
        </div>
      </footer>

      {/* Movement Detail Modal */}
      <AnimatePresence>
        {selectedMovement && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-art-ink/60 backdrop-blur-sm"
              onClick={() => setSelectedMovement(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl bg-art-bg rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedMovement(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedMovement.imageUrl} 
                  alt={selectedMovement.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-art-bg via-transparent to-transparent md:hidden" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <span className="text-xs uppercase tracking-[0.3em] text-art-accent font-bold mb-4 block">
                  {selectedMovement.period}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">{selectedMovement.name}</h2>
                <p className="text-art-ink/70 font-serif text-lg leading-relaxed mb-8 italic">
                  {selectedMovement.description}
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-art-accent" /> Key Characteristics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovement.keyCharacteristics.map(char => (
                        <span key={char} className="px-3 py-1 rounded-full bg-art-accent/10 text-art-accent text-sm font-medium">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <Palette className="w-3 h-3 text-art-accent" /> Famous Artists
                    </h4>
                    <ul className="space-y-2">
                      {selectedMovement.famousArtists.map(artist => (
                        <li key={artist} className="flex items-center gap-3 group cursor-pointer">
                          <div className="w-1.5 h-1.5 rounded-full bg-art-accent group-hover:scale-150 transition-transform" />
                          <span className="font-serif text-lg group-hover:text-art-accent transition-colors">{artist}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-art-ink/10">
                  <button 
                    onClick={() => {
                      setChatInput(`Tell me more about ${selectedMovement.name} and its impact on modern art.`);
                      setIsChatOpen(true);
                      setSelectedMovement(null);
                    }}
                    className="w-full py-4 rounded-2xl bg-art-ink text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    Ask AI about this movement <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chat Sidebar */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-art-ink/40 backdrop-blur-sm z-[70]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-art-bg z-[80] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-art-ink/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-art-accent flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold">Art Historian AI</h3>
                    <span className="text-[10px] uppercase tracking-widest text-art-accent font-bold">Online & Ready</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 hover:bg-art-ink/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      msg.role === 'user' ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className={cn(
                      "p-4 rounded-2xl font-serif leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-art-accent text-white rounded-tr-none" 
                        : "bg-white text-art-ink shadow-sm border border-art-ink/5 rounded-tl-none"
                    )}>
                      <div className="markdown-body text-sm prose prose-sm prose-stone">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-art-ink/40 font-bold mt-2">
                      {msg.role === 'user' ? 'You' : 'AI Historian'}
                    </span>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-art-accent">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form 
                onSubmit={handleSendMessage}
                className="p-6 border-t border-art-ink/10 bg-white"
              >
                <div className="relative">
                  <input 
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about an artist or movement..."
                    className="w-full pl-4 pr-12 py-4 rounded-2xl bg-art-bg border-none focus:ring-2 focus:ring-art-accent/20 font-serif"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-art-ink text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-center text-art-ink/40 font-bold mt-4 uppercase tracking-widest">
                  Powered by Gemini AI &bull; Expert Art Knowledge
                </p>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
