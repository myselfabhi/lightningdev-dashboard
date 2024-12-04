import React from "react";
import Layout from "../../components/Layout/Layout";
import DepositBalance from "../../components/DepositBalance/DepositBalance";

const DepositBalancePage: React.FC = () => {
  return (
    <Layout>
      <DepositBalance />
    </Layout>
  );
};

export default DepositBalancePage;
