import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { PlayerDTO } from '../../../generated';
import { playerApi, playerListApi } from '../../utils/apis.ts';
import PlayerDataContainer from './components/PlayerDataContainer.tsx';
import { ArrowLeftIcon, CloseIcon, SearchIcon } from './components/icons';
import axios from 'axios';

function StartPage() {
  const [playerTag, setPlayerTag] = useState('');
  const [playerData, setPlayerData] = useState<PlayerDTO[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!submitted) {
      inputRef.current?.focus();
    }
  }, [submitted]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(true);
    try {
      const response = await playerApi.getDataByTag({ playerTag });
      setPlayerData(response.data ?? []);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        // Tag not yet tracked → register it
        try {
          await playerListApi.addPlayerTag({ playerTag });
        } catch {
          setError('Tag konnte nicht registriert werden. Bitte überprüf ob der Tag korrekt ist.');
        }
        setPlayerData([]);
      } else {
        // 500 or other server error
        setError('Server-Fehler. Bitte versuch es später nochmal.');
        setPlayerData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerTag(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  };

  const handleReset = () => {
    setSubmitted(false);
    setPlayerData([]);
    setPlayerTag('');
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">

      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(29,111,234,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(29,111,234,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 300,
          background: 'radial-gradient(ellipse at center top, rgba(29,111,234,0.16) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-border-dim">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
              style={{ background: 'linear-gradient(135deg, #1d6fea, #0ea5e9)' }}
            >
              B
            </div>
            <span className="font-bold text-text-primary tracking-tight">BrawlTracker</span>
          </div>
          {submitted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors px-3 py-1.5 rounded-lg border border-border-dim hover:border-border-normal cursor-pointer"
            >
              <ArrowLeftIcon size={14}/>
              New Search
            </button>
          )}
        </header>

        {/* Hero / Search */}
        <div
          className={`transition-all duration-700 ease-out
            ${submitted ? 'py-6 px-6' : 'flex-1 flex flex-col items-center justify-center px-4 py-16'}`}
        >
          {!submitted && (
            <div className="text-center mb-8">
              <h1
                className="text-5xl font-black tracking-tight mb-3"
                style={{
                  background: 'linear-gradient(135deg, #e8f0fe 30%, #3b8af5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                BrawlTracker
              </h1>
              <p className="text-text-secondary text-lg max-w-sm mx-auto leading-relaxed">
                Track your Brawl Stars stats, trophies, and progress over time.
              </p>
            </div>
          )}

          <div className={`${submitted ? 'max-w-5xl mx-auto w-full' : 'w-full max-w-md'} transition-all duration-700`}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-bg-surface border border-border-normal rounded-2xl p-4"
              style={{ boxShadow: '0 0 40px rgba(29,111,234,0.1), 0 4px 24px rgba(0,0,0,0.4)' }}
            >
              <label htmlFor="playerTag" className="text-sm font-semibold text-blue-bright whitespace-nowrap sm:pl-1">
                Player Tag
              </label>
              <div
                className="flex flex-1 items-center gap-2 bg-bg-base border border-border-normal rounded-xl px-3 py-2.5 focus-within:border-blue-primary transition-colors duration-200">
                <span className="text-blue-bright font-bold select-none">#</span>
                <input
                  ref={inputRef}
                  id="playerTag"
                  type="text"
                  value={playerTag}
                  onChange={handleChange}
                  placeholder="P0QLRUUCQ"
                  required
                  maxLength={12}
                  className="flex-1 bg-transparent outline-none text-text-primary placeholder-text-muted font-mono tracking-wider text-sm"
                />
                {playerTag && (
                  <button
                    type="button"
                    onClick={() => setPlayerTag('')}
                    className="text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
                  >
                    <CloseIcon size={14}/>
                  </button>
                )}
              </div>
              <button
                id="search-submit"
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200
                  ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90 active:scale-95 cursor-pointer'}`}
                style={{
                  background: 'linear-gradient(135deg, #1d6fea, #0ea5e9)',
                  boxShadow: loading ? 'none' : '0 2px 12px rgba(29,111,234,0.4)',
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Searching…
                  </>
                ) : (
                  <>
                    <SearchIcon size={15}/>
                    Search
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        {submitted && (
          <main
            className={`flex-1 max-w-5xl mx-auto w-full px-6 pb-10 transition-opacity duration-700 ${loading ?
              'opacity-40 pointer-events-none' : 'opacity-100'}`}
          >
            {error ? (
              <div className="flex items-center gap-4 bg-red-950/40 border border-red-700/40 rounded-2xl p-5 text-red-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16.5" r="1" fill="currentColor"/>
                  <path d="M10.29 3.86L1.82 18A2 2 0 003.54 21H20.46A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z"
                        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <div>
                  <div className="font-semibold">Error</div>
                  <div className="text-sm opacity-80">{error}</div>
                </div>
              </div>
            ) : playerData.length === 0 && !loading ? (
              <div className="flex flex-col items-center gap-4 py-16 text-text-muted">
                <SearchIcon size={48} className="opacity-20"/>
                <div className="text-lg font-medium text-text-secondary">No data found</div>
                <div className="text-sm">No snapshots tracked for tag <span
                  className="font-mono text-text-secondary">#{playerTag}</span></div>
              </div>
            ) : (
              <PlayerDataContainer playerData={playerData}/>
            )}
          </main>
        )}

        <footer className="text-center py-4 text-xs text-text-muted border-t border-border-dim">
          BrawlTracker · Not affiliated with Supercell
        </footer>
      </div>
    </div>
  );
}

export default StartPage;
