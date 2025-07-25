"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorComponentProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

const ErrorComponent = ({ 
  title = "Something went wrong",
  message = "An error occurred while loading this content.",
  onRetry,
  showRetry = true
}: ErrorComponentProps) => {
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-red-900 dark:text-red-100">{title}</CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        {showRetry && onRetry && (
          <CardContent className="text-center">
            <Button onClick={onRetry} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

export default ErrorComponent
