'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Report, mockReports } from './reports'

interface ReportContextType {
  reports: Report[]
  currentReport: Report | null
  isViewerOpen: boolean
  openReport: (reportId: string) => void
  openReportData: (report: Report) => void
  closeReport: () => void
  addReport: (report: Report) => void
}

const ReportContext = createContext<ReportContextType | undefined>(undefined)

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [currentReport, setCurrentReport] = useState<Report | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const openReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId)
    if (report) {
      setCurrentReport(report)
      setIsViewerOpen(true)
    }
  }

  const openReportData = (report: Report) => {
    // Add to reports if not exists
    if (!reports.find(r => r.id === report.id)) {
      setReports(prev => [report, ...prev])
    }
    setCurrentReport(report)
    setIsViewerOpen(true)
  }

  const closeReport = () => {
    setIsViewerOpen(false)
    // Keep currentReport for a bit for animation
    setTimeout(() => setCurrentReport(null), 300)
  }

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev])
  }

  return (
    <ReportContext.Provider value={{
      reports,
      currentReport,
      isViewerOpen,
      openReport,
      openReportData,
      closeReport,
      addReport
    }}>
      {children}
    </ReportContext.Provider>
  )
}

export function useReports() {
  const context = useContext(ReportContext)
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportProvider')
  }
  return context
}


