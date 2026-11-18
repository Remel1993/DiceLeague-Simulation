import React, { useState } from 'react';
import { Download, Smartphone, WifiOff, Share, PlusSquare, X } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '@/hooks/usePWA';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="mt-2.5 inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300 shadow-md transition-all active:scale-95 cursor-pointer"
        title="Instalar en el teléfono para jugar sin conexión"
      >
        <Download size={13} className="text-emerald-400 shrink-0" />
        <span>Instalar App Offline</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="mt-2.5 inline-flex items-center gap-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-blue-300 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Smartphone size={13} className="text-blue-400 shrink-0" />
          <span>Instalar en iPhone</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-white/15 p-5 shadow-2xl text-left">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-black uppercase italic text-white">
                  Instalar en iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Instala Dice Football en tu pantalla de inicio para abrirlo y jugar sin conexión a Internet:
              </p>
              <ol className="space-y-2.5 text-xs text-slate-200 mb-4">
                <li className="flex items-center gap-2.5 bg-slate-800/70 p-2.5 rounded-xl border border-white/10">
                  <Share size={16} className="text-blue-400 shrink-0" />
                  <span>1. Toca el botón <strong>Compartir</strong> en la barra inferior de Safari.</span>
                </li>
                <li className="flex items-center gap-2.5 bg-slate-800/70 p-2.5 rounded-xl border border-white/10">
                  <PlusSquare size={16} className="text-emerald-400 shrink-0" />
                  <span>2. Desliza y selecciona <strong>Agregar a inicio</strong>.</span>
                </li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-500/95 backdrop-blur-md border border-amber-300/50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-xl">
      <WifiOff size={12} className="shrink-0" />
      <span>Modo Offline · Sin Conexión</span>
    </div>
  );
};
