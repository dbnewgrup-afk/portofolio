import { createContext, useContext, useRef, useState, useEffect } from "react";

const ToastCtx = createContext<{ show: (msg: string) => void }>({ show: () => {} });

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastAnchor() {
  const [msg, setMsg] = useState<string>("");
  const timer = useRef<number | null>(null);

  const show = (m: string) => {
    setMsg(m);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(""), 1600);
  };

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return (
    <ToastCtx.Provider value={{ show }}>
      <div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none z-50">
        {msg && (
          <div className="pointer-events-auto px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur text-sm transition-opacity duration-300 opacity-100">
            {msg}
          </div>
        )}
      </div>
    </ToastCtx.Provider>
  );
}
