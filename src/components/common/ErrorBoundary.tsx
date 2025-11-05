import React, { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("🛑 ErrorBoundary caught an error:", { error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen bg-gradient-to-br from-blackcolor to-redcolor bg-fixed flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-3xl font-bold text-whitecolor">
              Something went wrong 😢
            </h1>
            <p className="text-whitecolor mt-2 max-w-md">
              An unexpected error occurred. Try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-3 text-whitecolor rounded-lg bg-blackcolor hover:bg-red-700 transition"
            >
              Refresh Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
