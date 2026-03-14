import { useTranslation } from 'react-i18next';
import SectionPage from '../SectionPage/SectionPage';

export default function DBDScrims() {
  const { t } = useTranslation();
  const items = t('dbdScrims.items', { returnObjects: true });

  return (
    <SectionPage
      title={t('dbdScrims.title')}
      subtitle={t('dbdScrims.subtitle')}
      tag={t('dbdScrims.tag')}
      items={items}
    />
  );
}
