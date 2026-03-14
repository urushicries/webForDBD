import { useTranslation } from 'react-i18next';
import SectionPage from '../SectionPage/SectionPage';

export default function DBD1v1Ladder() {
  const { t } = useTranslation();
  const items = t('1v1Ladder.items', { returnObjects: true });

  return (
    <SectionPage
      title={t('1v1Ladder.title')}
      subtitle={t('1v1Ladder.subtitle')}
      tag={t('1v1Ladder.tag')}
      items={items}
    />
  );
}
