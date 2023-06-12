import React from 'react'
import DashboardPage from '../admin/dashboard';


const AboutPage = () => {
    return <h1>Hakkımızda</h1>;
  };
  
const Index = () => {
  return (
    <DashboardPage>
      <AboutPage/>
    </DashboardPage>
    
  )
}

export default Index