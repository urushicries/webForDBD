import { useTranslation } from 'react-i18next';
import SectionPage from '../SectionPage/SectionPage';

export default function MakeYourBuilds() {
  const { t } = useTranslation();
  const items = t('makeYourBuilds.items', { returnObjects: true });

  return (
    <SectionPage
      title={t('makeYourBuilds.title')}
      subtitle={t('makeYourBuilds.subtitle')}
      tag={t('makeYourBuilds.tag')}
      items={items}
    />
  );
}
