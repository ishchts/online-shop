import { styled } from '@mui/system';

const StyledInput = styled('input', {
  name: 'StyledInput',
  slot: 'root',
})(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledField = styled('div', {
  name: 'StyledInput',
  slot: 'qwe',
})(() => ({}));

export const Input = () => {
  // const props = useThemeProps({ props: inProps, name: 'StyledInput' });

  return (
    <StyledField>
      <StyledInput />
    </StyledField>
  );
};
