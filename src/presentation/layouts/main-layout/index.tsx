import React from 'react';
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  return <div>{children}</div>;
};

export default MainLayout;
