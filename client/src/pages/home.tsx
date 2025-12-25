
import StarField from "@/components/starfield";
import { useMarketData } from "@/hooks/usemarketdata";
import { useBackgroundAudio } from "@/hooks/usebackgroundaudio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart3, Copy, Globe, Rocket, ShieldCheck, Wallet, Zap, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // Get contract address from environment variable
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || "CA: ANNOUNCED_ON_LAUNCH_DAY";

  // Fetch market data from DEXScreener API
  const { data: marketData } = useMarketData(contractAddress);
  
  // Background audio control
  const { toggle, isPlaying, hasStarted } = useBackgroundAudio();
  
  // Sync muted state with audio playing state
  useEffect(() => {
    setIsMuted(!isPlaying());
  }, [isPlaying]);
  
  const handleToggleAudio = async () => {
    await toggle();
    setIsMuted(!isPlaying());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col text-foreground overflow-x-hidden relative">
      <StarField />
      
      {/* Navigation */}
      <nav className="fixed top-6 w-full z-50 flex justify-center pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-8 py-4 flex items-center gap-12 pointer-events-auto shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg tracking-widest text-white">TRADING<span className="font-light">CORE</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">ABOUT</a>
            <a href="#stats" className="text-gray-400 hover:text-white transition-colors">STATS</a>
            <a href="#howto" className="text-gray-400 hover:text-white transition-colors">HOW TO BUY</a>
            <a href="#roadmap" className="text-gray-400 hover:text-white transition-colors">ROADMAP</a>
            {/* Audio Toggle Button */}
            {hasStarted() && (
              <button
                onClick={handleToggleAudio}
                className="text-gray-400 hover:text-white transition-colors ml-4"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="container relative z-10 text-center px-4">
          <div className="inline-block mb-6 px-4 py-1 border border-white/30 bg-black">
            <span className="text-white font-mono text-xs tracking-[0.3em]">THE CORE OF TRADING</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter text-white">
            TRADING<br/><span className="font-outline-2 text-transparent bg-clip-text bg-white/10 stroke-white">CORE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed font-mono">
            The event horizon of finance. Where memes meet market mechanics in the raw, unfiltered void.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-10 py-7 rounded-none border border-white transition-all">
              BUY $TRADERS
            </Button>
            <Button size="lg" variant="outline" className="bg-black border-white text-white hover:bg-white hover:text-black font-mono text-lg px-10 py-7 rounded-none transition-all">
              VIEW CHART
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Ticker - Monochrome */}
      <div className="w-full bg-black border-y border-white/20 py-4 overflow-hidden">
        <div className="flex items-center justify-around gap-12 font-mono text-sm text-white/80 whitespace-nowrap animate-marquee">
          {marketData ? (
            <>
              <span>PRICE: ${marketData.priceUsd}</span>
              <span>///</span>
              <span>24H VOL: ${marketData.volume.h24.toLocaleString()}</span>
              <span>///</span>
              <span>FDV: ${marketData.fdv.toLocaleString()}</span>
              <span>///</span>
              <span>PAIR: {marketData.pairAddress.slice(0,4)}...{marketData.pairAddress.slice(-4)}</span>
              <span>///</span>
              <span>PRICE: ${marketData.priceUsd}</span>
              <span>///</span>
              <span>24H VOL: ${marketData.volume.h24.toLocaleString()}</span>
            </>
          ) : (
            <>
              <span>SYSTEM STATUS: ONLINE</span>
              <span>///</span>
              <span>MARKET DATA: AWAITING LAUNCH</span>
              <span>///</span>
              <span>CONTRACT: PENDING</span>
              <span>///</span>
              <span>PREPARE FOR DEPLOYMENT</span>
              <span>///</span>
              <span>SYSTEM STATUS: ONLINE</span>
              <span>///</span>
              <span>MARKET DATA: AWAITING LAUNCH</span>
              <span>///</span>
              <span>CONTRACT: PENDING</span>
              <span>///</span>
              <span>PREPARE FOR DEPLOYMENT</span>
            </>
          )}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative border border-white/20 p-2">
              <div className="aspect-square bg-black overflow-hidden relative flex items-center justify-center">
                 {/* Trading Core Image */}
                 <img src="https://i.imgur.com/XaXw3PJ.jpg" alt="Trading Core" className="object-contain w-full h-full transition-all duration-500" />

                 {/* Overlay Grid */}
                 <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMCAwTDQwIDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
              </div>
            </div>
            
            <div className="space-y-10">
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                ABOUT <br/><span className="font-mono font-light text-4xl md:text-5xl text-gray-400">TRADINGCORE</span>
              </h2>
              <Separator className="bg-white/20 w-full" />
              <div className="space-y-8 text-lg text-gray-300 font-light leading-relaxed font-mono">
                <p>
                  On Solana, we transcend traditional boundaries. We're building a space where dollars flow freely and connections run deep.
                </p>
                <p>
                  Born from the depths of meme culture, it represents the core of everything—the real, the unfiltered, the core of TRADERS.
                </p>
                <p>
                  TRADINGCORE is a cultural movement. It captures the essence of Traders, ruggers, memers and the raw unfiltered core of trading.
                </p>
              </div>
              

            </div>
          </div>
        </div>
      </section>

      {/* How To Buy Section */}
      <section id="howto" className="py-32 relative border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">HOW TO BUY</h2>
              <p className="text-gray-500 font-mono uppercase tracking-widest">/// Initiate Acquisition Sequence</p>
            </div>
            <div className="hidden md:block w-1/3 h-px bg-white/20 mb-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-0 border border-white/20">
            {/* Step 1 */}
            <div className="group border-b md:border-b-0 md:border-r border-white/20 p-10 hover:bg-white/5 transition-colors relative">
              <div className="text-8xl font-black text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">01</div>
              <div className="relative z-10">
                <Wallet className="w-8 h-8 text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 font-mono">GET SOL</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  Purchase Solana (SOL) from any major exchange like Coinbase, Binance, or Kraken.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group border-b md:border-b-0 md:border-r border-white/20 p-10 hover:bg-white/5 transition-colors relative">
              <div className="text-8xl font-black text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">02</div>
              <div className="relative z-10">
                <Rocket className="w-8 h-8 text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 font-mono">SETUP WALLET</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  Download Phantom or Solflare wallet and transfer your SOL to your wallet.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group p-10 hover:bg-white/5 transition-colors relative">
              <div className="text-8xl font-black text-white/5 absolute top-4 right-4 group-hover:text-white/10 transition-colors">03</div>
              <div className="relative z-10">
                <BarChart3 className="w-8 h-8 text-white mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4 font-mono">CONNECT & SWAP</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">
                  Visit Jupiter or Raydium, connect your wallet, and swap SOL for $TRADERS.
                </p>
              </div>
            </div>
          </div>

          {/* Contract Address & Swap (Relocated) */}
          <div className="mt-20 border border-white/20 p-1">
            <div className="bg-white/5 p-8 md:p-12 text-center">
              <div className="text-xs text-gray-500 font-mono mb-4 uppercase tracking-[0.2em]">Contract Address</div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                <code className="text-xl md:text-3xl font-mono text-white break-all">
                  {contractAddress}
                </code>
                <Button 
                  variant="outline" 
                  onClick={copyToClipboard}
                  className="border-white/30 text-white hover:bg-white hover:text-black font-mono uppercase text-xs tracking-widest rounded-none h-12 px-6"
                >
                  {copied ? "COPIED" : "COPY ADDRESS"}
                </Button>
              </div>
            </div>
          </div>

          {/* Roadmap Section */}
          <div id="roadmap" className="mt-32 mb-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">ROADMAP</h2>
                <p className="text-gray-500 font-mono uppercase tracking-widest">/// Trajectory to Singularity</p>
              </div>
              <div className="hidden md:block w-1/3 h-px bg-white/20 mb-4"></div>
            </div>

            <div className="relative border-l border-white/20 ml-4 md:ml-10 space-y-16 py-4">
              {/* Step 1 */}
              <div className="relative pl-12 md:pl-20 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-white group-hover:bg-white transition-colors duration-300"></div>
                <div className="absolute -left-[29px] top-0 text-xs font-mono text-gray-600 -rotate-90 w-12 text-center">PHASE 1</div>
                <h3 className="text-3xl font-bold text-white mb-4 font-mono group-hover:translate-x-2 transition-transform duration-300">LAUNCH</h3>
                <p className="text-gray-400 font-mono max-w-md leading-relaxed">
                  Initial deployment of the $TRADERS contract. Liquidity injection and community formation. The event horizon opens.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative pl-12 md:pl-20 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-white group-hover:bg-white transition-colors duration-300"></div>
                <div className="absolute -left-[29px] top-0 text-xs font-mono text-gray-600 -rotate-90 w-12 text-center">PHASE 2</div>
                <h3 className="text-3xl font-bold text-white mb-4 font-mono group-hover:translate-x-2 transition-transform duration-300">DEX ADS & TRENDING</h3>
                <p className="text-gray-400 font-mono max-w-md leading-relaxed">
                  Aggressive marketing campaigns. DexScreener trending, banner ads, and strategic influencer partnerships to boost visibility.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative pl-12 md:pl-20 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-white group-hover:bg-white transition-colors duration-300"></div>
                <div className="absolute -left-[29px] top-0 text-xs font-mono text-gray-600 -rotate-90 w-12 text-center">PHASE 3</div>
                <h3 className="text-3xl font-bold text-white mb-4 font-mono group-hover:translate-x-2 transition-transform duration-300">CEX LISTINGS</h3>
                <p className="text-gray-400 font-mono max-w-md leading-relaxed">
                  Expansion to centralized exchanges. Tier 2 and Tier 1 listings to increase accessibility and volume for global traders.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative pl-12 md:pl-20 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-black border border-white group-hover:bg-white transition-colors duration-300"></div>
                <div className="absolute -left-[29px] top-0 text-xs font-mono text-gray-600 -rotate-90 w-12 text-center">PHASE 4</div>
                <h3 className="text-3xl font-bold text-white mb-4 font-mono group-hover:translate-x-2 transition-transform duration-300">MOON</h3>
                <p className="text-gray-400 font-mono max-w-md leading-relaxed">
                  Total market saturation. The singularity is achieved. $TRADERS becomes the standard unit of trading culture.
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Meme Section */}
      <section className="py-20 border-t border-white/10 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white text-center tracking-tighter">$TRADERS MEMES</h2>
          <p className="text-gray-500 font-mono text-center mt-4 uppercase tracking-widest">/// Cultural Transmission</p>
        </div>
        
        {/* Scrolling Marquee */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {(() => {
              const memeImages = [
                "https://i.imgur.com/8VFcLAR.jpg",
                "https://i.imgur.com/Fh7o4cp.jpg",
                "https://i.imgur.com/zbnNsK3.jpg",
                "https://i.imgur.com/hKzFKL9.jpg",
                "https://i.imgur.com/3RhbP9Q.jpg",
                "https://i.imgur.com/2jiliKD.jpg",
                "https://i.imgur.com/lPYgcqK.jpg",
                "https://i.imgur.com/jlhZuvj.jpg",
                "https://i.imgur.com/nJ548IU.jpg",
                "https://i.imgur.com/j7aN1Nw.jpg",
                "https://i.imgur.com/VgokT31.jpg",
                "https://i.imgur.com/L0xfONV.jpg",
                "https://i.imgur.com/fytO4ka.jpg",
                "https://i.imgur.com/BmS5nIJ.jpg",
                "https://i.imgur.com/WHOMtgl.jpg",
                "https://i.imgur.com/tOjBFFH.jpg",
                "https://i.imgur.com/k2qZ43F.jpg",
                "https://i.imgur.com/pLJykh0.jpg",
                "https://i.imgur.com/6zeoQMk.jpg",
                "https://i.imgur.com/acQDuaN.jpg",
                "https://i.imgur.com/h0FrOI3.jpg",
                "https://i.imgur.com/jqE7Cse.jpg",
              ];
              return [...memeImages, ...memeImages, ...memeImages, ...memeImages].map((src, index) => (
                <div key={index} className="inline-block w-80 h-80 border border-white/20 bg-white/5 p-2 flex-shrink-0 hover:scale-105 transition-transform duration-300">
                  <img src={src} alt={`Meme ${index % memeImages.length + 1}`} className="w-full h-full object-cover transition-all duration-500" />
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-white rounded-full"></div>
            <span className="font-mono font-bold text-lg text-white">TRADINGCORE</span>
          </div>
          <div className="flex gap-8 font-mono text-sm">
            <a href="https://x.com/Tradingcore_sol" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">TWITTER</a>
            <a href="https://t.me/TraderCoreOnSol" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">TELEGRAM</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">DEXSCREENER</a>
          </div>
          <p className="text-gray-700 font-mono text-xs">
            © 2025 TRADINGCORE.
          </p>
        </div>
      </footer>
    </div>
  );
}
