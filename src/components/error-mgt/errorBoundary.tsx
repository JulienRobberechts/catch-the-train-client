import React from "react";
import { log } from "./log";

// TODO: build ErrorBoundary
class ErrorBoundary extends React.Component<any, { hasError: boolean }, {}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    log(error.toString(), errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h3>Something went wrong. sorry...</h3>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
