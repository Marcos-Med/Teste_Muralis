import { Typography } from '@mui/material';


interface FormTitleProps {
  title: string
}

const FormTitle = ({ title }: FormTitleProps) => { //Define o título do formulário
  return (
    <Typography color="text.primary" variant="h6" sx={{ marginBottom: 2 }}>
      {title}
    </Typography>
  );
};
export default FormTitle;