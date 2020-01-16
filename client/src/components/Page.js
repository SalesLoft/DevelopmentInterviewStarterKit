import React from 'react'
import styled from 'styled-components'

import { ConnectedNavBar } from '../containers/ConnectedNavBar'

const PageContainer = styled.div`
  display: grid;
  grid-template 46px 1fr / 1fr;
  height: 100%;
  width: 100%;
  background-color: #ddd;
  background-image: -webkit-linear-gradient(top left,#42aedc,#2988c1);
  background-image: linear-gradient(to bottom right,#42aedc,#2988c1);

  background-attachment: fixed;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Page = (props) => (
  <PageContainer>
    <ConnectedNavBar />
    <FlexBox>
      {props.children}
    </FlexBox>
  </PageContainer>
);

export default Page;
