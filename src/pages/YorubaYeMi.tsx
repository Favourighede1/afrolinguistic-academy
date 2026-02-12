import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function YorubaYeMi() {
  const navigate = useNavigate();
  const { setSelectedLanguageId } = useLanguage();

  useEffect(() => {
    setSelectedLanguageId('yoruba');
    navigate('/lessons', { replace: true });
  }, [navigate, setSelectedLanguageId]);

  return null;
}
