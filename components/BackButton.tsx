import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  fallbackTo: string;
  label?: string;
  fallbackLabel?: string;
  className?: string;
  iconClassName?: string;
}

interface RouterHistoryState {
  idx?: unknown;
}

const canNavigateBackWithinApp = (): boolean => {
  const state = window.history.state as RouterHistoryState | null;
  return typeof state?.idx === 'number' && state.idx > 0;
};

const getDefaultFallbackLabel = (fallbackTo: string): string => {
  const path = fallbackTo.split(/[?#]/, 1)[0];

  if (path === '/') return '返回首頁';
  if (path.startsWith('/standings')) return '返回積分榜';
  if (path.startsWith('/stats')) return '返回數據中心';
  if (path.startsWith('/news')) return '返回最新消息';
  if (path.startsWith('/schedule')) return '返回賽程與結果';
  if (path.startsWith('/teams/')) return '返回球隊';

  return '返回上一頁';
};

const BackButton: React.FC<BackButtonProps> = ({
  fallbackTo,
  label = '返回上一頁',
  fallbackLabel,
  className = '',
  iconClassName = 'mr-2 h-4 w-4',
}) => {
  const navigate = useNavigate();
  const canGoBack = canNavigateBackWithinApp();
  const displayLabel = canGoBack
    ? label
    : (fallbackLabel ?? getDefaultFallbackLabel(fallbackTo));

  const handleClick = () => {
    if (canNavigateBackWithinApp()) {
      navigate(-1);
      return;
    }

    navigate(fallbackTo);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      <ArrowLeft className={iconClassName} aria-hidden="true" />
      {displayLabel}
    </button>
  );
};

export default BackButton;
