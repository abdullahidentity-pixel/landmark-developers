import { createContext, useContext, useState, useCallback } from 'react';

const LeadModalCtx = createContext(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalCtx);
  if (!ctx) throw new Error('useLeadModal must be used inside LeadModalProvider');
  return ctx;
}

export function LeadModalProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    mode: 'tour',        // 'tour' | 'download'
    project: '',         // pre-fill project name
    downloadUrl: null,   // PDF path — only in download mode
    downloadLabel: '',   // human label e.g. "Grand 15 Payment Plan"
  });

  const openTour = useCallback((project = '') => {
    setState({ open: true, mode: 'tour', project, downloadUrl: null, downloadLabel: '' });
  }, []);

  const openDownload = useCallback((downloadUrl, label = '', project = '') => {
    setState({ open: true, mode: 'download', project, downloadUrl, downloadLabel: label });
  }, []);

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  return (
    <LeadModalCtx.Provider value={{ ...state, openTour, openDownload, close }}>
      {children}
    </LeadModalCtx.Provider>
  );
}
