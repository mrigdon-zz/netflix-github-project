import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Label from "../../components/Label";
import PageLayout from "../../components/PageLayout";
import { Locale } from "../../utils/i18n";

const RepoDetail: NextPage<{ locale: Locale; id: string }> = ({
  locale,
  id,
}) => {
  return (
    <PageLayout locale={locale}>
      <h1>
        <Label name="commitsFor" attrs={{ repo: id }}></Label>
      </h1>
    </PageLayout>
  );
};

export default RepoDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.query.id,
      locale: context.query.locale || "en",
    },
  };
};
