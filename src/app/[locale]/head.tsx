import { useTranslations } from 'next-intl';

function IndexHead() {
  const translate = useTranslations();
  return (
    <>
      <title>{translate('app.title')}</title>
    </>
  );
}

export default IndexHead;
