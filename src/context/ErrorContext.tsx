import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, X, Info, CheckCircle, AlertTriangle } from 'lucide-react';

export type ErrorType = 'error' | 'warning' | 'info' | 'success';

interface ErrorMessage {
  id: string;
  message: string;
  type: ErrorType;
}

interface ErrorContextType {
  showError: (message: string, type?: ErrorType) => void;
  clearError: (id: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [errors, setErrors] = useState<ErrorMessage[]>([]);

  const showError = useCallback((message: string, type: ErrorType = 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setErrors((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setErrors((prev) => prev.filter((err) => err.id !== id));
    }, 5000);
  }, []);

  const clearError = useCallback((id: string) => {
    setErrors((prev) => prev.filter((err) => err.id !== id));
  }, []);

  return (
    <ErrorContext.Provider value={{ showError, clearError }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {errors.map((error) => (
            <motion.div
              key={error.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              layout
              className="pointer-events-auto"
            >
              <Toast error={error} onClear={() => clearError(error.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ErrorContext.Provider>
  );
};

const Toast: React.FC<{ error: ErrorMessage; onClear: () => void }> = ({ error, onClear }) => {
  const icons = {
    error: <AlertCircle className="text-red-500" size={20} />,
    warning: <AlertTriangle className="text-amber-500" size={20} />,
    info: <Info className="text-blue-500" size={20} />,
    success: <CheckCircle className="text-emerald-500" size={20} />,
  };

  const bgColors = {
    error: 'bg-red-50 border-red-100',
    warning: 'bg-amber-50 border-amber-100',
    info: 'bg-blue-50 border-blue-100',
    success: 'bg-emerald-50 border-emerald-100',
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border shadow-xl backdrop-blur-md min-w-[320px] max-w-md ${bgColors[error.type]}`}>
      <div className="shrink-0">{icons[error.type]}</div>
      <div className="flex-1 text-sm font-600 text-ink leading-tight">
        {error.message}
      </div>
      <button
        onClick={onClear}
        className="shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors text-slate-muted"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};
