import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { Dashboard } from '@/components/Dashboard'
import apiClient from '@/lib/api'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [systemStatus, setSystemStatus] = useState({
    status: 'loading',
    agents: { total: 0, active: 0 },
    tasks: { total: 0, running: 0 },
    errors: { total: 0 }
  })

  // Fetch system status on mount
  useEffect(() => {
    fetchSystemStatus()
    // Set up polling for real-time updates
    const interval = setInterval(fetchSystemStatus, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchSystemStatus = async () => {
    try {
      // Check API health
      await apiClient.healthCheck()
      
      // Get agents data
      const agentsResponse = await apiClient.getAgents({ limit: 100 })
      const agents = agentsResponse.data || []
      
      setSystemStatus({
        status: 'healthy',
        agents: { 
          total: agents.length, 
          active: agents.filter(a => a.status === 'active').length 
        },
        tasks: { total: 156, running: 4 }, // Will be replaced with real data
        errors: { total: 2 } // Will be replaced with real data
      })
    } catch (error) {
      console.error('Failed to fetch system status:', error)
      setSystemStatus(prev => ({ ...prev, status: 'error' }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen}
        systemStatus={systemStatus}
      />
      
      <div className="lg:pl-72">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          systemStatus={systemStatus}
        />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Dashboard systemStatus={systemStatus} />
          </div>
        </main>
      </div>
    </div>
  )
}