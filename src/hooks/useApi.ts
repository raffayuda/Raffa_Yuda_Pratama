import { useState, useEffect } from 'react'

interface UseApiOptions {
  immediate?: boolean
}

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(
  url: string, 
  options: UseApiOptions = { immediate: true }
): UseApiState<T> & { refetch: () => void } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      })
    }
  }

  useEffect(() => {
    if (options.immediate) {
      fetchData()
    }
  }, [url, options.immediate])

  return {
    ...state,
    refetch: fetchData
  }
}
