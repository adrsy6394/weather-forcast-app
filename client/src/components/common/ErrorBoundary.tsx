import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
                    <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="text-red-500 w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            We apologize for the inconvenience. The application has encountered an unexpected error.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn btn-primary w-full"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
