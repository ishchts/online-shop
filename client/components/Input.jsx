import React from "react";
import { styled } from "@mui/system";
import { useThemeProps } from '@mui/material/styles';

const StyledInput = styled('input', {
    name: 'StyledInput',
    slot: 'root'
})(({ theme}) => ({
    backgroundColor: theme.palette.primary.main,
}));

const StyledField = styled('div', {
    name: 'StyledInput',
    slot: 'qwe'
})(({ theme}) => ({}));

export const Input = (inProps) => {
    const props = useThemeProps({ props: inProps, name: 'StyledInput' });

    return (
        <StyledField>
            <StyledInput />
        </StyledField>
    )
}