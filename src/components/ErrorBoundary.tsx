import * as React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-light flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl p-10 shadow-2xl shadow-primary/5 border border-slate-100 text-center"
          >
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-8">
              <AlertCircle size={40} />
            </div>
            <h1 className="text-3xl font-800 font-display text-ink mb-4 tracking-tight">Something went wrong</h1>
            <p className="text-slate-muted mb-10 font-500 leading-relaxed">
              An unexpected error occurred. We've been notified and are looking into it.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-8 p-4 bg-slate-50 rounded-xl text-left overflow-auto max-h-40">
                <code className="text-xs text-red-600 font-mono break-all">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReset}
                className="w-full py-4 bg-primary text-white rounded-2xl font-800 text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="w-full py-4 bg-white text-ink border border-slate-200 rounded-2xl font-800 text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
              >
                <Home size={18} />
                Go to Homepage
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
