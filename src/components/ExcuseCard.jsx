import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ExcuseCard = ({ excuse,excuseNumber }) => {
  return (
    <Card className="m-4">
      <CardContent>
        <Typography variant="h5" component="h2" className="text-lg font-bold">
          Excuse {excuseNumber}
        </Typography>
        <Typography variant="body2" component="p" className="text-gray-700">
          {excuse}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ExcuseCard;
