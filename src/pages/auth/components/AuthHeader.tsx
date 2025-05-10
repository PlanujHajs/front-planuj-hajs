import { Typography } from '@mui/material';

const AuthHeader = ({ text }: { text: string }) => (
  <Typography component="h1" variant="h3" sx={{ textAlign: 'center' }}>
    {text}
  </Typography>
);

export default AuthHeader;
