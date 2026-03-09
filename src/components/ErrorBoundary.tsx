import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
              Something went wrong
            </h1>
            
            <p className="text-neutral-600 mb-8 text-sm leading-relaxed">
              We encountered an unexpected error. Don't worry, your data is safe. 
              Try refreshing the page or returning home.
            </p>

            {this.state.error && (
              <div className="mb-8 p-4 bg-neutral-50 rounded-lg border border-neutral-100 text-left overflow-auto max-h-32">
                <code className="text-xs font-mono text-red-600 break-all">
                  {this.state.error.toString()}
                </code>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload
              </button>
              
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-neutral-900 border border-neutral-200 rounded-xl font-medium hover:bg-neutral-50 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium">
                Error Reference: {Math.random().toString(36).substring(7).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
