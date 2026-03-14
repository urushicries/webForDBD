import { useTranslation } from 'react-i18next';
import SectionPage from '../SectionPage/SectionPage';

export default function Tutorials() {
  const { t } = useTranslation();
  const items = t('tutorials.items', { returnObjects: true });

  return (
    <SectionPage
      title={t('tutorials.title')}
      subtitle={t('tutorials.subtitle')}
      tag={t('tutorials.tag')}
      items={items}
    />
  );
}
