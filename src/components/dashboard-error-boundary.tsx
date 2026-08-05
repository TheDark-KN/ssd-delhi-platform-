"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class DashboardErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[Dashboard Module Error] [${this.props.moduleName || "Unknown"}]`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Card className="border-dashed border-red-200 bg-red-50/50 dark:bg-red-950/10">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-red-800 dark:text-red-200 text-lg mb-2">
              Module Load Failed
            </h4>
            <p className="text-sm text-red-600/80 max-w-sm mb-6 leading-relaxed">
              We couldn&apos;t load the {this.props.moduleName || "requested"} component due to an integration issue.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={this.handleRetry}
              className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950 gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Module
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
