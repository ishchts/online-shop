import { Container, styled } from '@mui/material';
import { indigo } from '@mui/material/colors';

import { Header } from '../components/Header';

const Main = styled('main', {
  name: 'MuiMain',
  slot: 'root',
})();

const MuiFooter = styled('footer', {
  name: 'MuiFooter',
  slot: 'root',
})(() => ({
  height: '50px',
  ['& .MuiContainer-root']: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: indigo[50],
  },
}));

const Footer = () => {
  return (
    <MuiFooter>
      <Container>anonymous</Container>
    </MuiFooter>
  );
};

export default function Default({ children }) {
  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </>
  );
}
