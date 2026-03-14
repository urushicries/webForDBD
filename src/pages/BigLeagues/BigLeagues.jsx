import { useTranslation } from 'react-i18next';
import SectionPage from '../SectionPage/SectionPage';

export default function BigLeagues() {
  const { t } = useTranslation();
  const items = t('bigLeagues.items', { returnObjects: true });

  return (
    <SectionPage
      title={t('bigLeagues.title')}
      subtitle={t('bigLeagues.subtitle')}
      tag={t('bigLeagues.tag')}
      items={items}
    />
  );
}
