import React,{ } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import NotifyHost from './components/commons/NotifyHost/NotifyHost.tsx'
import ConfirmDialog from './components/commons/ConfirmDialog/ConfirmDialog.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppThemeProvider from './components/Layout/theme/ThemeProvider.tsx'
import QCNhuomPage from './pages/QCNhuom/QCNhuomPage.tsx'
import TopBar from './components/Layout/TopBar.tsx'
import { Container } from '@mui/material'

createRoot(document.getElementById('root')!).render(
  <AppThemeProvider>
    <BrowserRouter>
      <React.Suspense>
        <TopBar />
        <Container>
          <Routes>
            <Route path="/" element={<QCNhuomPage />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </Container>
        <NotifyHost />
        <ConfirmDialog />
      </React.Suspense>
    </BrowserRouter>
  </AppThemeProvider>
)
