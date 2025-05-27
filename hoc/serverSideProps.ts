import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPropsWithTranslations = (): GetStaticProps => {
  return async ({ locale }: GetStaticPropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
    };
  };
};