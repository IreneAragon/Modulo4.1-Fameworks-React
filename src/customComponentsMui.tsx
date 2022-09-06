import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const CustomButton = styled(Button) ({
    backgroundColor: '#BB86FC',
    '&:hover': {
      backgroundColor: '#03DAC6',
    },
  });
  
export const CustomTextField = styled(TextField) ({
    marginRight: '1em',
    '& input.MuiInputBase-input': {
      color: '#dadada',
    },
    '& input.MuiInputBase-input:focus': {
      background: 'rgba(3, 218, 198, 0.2)',
    },
    '& label.MuiFormLabel-root': {
      color: '#03DAC6',
    },
    '& label.Mui-focused': {
      color: '#03DAC6',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#03DAC6',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#03DAC6',
      },
      '&:hover fieldset': {
        borderColor: '#03DAC6',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#03DAC6',
      },
    },
})
  
export const CustomTableCell = styled(TableCell) ({
    backgroundColor: '#293233',
    color: '#ebebeb', 
    border: '1px solid #03DAC6', 
});
  
export const CustomTablePagination = styled(TablePagination) ({
    backgroundColor: '#293233',
    color: '#ebebeb', 
    border: '1px solid #03DAC6', 

    '& div.MuiInputBase-root': {
        color: '#ebebeb',
        '& svg.css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon': {
        color: '#ebebeb',
        },
    },
        '& div.MuiTablePagination-actions': {
        '& button.MuiButtonBase-root': {
        color: '#ebebeb',
        },
    },
});
