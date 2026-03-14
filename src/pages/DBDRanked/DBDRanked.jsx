import { useTranslation } from 'react-i18next';
import SectionPage from '../SectionPage/SectionPage';

export default function DBDRanked() {
  const { t } = useTranslation();
  const items = t('dbdRanked.items', { returnObjects: true });

  return (
    <SectionPage
      title={t('dbdRanked.title')}
      subtitle={t('dbdRanked.subtitle')}
      tag={t('dbdRanked.tag')}
      items={items}
    />
  );
}
